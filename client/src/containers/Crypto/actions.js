import * as types from './constants';

export const loadOneRequest = payload => ({
    type: types.LOAD_ONE_REQUEST,
    payload,
  });
  export const loadOneSuccess = payload => ({
    type: types.LOAD_ONE_SUCCESS,
    payload,
  });
  export const loadOneFailure = payload => ({
    type: types.LOAD_ONE_FAILURE,
    payload,
  });

  export const setOneValue = payload => ({
    type: types.SET_ONE_VALUE,
    payload,
  });


  export const loadAllRequest = payload => ({
    type: types.LOAD_ALL_REQUEST,
    payload,
  });
  export const loadAllSuccess = payload => ({
    type: types.LOAD_ALL_SUCCESS,
    payload,
  });
  export const loadAllFailure = payload => ({
    type: types.LOAD_ALL_FAILURE,
    payload,
  });
  
  export const addEditRequest = payload => ({
    type: types.ADD_EDIT_REQUEST,
    payload,
  });
  export const addEditSuccess = payload => ({
    type: types.ADD_EDIT_SUCCESS,
    payload,
  });
  export const addEditFailure = payload => ({
    type: types.ADD_EDIT_FAILURE,
    payload,
  });

  export const clearErrors = () => ({
    type: types.CLEAR_ERRORS,
  });
  export const clearOne = payload => ({
    type: types.CLEAR_ONE,
    payload,
  });

  export const deleteOneRequest = payload => ({
    type: types.DELETE_ONE_REQUEST,
    payload,
  });
  export const deleteOneSuccess = payload => ({
    type: types.DELETE_ONE_SUCCESS,
    payload,
  });
  export const deleteOneFailure = payload => ({
    type: types.DELETE_ONE_FAILURE,
    payload,
  });

  export const buyOneRequest = payload => ({
    type: types.BUY_ONE_REQUEST,
    payload,
  });
  export const buyOneSuccess = payload => ({
    type: types.BUY_ONE_SUCCESS,
    payload,
  });
  export const buyOneFailure = payload => ({
    type: types.BUY_ONE_FAILURE,
    payload,
  });

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

  export const exchangeOneRequest = payload => ({
    type: types.EXCHANGE_ONE_REQUEST,
    payload,
  });
  export const exchangeOneSuccess = payload => ({
    type: types.EXCHANGE_ONE_SUCCESS,
    payload,
  });
  export const exchangeOneFailure = payload => ({
    type: types.EXCHANGE_ONE_FAILURE,
    payload,
  });
  export const setQueryValue = payload => ({
    type: types.SET_QUERY_VALUE,
    payload,
  });
  export const clearQuery = payload => ({
    type: types.CLEAR_QUERY,
    payload,
  });