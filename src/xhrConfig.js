export const xhrTimeout = 15000

export const errorCodes = {
  '0': 'success',
  '1': 'format error',
  '2': 'unknown error',
  '1001': 'this account already exists',
  '1002': 'account contains Chinese characters or symbols',
  '1003': 'this email has been registered',
  '1004': 'this phone has been registered',
  '1005': 'please login first',
  '1006': 'please login first',
  '1007': 'suspended',
  '1008': 'password error',
  '1009': 'new password must be different from old password',
  '1010': 'login failed',
  '2001': 'this bank account has been registered',
  '2002': 'member deposit has been restricted',
  '2003': 'nonexistent account',
  '2004': 'deposit failed',
  '2005': 'withdrawal failed',
  '2006': 'withdrawal failed',
  '2007': 'withdrawal failed',
  '2008': 'one withdrawal remains incomplete',
  '3001': 'failed to load settings',
  '4001': 'you are quitting the game',
  //
  'v-close': 'you are quitting the game',
  'v-game-group-not-open': 'this game category has not been made available',
  'v-no-result': 'no data',
  'v-timeout': 'connection overtime',
  'v-need-withdrawPW': 'please set your withdrawal password',
  'v-need-profile': 'please setup your basic information',
  'v-no-token': 'login failed',
  'v-need-login': 'please login first',
  //
  'http-0': 'API server not responding (ERR_CONNECTION_REFUSED)',
  'http-404': 'API server not responding',
  'http-500': 'API connection error'
}

export const walletList = {
  '-1': 'System',
  '0': 'Wallet',
  '6': 'MG',
  '12': 'CQ9',
  '15': '36',
  '16': 'super',
  '17': 'GT',
  '18': 'BBin'
}

export const transWayList = {
  '0': 'transfer',
  '1': 'Overseas Chinese Union',
  '2': 'Wechat bank card',
  '3': 'Alipay',
  '4': 'AllPay',
  '5': 'Ecpay',
  '7': 'deposit without bankbook',
  '8': 'IPS Pay',
  '9': 'DDBill'
}

export const computeKindList = {
  '0': 'rebate',
  '1': 'rebate-individual',
  '2': 'return commission',
  '3': 'return commission-individual',
  '4': 'percentage',
  '5': 'percentage-individual',
  '10': 'special (profit + validity)'
}

export const kindCodeList = {
  'EG': 'electronic',
  'LI': 'live',
  'LO': 'lottery',
  'SP': 'sports'
}
