// https://material.io/tools/icons
const menu = [
    {
      key: '1',
      name: 'Home',
      icon: 'dashboard',
      link: '/',
    },
    {
      key: '2',
      name: 'Crypto Manage',
      icon: 'add_to_queue',
      menu: [
        {
          key: '2.1',
          name: 'addcrypto',
          icon: 'grid_on',
          link: '/admin/crypto-manage/add',
        },
        {
          key: '2.2',
          name: 'cryptolist',
          icon: 'add_shopping_cart',
          link: '/admin/admincrypto',
        },
      ],
    },
    
  ];
  export default menu;
  