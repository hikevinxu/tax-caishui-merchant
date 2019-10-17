import { fetchPost, fetchGet } from './axios'
import qs from 'qs'

export default {
  /**
   * 获取服务列表
   * @function serviceList
   * @type 'Post'
   * @param pageNum Number
   * @param pageSize Number
   * @param shelf boolean
   */
  serviceList (params) {
    return fetchPost('/service/list', params)
  },
  /**
   * 添加服务
   * @function serviceAdd
   * @type 'Post'
   */
  serviceAdd (params) {
    return fetchPost('/service/add', params)
  },
  /**
   * 服务编辑
   * @function serviceUpdate
   * @type 'Post'
   * @param id Number
   */
  serviceUpdate (params) {
    return fetchPost('/service/update', params)
  },
  /**
   * 服务下架
   * @function serviceShelfDown
   * @type 'Post'
   * @param id Number
   */
  serviceShelfDown (params) {
    let paramsString = qs.stringify(params)
    return fetchPost('/service/shelf/down', paramsString)
  },
  /**
   * 服务上架
   * @function serviceShelfUp
   * @type 'Post'
   * @param id Number
   */
  serviceShelfUp (params) {
    let paramsString = qs.stringify(params)
    return fetchPost('/service/shelf/up', paramsString)
  },
  
  /**
   * 主营业务
   * @function serviceItemTrees
   * @type 'Post'
   * @param id Number
   */
  serviceItemTrees (params) {
    return fetchGet('/service/service_items', params)
  },
  /**
   * 主营业务
   * @function serviceItemTrees
   * @type 'Post'
   * @param id Number
   */
  serviceEdit (params) {
    return fetchGet('/service/edit', params)
  },
  /**
   * 根据二级服务编号查询服务介绍模版
   * @function serviceTemplate
   * @type 'Post'
   */
  serviceTemplate (params) {
    return fetchGet('/service/template', params)
  }
}