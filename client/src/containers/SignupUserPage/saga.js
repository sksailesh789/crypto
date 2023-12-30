import {
    takeLatest,
    select,
    put,
    fork,
    take,
    cancel,
  } from 'redux-saga/effects';
  import Api from '../../utils/Api';
//   import { LOCATION_CHANGE, push } from 'connected-react-router';
import {Link} from 'react-router-dom'
  import * as types from './constants';
  import * as actions from './actions';
  import {
    makeSelectOne,
  } from './selectors';
  import {
    setUser,
    setToken,
  } from '../App/actions';
  import {  enqueueSnackbar } from 'notistack'

  
  // Individual exports for testing
  export const validate = data => {
    const errors = {};
    if (!data.name) errors.name = 'name is required';
    if (!data.email) errors.email = 'email is required';
    if (!data.password) errors.password = 'password is required';
    return { errors, isValid: !Object.keys(errors).length };
  };
  
  export function* redirectOnSuccess(redirect) {

    const { payload } = yield take([
      types.SIGNUP_SUCCESS,
    ]);
    const { token, data } = payload;
    yield put(setUser(data));
    yield put(setToken(token));
    
  }
  
  export function* signupAction(action) {
    let data = yield select(makeSelectOne());
    const errors = validate(data);
    if (errors.isValid) {
      const successWatcher = yield fork(redirectOnSuccess, action.redirect);
      yield fork(
        Api.post(
          'user/register',
          actions.signupSuccess,
          actions.signupFailure,
          data,
        ),
      );
    //   yield take([LOCATION_CHANGE, types.SIGNUP_FAILURE]);
    //   yield cancel(successWatcher);
    } else {
      yield put(actions.setValue({ key: 'errors', value: errors.errors }));
      yield put(actions.setValue({ key: 'loading', value: false }));
    }
  }
  
 
  function* signupFailureFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'Error while signing up!!',
      options: {
        variant: 'warning',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'warning'})
  }
  
  function* signupSuccessFunc(action) {
    const snackbarData = {
      message: action.payload.msg || 'signed up successfully!!',
      options: {
        variant: 'success',
      },
    };
    enqueueSnackbar(snackbarData.message,{variant:'success'})

  }
  
  export default function* signupUserPageSaga() {
    yield takeLatest(types.SIGNUP_REQUEST, signupAction);
    yield takeLatest(types.SIGNUP_FAILURE, signupFailureFunc);
    yield takeLatest(types.SIGNUP_SUCCESS, signupSuccessFunc);
  }
  