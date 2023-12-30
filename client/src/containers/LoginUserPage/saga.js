import {
    takeLatest,
    select,
    put,
    fork,
    take,
    cancel,
    call,
  } from 'redux-saga/effects';
  import Api from '../../utils/Api';
//   import { LOCATION_CHANGE, push } from 'connected-react-router';
  import * as types from './constants';
  import * as actions from './actions';
  import { makeSelectEmail, makeSelectPassword } from './selectors';
  import { makeSelectToken } from '../App/selectors';


  import {
    setUser,
    setToken,
  } from '../App/actions';
  import {  enqueueSnackbar } from 'notistack'

//   import { makeSelectReferralCode } from '../App/selectors';
  
  // Individual exports for testing
  export const validate = data => {
    const errors = {};
    if (!data.email) errors.email = 'email is required';
    if (!data.password) errors.password = 'password is required';
    return { errors, isValid: !Object.keys(errors).length };
  };
  
  export function* redirectOnSuccess(redirects) {
    console.log('logiiinnnsucessssss')
    const { payload } = yield take([
      types.LOGIN_SUCCESS,
    ]);
    console.log(payload,'paylllll')
    const { token, data } = payload;
    yield put(setUser(data));
    yield put(setToken(token));
    // yield put(setReferralCode(''));
    // TODO
   
    // if (redirects) {
    //   yield put(push(redirects));
    // } else {
    //   // redirect the user if he/she is only in '.../account'
    //   const val = window.location.href.split('/');

    //   if (val[val.length - 1] == 'account') {
    //     // yield put(push('/'));
    //   console.log('####')
      
    //   }
    // }
  }
  
  export function* loginAction(action) {
    const email = yield select(makeSelectEmail());
    const password = yield select(makeSelectPassword());
    let data = { email, password };
    const errors = validate(data);
    if (errors.isValid) {
      
      const successWatcher = yield fork(redirectOnSuccess, action.redirect);
      yield fork(
        Api.post('user/login', actions.loginSuccess, actions.loginFailure, data),
      );
      // yield take([ types.LOGIN_FAILURE]);
      // yield cancel(successWatcher);
    } else {
      yield put(actions.setStoreValue({ key: 'errors', value: errors.errors }));
      yield put(actions.setStoreValue({ key: 'loading', value: false }));
    }
  }

  export function* getCryptoAction(action) {
    const token = yield select(makeSelectToken());
    yield call(
      Api.get(
        `user`,
        actions.getCryptoSuccess,
        actions.getCryptoFailure,
        token,
      ),
    );
  }
  
  function* loginFailureFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Error while login!!',
      options: {
        variant: 'warning',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'warning'})
    // yield put(actions.setStoreValue({ key: 'loading', value: false }));

  }
  
  function* loginSuccessFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'login success!!',
      options: {
        variant: 'success',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'success'})
    // yield put(actions.setStoreValue({ key: 'loading', value: false }));

    // yield put(setConstantValue({ key: 'componentConst', value: 2 }));
  }
  
  export default function* loginAdminPageSaga() {
    yield takeLatest(types.LOGIN_REQUEST, loginAction);
    yield takeLatest(types.LOGIN_FAILURE, loginFailureFunc);
    yield takeLatest(types.LOGIN_SUCCESS, loginSuccessFunc);
    yield takeLatest(types.GET_CRYPTO_REQUEST, getCryptoAction);

  }
  