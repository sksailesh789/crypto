/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages
 *
 */

import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import GlobalStyle from '../../global-styles';

import saga from './saga';
import RoutesPublic from '../../layouts/Public';
import AdminRoute from '../../components/Routes/AdminRoutes';
import RoutesAdmin from '../../layouts/Admin';
import ErrorBoundary from '../../components/ErrorBoundary';


const App = () => (
  <ErrorBoundary>
   <Router>
    <Routes >
      <Route path="/admin/*" element={<AdminRoute><RoutesAdmin/></AdminRoute>} /> 
      <Route path="*" element={<RoutesPublic/>} />
    </Routes>
    </Router>
    <GlobalStyle />
  </ErrorBoundary>


);

const withSaga = injectSaga({ key: 'global', saga });


export default compose(
  withSaga,
)(App);
