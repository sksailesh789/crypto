import {
    call,
    takeEvery,
    takeLatest,
    select,
    put,
    takeLeading,
    delay,
  } from 'redux-saga/effects';
  import Api from '../../utils/Api';
  import * as types from './constants';
  import * as actions from './actions';
  import { makeSelectToken } from './selectors';
  
  
  // function* logOut(action) {
  //   const token = yield select(makeSelectToken());
  //   // yield call(
  //   //   Api.get(`user/logout`, actions.logoutSuccess, actions.logoutFailure, token),
  //   // ); 
  // }
  
 
  
  
  // function* logoutSuccessFunc(action) {
  //   // yield put(clearCartData());
  // }
  
  export default function* defaultSaga() {
    // yield takeLatest(types.LOGOUT_REQUEST, logOut);
    // yield takeLatest(types.LOGOUT_SUCCESS, logoutSuccessFunc);
  }
  