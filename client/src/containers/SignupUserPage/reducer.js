/*
 *
 * SignupUserPage reducer
 *
 */
import {produce} from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    name: '',
    email: '',
    password: ''
  },
  errors: {
    name: '',
    password: '',
    email: '',
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const signupUserPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CLEAR_ERROR:
        draft.errors = initialState.errors;
        break;
      case types.SET_VALUE:
        draft[action.payload.key] = action.payload.value;
        break;
      case types.SET_STORE_VALUE:
        draft.errors = initialState.errors;
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.SIGNUP_REQUEST:
        draft.loading = true;
        break;
      case types.SIGNUP_SUCCESS:
        draft.loading = false;
        break;
      case types.SIGNUP_FAILURE:
        draft.loading = false;
        draft.one.password = '';
        draft.errors = { ...action.payload.errors };
        break;
      case types.CLEAR_STORE:
        draft.one = initialState.one;
        break;
    }
  });

export default signupUserPageReducer;
