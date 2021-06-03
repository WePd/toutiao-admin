//todo基于axios的请求模块
import axios from 'axios'

// 创建axios实例
const request = axios.create({
    //基础路径
   baseURL: 'http://api-toutiao-web.itheima.net'

})

//请求拦截器
request.interceptors.request.use(
    function(config){
        //config为当前用户的配置信息
        // console.log(config)
        const user = JSON.parse(window.localStorage.getItem('user'))
        // console.log(user)
        if(user){
            //如果有登录信息，则统一设置token
            config.headers.Authorization =   `Bearer ${ user.token }`
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)
//响应拦截器
export default request