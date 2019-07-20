import { fetchPost, fetchGet } from './axios'
import qs from 'qs'

export default {
  /**
   * 首页公司信息
   * @function refreshToken
   * @type 'GET'
   */
  companyInfo () {
    return fetchGet('/company/info')
  },
  /**
   * 首页
   * @function refreshToken
   * @type 'POST'
   */
  statisic (data) {
    // let data1 = qs.stringify(data)
    return fetchPost('/datacenter/statistic', data)
  }
}
