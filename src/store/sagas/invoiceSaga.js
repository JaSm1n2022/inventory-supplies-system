// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { INVOICE_ACTIONS, setCreateInvoiceFailure, setCreateInvoiceSucceed, setDeleteInvoiceFailure, setDeleteInvoiceSucceed, setFetchInvoiceFailure, setFetchInvoiceSucceed, setUpdateInvoiceFailure, setUpdateInvoiceSucceed} from '../actions/invoiceAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listInvoice(filter) {
    try {
      console.log('[Filter]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('invoices').select().gte('invoiced_at', filter.payload.from).lt('invoiced_at',filter.payload.to);
        
      if (error && status !== 406) {
        console.log('[error me]',error);
        throw error;
      }

      if (data) {
        console.log('[got me]',data);
        yield put(setFetchInvoiceSucceed(data));
      }
    } catch (error) {
      yield put(setFetchInvoiceFailure(error));
      TOAST.error(`Invoice Failed:${error.toString()}`);
    }     
 
}

function* createInvoice(rqst) {
  try {
    console.log('[createInvoices]',rqst.payload);
    let { error } = yield supabaseClient.from('invoices').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create invoice] : ${error.toString()}`)
      yield put(setCreateInvoiceFailure(`[create invoice] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreateInvoiceSucceed({success : true}));
    
  } catch (error) {
    console.log(`[create invoice] : ${error.toString()}`)
    yield put(setCreateInvoiceFailure(`[create invoice] : ${error.toString()}`));
  } 

}

function* updateInvoice(rqst) {
  try {
    console.log('[updateInvoices]',rqst.payload);
    let { error } = yield supabaseClient.from('invoices').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update invoice] : ${error.toString()}`)
      yield put(setUpdateInvoiceFailure(`[update invoice] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdateInvoiceSucceed({success : true}));
    
  } catch (error) {
    console.log(`[update invoice] : ${error.toString()}`)
    yield put(setUpdateInvoiceFailure(`[update invoice] : ${error.toString()}`));
  } 

}

function* deleteInvoice(rqst) {
  try {
    console.log('[updateInvoices]',rqst.payload);
    let { error } = yield supabaseClient.from('invoices').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      console.log(`[delete invoice] : ${error.toString()}`)
      yield put(setDeleteInvoiceFailure(`[delete invoice] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeleteInvoiceSucceed({success : true}));
    
  } catch (error) {
    console.log(`[delete invoice] : ${error.toString()}`)
    yield put(setDeleteInvoiceFailure(`[delete invoice] : ${error.toString()}`));
  } 

}





function* invoiceSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(INVOICE_ACTIONS.ATTEMPT_TO_FETCH_INVOICE,listInvoice);
  yield takeLatest(INVOICE_ACTIONS.ATTEMPT_TO_CREATE_INVOICE,createInvoice);
  yield takeLatest(INVOICE_ACTIONS.ATTEMPT_TO_UPDATE_INVOICE,updateInvoice);
  yield takeLatest(INVOICE_ACTIONS.ATTEMPT_TO_DELETE_INVOICE,deleteInvoice);
  
}

export default invoiceSagaWatcher;

