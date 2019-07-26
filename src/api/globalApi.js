import { fetchPost, fetchGet } from './axios'

export default {
  /**
   * 获取区县列表
   * @function getAddressAreas
   * @type 'Get'
   * @param provinceCode Number
   * @param cityCode Number
   */
  getAddressAreas (params) {
    return fetchGet('/address/areas', params)
  },
  /**
   * 获取城市列表
   * @function getAddressCitys
   * @type 'Get'
   * @param provinceCode Number
   */
  getAddressCitys (params) {
    return fetchGet('/address/citys', params)
  },
  /**
   * 获取省份列表
   * @function getAddressProvinces
   * @type 'Get'
   */
  getAddressProvinces (params) {
    return fetchGet('/address/provinces', params)
  },
  /**
   * 获取所有地址列表
   * @function getAddressTrees
   * @type 'Get'
   */
  getAddressTrees (params) {
    return fetchGet('/address/trees', params)
  },
  /**
   * 提问-获取问题分类
   * @function getFileuploadUpload
   * @type 'POST'
   */
  getFileuploadUpload (params) {
    return fetchPost('/fileupload/upload', params)
  },
  
  /**
   * 登录
   * @function authLogin
   * @type 'POST'
   */
  authLogin (params) {
    return fetchPost('/auth/login', params)
  },
  /**
   * 登录
   * @function authLogin
   * @type 'GET'
   */
  loginOut () {
    return fetchGet('/auth/logout')
  },
}