
import {produce} from 'immer';

import * as types from './constants';

// The initial state of the App
export const initialState = {
  token: '',
  notifications: [],
  user: { },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action = { type: '' }) =>
  produce(state, draft => {
    switch (action.type) { 
      case types.SET_USER:
        draft.user = {
          ...action.payload
        };
        break;
      case types.SET_TOKEN:
        localStorage.setItem('token', action.payload);
        draft.token = action.payload;
        break;
      case types.LOGOUT:
      case types.LOGOUT_REQUEST:
        localStorage.setItem('token', '');
        draft.token = '';
        draft.user = { };
        break;
     
    }
  });

export default appReducer;
