/*
 *
 * User reducer
 *
 */
import {produce} from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: { data: [] },
    page: 1,
    size: 10,
    totaldata: 0,
    sort: {},
  },
  one: {
      name: '',
      image: [],
  },
  loading: false,
  query: { find_title: '', size: 10 },
  errors: { name: '', image: '' },
  cryptoList: [],
  totalPoints: ''

};
// Object.keys(action.payload.value).filter(e => {draft.one.users[e] !== ''})

/* eslint-disable default-case, no-param-reassign */
const cryptoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
        case types.SET_ONE_VALUE:
            draft.one[action.payload.key] = action.payload.value;
            draft.errors[action.payload.key] = '';
            break;
        case types.ADD_EDIT_FAILURE:
            draft.errors = { ...draft.errors, ...action.payload.errors };
            break;
      case types.ADD_EDIT_SUCCESS:
        draft.one = initialState.one;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = { ...initialState.one, ...action.payload.data };
        draft.errors = { ...draft.errors, ...action.payload.errors };
        draft.loading = false;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.GET_CRYPTO_REQUEST:
        draft.loading = true;
        break;
      case types.GET_CRYPTO_SUCCESS:
        draft.loading = false;
        draft.cryptoList = action.payload.cryptoList;
        draft.totalPoints = action.payload.total_points;
        break;
      case types.GET_CRYPTO_FAILURE:
        draft.loading = false;
        break;
      case types.DELETE_ONE_SUCCESS:
          draft.all = {
            ...draft.all,
            data: {
              data: draft.all.data.data.filter(
                each => each._id != action.payload.data._id,
              ),
            },
          };
          break;
          case types.SET_QUERY_VALUE:
            draft.query[action.payload.key] = action.payload.value;
            break;
    }
  });

export default cryptoReducer;
