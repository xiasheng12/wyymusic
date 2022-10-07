import api from "..";

//获取用户详情
export const getuserinfo=(params)=>{
    return api({
        method:'get',
        url:"/user/detail",
        withCredentials:true,
        params
    })
}
//获取用户歌单 必选参数 : uid : 用户 id
export const getplaylist=(params)=>{
    return api({
        method:'get',
        url:'/user/playlist',
        withCredentials:true,
        params
    })
}
//获取歌单详情
export const getplaylistxq=(params)=>{
    return api({
        method:"get",
        url:'/playlist/detail',
        withCredentials:true,
        params
    })
}
//获取歌曲url
export const getmusicurl=(params)=>{
    return api({
        method:"get",
        url:'/song/url',
        withCredentials:true,
        params
    })
}
//获取歌词
export const getlyrics=(params)=>{
    return api({
        method:'get',
        url:"/lyric",
        params
    })
}