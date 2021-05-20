import request from '@/utils/request'

//获取用户信息
export const getUserInfo = () => {
    //在这个地方获取存储到本地的用户数据
    //因为获取到的是JSON字符串，我们需要把他还原回去。
    const user = JSON.parse(window.localStorage.getItem('user'))
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
        headers: {
            // Authorization: `Bearer ${ user.token }` //ES6字符串拼接
        }
    })
} 