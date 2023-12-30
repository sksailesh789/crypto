/**
 *
 * LoginUserPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import UsernameInput from './components/UsernameInput';
import PasswordInput from './components/PasswordInput';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';
import {
  makeSelectLoading,
  makeSelectEmailError,
  makeSelectPasswordError,
} from './selectors';
import {
  makeSelectIsAuthenticated
} from '../App/selectors';

const LoginUserPage = ({
  classes,
  isAuth,
  loginRequest,
  loading,
  emailErr,
  passwordErr,
  clearError,
  clearData,
  ...props
}) => {

  const navigate = useNavigate();

  useEffect(() => {
    clearError();
    clearData();
  }, []);

  useEffect(() => {
    if (isAuth) {
      navigate('/')
      }
  }, [isAuth])

  const handleSubmit = e => {
    e.preventDefault();
    loginRequest();
  };
  return (
    <>
      <h1 className="hidden lg:block font-medium text-2xl">LOGIN</h1>
      <form className="flex flex-wrap pt-0 lg:pt-4" onSubmit={handleSubmit}>
        <UsernameInput />
        <PasswordInput />

        <button
          className="text-white py-2 px-4 rounded mt-4 w-full btn-waft"
          type="submit"
        >
          {loading ? (
            <>
              <div className="flex text-center justify-center">
                <div className="loading_wrapper">
                  <span className="font-bold mr-2 my-auto text-white">
                    Login
                  </span>
                  <div className="dot-elastic" />{' '}
                </div>
              </div>
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
     
    </>
  );
};

// LoginUserPage.propTypes = {
//   classes: PropTypes.object.isRequired,
//   loginRequest: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  emailErr: makeSelectEmailError(),
  passwordErr: makeSelectPasswordError(),
  isAuth : makeSelectIsAuthenticated()

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginUserPage', reducer });
const withSaga = injectSaga({ key: 'loginUserPage', saga });


export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginUserPage);
