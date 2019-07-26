import { fetchPost, fetchGet } from './axios'
import qs from 'qs'

export default {
  /**
   * 商户入驻状态
   * @function refreshToken
   * @type 'GET'
   */
  getCertificationStatus () {
    return fetchGet('/merchant/apply/getCertificationStatus')
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
   * 公司类型
   * @function refreshToken
   * @type 'GET'
   */
  merchantCompanyTypes () {
    return fetchGet('/merchant/apply/company_types')
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
  }
}