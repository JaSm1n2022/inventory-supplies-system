import { delay } from "redux-saga";
import { put } from "redux-saga/effects";

import {
  post
} from '../../modules/api/request';
import TOAST from '../../modules/toastManager';
import * as actions from "../actions";
import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import StorageUtil from '../../utils/storageUtil';
const RESOURCE_PREFIX = 'v1/users';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
  
}



export function* logoutSaga(action) {

  yield StorageUtil.removeToken();
  yield StorageUtil.removeExpirationDt();
  yield StorageUtil.removeUserId();  
  yield put(actions.logoutSucceed());
}



export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  
  let url =`${RESOURCE_PREFIX}/login`;
      
  //"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY";
  if (!action.isSignup) {
    url =`${RESOURCE_PREFIX}/login`;
      //"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY";
      //"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaS";
  }
  try {
    //const response = yield axios(options);
    const   { data }   = yield post(url, authData, true);
    if(!data.fs_token) {
      TOAST.error('Invalid user');
      return; 
    }
    const expirationDate = yield new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
   
    yield StorageUtil.setToken(data.fs_token);
    yield StorageUtil.setExpirationDt(expirationDate);
    yield StorageUtil.setUser(data.user);
    yield put(
      actions.authSuccess(data.fs_token, data.user)
    );
    yield put(actions.checkAuthTimeout(data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield StorageUtil.getToken("fs_token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expireDt = yield StorageUtil.getExpirationDt();
    const expirationDate =new Date(expireDt);
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield StorageUtil.getUserId();
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
