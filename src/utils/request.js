//todo基于axios的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建axios实例
const request = axios.create({
    //基础路径
   baseURL: 'http://api-toutiao-web.itheima.net',
   //定义后端返回原始数据的处理
   transformResponse: [function(data){
       try{
        return JSONbig.parse(data)
       } catch(err) {
				 return data
			 } 
   }]
})

//请求拦截器++++
request.interceptors.request.use(
    function(config){
        //config为当前用户的配置信息
        // console.log(config)
        const user = JSON.parse(window.localStorage.getItem('user'))
        // console.log(user)
        if(user){
            //如果有登录信息，则统一设置token
            config.headers.Authorization = `Bearer ${ user.data.token }`
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }   
)
//响应拦截器
export default request