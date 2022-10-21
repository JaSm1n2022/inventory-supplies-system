// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { EMPLOYEE_ACTIONS, setCreateEmployeeFailure, setCreateEmployeeSucceed, setDeleteEmployeeFailure, setDeleteEmployeeSucceed, setFetchEmployeeFailure, setFetchEmployeeSucceed, setUpdateEmployeeFailure, setUpdateEmployeeSucceed} from '../actions/employeeAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listEmployee(filter) {
    try {
      console.log('[Filter]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('employees')
        
      if (error && status !== 406) {
        console.log(error.toString());
        throw error;
      }

      if (data) {
        console.log('[got me]',data);
        yield put(setFetchEmployeeSucceed(data));
      }
    } catch (error) {
      yield put(setFetchEmployeeFailure(error));
      TOAST.error(`Employee Failed:${error.toString()}`);
    }     
 
}

function* createEmployee(rqst) {
  try {
    console.log('[createEmployees]',rqst.payload);
    let { error } = yield supabaseClient.from('employees').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Employee] : ${error.toString()}`)
      yield put(setCreateEmployeeFailure(`[create Employee] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreateEmployeeSucceed({success : true}));
    
  } catch (error) {
    console.log(`[create Employee] : ${error.toString()}`)
    yield put(setCreateEmployeeFailure(`[create Employee] : ${error.toString()}`));
  } 

}

function* updateEmployee(rqst) {
  try {
    console.log('[updateEmployees]',rqst.payload);
    let { error } = yield supabaseClient.from('employees').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Employee] : ${error.toString()}`)
      yield put(setUpdateEmployeeFailure(`[update Employee] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdateEmployeeSucceed({success : true}));
    
  } catch (error) {
    console.log(`[update Employee] : ${error.toString()}`)
    yield put(setUpdateEmployeeFailure(`[update Employee] : ${error.toString()}`));
  } 

}

function* deleteEmployee(rqst) {
  try {
    console.log('[updateEmployees]',rqst.payload);
    let { error } = yield supabaseClient.from('employees').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      console.log(`[delete Employee] : ${error.toString()}`)
      yield put(setDeleteEmployeeFailure(`[delete Employee] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeleteEmployeeSucceed({success : true}));
    
  } catch (error) {
    console.log(`[delete Employee] : ${error.toString()}`)
    yield put(setDeleteEmployeeFailure(`[delete employee] : ${error.toString()}`));
  } 

}





function* employeeSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(EMPLOYEE_ACTIONS.ATTEMPT_TO_FETCH_EMPLOYEE,listEmployee);
  yield takeLatest(EMPLOYEE_ACTIONS.ATTEMPT_TO_CREATE_EMPLOYEE,createEmployee);
  yield takeLatest(EMPLOYEE_ACTIONS.ATTEMPT_TO_UPDATE_EMPLOYEE,updateEmployee);
  yield takeLatest(EMPLOYEE_ACTIONS.ATTEMPT_TO_DELETE_EMPLOYEE,deleteEmployee);
  
}

export default employeeSagaWatcher;

