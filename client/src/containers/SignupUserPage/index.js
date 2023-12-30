/**
 *
 * SignupUserPage
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate} from 'react-router-dom';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import reducer from './reducer';
import saga from './saga';
import * as mapDispatchToProps from './actions';

import {
  makeSelectLoading,
  makeSelectOne,
  makeSelectErrors,
} from './selectors';
import {
  makeSelectIsAuthenticated
} from '../App/selectors';

const SignupUserPage = ({
  signupRequest,
  setStoreValue,
  loading,
  isAuth,
  one,
  errors,
  clearError,
  clearStore,
}) => {
  const [isSecure1, setIsSecure1] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearError();
    clearStore();
  }, []);

  
  useEffect(() => {
    if (isAuth) {
      navigate('/')
      }
  }, [isAuth])
  
  const handleTogglePassword = () => {
    setIsSecure1(state => !state);
  };

  const handleSubmit = () => {
    signupRequest();
  };

  const handleChange = key => e => {
    setStoreValue({ key, value: e.target.value });
  };


  return (
    <>
      <h1 className="hidden lg:block font-medium text-2xl">REGISTER</h1>
      <div className="flex flex-wrap pt-0 lg:pt-4">
        <div className="w-full pb-4">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
            htmlFor="grid-name"
          >
            Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            className="inputbox"
            id="grid-name"
            type="name"
            value={one.name || ''}
            onChange={handleChange('name')}
          />
          {errors.name && <div id="component-error-text">{errors.name}</div>}
        </div>
        <div className="w-full  pb-4">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
            htmlFor="grid-email-address"
          >
            Email Address<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            className="inputbox"
            id="grid-email-address"
            type="email"
            value={one.email || ''}
            onChange={handleChange('email')}
          />
          {errors.email && <div id="component-error-text">{errors.email}</div>}
        </div>
        <div className="w-full  pb-4">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
            htmlFor="grid-password"
          >
            Password<span className="ml-1 text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              className="inputbox"
              id="grid-password"
              type={isSecure1 ? 'text' : 'password'}
              value={one.password || ''}
              onChange={handleChange('password')}
            />
            <span
            //   className={classes.EyeIcon}
              aria-label="Toggle password visibility"
              onClick={() => handleTogglePassword()}
            >
              {isSecure1 ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>
          {errors.password && (
            <div id="component-error-text">{errors.password}</div>
          )}
        </div>
        
      </div>
      
      <button
        type="button"
        className="text-white py-2 px-4 rounded mt-2 w-full btn-waft  "
        onClick={handleSubmit}
      >
        {loading ? (
          <>
            <div className="flex text-center justify-center">
              <div className="loading_wrapper">
                <span className="font-bold mr-2 my-auto text-white">
                  Register
                </span>
                <div className="dot-elastic" />{' '}
              </div>
            </div>
          </>
        ) : (
            'Register'
          )}
      </button>
    </>
  );
};



const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  one: makeSelectOne(),
  errors: makeSelectErrors(),
  isAuth : makeSelectIsAuthenticated()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupUserPage', reducer });
const withSaga = injectSaga({ key: 'signupUserPage', saga });



export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupUserPage);
