import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeSelectPassword, makeSelectPasswordError } from '../selectors';
import * as mapDispatchToProps from '../actions';

const PasswordInput = props => {
  const { password, setStoreValue, errors, classes } = props;
  const [isSecure, setIsSecure] = useState();

  const handleTogglePassword = () => {
    setIsSecure(state => !state);
  };

  const handleChange = e =>
    setStoreValue({ key: 'password', value: e.target.value });
  const hasError = Boolean(errors);
  return (
    <div className="w-full pb-4">
      <label
        className="block uppercase tracking-wide text-grey-darker text-xs mb-2 text-black"
        htmlFor="Password"
      >
        Password<span className="ml-1 text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          // error={hasError.toString()}
          onChange={handleChange}
          value={password}
          id="Password"
          type={isSecure ? 'text' : 'password'}
          className="inputbox"
        />
        <span
          // className={classes.EyeIcon}
          aria-label="Toggle password visibility"
          onClick={handleTogglePassword}
        >
          {isSecure ? <Visibility /> : <VisibilityOff />}
        </span>
      </div>

      {errors && <div id="component-error-text">{errors}</div>}
    </div>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setStoreValue: PropTypes.func.isRequired,
  errors: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  errors: makeSelectPasswordError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const styles = theme => ({
//   EyeIcon: { cursor:'pointer', position: 'absolute', right: 12, top: 6 },
// });

// const withStyle = withStyles(styles);

export default compose(
  withConnect,
//   withStyle,
)(PasswordInput);
