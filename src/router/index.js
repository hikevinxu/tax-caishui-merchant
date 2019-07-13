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
      redirect: '/index'
    },
    {
      path: '/merchant-h5',
      name: 'merchant-h5',
      component: () => import('../views/merchant/merchant-h5.vue'),
      meta: {
        title: '首页'
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
