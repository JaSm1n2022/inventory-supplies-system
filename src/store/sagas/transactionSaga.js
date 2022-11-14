// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { TRANSACTION_ACTIONS, setCreateTransactionFailure, setCreateTransactionSucceed, setDeleteTransactionFailure, setDeleteTransactionSucceed, setFetchTransactionFailure, setFetchTransactionSucceed, setUpdateTransactionFailure, setUpdateTransactionSucceed} from '../actions/transactionAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listTransaction(filter) {
    try {
      console.log('[Filter]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('transactions').select().gte('ordered_at', filter.payload.from).lt('ordered_at',filter.payload.to);
        
      if (error && status !== 406) {
        console.log(`error${error.toString()}`);
        throw error;
      }

      if (data) {
        console.log('[got me]',data);
        yield put(setFetchTransactionSucceed(data));
      }
    } catch (error) {
      yield put(setFetchTransactionFailure(error));
      TOAST.error(`Transaction Failed:${error.toString()}`);
    }     
 
}

function* CreateTransaction(rqst) {
  try {
    console.log('[CreateTransactions]',rqst.payload);
    let { error } = yield supabaseClient.from('transactions').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Transaction] : ${error.toString()}`)
      yield put(setCreateTransactionFailure(`[create Transaction] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreateTransactionSucceed({success : true}));
    
  } catch (error) {
    console.log(`[create Transaction] : ${error.toString()}`)
    yield put(setCreateTransactionFailure(`[create Transaction] : ${error.toString()}`));
  } 

}

function* UpdateTransaction(rqst) {
  try {
    console.log('[UpdateTransactions]',rqst.payload);
    let { error } = yield supabaseClient.from('transactions').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Transaction] : ${error.toString()}`)
      yield put(setUpdateTransactionFailure(`[update Transaction] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdateTransactionSucceed({success : true}));
    
  } catch (error) {
    console.log(`[update Transaction] : ${error.toString()}`)
    yield put(setUpdateTransactionFailure(`[update Transaction] : ${error.toString()}`));
  } 

}

function* DeleteTransaction(rqst) {
  try {
    console.log('[UpdateTransactions]',rqst.payload);
    let { error } = yield supabaseClient.from('transactions').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      console.log(`[delete Transaction] : ${error.toString()}`)
      yield put(setDeleteTransactionFailure(`[delete Transaction] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeleteTransactionSucceed({success : true}));
    
  } catch (error) {
    console.log(`[delete Transaction] : ${error.toString()}`)
    yield put(setDeleteTransactionFailure(`[delete Transaction] : ${error.toString()}`));
  } 

}





function* transactionsagaWatcher<T>(): Iterable<T> {

  yield takeEvery(TRANSACTION_ACTIONS.ATTEMPT_TO_FETCH_TRANSACTION,listTransaction);
  yield takeLatest(TRANSACTION_ACTIONS.ATTEMPT_TO_CREATE_TRANSACTION,CreateTransaction);
  yield takeLatest(TRANSACTION_ACTIONS.ATTEMPT_TO_UPDATE_TRANSACTION,UpdateTransaction);
  yield takeLatest(TRANSACTION_ACTIONS.ATTEMPT_TO_DELETE_TRANSACTION,DeleteTransaction);
  
}

export default transactionsagaWatcher;

