import React from 'react';
import {  Routes, Route,Link } from 'react-router-dom';


import routes from '../../routes/public';

// import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import Header from './components/Header';

const switchRoutes = (
  <Routes>
    {routes.map(prop => (
      <Route key={prop.path} {...prop} />
    ))}
    {/* <Route element={<NotFoundPage/>} /> */}
    
   </Routes>
);


const PublicLayout = () => {
  

  return (
    <>
      { <Header />}
      <div className="">{switchRoutes}</div>
    </>
  );
};


export default PublicLayout;

// export default PublicLayout;
