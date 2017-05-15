export const routes = [
  {
    path: '/',
    component: require('pages'),
    redirect: {name: 'index'},
    children: [
      { path: 'index', component: require('pages/welcome'), name: 'index', meta: { requiresAuth: true } },
      {
        path: 'do/',
        component: require('pages/templates'),
        name: 'do',
        meta: { requiresAuth: true },
        children: [
          { path: 'memberList', name: 'memberList', component: require('pages/templates/memberList'), meta: { requiresAuth: true } },
          { path: 'depositList', name: 'depositList', component: require('pages/templates/depositList'), meta: { requiresAuth: true } },
          { path: 'withdrawList', name: 'withdrawList', component: require('pages/templates/withdrawList'), meta: { requiresAuth: true } },
          { path: 'backBetList', name: 'backBetList', component: require('pages/templates/backBetList'), meta: { requiresAuth: true } },
          { path: 'infoList', name: 'infoList', component: require('pages/templates/infoList'), meta: { requiresAuth: true } },
          { path: 'betReportList', name: 'betReportList', component: require('pages/templates/betReportList'), meta: { requiresAuth: true } },
          { path: 'memberSumReport', name: 'memberSumReport', component: require('pages/templates/memberSumReport'), meta: { requiresAuth: true } },
          { path: 'memberSeparateReport', name: 'memberSeparateReport', component: require('pages/templates/memberSeparateReport'), meta: { requiresAuth: true } },
          { path: 'agentReport', name: 'agentReport', component: require('pages/templates/agentReport'), meta: { requiresAuth: true } },
          { path: 'gameCompanyReport', name: 'gameCompanyReport', component: require('pages/templates/gameCompanyReport'), meta: { requiresAuth: true } },
          { path: 'promotionRecordList', name: 'promotionRecordList', component: require('pages/templates/promotionRecordList'), meta: { requiresAuth: true } },
          { path: 'promotionReportList', name: 'promotionReportList', component: require('pages/templates/promotionReportList'), meta: { requiresAuth: true } },
          { path: 'rateList', name: 'rateList', component: require('pages/templates/rateList'), meta: { requiresAuth: true } }
        ]
      }
    ]
  },
  { path: '/login', component: require('pages/login'), name: 'login' },

  { path: '*', redirect: { name: 'login' } }
]
