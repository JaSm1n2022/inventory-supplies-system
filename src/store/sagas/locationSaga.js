// @flow
import { takeLatest, put, takeEvery } from "redux-saga/effects";
import TOAST from "../../modules/toastManager";
import {
  LOCATION_ACTIONS,
  setCreateLocationFailure,
  setCreateLocationSucceed,
  setDeleteLocationFailure,
  setDeleteLocationSucceed,
  setFetchLocationFailure,
  setFetchLocationSucceed,
  setUpdateLocationFailure,
  setUpdateLocationSucceed,
} from "../actions/locationAction";
import { supabaseClient } from "../../config/SupabaseClient";

function* listLocation(filter) {
  try {
    console.log("[Filter Location]", filter.payload);
    let { data, error, status } = yield supabaseClient
      .from("locationss")
      .select();

    if (error && status !== 406) {
      console.log(error.toString());
      throw error;
    }

    if (data) {
      yield put(setFetchLocationSucceed(data));
    }
  } catch (error) {
    yield put(setFetchLocationFailure(error));
    TOAST.error(`Location Failed:${error.toString()}`);
  }
}

function* createLocation(rqst) {
  try {
    let { error } = yield supabaseClient
      .from("locationss")
      .insert([rqst.payload], {
        returning: "minimal", // Don't return the value after inserting
      });

    if (error) {
      yield put(
        setCreateLocationFailure(`[create Location] : ${error.toString()}`)
      );
      throw error;
    }
    yield put(setCreateLocationSucceed({ success: true }));
  } catch (error) {
    yield put(
      setCreateLocationFailure(`[create Location] : ${error.toString()}`)
    );
  }
}

function* updateLocation(rqst) {
  try {
    let { error } = yield supabaseClient
      .from("locations")
      .upsert(rqst.payload, {
        returning: "minimal", // Don't return the value after inserting
      });

    if (error) {
      yield put(
        setUpdateLocationFailure(`[update Location] : ${error.toString()}`)
      );
      throw error;
    }
    yield put(setUpdateLocationSucceed({ success: true }));
  } catch (error) {
    yield put(
      setUpdateLocationFailure(`[update Location] : ${error.toString()}`)
    );
  }
}

function* deleteLocation(rqst) {
  try {
    let { error } = yield supabaseClient
      .from("locations")
      .delete()
      .match({ id: rqst.payload });

    if (error) {
      yield put(
        setDeleteLocationFailure(`[delete Location] : ${error.toString()}`)
      );
      throw error;
    }
    yield put(setDeleteLocationSucceed({ success: true }));
  } catch (error) {
    yield put(
      setDeleteLocationFailure(`[delete Location] : ${error.toString()}`)
    );
  }
}

function* locationSagaWatcher<T>(): Iterable<T> {
  yield takeEvery(LOCATION_ACTIONS.ATTEMPT_TO_FETCH_LOCATION, listLocation);
  yield takeLatest(LOCATION_ACTIONS.ATTEMPT_TO_CREATE_LOCATION, createLocation);
  yield takeLatest(LOCATION_ACTIONS.ATTEMPT_TO_UPDATE_LOCATION, updateLocation);
  yield takeLatest(LOCATION_ACTIONS.ATTEMPT_TO_DELETE_LOCATION, deleteLocation);
}

export default locationSagaWatcher;
