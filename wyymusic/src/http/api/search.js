import api from "..";

//获取默认搜索关键词
export const getsearchdefault=(params)=>{
    return api({
        method:'get',
        url:'/search/default',
        withCredentials:true,
        params
    })
}
//获取搜索歌曲
export const getsearchmusic=(params)=>{
    return api({
        method:"get",
        url:"/search",
        withCredentials:true,
        params
    })
}
//获取热搜列表详细
export const getsearchhot=(params)=>{
    return api({
        method:'get',
        url:'/search/hot/detail',
        withCredentials:true,
        params
    })
}