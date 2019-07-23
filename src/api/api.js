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
   * 首页im总数据
   * @function refreshToken
   * @type 'POST'
   */
  statisic (data) {
    // let data1 = qs.stringify(data)
    return fetchPost('/datacenter/statistic', data)
  },
  /**
   * 首页im总数据
   * @function refreshToken
   * @type 'POST'
   */
  noticeUpdate (data) {
    let data1 = qs.stringify(data)
    return fetchPost('/company/notice/update', data1)
  },
  /**
   * 上传文件
   * @function refreshToken
   * @type 'POST'
   */
  fileupload (data) {
    // let data1 = qs.stringify(data)
    return fetchPost('/fileupload/upload', data)
  },
  /**
   * 查询公司基础信息
   * @function refreshToken
   * @type 'GET'
   */
  baseInfo () {
    return fetchGet('/company/basic/get')
  },
  /**
   * 公司基础信息保存
   * @function refreshToken
   * @type 'POST'
   */
  baseUpdate (data) {
    return fetchPost('/company/basic/update', data)
  },
  /**
   * 宣传图片list
   * @function refreshToken
   * @type 'GET'
   */
  publictyImgList () {
    return fetchGet('/company/publicityImg/list')
  },
  /**
   * 宣传图片上传
   * @function refreshToken
   * @type 'GET'
   */
  publictyImgAdd (data) {
    return fetchPost('/company/publicityImg/add', data)
  },
  /**
   * 宣传图片上传
   * @function refreshToken
   * @type 'GET'
   */
  publictyImgDelete (data) {
    return fetchPost('/company/publicityImg/delete', data)
  },
  /**
   * 公司基础信息保存
   * @function refreshToken
   * @type 'POST'
   */
  serviceList (data) {
    return fetchPost('/service/list', data)
  },
  /**
   * 服务类型数据
   * @function refreshToken
   * @type 'GET'
   */
  serviceType (data) {
    return fetchGet('/service/service_types', data)
  },
  /**
   * 服务保存
   * @function refreshToken
   * @type 'POST'
   */
  serviceSave (data) {
    return fetchPost('/service/add', data)
  },
  /**
   * 服务编辑
   * @function refreshToken
   * @type 'POST'
   */
  serviceUpdate (data) {
    return fetchPost('/service/update', data)
  },
  /**
   * 服务上下架
   * @function refreshToken
   * @type 'POST'
   */
  serviceChangeShelf (data) {
    return fetchPost('/service/change_shelf', data)
  },
  /**
   * 服务删除
   * @function refreshToken
   * @type 'POST'
   */
  serviceDelete (data) {
    return fetchPost('/service/delete', data)
  }
}
