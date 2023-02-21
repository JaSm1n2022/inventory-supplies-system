// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { THRESHOLD_ACTIONS, setCreateThresholdFailure, setCreateThresholdSucceed, setDeleteThresholdFailure, setDeleteThresholdSucceed, setFetchThresholdFailure, setFetchThresholdSucceed, setUpdateThresholdFailure, setUpdateThresholdSucceed } from '../actions/thresholdAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listThreshold(filter) {
  try {
    console.log('[Filter]', filter.payload);
    let { data, error, status } = yield supabaseClient
      .from('threshold').select()

    if (error && status !== 406) {
      console.log(error.toString());
      throw error;
    }

    if (data) {
      console.log('[got me]', data);
      yield put(setFetchThresholdSucceed(data));
    }
  } catch (error) {
    yield put(setFetchThresholdFailure(error));
    TOAST.error(`Threshold Failed:${error.toString()}`);
  }

}

function* createThreshold(rqst) {
  try {
    console.log('[createThresholds]', rqst.payload);
    let { error } = yield supabaseClient.from('threshold').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Threshold] : ${error.toString()}`)
      yield put(setCreateThresholdFailure(`[create Threshold] : ${error.toString()}`));
      throw error;
    }
    yield put(setCreateThresholdSucceed({ success: true }));

  } catch (error) {
    console.log(`[create Threshold] : ${error.toString()}`)
    yield put(setCreateThresholdFailure(`[create Threshold] : ${error.toString()}`));
  }

}

function* updateThreshold(rqst) {
  try {
    console.log('[updateThresholds]', rqst.payload);
    let { error } = yield supabaseClient.from('threshold').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Threshold] : ${error.toString()}`)
      yield put(setUpdateThresholdFailure(`[update Threshold] : ${error.toString()}`));
      throw error;
    }
    yield put(setUpdateThresholdSucceed({ success: true }));

  } catch (error) {
    console.log(`[update Threshold] : ${error.toString()}`)
    yield put(setUpdateThresholdFailure(`[update Threshold] : ${error.toString()}`));
  }

}

function* deleteThreshold(rqst) {
  try {
    console.log('[updateThresholds]', rqst.payload);
    let { error } = yield supabaseClient.from('threshold').delete()
      .match({ id: rqst.payload });


    if (error) {
      console.log(`[delete Threshold] : ${error.toString()}`)
      yield put(setDeleteThresholdFailure(`[delete Threshold] : ${error.toString()}`));
      throw error;
    }
    yield put(setDeleteThresholdSucceed({ success: true }));

  } catch (error) {
    console.log(`[delete Threshold] : ${error.toString()}`)
    yield put(setDeleteThresholdFailure(`[delete Threshold] : ${error.toString()}`));
  }

}





function* thresholdSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(THRESHOLD_ACTIONS.ATTEMPT_TO_FETCH_THRESHOLD, listThreshold);
  yield takeLatest(THRESHOLD_ACTIONS.ATTEMPT_TO_CREATE_THRESHOLD, createThreshold);
  yield takeLatest(THRESHOLD_ACTIONS.ATTEMPT_TO_UPDATE_THRESHOLD, updateThreshold);
  yield takeLatest(THRESHOLD_ACTIONS.ATTEMPT_TO_DELETE_THRESHOLD, deleteThreshold);

}

export default thresholdSagaWatcher;

