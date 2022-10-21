// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { DISTRIBUTION_ACTIONS, setCreateDistributionFailure, setCreateDistributionSucceed, setDeleteDistributionFailure, setDeleteDistributionSucceed, setFetchDistributionFailure, setFetchDistributionSucceed, setUpdateDistributionFailure, setUpdateDistributionSucceed} from '../actions/distributionAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listDistribution(filter) {
    try {
      console.log('[Filter]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('distributions')
        
      if (error && status !== 406) {
        console.log(`error${error.toString()}`);
        throw error;
      }

      if (data) {
        console.log('[got me]',data);
        yield put(setFetchDistributionSucceed(data));
      }
    } catch (error) {
      yield put(setFetchDistributionFailure(error));
      TOAST.error(`Distribution Failed:${error.toString()}`);
    }     
 
}

function* CreateDistribution(rqst) {
  try {
    console.log('[CreateDistributions]',rqst.payload);
    let { error } = yield supabaseClient.from('distributions').insert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Distribution] : ${error.toString()}`)
      yield put(setCreateDistributionFailure(`[create Distribution] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreateDistributionSucceed({success : true}));
    
  } catch (error) {
    console.log(`[create Distribution] : ${error.toString()}`)
    yield put(setCreateDistributionFailure(`[create Distribution] : ${error.toString()}`));
  } 

}

function* UpdateDistribution(rqst) {
  try {
    console.log('[UpdateDistributions]',rqst.payload);
    let { error } = yield supabaseClient.from('distributions').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Distribution] : ${error.toString()}`)
      yield put(setUpdateDistributionFailure(`[update Distribution] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdateDistributionSucceed({success : true}));
    
  } catch (error) {
    console.log(`[update Distribution] : ${error.toString()}`)
    yield put(setUpdateDistributionFailure(`[update Distribution] : ${error.toString()}`));
  } 

}

function* DeleteDistribution(rqst) {
  try {
    console.log('[UpdateDistributions]',rqst.payload);
    let { error } = yield supabaseClient.from('distributions').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      console.log(`[delete Distribution] : ${error.toString()}`)
      yield put(setDeleteDistributionFailure(`[delete Distribution] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeleteDistributionSucceed({success : true}));
    
  } catch (error) {
    console.log(`[delete Distribution] : ${error.toString()}`)
    yield put(setDeleteDistributionFailure(`[delete Distribution] : ${error.toString()}`));
  } 

}





function* distributionsagaWatcher<T>(): Iterable<T> {

  yield takeEvery(DISTRIBUTION_ACTIONS.ATTEMPT_TO_FETCH_DISTRIBUTION,listDistribution);
  yield takeLatest(DISTRIBUTION_ACTIONS.ATTEMPT_TO_CREATE_DISTRIBUTION,CreateDistribution);
  yield takeLatest(DISTRIBUTION_ACTIONS.ATTEMPT_TO_UPDATE_DISTRIBUTION,UpdateDistribution);
  yield takeLatest(DISTRIBUTION_ACTIONS.ATTEMPT_TO_DELETE_DISTRIBUTION,DeleteDistribution);
  
}

export default distributionsagaWatcher;

