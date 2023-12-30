import { createSelector } from 'reselect';
import { initialState } from './reducer';



const selectGlobal = state => state.global || initialState;

export const makeSelectIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    state => !!state.token,
  );

export const makeSelectToken = () =>
  createSelector(
    selectGlobal,
    state => state.token,
  );



  export const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    state => state.user,
  );
