import { defineStore } from "pinia";
import { getmusicurl,getlyrics } from "../http/api/userinfo";
import { toRaw } from "vue";
export const useMusicStore=defineStore('music',{
    state:()=>{
        return{
            //目前歌曲列表的当前id
            musicid:null,
            //目前歌曲列表的所有作者
            musicar:null,
            //目前歌曲列表的所有url
            musicurl:null,

            nowmusicurl:null,
            nowmusic:null,
            nomusiczz:null,
            //音乐是否播放
            isplay:false,
            //目前歌单歌曲列表
            nowmusiclist:{},
            //目前歌曲列表的歌曲的歌词
            nowmusiclistlyrics:[],
            //目前歌曲的index
            nowmusicindex:0,
            //目前列表播放方式
            nowmusicplayorder:0,
            //目前列表已播放随机的index
            nowrandomindex:[]
        }
    },
    getters:{
        getmusicsid(state){
            let id=state.nowmusiclist.map((item)=>{
                return item.id
            })
            return id
        }
    },
    actions:{
        //设置当前音乐的index
        setmusicindex(index){
            this.nowmusicindex=index
        },
        //设置当前音乐列表所有的id
        setmusicid(music){
            this.musicid=music
        },
        //设置当前音乐列表所有的作者
        setmusicar(music){
            this.musicar=music
        },
         //获取音乐的url
        async Getmusicurl(params){
            try {
                let g=await getmusicurl(params)
                this.musicurl=g
                // console.log(this.musicurl);
            } catch (error) {
                return{
                    code:'502',
                    message:'获取音乐url失败'+error
                }
            }
        },
         //获取音乐的歌词
        async Getlyrics(params){
            try {
                let g=await getlyrics(params)
                this.nowmusiclistlyrics=g
                console.log(this.nowmusiclistlyrics);
                // console.log(this.musicurl);
            } catch (error) {
                return{
                    code:'502',
                    message:'获取音乐歌词失败'+error
                }
            }
        },
         //设置当前音乐的url
        Setnowmusicurl(id){
            for(let i=0;i<toRaw(this.musicurl).data.length;i++){
                if(toRaw(this.musicurl).data[i].id==id){
                    this.nowmusicurl=toRaw(this.musicurl).data[i].url
                }
            }
        },
         //设置当前音乐
        Setnowmusic(id,songs){
            for(let i=0;i<songs.length;i++){
                if(songs[i].id==id){
                    this.nowmusic=songs[i]
                }
            }
        },
         //设置当前音乐的作者
        Setnowmusiczz(index){
            this.nomusiczz=toRaw(this.musicar)[index]
        },
         //设置当前音乐是否播放
        changisplay(value){
            this.isplay=value
        },
         //设置当前歌单的音乐列表
        Setnowmusiclist(value){
            this.nowmusiclist=value
        },
        //上一首/下一首
        Switchmusic(music,id,zz,index){
            this.nowmusic=music
            this.Setnowmusicurl(id)
            this.nomusiczz=zz
            this.nowmusicindex=index
        },
        //修改目前歌单列表的播放方式
        Setnowmusicplayorder(order){
            this.nowmusicplayorder=order
        },
        //添加随机index
        Setrandomindex(index){
            this.nowrandomindex.push(index)
        },
        //清空随机index的数组
        Clearrandomindex(){
            this.nowrandomindex=[]
            this.nowrandomindex.push(this.nowmusicindex)
        }
    }
})