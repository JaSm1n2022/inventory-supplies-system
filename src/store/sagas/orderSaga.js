// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { ORDER_ACTIONS, setCreateOrderFailure, setCreateOrderSucceed, setDeleteOrderFailure, setDeleteOrderSucceed, setFetchOrderFailure, setFetchOrderSucceed, setUpdateOrderFailure, setUpdateOrderSucceed } from '../actions/orderAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listOrder(filter) {
  try {
    console.log('[Filter]', filter.payload);
    let { data, error, status } = yield supabaseClient
      .from('orders').select().gte('created_at', `${filter.payload.from} 00:00`).lt('created_at', `${filter.payload.to} 23:59`).order('created_at', { ascending: false });


    if (error && status !== 406) {
      console.log(`error${error.toString()}`);
      throw error;
    }

    if (data) {
      console.log('[got me]', data);
      yield put(setFetchOrderSucceed(data));
    }
  } catch (error) {
    yield put(setFetchOrderFailure(error));
    TOAST.error(`Order Failed:${error.toString()}`);
  }

}

function* CreateOrder(rqst) {
  try {
    console.log('[CreateOrders]', rqst.payload);
    let { error } = yield supabaseClient.from('orders').insert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Order] : ${error.toString()}`)
      yield put(setCreateOrderFailure(`[create Order] : ${error.toString()}`));
      throw error;
    }
    yield put(setCreateOrderSucceed({ success: true }));

  } catch (error) {
    console.log(`[create Order] : ${error.toString()}`)
    yield put(setCreateOrderFailure(`[create Order] : ${error.toString()}`));
  }

}

function* UpdateOrder(rqst) {
  try {
    console.log('[UpdateOrders]', rqst.payload);
    let { error } = yield supabaseClient.from('orders').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Order] : ${error.toString()}`)
      yield put(setUpdateOrderFailure(`[update Order] : ${error.toString()}`));
      throw error;
    }
    yield put(setUpdateOrderSucceed({ success: true }));

  } catch (error) {
    console.log(`[update Order] : ${error.toString()}`)
    yield put(setUpdateOrderFailure(`[update Order] : ${error.toString()}`));
  }

}

function* DeleteOrder(rqst) {
  try {
    console.log('[UpdateOrders]', rqst.payload);
    let { error } = yield supabaseClient.from('orders').delete()
      .match({ id: rqst.payload });


    if (error) {
      console.log(`[delete Order] : ${error.toString()}`)
      yield put(setDeleteOrderFailure(`[delete Order] : ${error.toString()}`));
      throw error;
    }
    yield put(setDeleteOrderSucceed({ success: true }));

  } catch (error) {
    console.log(`[delete Order] : ${error.toString()}`)
    yield put(setDeleteOrderFailure(`[delete Order] : ${error.toString()}`));
  }

}





function* orderSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(ORDER_ACTIONS.ATTEMPT_TO_FETCH_ORDER, listOrder);
  yield takeLatest(ORDER_ACTIONS.ATTEMPT_TO_CREATE_ORDER, CreateOrder);
  yield takeLatest(ORDER_ACTIONS.ATTEMPT_TO_UPDATE_ORDER, UpdateOrder);
  yield takeLatest(ORDER_ACTIONS.ATTEMPT_TO_DELETE_ORDER, DeleteOrder);

}

export default orderSagaWatcher;

