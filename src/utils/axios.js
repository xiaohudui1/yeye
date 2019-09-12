import  axios from 'axios'
// Add a request interceptor
import Store from '../store/store'
import ActionCreator from '../store/actioncreator'
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let {method} = config
  let token  = localStorage.getItem('token')
  if(method === 'get'){
    config.url+=`&token=${token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.status === 200){
    if(response.data.err !== 0){
      Store.dispatch(ActionCreator.changModelState())
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
