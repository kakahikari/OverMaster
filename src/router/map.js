export const routes = [
  {
    path: '/',
    component: require('pages'),
    redirect: {name: 'index'},
    children: [
      { path: 'index', component: require('pages/welcome'), name: 'index', meta: { requiresAuth: true } },
      { path: 'statisticsList', name: 'statisticsList', component: require('pages/templates/statisticsList'), meta: { requiresAuth: true } },
      { path: 'OperationList', name: 'OperationList', component: require('pages/templates/OperationList'), meta: { requiresAuth: true } },
      { path: 'QuotaManage', name: 'QuotaManage', component: require('pages/templates/QuotaManage'), meta: { requiresAuth: true } },
      { path: 'UserManage', name: 'UserManage', component: require('pages/templates/UserManage'), meta: { requiresAuth: true } },
      { path: 'AuthManage', name: 'AuthManage', component: require('pages/templates/AuthManage'), meta: { requiresAuth: true } }
    ]
  },
  { path: '/login', component: require('pages/login'), name: 'login' },

  { path: '*', redirect: { name: 'login' } }
]
