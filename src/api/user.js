import request from '@/utils/request'

//获取用户信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
        }
    })
} 