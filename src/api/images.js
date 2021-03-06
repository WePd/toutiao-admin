//图片素材上传
import request from '@/utils/request'

//上传图片素材
export const uploadImage = data => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/user/images',
        data
    })
}


//获取用户图片素材
export const getImages = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/images',
				params
    })
}