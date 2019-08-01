import Vue from 'vue'
import 'amfe-flexible'
import 'babel-polyfill'
// import sa from 'sa-sdk-javascript'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import '@/common/css/reset.css'
import '@/common/css/animate.css'
import '@/common/css/h5Header.css'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/common/css/element-variables.scss'
// import VConsole from 'vconsole'

Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
// new VConsole()

// sa.init({
//   // 测试地址：
//   server_url: 'https://sensors-api.shebaowa.com/sa?project=default',
//   // 正式地址：
//   // server_url: 'https://sensors-api.taxlioner.com/sa?project=tax',
//   // 是否开启 debug 模式，true 开启，false 关闭，开启 debug 模式，每发送一条数据会在页面弹出一次
//   // debug_mode: true,
//   // 配置打通 App 与 H5 的参数
//   use_app_track: true,
//   heatmap: {
//     // 是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
//     clickmap: 'not_collect',
//     // 是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
//     scroll_notice_map: 'not_collect',
//     show_log: false
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
