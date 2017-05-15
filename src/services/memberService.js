import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'
import { createCookie, readCookie, eraseCookie } from './'

class MemberService {
  getMemberList = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('agent_id', body.agent_id)
      data.append('rate_level', '')
      data.append('user_status', body.user_status)
      data.append('user_account', body.user_account)
      data.append('start_date', body.start_date)
      data.append('end_date', body.end_date)
      data.append('login_ip', body.login_ip)
      data.append('page_size', body.page_size)
      data.append('page_num', body.page_num)

      return xhr({
        url: 'agent/member/search',
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

  getAllMemberList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/member/list',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

  getMemberWallet = ({context, username}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user', username)

      return xhr({
        url: 'agent/member/wallet_info',
        method: 'post',
        data,
        context
      }).then((res) => {
        return resolve(res.wallet)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }

}

export default new MemberService()
