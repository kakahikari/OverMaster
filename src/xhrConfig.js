export const xhrTimeout = 15000

export const errorCodes = {
  '0': 'error',
  '1': 'success',
  '2': 'unknown error',
  '1003': 'api_code與api_path對應錯誤',
  '1004': '沒有api_code，拒絕存取',
  '1005': '沒有存取此API的權限',
  '1006': 'Token 失效',
  '1007': '後台Token錯誤',
  '1101': '帳號字串格式有誤',
  '1102': '密碼字串格式有誤',
  '1103': '無此帳密',
  '1104': '無此帳號資訊',
  '1105': '帳號重複',
  '1106': '沒有操作此站台的權限',
  '1107': '帳號編輯資料庫異常',
  '1108': '沒有操作此API的權限',
  '1109': '金額編輯資料庫異常',
  '1110': '有使用者分配該權限，無法刪除',
  '1111': '帳號新增資料庫異常',
  '1112': '修改的數值超越自身權限',
  '1113': '最小值不該大於最大值',
  '1114': '名稱不可為空',
  '1201': '取無資料',
  '1202': '起始時間大於結束時間',
  '1203': '起始時間跟結束時間必須同時存在',
  '1204': '無查看此站台的權限',
  '1205': '所派發的額度超過權限',
  '1206': '站台修改額度資料庫異常',
  '1301': '無此站台資訊',
  '1302': '站台剩餘額度不足',
  '1303': '更新站台已使用額度異常',
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
