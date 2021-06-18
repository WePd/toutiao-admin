
import request from '@/utils/request'

//获取文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        //Body参数使用data设置
        //Query参数使用params设置
        //Header参数使用header设置
        params
    })
}

//获取文章频道
export const getArticlesChannels = params => {
    return request({ 
        method: 'GET',
        url: '/mp/v1_0/channels',
        //Body参数使用data设置
        //Query参数使用params设置
        //Header参数使用header设置
    })
}

//删除文章
export const deleteArticle = articleId => {
    return request({ 
        method: 'DELETE',
        url: `/mp/v1_0/articles/${articleId}`,
        //Body参数使用data设置
        //Query参数使用params设置
        //Header参数使用header设置
    })
}


//上传文章
export const addArticles = (data, draft = false) => {
    return request({ 
        method: 'POST',
        url: '/mp/v1_0/articles',
        //Body参数使用data设置
        //Query参数使用params设置
        //Header参数使用header设置
        params: {
            draft
        },
        data
    })
}

//修改文章
export const updateArticles = (articleId, data, draft = false) => {
    return request({ 
        method: 'PUT',
        url: `/mp/v1_0/articles/${ articleId }`,
        //Body参数使用data设置
        //Query参数使用params设置
        //Header参数使用header设置
        params: {
            draft
        },
        data
    })
}
//获取指定文章
export const getArticle = articleId => {
    return request({ 
        method: 'GET',
        url: `/mp/v1_0/articles/${ articleId}`,
        //Body参数使用data设置
        //Query参数使用params设置
        //Header参数使用header设置
    })
}