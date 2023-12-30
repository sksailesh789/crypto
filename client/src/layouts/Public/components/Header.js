import React,{useState,Fragment} from 'react'
import {  NavLink,Link } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { Person } from '@mui/icons-material';
import {
  makeSelectIsAuthenticated
} from '../../../containers/App/selectors';
import { logoutRequest } from '../../../containers/App/actions';

const Header = () => {

  const [userAccOpen , setUserAccOpen] = useState(false)
  const [isAuthenticated , setIsAuthenticated] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const isAuth = useSelector(makeSelectIsAuthenticated());

  const switchUserAcc = () => {
    setUserAccOpen(!userAccOpen)
  }

  const handleLogout = () => {
    dispatch(logoutRequest())
    return navigate('/login');
  };
  return (
    // <div>
    //     <ul>
    //         <li >XYZ</li>
    //         <li><Link to="/">Home </Link></li>
    //         <li><Link to="/crypto">Cryptos </Link></li>
    //         {/* <li><Link to="/crypto">login/register </Link></li>
    //         <li><Link to="/login">login </Link></li>
    //         <li><Link to="/register">register </Link></li> */}

    //     </ul>
    // </div>
    <div className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold">XYZ</h1>
        <ul className="flex space-x-4">
          <li><NavLink to="/" className="text-white " activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/crypto" className="text-white " activeClassName="active">Cryptos</NavLink></li>
          {isAuth ? (
            // <p>user</p>
                  <Fragment>
                    
                    <li 
                    onClick={switchUserAcc}
                    className = "userHeader" >
                      <Person />
                        
                      {userAccOpen ? 
                          <div className= "user-account">
                            <dl>
                              {isAuth ? 
                                 <dt ><Link to= "/admin/dashboard"> Dashboard</Link></dt> : ""
                              }
                              <dt>
                                <p onClick={handleLogout}>Log Out</p>
                              </dt>
                            </dl>
                        </div> : ''
                    }
                      
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <NavLink to="/register">Register</NavLink>
                    </li>
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                  </Fragment>
                )}
          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </div>
  )
}

export default Header