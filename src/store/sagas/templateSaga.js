// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';

import { supabaseClient } from "../../config/SupabaseClient";
import { setCreateTemplateFailure, setCreateTemplateSucceed, setDeleteTemplateFailure, setDeleteTemplateSucceed, setFetchTemplateFailure, setFetchTemplateSucceed, setUpdateTemplateFailure, setUpdateTemplateSucceed, TEMPLATE_ACTIONS } from '../actions/templateAction';


function* listTemplate(filter) {
    try {
      console.log('[Filter Template]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('templates').select()
        
      if (error && status !== 406) {
        console.log(error.toString());
        throw error;
      }

      if (data) {
        
        yield put(setFetchTemplateSucceed(data));
      }
    } catch (error) {
      yield put(setFetchTemplateFailure(error));
      TOAST.error(`Template Failed:${error.toString()}`);
    }     
 
}

function* createTemplate(rqst) {
  try {
    console.log('[Create Template]',rqst);
    let { error } = yield supabaseClient.from('templates').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      yield put(setCreateTemplateFailure(`[create Template] : ${error.toString()}`));
      throw error;
    } 
    TOAST.ok('Successfully Created.');
    yield put(setCreateTemplateSucceed({success : true}));
    
  } catch (error) {
    yield put(setCreateTemplateFailure(`[create Template] : ${error.toString()}`));
  } 

}

function* updateTemplate(rqst) {
  try {
    let { error } = yield supabaseClient.from('templates').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      yield put(setUpdateTemplateFailure(`[update Template] : ${error.toString()}`));
      throw error;
    } 
    TOAST.ok('Successfully Updated.');
    yield put(setUpdateTemplateSucceed({success : true}));
    
  } catch (error) {
    yield put(setUpdateTemplateFailure(`[update Template] : ${error.toString()}`));
  } 

}

function* deleteTemplate(rqst) {
  try {
    let { error } = yield supabaseClient.from('templates').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      yield put(setDeleteTemplateFailure(`[delete Template] : ${error.toString()}`));
      throw error;
    } 
    TOAST.ok('Successfully deleted.');
    yield put(setDeleteTemplateSucceed({success : true}));
    
  } catch (error) {
    yield put(setDeleteTemplateFailure(`[delete Template] : ${error.toString()}`));
  } 

}





function* templateSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(TEMPLATE_ACTIONS.ATTEMPT_TO_FETCH_TEMPLATE,listTemplate);
  yield takeLatest(TEMPLATE_ACTIONS.ATTEMPT_TO_CREATE_TEMPLATE,createTemplate);
  yield takeLatest(TEMPLATE_ACTIONS.ATTEMPT_TO_UPDATE_TEMPLATE,updateTemplate);
  yield takeLatest(TEMPLATE_ACTIONS.ATTEMPT_TO_DELETE_TEMPLATE,deleteTemplate);
  
}

export default templateSagaWatcher;

