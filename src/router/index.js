import Vue from 'vue'
import Router from 'vue-router'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.back()
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/in',
      name: 'merchantHome',
      component: () => import('../views/merchant/merchantHome-h5.vue'),
      meta: {
        title: '商户入驻'
      }
    },
    {
      path: '/merchant-h5',
      name: 'merchant-h5',
      component: () => import('../views/merchant/merchant-h5.vue'),
      meta: {
        title: '商户入驻'
      }
    },
    {
      path: '/certification-h5',
      name: 'certification-h5',
      component: () => import('../views/merchant/certification-h5.vue'),
      meta: {
        title: '商户入驻'
      }
    },
    {
      path: '/agreement-h5',
      name: 'agreement-h5',
      component: () => import('../views/merchant/agreement-h5.vue'),
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/map-h5',
      name: 'map-h5',
      component: () => import('../views/merchant/map-h5.vue'),
      meta: {
        title: '地图'
      }
    },
    {
      path: '/register-h5',
      name: 'register-h5',
      component: () => import('../views/merchant/register-h5.vue'),
      meta: {
        title: '商户入驻'
      }
    },
    {
      path: '/search-h5',
      name: 'search-h5',
      component: () => import('../views/merchant/search-h5.vue'),
      meta: {
        title: '商户入驻'
      }
    },
    {
      path: '/success-h5',
      name: 'success-h5',
      component: () => import('../views/merchant/success-h5.vue'),
      meta: {
        title: '商户入驻'
      }
    },
    {
      path: '/mainFrame',
      name: 'mainFrame',
      component: () => import('../components/merchantPC/mainFrame.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/merchantPC/home.vue'),
          meta: {
            title: '商户主页'
          }
        },
        {
          path: '/basicInfo',
          name: 'basicInfo',
          component: () => import('../views/merchantPC/basicInfo.vue'),
          meta: {
            title: '基本资料'
          }
        },
        {
          path: '/addressInfo',
          name: 'addressInfo',
          component: () => import('../views/merchantPC/addressInfo.vue'),
          meta: {
            title: '地址信息'
          }
        },
        {
          path: '/publicityFigure',
          name: 'publicityFigure',
          component: () => import('../views/merchantPC/publicityFigure.vue'),
          meta: {
            title: '宣传图片'
          }
        },
        {
          path: '/mainBusiness',
          name: 'mainBusiness',
          component: () => import('../views/merchantPC/mainBusiness.vue'),
          meta: {
            title: '主营业务管理'
          }
        },
        {
          path: '/serviceManager',
          name: 'serviceManager',
          component: () => import('../views/merchantPC/serviceManager.vue'),
          meta: {
            title: '服务管理'
          }
        },
        {
          path: '/serviceEdit',
          name: 'serviceEdit',
          component: () => import('../views/merchantPC/serviceEdit.vue'),
          meta: {
            title: '添加服务管理',
            path: '/serviceManager'
          }
        },
        {
          path: '/recordsCenter',
          name: 'recordsCenter',
          component: () => import('../views/merchantPC/recordsCenter.vue'),
          meta: {
            title: '数据中心'
          }
        },
        {
          path: '/messageCenter',
          name: 'messageCenter',
          component: () => import('../views/merchantPC/messageCenter.vue'),
          meta: {
            title: '消息中心'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'logn',
      component: () => import('../views/merchantPC/login.vue'),
      meta: {
        title: '财税鱼登录'
      }
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('../views/merchantPC/reset.vue'),
      meta: {
        title: '重置密码'
      }
    },
    {
      path: '/register-pc',
      name: 'register-pc',
      component: () => import('../views/merchantPC/merchant/register-pc.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/search-pc',
      name: 'search-pc',
      component: () => import('../views/merchantPC/merchant/search-pc.vue'),
      meta: {
        title: '认领企业'
      }
    },
    {
      path: '/merchant-pc',
      name: 'merchant-pc',
      component: () => import('../views/merchantPC/merchant/merchant-pc.vue'),
      meta: {
        title: '认领企业'
      }
    },
    {
      path: '/certification-pc',
      name: 'certification-pc',
      component: () => import('../views/merchantPC/merchant/certification-pc.vue'),
      meta: {
        title: '资质认证'
      }
    },
    {
      path: '/protocolBook-pc',
      name: 'protocolBook-pc',
      component: () => import('../views/merchantPC/merchant/protocolBook-pc.vue'),
      meta: {
        title: '用户服务协议'
      }
    },
    {
      path: '/success-pc',
      name: 'success-pc',
      component: () => import('../views/merchantPC/merchant/success-pc.vue'),
      meta: {
        title: '成功'
      }
    },
    {
      path: '/newBusiness',
      name: 'newBusiness',
      component: () => import('../views/merchantPC/newBusiness.vue'),
      meta: {
        title: '新业务申请'
      }
    },
    {
      path: '/netError',
      name: 'netError',
      component: () => import('../views/errorPage/netError.vue'),
      meta: {
        title: '网络错误'
      }
    },
    {
      path: '/404',
      name: 'error404',
      component: () => import('../views/errorPage/error404.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
