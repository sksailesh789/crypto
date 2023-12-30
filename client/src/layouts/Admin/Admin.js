import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import MainListItems from './components/MainListItem';

import routes from '../../routes/admin';

import NotFoundPage from '../../containers/NotFoundPage';
import ColoredScrollbars from '../../components/ColoredScrollbars';

const switchRoutes = () => {
  
  return (
    <Routes>
      {routes
        .map(prop => {
          return(
          <Route exact key={prop.path} {...prop} />
        )})}
      <Route element={<NotFoundPage/>} />
     
     </Routes>
  );
};



const AdminLayout = () => {


  return (
    <React.Fragment>
      
      <div className="flex overflow-y-hidden bg-gray-200">
        <ColoredScrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{
            width: 220,
            height: '100vh',
          }}
          className="bg-gray-900"
        >
          <MainListItems />
        </ColoredScrollbars>
        <main className="h-screen flex-1 overflow-auto px-4 pt-4 flex flex-col justify-between">
          <div className="flex-1">{switchRoutes()}</div>
        </main>
      </div>
    </React.Fragment>

  );
};



export default AdminLayout;
