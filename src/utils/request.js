//todo基于axios的请求模块
import axios from 'axios'

// 创建axios实例
const request = axios.create({
    //基础路径
    baseURL: 'http://api-toutiao-web.itheima.net/',

})


export default request