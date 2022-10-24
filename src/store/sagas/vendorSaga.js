// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { VENDOR_ACTIONS, setCreateVendorFailure, setCreateVendorSucceed, setDeleteVendorFailure, setDeleteVendorSucceed, setFetchVendorFailure, setFetchVendorSucceed, setUpdateVendorFailure, setUpdateVendorSucceed} from '../actions/vendorAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listVendor(filter) {
    try {
      console.log('[Filter Vendor]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('vendors').select()
        
      if (error && status !== 406) {
        console.log(error.toString());
        throw error;
      }

      if (data) {
        
        yield put(setFetchVendorSucceed(data));
      }
    } catch (error) {
      yield put(setFetchVendorFailure(error));
      TOAST.error(`Vendor Failed:${error.toString()}`);
    }     
 
}

function* createVendor(rqst) {
  try {
    
    let { error } = yield supabaseClient.from('vendors').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      yield put(setCreateVendorFailure(`[create Vendor] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreateVendorSucceed({success : true}));
    
  } catch (error) {
    yield put(setCreateVendorFailure(`[create Vendor] : ${error.toString()}`));
  } 

}

function* updateVendor(rqst) {
  try {
    let { error } = yield supabaseClient.from('vendors').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      yield put(setUpdateVendorFailure(`[update Vendor] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdateVendorSucceed({success : true}));
    
  } catch (error) {
    yield put(setUpdateVendorFailure(`[update Vendor] : ${error.toString()}`));
  } 

}

function* deleteVendor(rqst) {
  try {
    let { error } = yield supabaseClient.from('vendors').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      yield put(setDeleteVendorFailure(`[delete Vendor] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeleteVendorSucceed({success : true}));
    
  } catch (error) {
    yield put(setDeleteVendorFailure(`[delete Vendor] : ${error.toString()}`));
  } 

}





function* vendorSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(VENDOR_ACTIONS.ATTEMPT_TO_FETCH_VENDOR,listVendor);
  yield takeLatest(VENDOR_ACTIONS.ATTEMPT_TO_CREATE_VENDOR,createVendor);
  yield takeLatest(VENDOR_ACTIONS.ATTEMPT_TO_UPDATE_VENDOR,updateVendor);
  yield takeLatest(VENDOR_ACTIONS.ATTEMPT_TO_DELETE_VENDOR,deleteVendor);
  
}

export default vendorSagaWatcher;

