export const xhrTimeout = 15000

export const errorCodes = {
  '0': 'error',
  '1': 'success',
  '2': 'unknown error',
  '1003': 'api_code & api_path are not correspondent',
  '1004': 'You can\'t save it without api_code',
  '1005': 'You don\'t have the permission to save this API',
  '1006': 'token failed',
  '1007': 'token failed',
  '1101': 'account format incorrect',
  '1102': 'password format incorrect',
  '1103': 'ACC & PWD do not exist',
  '1104': 'ACC not found',
  '1105': 'ACC already existed',
  '1106': 'You don\'t have the permission to operate this site',
  '1107': 'ACC for DB editing is in error',
  '1108': 'You don\'t have the permission to operate this API',
  '1109': 'AMT for DB editing is in error',
  '1110': 'This permission is given by its user & can\'t be deleted',
  '1111': 'ACC for DB creating is in error',
  '1112': 'The modified #VALUE is beyond permission',
  '1113': 'The min value must be less than the max value',
  '1114': 'Name is a required field',
  '1115': 'You don\'t have the permission to search the permission group',
  '1116': 'You don\'t have the permission to edit the permission group',
  '1117': 'Please send the ID of the permission group',
  '1118': 'ACC deleted, DB in error',
  '1119': 'You can\'t modify this permission',
  '1120': 'You can\'t modify own permission',
  '1121': 'Password can\'t be null',
  '1122': 'This site has been assigned to other user',
  '1201': 'No data found',
  '1202': 'Start Time must be before End Time',
  '1203': 'Both start time & end time are required',
  '1204': 'You don\'t have the permission to enter this site',
  '1205': 'The designate amt is beyond permission',
  '1206': 'Site malfunctions to modify amt',
  '1207': 'The modified amt or temporary allowance is null / 0',
  '1301': 'Data abt this site not found',
  '1302': 'Allowance of this site is insufficient',
  '1303': 'Update of the used amt of this site is in error',
  //
  'v-no-result': 'no data',
  'v-timeout': 'connection overtime',
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
