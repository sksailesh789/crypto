import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signupUserPage state domain
 */

export const selectSignupUserPageDomain = state =>
  state.signupUserPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectLoading = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.loading,
  );

export const makeSelectOne = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.one,
  );


export const makeSelectErrors = () =>
  createSelector(
    selectSignupUserPageDomain,
    state => state.errors,
  );

/**
 * Default selector used by SignupUserPage
 */

const makeSelectSignupUserPage = () =>
  createSelector(
    selectSignupUserPageDomain,
    substate => substate,
  );

export default makeSelectSignupUserPage;
