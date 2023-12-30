import AddCrypto from "../containers/Crypto/AddCryptoPage/Loadable"
import AdminCryptoListList from "../containers/Crypto/index"

const adminRoutes = [
{
    path: '/crypto-manage/add',
    element: <AddCrypto/>,
    exact: true,

  },
  {
    path: '/adminCrypto',
    element: <AdminCryptoListList />,
    exact: true,

  },
  {
    path: '/crypto-manage/edit/:id',
    element: <AddCrypto/>,
    exact: true,
  },
  
]

export default adminRoutes;
