import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class ReportService {
  getBackBetReport = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('agent_id', body.agent_id)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/back_bet_computing',
        method: 'post',
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getBetReportList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('game_code', body.game_company)
      data.append('user_account', body.user_account)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/report/game',
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

  getGameCompanyReportList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/report/game_sum',
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

  getAgentReportList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/report/agent_sum',
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

  getMemberSumReportList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user_account', body.user_account)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/report/member_sum',
        method: 'post',
        data,
        context
      }).then((res) => {
        if (res.user_total < 1) throw 'v-no-result'
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getMemberSeparateReportList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user_account', body.user_account)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/report/member_separate',
        method: 'post',
        data,
        context
      }).then((res) => {
        if (res.user_total < 1) throw 'v-no-result'
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getPromotionRecordList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('agent_id', body.agent_id)
      data.append('user_account', body.user_account)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('promotion_kind', body.promotion_kind)
      data.append('promotion_name', body.promotion_name)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/promotion_record',
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

  getPromotionReportList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('promotion_kind', body.promotion_kind)
      data.append('promotion_name', body.promotion_name)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/promotion_history',
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

export default new ReportService()
