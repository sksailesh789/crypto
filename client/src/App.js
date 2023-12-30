/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */


// Needed for redux-saga es6 generator support
// import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles'
// import history from './utils/history';
// Import Language Provider
// import LanguageProvider from './containers/LanguageProvider';
// Import root app
import Apps from './containers/App';
import configureStore from './configureStore';
import {  setToken,setUser } from './containers/App/actions';

import './styles.css';

// Import i18n messages
// import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState);
// const MOUNT_NODE = document.getElementById('app');

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  // palette: {
  //   primary: 'blue',
  // },
});


const tokenWithBearer = localStorage.getItem('token');
if (tokenWithBearer) {
  const token = tokenWithBearer.split(' ')[1];
  // console.log(token,'22222')
  try {
    const decoded = jwtDecode(token);
    if (
      !(
        typeof decoded === 'object' &&
        typeof decoded.exp === 'number' &&
        decoded.exp > Date.now() / 1000
      )
    ) {
      localStorage.removeItem('token');
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      // const user = {
      //   id: decoded.id,
      //   name: decoded.name,
      //   // avatar: decoded.avatar,
      //   email: decoded.email,
      //   // roles: decoded.roles,
      //   // email_verified: decoded.email_verified,
      //   // routes,
      // };
      store.dispatch(setToken(tokenWithBearer));
      store.dispatch(setUser(user));
    }
  } catch (error) {
    localStorage.removeItem('token');
  }
}

function App() {
  
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme} >
        {/* <Router> */}
          {/* <ConnectedRouter history={history}> */}
          <SnackbarProvider maxSnack={3} className="mb-8 lg:mb-0">
            <Apps/>
        </SnackbarProvider>
          {/* </ConnectedRouter> */}
          {/* </Router> */}
          </ThemeProvider>
    </Provider>
  );
}

export default App;




