import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectToken,
} from '../../../containers/App/selectors';

const AdminRoute = ({ token, children }) => {
  if (token ) return  children ;
  
  return (
    <Navigate to="/login" />
  );
};


const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
});

export default connect(mapStateToProps)(AdminRoute);
// export default AdminRoute;
