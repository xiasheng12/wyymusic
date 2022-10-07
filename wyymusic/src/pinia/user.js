import { defineStore } from "pinia";
import getcityname from "../getcityname";
function getdate(d) {
    let now = new Date(d)
    let y = now.getFullYear()
    let m = now.getMonth() + 1
    return y + '年' + (m < 10 ?  '0'+m : m)+'月'
}
function ageho(age){
    for(let i=0;i<10;i++){
        if(age-2000>=i&&age-2000<=(i+1)*10){
            return `${i}${i}`
        }
    }
}
export const useUserStore=defineStore('user',{
    state:()=>{
        return{
            userprofile:null,
            playlistid:'0'
        }
    },
    persist:{
        enabled: true,
        strategies:[
            { storage:localStorage,paths:['userprofile'] }
        ]
    },
    getters:{
        //昵称
        nickname(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.nickname
            }
        },
        //头像
        avatarUrl(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.avatarUrl
            }
        },
        //背景
        backgroundUrl(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.backgroundUrl
            }
        },
        //关注
        follows(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.follows
            }
        },
        //粉丝
        followeds(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.followeds
            }
        },
        //性别
        gender(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.gender=='1'? '男' :(state.userprofile.profile.gender=='2' ? '女' : '未知')
            }
        },
        //用户id
        userId(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.userId
            }
        },
        //个人简介
        signature(state){
            if(state.userprofile!==null){
                return state.userprofile.profile.signature
            }
            
        },
        //城市
        city(state){
            if(state.userprofile!==null){
                return getcityname(state.userprofile.profile.city)
            } 
        },
        //生日
        birthday(state){
            if(state.userprofile!==null){
                return ageho((getdate(state.userprofile.profile.birthday).substring(0,4)))!==undefined ? ageho((getdate(state.userprofile.profile.birthday).substring(0,4))) : '00'
            } 
        },

        
    },
    actions:{
        Setplaylistid(id){
            this.playlistid=id
        }
    }
})