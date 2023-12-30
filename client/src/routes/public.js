
import AddCrypto from "../containers/Crypto/AddCryptoPage/Loadable"
import Crypto from "../containers/Crypto/index"
import SignupUserPage from '../containers/SignupUserPage'
import LoginUserPage from '../containers/LoginUserPage'
import HomeCrypto from "../containers/Crypto/HomeCrypto";


// import NotFoundPage from '../containers/NotFoundPage';
import HomePage from '../containers/HomePage';


const publicRoutes = [
{
    // exact: true,
    path: '/',
    element: <HomePage/>,
  },
  // {
  //   path: '/admincrypto',
  //   element: <Crypto />
  // },
  {
    path: '/crypto',
    element: <HomeCrypto />
  },
  // {
  //   path: '/crypto-manage/add',
  //   element: <AddCrypto />
  // },
  {
    path: '/register',
    element: <SignupUserPage />
  },
  {
    path: '/login',
    element: <LoginUserPage />
  },
]

export default publicRoutes;
