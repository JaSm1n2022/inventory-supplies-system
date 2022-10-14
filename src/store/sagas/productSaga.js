// @flow
import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import TOAST from '../../modules/toastManager';
import { PRODUCT_ACTIONS, setCreateProductFailure, setCreateProductSucceed, setDeleteProductFailure, setDeleteProductSucceed, setFetchProductFailure, setFetchProductSucceed, setUpdateProductFailure, setUpdateProductSucceed} from '../actions/productAction';
import { supabaseClient } from "../../config/SupabaseClient";


function* listProduct(filter) {
    try {
      console.log('[Filter]',filter.payload);
      let { data, error, status } = yield supabaseClient
        .from('products')
        
      if (error && status !== 406) {
        console.log(error.toString());
        throw error;
      }

      if (data) {
        console.log('[got me]',data);
        yield put(setFetchProductSucceed(data));
      }
    } catch (error) {
      yield put(setFetchProductFailure(error));
      TOAST.error(`Product Failed:${error.toString()}`);
    }     
 
}

function* createProduct(rqst) {
  try {
    console.log('[createProducts]',rqst.payload);
    let { error } = yield supabaseClient.from('products').insert([rqst.payload], {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[create Product] : ${error.toString()}`)
      yield put(setCreateProductFailure(`[create Product] : ${error.toString()}`));
      throw error;
    } 
    yield put(setCreateProductSucceed({success : true}));
    
  } catch (error) {
    console.log(`[create Product] : ${error.toString()}`)
    yield put(setCreateProductFailure(`[create Product] : ${error.toString()}`));
  } 

}

function* updateProduct(rqst) {
  try {
    console.log('[updateProducts]',rqst.payload);
    let { error } = yield supabaseClient.from('products').upsert(rqst.payload, {
      returning: 'minimal' // Don't return the value after inserting
    });

    if (error) {
      console.log(`[update Product] : ${error.toString()}`)
      yield put(setUpdateProductFailure(`[update Product] : ${error.toString()}`));
      throw error;
    } 
    yield put(setUpdateProductSucceed({success : true}));
    
  } catch (error) {
    console.log(`[update Product] : ${error.toString()}`)
    yield put(setUpdateProductFailure(`[update Product] : ${error.toString()}`));
  } 

}

function* deleteProduct(rqst) {
  try {
    console.log('[updateProducts]',rqst.payload);
    let { error } = yield supabaseClient.from('products').delete()
    .match({ id: rqst.payload });
  

    if (error) {
      console.log(`[delete Product] : ${error.toString()}`)
      yield put(setDeleteProductFailure(`[delete Product] : ${error.toString()}`));
      throw error;
    } 
    yield put(setDeleteProductSucceed({success : true}));
    
  } catch (error) {
    console.log(`[delete Product] : ${error.toString()}`)
    yield put(setDeleteProductFailure(`[delete Product] : ${error.toString()}`));
  } 

}





function* ProductSagaWatcher<T>(): Iterable<T> {

  yield takeEvery(PRODUCT_ACTIONS.ATTEMPT_TO_FETCH_PRODUCT,listProduct);
  yield takeLatest(PRODUCT_ACTIONS.ATTEMPT_TO_CREATE_PRODUCT,createProduct);
  yield takeLatest(PRODUCT_ACTIONS.ATTEMPT_TO_UPDATE_PRODUCT,updateProduct);
  yield takeLatest(PRODUCT_ACTIONS.ATTEMPT_TO_DELETE_PRODUCT,deleteProduct);
  
}

export default ProductSagaWatcher;

