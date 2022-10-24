// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { PATIENT_ACTIONS, setCreatePatientFailure, setCreatePatientSucceed, setDeletePatientFailure, setDeletePatientSucceed, setFetchPatientFailure, setFetchPatientSucceed, setUpdatePatientFailure, setUpdatePatientSucceed} from '../actions/patientAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listPatient(filter) {
    try {
      console.log('[Filter]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('patients').select()
        
      if (error && status !== 406) {
        console.log(error.toString());
        throw error;
      }

      if (data) {
        console.log('[got me]',data);
        yield put(setFetchPatientSucceed(data));
      }
    } catch (error) {
      yield put(setFetchPatientFailure(error));
      TOAST.error(`Patient Failed:${error.toString()}`);
    }     
 
}

function* createPatient(rqst) {
  try {
    console.log('[createPatients]',rqst.payload);
    let { error } = yield supabaseClient.from('patients').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Patient] : ${error.toString()}`)
      yield put(setCreatePatientFailure(`[create Patient] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreatePatientSucceed({success : true}));
    
  } catch (error) {
    console.log(`[create Patient] : ${error.toString()}`)
    yield put(setCreatePatientFailure(`[create Patient] : ${error.toString()}`));
  } 

}

function* updatePatient(rqst) {
  try {
    console.log('[updatePatients]',rqst.payload);
    let { error } = yield supabaseClient.from('patients').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Patient] : ${error.toString()}`)
      yield put(setUpdatePatientFailure(`[update Patient] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdatePatientSucceed({success : true}));
    
  } catch (error) {
    console.log(`[update Patient] : ${error.toString()}`)
    yield put(setUpdatePatientFailure(`[update Patient] : ${error.toString()}`));
  } 

}

function* deletePatient(rqst) {
  try {
    console.log('[updatePatients]',rqst.payload);
    let { error } = yield supabaseClient.from('patients').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      console.log(`[delete Patient] : ${error.toString()}`)
      yield put(setDeletePatientFailure(`[delete Patient] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeletePatientSucceed({success : true}));
    
  } catch (error) {
    console.log(`[delete Patient] : ${error.toString()}`)
    yield put(setDeletePatientFailure(`[delete Patient] : ${error.toString()}`));
  } 

}





function* patientSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(PATIENT_ACTIONS.ATTEMPT_TO_FETCH_PATIENT,listPatient);
  yield takeLatest(PATIENT_ACTIONS.ATTEMPT_TO_CREATE_PATIENT,createPatient);
  yield takeLatest(PATIENT_ACTIONS.ATTEMPT_TO_UPDATE_PATIENT,updatePatient);
  yield takeLatest(PATIENT_ACTIONS.ATTEMPT_TO_DELETE_PATIENT,deletePatient);
  
}

export default patientSagaWatcher;

