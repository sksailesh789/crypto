import SignupUserPage from '../containers/SignupUserPage'
import LoginUserPage from '../containers/LoginUserPage'
import HomeCrypto from "../containers/Crypto/HomeCrypto";
// import NotFoundPage from '../containers/NotFoundPage';
import HomePage from '../containers/HomePage';


const publicRoutes = [
{
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/crypto',
    element: <HomeCrypto />
  },
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
