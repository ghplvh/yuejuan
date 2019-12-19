import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from './api/axios'
import VueAxios from 'vue-axios'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'nprogress/nprogress.css'
import 'normalize.css'
import './assets/css/common.css'
// 引入vue-quill-editor的css样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/iconFont/iconfont.css'
// import '@babel/polyfill'

// Vue.use(ElementUI)
// Vue.prototype.$http = axios
Vue.use(VueQuillEditor)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
