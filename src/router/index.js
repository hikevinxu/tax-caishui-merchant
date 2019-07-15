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
