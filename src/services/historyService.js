import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class HistoryService {
  getDeposit = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('agent_id', body.agent_id)
      data.append('user_account', body.user_account)
      data.append('order_status', body.order_status)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('trans_way', body.trans_way)
      data.append('company_bank', body.company_bank)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/history/deposit/search',
        method: 'post',
        data,
        context
      }).then((res) => {
        if (res.total < 1) throw 'v-no-result'
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getAllDeposit = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/history/deposit',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getWithdraw = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('agent_id', body.agent_id)
      data.append('user_account', body.user_account)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('company_bank', body.company_bank)
      data.append('order_num', body.order_num)
      data.append('order_status', body.order_status)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/history/withdraw/search',
        method: 'post',
        data,
        context
      }).then((res) => {
        if (res.total < 1) throw 'v-no-result'
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getAllWithdraw = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/history/withdraw',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getRateList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/rate_money',
        method: 'post',
        data,
        context
      }).then((res) => {
        if (res.total < 1) throw 'v-no-result'
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

}

export default new HistoryService()
