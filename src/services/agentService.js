import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class AgentService {
  getAgentList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/agent_list',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      })
      .catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getGameCompanyList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/game_company',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getInfoListTotal = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      return xhr({
        url: 'agent/info_total',
        method: 'POST',
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getInfoList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('agent_id', body.agent_id)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/info',
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
}

export default new AgentService()
