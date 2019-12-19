import Axios from 'axios'
import store from '../store'
import router from '../router'
import {
  Message
} from 'element-ui'

// Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://yuejuan.duchengedu.com/' : 'http://192.168.99.209:10003/web'
// 配置跨域前缀
// Axios.defaults.baseURL = '/api'
// Axios.defaults.headers = {
//   'Access-Control-Allow-Origin': '*'
// }
const axios = Axios.create({
})
// 获取CancelToken
const CancelToken = Axios.CancelToken
const source = CancelToken.source()
// 请求拦截器
axios.interceptors.request.use(function (config) {
  let arr = config.url.split('/')
  // let token = localStorage.getItem('loginToken')
  // let account = localStorage.getItem('loginAccount')
  // if (token) {
  //   config.headers.login_token = token
  //   config.headers.login_account = account
  // } else {
  //   router.push({
  //     path: '/'
  //   })
  // }
  if (!store.state.isLogin && arr[arr.length - 1] !== 'login') {
    // 全局添加cancelToken
    config.cancelToken = source.token
    router.push({
      path: '/'
    })
    source.cancel()
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.headers.login_account) {
    localStorage.setItem('loginAccount', response.headers.login_account)
    localStorage.setItem('loginToken', response.headers.login_token)
  }
  if (response.data && response.data.code && parseInt(response.data.code) !== 0) {
    // 请求未成功
    Message({
      message: response.data.message,
      type: 'error'
    })
    let message = {
      message: response.data.message
    }
    return Promise.reject(message)
  }
  return response
}, function (error) {
  // Do something with response error
  if (error.message) {
    Message({
      message: '' + error.message,
      type: 'error'
    })
  }
  return Promise.reject(error)
})

export default axios
