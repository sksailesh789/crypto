import React,{useRef,useState,useEffect,Fragment} from 'react'
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

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const divRef = useRef(null);

  const isAuth = useSelector(makeSelectIsAuthenticated());

  const switchUserAcc = () => {
    setUserAccOpen(!userAccOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        
        setUserAccOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [divRef]);

  const handleLogout = () => {
    dispatch(logoutRequest())
    return navigate('/login');
  };
  return (
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
                     ref={divRef} 
                    onClick={switchUserAcc}
                    className = "userHeader" >
                      <Person />
                        
                      {/* {userAccOpen ? 
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
                    } */}
                    {userAccOpen ? (
                      <div className="user-account bg-white border rounded shadow mt-2">
                        <dl className="divide-y divide-gray-200">
                          {isAuth ? (
                            <dt className="p-2">
                              <Link
                                to="/admin/dashboard"
                                className="text-blue-500 hover:underline"
                              >
                                Dashboard
                              </Link>
                            </dt>
                          ) : (
                            ''
                          )}
                          <dt className="p-2">
                            <p
                              onClick={handleLogout}
                              className="text-red-500 cursor-pointer hover:underline"
                            >
                              Log Out
                            </p>
                          </dt>
                        </dl>
                      </div>
                        ) : (
                          ''
                        )}

                      
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
        </ul>
      </div>
    </div>
  )
}

export default Header