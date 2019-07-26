import { fetchPost, fetchGet } from './axios'

export default {
  /**
   * 数据中心-按天查询咨询记录
   * @function datacenterConsult_records
   * @type 'POST'
   * @param pageNum Number
   * @param pageSize Number
   * @param type Number
   * @param time Number
   */
  datacenterConsult_records (params) {
    return fetchPost('/datacenter/consult_records', params)
  },
  /**
   * 数据中心-统计咨询量和浏览量
   * @function datacenterConsult_records
   * @type 'POST'
   * @param type String
   * @param time String
   */
  datacenterStatistic (params) {
    return fetchPost('/datacenter/statistic', params)
  },
  /**
   * 修改地址信息 - 修改公司地址信息
   * @function companyAddressUpdate
   * @type 'POST'
   * @param type String
   * @param time String
   */
  companyAddressUpdate(params) {
    return fetchPost('/company/address/update', params)
  },
  
  /**
   * 修改地址信息 - 获取公司地址信息
   * @function companyAddressGet
   * @type 'get'
   */
  companyAddressGet(params) {
    return fetchGet('/company/address/get', params)
  },
}
