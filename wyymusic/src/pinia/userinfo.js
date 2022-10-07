import { defineStore } from "pinia";
import { getplaylist, getuserinfo ,getplaylistxq} from "../http/api/userinfo";
function getdate(d) {
    let now = new Date(d)
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    return y + '年' + (m < 10 ?  '0'+m : m)+'月'
}
export const useUserinfoStore=defineStore('userinfo',{
    state:()=>{
        return{
            //用户信息
            Userinfo:null,
            //用户歌单
            userplaylist:null,
            //用户歌单详情
            playlistxq:null,
            
        }
    },
    //持久化缓存
    persist:{
        enabled: true,
        strategies:[
            { storage:localStorage,paths:['Userinfo','userplaylist'] }
        ]
    },
    getters:{
        //音乐等级
        level(state){
            if(state.Userinfo!==null){
                return state.Userinfo.level
            }
        },
        //创建的时间-村龄
        createDays(state){
            if(state.Userinfo!==null){
                return Math.floor(state.Userinfo.createDays/365)
            }
        },
        //注册时间
        enroll(state){
            if(state.Userinfo!==null){
                return getdate(new Date(new Date().getTime()-state.Userinfo.createDays*24*3600*1000))
            }
        },
        //听歌排行
        listenSongs(state){
            if(state.Userinfo!==null){
                return state.Userinfo.listenSongs
            }
        },
        //用户歌单
        playlist(state){
            if(state.userplaylist!==null){
                return JSON.parse(JSON.stringify(state.userplaylist.playlist))
            }
        },
        //收藏的歌单
        playlistBeSubscribedCount(state){
            if(state.Userinfo!==null){
                return state.Userinfo.profile.playlistBeSubscribedCount
            }
        },
        //歌单第一首歌的图片
        coverImgUrl(state){
            if(state.playlistxq!==null){
                return state.playlistxq.playlist.coverImgUrl
            }
        },
        //歌单名字
        name(state){
            if(state.playlistxq!==null){
                return state.playlistxq.playlist.name
            }
        },
        //歌单里面的歌
        tracks(state){
            if(state.playlistxq!==null){
                return state.playlistxq.playlist.tracks
            }
        },
        //歌单播放次数
        playCount(state){
            if(state.playlistxq!==null){
                return state.playlistxq.playlist.playCount
            }
        },
        //歌单分享次数
        shareCount(state){
            if(state.playlistxq!==null){
                return state.playlistxq.playlist.shareCount
            }
        },
        //歌单歌曲总数
        musicsum(state){
            if(state.playlistxq!==null){
                return state.playlistxq.privileges.length
            }
        }
    },
    actions:{
        async Getuserinfo(params){
            try {
                let g= await getuserinfo(params)
                console.log(g);
                this.Userinfo=g
                return {
                    message:'获取用户信息成功',
                    code:'200'
                }
            } catch (error) {
                return {
                    message:'获取用户信息失败',
                    code:'502'
                }
            }
        },
        async Getplaylist(params){
            try {
                let g=await getplaylist(params)
                console.log(g);
                this.userplaylist=g
                return {
                    message:'获取用户歌单成功',
                    code:'200'
                }
            } catch (error) {
                return {
                    message:error,
                    code:'502'
                }
            }  
        },
        async Getplaylistxq(params){
            try {
                let g=await getplaylistxq(params)
                this.playlistxq=g
                return {
                    message:'获取用户歌单详情成功',
                    code:'200'
                }
            } catch (error) {
                return {
                    message:error,
                    code:'502'
                }
            }  
        },
    }
})