/*
 *
 * LoginUserPage actions
 *
 */

import * as types from './constants';

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});

export const clearData = payload => ({
  type: types.CLEAR_DATA,
  payload,
});

export const clearError = payload => ({
  type: types.CLEAR_ERROR,
  payload,
});

export const clearStore = payload => ({ type: types.CLEAR_STORE, payload });

export const loginRequest = payload => ({ type: types.LOGIN_REQUEST, payload });
export const loginSuccess = payload => ({ type: types.LOGIN_SUCCESS, payload });
export const loginFailure = payload => ({ type: types.LOGIN_FAILURE, payload });

export const getCryptoRequest = payload => ({
  type: types.GET_CRYPTO_REQUEST,
   payload
})
export const getCryptoSuccess = payload => ({
  type: types.GET_CRYPTO_SUCCESS,
   payload
})
export const getCryptoFailure = payload => ({
  type: types.GET_CRYPTO_FAILURE,
   payload
})