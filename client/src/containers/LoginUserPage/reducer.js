/*
 *
 * LoginUserPage reducer
 *
 */
import {produce} from 'immer';
import * as types from './constants';

export const initialState = {
  email: '',
  password: '',
  errors: {},
  loading: false,
  cryptoList: []
};

/* eslint-disable default-case, no-param-reassign */
const loginUserPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_STORE_VALUE:
        draft[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_DATA:
        draft.password = initialState.password;
        break;
      case types.CLEAR_ERROR:
        draft.errors = initialState.errors;
        break;
      case types.LOGIN_REQUEST:
        draft.loading = true;
        break;
      case types.LOGIN_SUCCESS:
        draft.loading = false;
        break;
      case types.LOGIN_FAILURE:
        draft.loading = false;
        draft.errors = { ...action.payload.errors };
        break;
      case types.GET_CRYPTO_REQUEST:
          draft.loading = true;
          break;
      case types.GET_CRYPTO_SUCCESS:
          draft.loading = false;
          draft.cryptoList = action.payload.cryptoList;
          break;
      case types.GET_CRYPTO_FAILURE:
          draft.loading = false;
          break;
      case types.CLEAR_STORE:
        draft = initialState;
        break;
    }
  });

export default loginUserPageReducer;
