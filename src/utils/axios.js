import  axios from 'axios'
import Store from '../store/store'
import ActionCreator from '../store/actioncreator'
axios.interceptors.request.use(function (config) {
  let {method,data} = config
  let token  = localStorage.getItem('token')
  if(method === 'get'){
    config.url+=`&token=${token}`
  }
  if(method === 'post'){
    data.token=`${token}`
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {//请求拦截器
  if(response.status === 200){
    if(response.data.err !== 0){
    }
    return response.data
    
  }else{
    return Promise.reject('请求出错')
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
export default axios
