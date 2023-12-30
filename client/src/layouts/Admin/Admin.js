import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import {  useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Menu from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MainListItems from './components/MainListItem';
import { logoutRequest } from '../../containers/App/actions';

import routes from '../../routes/admin';

// import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import ColoredScrollbars from '../../components/ColoredScrollbars';

const switchRoutes = () => {
  
  return (
    <Routes>
      {routes
        .map(prop => {
        //   console.log(prop,'props///')
          return(
          <Route exact key={prop.path} {...prop} />
        )})}
      {/* <Route element={<NotFoundPage/>} /> */}
     
     </Routes>
  );
};

const drawerWidth = 240;


const AdminLayout = () => {
  // const [open, setOpen] = useState(true);
  const [anchorel, setAnchorel] = useState(null);
  const anchorOpen = Boolean(anchorel);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const users = useSelector(state => state.global.user)

  const handleMenu = event => {
    console.log(event.currentTarget,'ect')
    setAnchorel(event.currentTarget);
  };
  const handleClose = () => {
    console.log(8999999,'ect')

    setAnchorel(null);
  };

  const handleLogout = () => {
    dispatch({
      type: logoutRequest
    })
    // logout();
    setAnchorel(null);
    return navigate('/login');
  };
  const handleDashboard = () => {
    setAnchorel(null);
    return navigate('/admin/dashboard/commerce');
  };

  const handleProfile = () => {
    setAnchorel(null);
    return navigate('/user/profile/information');
  };

  
  

  return (
    <React.Fragment>
      <div
        className="flex justify-between px-4 text-white h-12 fixed z-50 w-full left-0 top-0 items-center"
        style={{ background: '#303641' }}
      >
        <div>
          <button className="flex" onClick={handleMenu} type="button">
            <div className="m-auto mr-1">{users.name}</div>
            <AccountCircle />
            <i className="material-icons text-gray-200 opacity-50">
              arrow_drop_down
            </i>
          </button>
          <Menu
            id="menu-appbar"
            anchorel={anchorel}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={anchorOpen}
            onClose={handleClose}
          >
            <Link
              to="/admin/dashboard/commerce"
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={handleClose}
            >
              <p>Admin Dashboard</p>
            </Link>
            
            
            <p onClick={handleLogout}>Log Out</p>
          </Menu>
        </div>
       
      </div>
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
        <main className="h-screen flex-1 overflow-auto px-4 pt-12 flex flex-col justify-between">
          <div className="flex-1">{switchRoutes()}</div>
        </main>
      </div>
    </React.Fragment>

  );
};



export default AdminLayout;
