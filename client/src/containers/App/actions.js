import * as types from './constants';

export const setUser = user => ({
  type: types.SET_USER,
  payload: user,
});

export const setToken = token => ({
  type: types.SET_TOKEN,
  payload: token,
});

  export const enqueueSnackbar = notification => {
    console.log(notification,'nonew')
    return ({
    type: types.ENQUEUE_SNACKBAR,
    payload: {
      key: new Date().getTime() + Math.random(),
      ...notification,
    },
  })};

  export const removeSnackbar = payload => ({
    type: types.REMOVE_SNACKBAR,
    payload,
  });

  export const logoutRequest = payload => ({
    type: types.LOGOUT_REQUEST,
    payload,
  });

  export const logoutSuccess = payload => ({
    type: types.LOGOUT_SUCCESS,
    payload,
  });
  
  export const logoutFailure = payload => ({
    type: types.LOGOUT_FAILURE,
    payload,
  });


  