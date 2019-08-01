import { fetchPost, fetchGet } from './axios'
import qs from 'qs'

export default {
  /**
   * 商户入驻状态
   * @function refreshToken
   * @type 'GET'
   */
  getCertificationStatus () {
    return fetchGet('/merchant/apply/status')
  },
  /**
   * 商户入驻注册
   * @function refreshToken
   * @type 'POST'
   */
  merchantRegister (data) {
    return fetchPost('/merchant/register', data)
  },
  /**
   * 商户入驻验证码
   * @function refreshToken
   * @type 'POST'
   */
  merchantCode (data) {
    return fetchPost('/merchant/register/send_verifycode', data)
  },
  /**
   * 修改密码验证码
   * @function refreshToken
   * @type 'POST'
   */
  passwordCode (data) {
    return fetchPost('/password/send_verifycode', data)
  },
  /**
   * 修改密码
   * @function refreshToken
   * @type 'POST'
   */
  passwordReset (data) {
    return fetchPost('/password/reset', data)
  },
  /**
   * 公司类型
   * @function refreshToken
   * @type 'GET'
   */
  merchantCompanyTypes () {
    return fetchGet('/merchant/apply/company_types')
  },
  /**
   * 获取公司详情
   * @function getMerchantCompanyDetail
   * @type 'Get'
   */
  getMerchantCompanyDetail (params) {
    return fetchGet('/merchant/apply/company_detail', params)
  },
  /**
   * 保存公司信息
   * @function refreshToken
   * @type 'POST'
   */
  merchantSaveCompany (data) {
    return fetchPost('/merchant/apply/save_company', data)
  },
  /**
   * 保存公司资质证书
   * @function refreshToken
   * @type 'POST'
   */
  merchantSaveCertification (data) {
    return fetchPost('/merchant/apply/save_qualification', data)
  },
  /**
   * 搜寻公司
   * @function refreshToken
   * @type 'POST'
   */
  merchantSearch (data) {
    return fetchPost('/merchant/apply/search_company', data)
  },
  /**
   * 状态重置
   * @function refreshToken
   * @type 'POST'
   */
  merchantApplyReset () {
    return fetchGet('/merchant/apply/reset')
  }
}
