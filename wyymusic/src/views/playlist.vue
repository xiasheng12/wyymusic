<template>
  <div id="playlist" ref="playlist">
    <div class="top">
      <div class="bgc-box">
        <div class="bgc" :style="{'background-image': 'url('+playlistbgc+')'}"></div>
      </div>
      <i class="iconfont icon-xiangzuo1" @click="goback"></i>
      <div class="top-m">歌单
        <i class="iconfont icon-r"></i>
      </div>
      <i class="iconfont icon-gengduo1"></i>
      <i class="iconfont icon-search"></i>
    </div>
    <div class="mid" v-if="musicvalue" >
      <div class="img-box" :style="{'background-image': 'url('+playlistbgc+')'}">
        
      </div>
      <div class="mid-t">
        <div class="mid-t-l">
          <img :src="userinfo.coverImgUrl" alt="">
          <div class="playcs">
            <i class="iconfont icon-kaishi1"></i>
            <span>{{userinfo.playCount}}</span>
          </div>
        </div>
        <div class="mid-t-r">
          <div class="name">{{userinfo.name}}</div>
          <div class="user">
              <div class="avater">
                <img :src="user.avatarUrl" alt="">
              </div>
              <div class="username">{{user.nickname}}
                <van-icon name="arrow" />
              </div>
          </div>
        </div>
        <i class="iconfont icon-xialajiantouxiao"></i>
      </div>
      <div class="mid-m">编辑简介
        <van-icon name="arrow" />
      </div>
      <div class="mid-b">
        <div class="mid-b-c">
          <i class="iconfont icon-fenxiangzhuanfa"></i>
          <div class="fxsum">{{userinfo.shareCount}}</div>
        </div>
        <div class="mid-b-c">
          <i class="iconfont icon-pinglun"></i>
          <div class="pl">评论</div>
        </div>
        <div class="mid-b-c">
          <i class="iconfont icon-shoucang"></i>
          <div class="sc">收藏</div>
        </div>
      </div>
    </div>
    <div class="mid" v-if="!musicvalue">
      <div class="mid-t">
        <div class="mid-t-l">
        </div>
        <div class="mid-t-r">
        </div>
        <i class="iconfont icon-xialajiantouxiao"></i>
      </div>
      <div class="mid-m">编辑简介
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="bot" ref="bot" v-if="musicvalue">
      <van-sticky offset-top="1rem" :container="bot">
        <div class="bot-t">
          <i class="iconfont icon-24gf-playCircle"></i>
          <div class="text">播放全部
            <span>({{userinfo.musicsum}})</span>
          </div>
          <i class="iconfont icon-xiazai"></i>
          <i class="iconfont icon-quanxuan"></i>
        </div>
      </van-sticky>
      <van-sticky offset-top="1.86rem" :container="bot">
        <van-notice-bar mode="closeable" background="#fff" color="#000" :left-icon="music.isplay==true? 'pause':'play'" class="vnb" v-if="music.nowmusic!==null" @click="isplay" ref="vsk_vnb">
          <div class="text">{{music.isplay==true? '正在播放：':'继续播放：'}}<span>{{music.nowmusic.name}}-{{music.nomusiczz}}</span></div>
        </van-notice-bar>
      </van-sticky>
      <div class="playlist" v-for="(m,index) in JSON.parse(JSON.stringify(music.nowmusiclist))" :key="index" @click="gotosongxq(m.id,JSON.parse(JSON.stringify(music.nowmusiclist)),index)">
        <div class="playlist-l">{{index+1}}</div>
        <div class="playlist-m">
          <div class="musicname">{{m.name}}
            <span v-show="m.alia.length>0">（{{m.alia[0]}}）</span>
          </div>
          <div class="musiczz">
            <van-icon name="like" size="0.02rem" color="red" />
            <div class="name">{{musicararr[index]}} -{{m.name}}</div>
          </div>
        </div>
        <i class="iconfont icon-shipin"></i>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>
    <div class="bot" ref="bot" v-if="!musicvalue">
      <van-loading size="0.6rem" color="red" text-color="#808080" class="load">加载中...</van-loading>     
    </div>
  </div>
</template>

<script>
import useStore from '../pinia';
import emitter from '../bus';
import { ref, reactive ,onMounted ,toRaw } from 'vue';
import { useRouter,useRoute} from 'vue-router';
export default {
    name:'playlist',
    setup(){
        const bot=ref(null)
        const playlist=ref(null)
        const musicvalue=ref(false)

        const { user, userinfo ,music } = useStore();
        const router=useRouter()
        const route=useRoute()

        const playlistbgc=route.query.bgurl
        const goback=()=>{
          emitter.emit('goback',true)
          emitter.off('isplay')
          router.go(-1)
        }
        //前往歌曲详情-参数为歌曲id和此歌单全部歌曲
        const gotosongxq=(id,songs,index)=>{
          emitter.off('isplay')
          vnb_left_icon.value='pause'
          //设置现在播放地歌曲
          music.Setnowmusic(id,songs)
          //设置现在播放地歌曲url
          music.Setnowmusicurl(id)
          //设置现在播放地歌曲作者
          music.Setnowmusiczz(index)
          //设置现在播放地歌曲id
          music.setmusicid(id)
          //设置现在播放歌曲的坐标-index
          music.setmusicindex(index)
          emitter.emit('gotosongxq',true)

          emitter.emit('changmusic',true)
        }
        const musicararr=[]
        //修改作者名的函数
        const musicar=(musicall)=>{
          for(let i=0;i<musicall.length;i++){
            let arr=[]
            for(let j=0;j<musicall[i].ar.length;j++){
              arr.push(musicall[i].ar[j].name)
            }
            musicararr.push(arr.join('/'))
          }
        }
        emitter.on('changsongxqicon',data=>{
          if(data){
            vnb_left_icon.value='pause'
          }else{
            vnb_left_icon.value='play'
          }
        })
        const vnb_left_icon=ref('play')
        onMounted(()=>{
          console.log('没有用缓存');
          console.log(music.isplay);
          let isgetplaylistxq=userinfo.Getplaylistxq({id:route.query.id})
          isgetplaylistxq.then(
            res=>{
              if(res.code=='200'){
                musicvalue.value=true
                music.Setnowmusiclist(userinfo.tracks)
                //修改作者名
                musicar(toRaw(music.nowmusiclist))
                //请求歌曲的url
                music.Getmusicurl({id:music.getmusicsid})
                //将更改后的作者名存到pinia-music
                music.setmusicar(musicararr)
              }else{
                console.log(res.message);
              }
            }
          ).catch(
            err=>{
              console.log(err);
            }
          )
        })
        const vsk_vnb=ref(null)
        //是否播放
        const isplay=(e)=>{
            if(e.pageX<=320){
              if(music.isplay){
                music.changisplay(false)
                emitter.emit('isplay',false)
                emitter.emit('changsongxqicon',false)
                vnb_left_icon.value='pause'
              }else{
                music.changisplay(true)
                emitter.emit('isplay',true)
                emitter.emit('changsongxqicon',true)
                vnb_left_icon.value='play'
              }
            }
        }
        return{
          isplay,
          goback,
          gotosongxq,
          vsk_vnb,
          playlist,
          vnb_left_icon,
          bot,
          userinfo,
          user,
          music,
          musicvalue,
          playlistbgc,
          musicararr,
        }
    }
}
</script>

<style lang="less" scoped var="{ playlistbgc }">
#playlist{
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 100%;
  height: 100vh;
  .top{
    position: fixed;
    top: 0;
    z-index: 13;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 1rem;
    color: #fff;
    overflow: hidden;
    background-color: #fff;
    .bgc-box{
      position: relative;
      width: 100%;
      height: 100%;
      // background-color: rgb(0, 0, 0);
      .bgc{
        position: absolute;
        top: 0;
        z-index: 3;
        width: 100%;
        height: 1rem;
        opacity: 1;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(30px);
        transform: scale(2);
        background-position: 50%;
      }
    }
    .top-m{
      position: absolute;
      // top: 0;
      z-index: 3;
      font-size: 0.35rem;
      i{
        margin-left: 0.1rem;
        font-size: 0.2rem;
        color: rgb(225, 225, 225);
      }
    }
    i{
      position: absolute;
      z-index: 3;
      font-size: 0.4rem;
    }
    .icon-search{
      font-weight: bold;
      right: 1rem;
    }
    .icon-gengduo1{
      right: 0.2rem;
    }
    .icon-xiangzuo1{
      left: 0.2rem;
    }
  }
  .mid{
    position: relative;
    
    width: 100%;
    height: 4.8rem;
    overflow: hidden;
    .img-box{
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(130px);
      transform: scale(2);
      background-position: 50%;
    }
    .mid-t{
      position: absolute;
      display: flex;
      width: 100%;
      z-index: 2;
      padding: 0.4rem 0.2rem 0 0.2rem;
      .mid-t-l{
        position: relative;
        margin-right: 0.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 0.2rem;
        box-shadow: 0px -1px 1px 1px rgba(155, 155, 155, 0.5);
        overflow: hidden;
        img{
          height: 100%;
          opacity: 0.9;
        }
        .playcs{
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          color: #fff;
          font-size: 0.1rem;
          font-weight: bold;
          i{
            font-size: 0.1rem;
          }
        }
      }
      .mid-t-r{
        flex: 1;
        color: #fff;
        .name{
          font-size: 0.35rem;
          font-weight: bold;
        }
        .user{
          margin-top: 0.2rem;
          display: flex;
          align-items: center;
          .avater{
            margin-right: 0.1rem;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            overflow: hidden;
            img{
              height: 100%;
            }
          }
          .username{
            font-size: 0.25rem;
          }
        }
      }
      .icon-xialajiantouxiao{
        text-align: center;
        line-height: 0.48rem;
        width: 0.4rem;
        height: 0.4rem;
        font-size: 0.2rem;
        color: #fff;
        border-radius: 50%;
        background-color: rgba(255, 255, 255,0.3);
      }
      }
    .mid-m{
      position: absolute;
      top: 2.5rem;
      left: 0.2rem;
      z-index: 5;
      margin-top: 0.15rem;
      font-size: 0.2rem;
      color: rgba(255, 255, 255,0.7);
    }
    .mid-b{
      position: absolute;
      bottom: 0.6rem;
      z-index: 3;
      margin-top: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 0.2rem;
      // height: 1.5rem;
      .mid-b-c{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 31%;
        height: 0.85rem;
        border-radius: 0.5rem;
        color: #fff;
        background-color: rgba(255, 255, 255,0.4);
        i{
          margin-right: 0.1rem;
          font-size: 0.45rem;
        }
        div{
          font-weight: bold;
        }
        .fxsum{
          margin-top: 0.05rem;
          font-size: 0.35rem;
        }

      }
    }
  }
  .bot{
    position: absolute;
    margin-top: -0.25rem;
    padding-bottom: 2rem;
    width: 100%;
    z-index: 2;
    // height: 60vh;
    border-radius: 0.25rem 0.25rem 0 0;
    overflow: hidden;
    background-color: #fff;
    .load{
      padding-top: 1.5rem;
      text-align: center;
    }
    .bot-t{
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.2rem;
      background-color: #fff;
      .icon-24gf-playCircle{
        color: red;
        font-size: 0.5rem;
      }
      .text{
        margin-left: 0.2rem;
        font-size: 0.35rem;
        font-weight: bold;
        // width: 80%;
        flex: 1;
        span{
          color: rgb(149, 149, 149);
          font-size: 0.2rem;
          font-weight: normal;
        }
      }
      i{
        font-size: 0.4rem;
      }
      .icon-xiazai{
        margin-right: 0.3rem;
      }
    }
    .vnb{
      padding: 0 0.25rem;
      border-top: 1px solid rgba(223, 223, 223,0.5);
      border-bottom: 1px solid rgba(223, 223, 223,0.5);
      .text{
        margin-left: 0.07rem;
        span{
          color: rgb(173, 172, 172);
        }
      }
    }
    .playlist{
      display: flex;
      margin-bottom: 0.1rem;
      padding: 0.2rem 0.2rem 0.1rem 0.2rem;
      width: 100%;
      height: 1.1rem;
      color: rgb(144, 144, 144);
      .playlist-l{
        padding-left: 0.15rem;
        width: 10%;
        line-height: 0.7rem;
      }
      .playlist-m{
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .musicname{
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span{
            color: rgb(158, 158, 158);
          }
        }
        .musiczz{
          margin-top: 0.1rem;
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .name{
            margin-left: 0.1rem;
            font-size: 0.2rem;
          }
        }
      }
      i{
        color: rgb(190, 188, 188);
        font-size: 0.4rem;
        
      }
      .icon-shipin{
        margin-right: 0.3rem;
      }
      .icon-shipin,.icon-gengduo{
        line-height: 0.7rem;
      }
    }
  }
  
}
</style>