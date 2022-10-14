// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { STOCK_ACTIONS, setCreateStockFailure, setCreateStockSucceed, setDeleteStockFailure, setDeleteStockSucceed, setFetchStockFailure, setFetchStockSucceed, setUpdateStockFailure, setUpdateStockSucceed} from '../actions/stockAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listStock(filter) {
    try {
      console.log('[Filter]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('stocks')
        
      if (error && status !== 406) {
        console.log(`error${error.toString()}`);
        throw error;
      }

      if (data) {
        console.log('[got me]',data);
        yield put(setFetchStockSucceed(data));
      }
    } catch (error) {
      yield put(setFetchStockFailure(error));
      TOAST.error(`Stock Failed:${error.toString()}`);
    }     
 
}

function* createStock(rqst) {
  try {
    console.log('[createStocks]',rqst.payload);
    let { error } = yield supabaseClient.from('stocks').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Stock] : ${error.toString()}`)
      yield put(setCreateStockFailure(`[create Stock] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreateStockSucceed({success : true}));
    
  } catch (error) {
    console.log(`[create Stock] : ${error.toString()}`)
    yield put(setCreateStockFailure(`[create Stock] : ${error.toString()}`));
  } 

}

function* updateStock(rqst) {
  try {
    console.log('[updateStocks]',rqst.payload);
    let { error } = yield supabaseClient.from('stocks').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Stock] : ${error.toString()}`)
      yield put(setUpdateStockFailure(`[update Stock] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdateStockSucceed({success : true}));
    
  } catch (error) {
    console.log(`[update Stock] : ${error.toString()}`)
    yield put(setUpdateStockFailure(`[update Stock] : ${error.toString()}`));
  } 

}

function* deleteStock(rqst) {
  try {
    console.log('[updateStocks]',rqst.payload);
    let { error } = yield supabaseClient.from('stocks').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      console.log(`[delete Stock] : ${error.toString()}`)
      yield put(setDeleteStockFailure(`[delete Stock] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeleteStockSucceed({success : true}));
    
  } catch (error) {
    console.log(`[delete Stock] : ${error.toString()}`)
    yield put(setDeleteStockFailure(`[delete Stock] : ${error.toString()}`));
  } 

}





function* StockSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(STOCK_ACTIONS.ATTEMPT_TO_FETCH_STOCK,listStock);
  yield takeLatest(STOCK_ACTIONS.ATTEMPT_TO_CREATE_STOCK,createStock);
  yield takeLatest(STOCK_ACTIONS.ATTEMPT_TO_UPDATE_STOCK,updateStock);
  yield takeLatest(STOCK_ACTIONS.ATTEMPT_TO_DELETE_STOCK,deleteStock);
  
}

export default StockSagaWatcher;

