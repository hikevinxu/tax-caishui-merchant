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
      redirect: '/merchantHome-h5'
    },
    {
      path: '/merchantHome-h5',
      name: 'merchantHome-h5',
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
          path: '/recordsCenter',
          name: 'recordsCenter',
          component: () => import('../views/merchantPC/home.vue'),
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
