import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crypto state domain
 */

export const selectDomain = state => state.crypto || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    substate => substate.one,
  );



export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );

export const makeSelectName = () =>
  createSelector(
    selectDomain,
    substate => substate.one.name,
  );

  export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    substate => substate.errors,
  );

  export const makeSelectCryptoList = ()=> 
  createSelector(
    selectDomain,
    state => state.cryptoList,
  );

  export const makeSelectPoint = ()=> 
  createSelector(
    selectDomain,
    state => state.totalPoints,
  );