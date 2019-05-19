/*
前后台交互API接口
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
import {Message} from "element-ui";        // 引入ele-ui的消息提示部分

let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

// "请求" 拦截器,过滤重复的请求
axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消');
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
});

// "响应" 拦截器即异常处理
axios.interceptors.response.use(response => {
  // console.log(response);
  // 获取token并把token放在sessionStorage中,根据实际需求选择存储方式即可
  let list = response.data.object;      // 根据实际数据结构取得返回的token
  if (list.hasOwnProperty("token")) {
    sessionStorage.setItem('token', list.token);
    axios.defaults.headers.token = sessionStorage.getItem('token');
  }
  return response;
}, err => {
  // 请求的错误判断,根据不同的错误码不同消息提醒
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break;
      case 401:
        err.message = '未授权，请重新登录'
        break;
      case 403:
        router.push("/")
        err.message = '拒绝访问，请重新登录'
        break;
      case 404:
        err.message = '请求错误,未找到该资源'
        break;
      case 405:
        err.message = '请求方法未允许'
        break;
      case 408:
        err.message = '请求超时'
        break;
      case 500:
        err.message = '服务器端出错'
        break;
      case 501:
        err.message = '网络未实现'
        break;
      case 502:
        err.message = '网络错误'
        break;
      case 503:
        err.message = '服务不可用'
        break;
      case 504:
        err.message = '网络超时'
        break;
      case 505:
        err.message = 'http版本不支持该请求'
        break;
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = "连接到服务器失败"
  }
  Message.error(err.message)                     // 错误提示,记得引入message
  return Promise.resolve(err.response)
});

//设置默认请求头
axios.defaults.headers = {
  "content-type": "application/json",           // 设置传输类型(json,form表单)
  "token": sessionStorage.getItem('token')      // token
};

axios.defaults.timeout = 10000;                 // 响应时间

export default function ajax (url, data={}, type='GET') {

  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise;
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' ;//数据拼接字符串
      //用来获取对象自身所有的可枚举的属性名，但不包括原型中的属性，然后返回一个由属性名组成的数组
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      });
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      // promise = axios.get(url)
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}
