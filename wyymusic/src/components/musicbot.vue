<template>
  <div class="music" v-if="music.nowmusic!==null" >
        <div class="img" @click="opensongxq">
            <img :src="nowmusic.al.picUrl" alt="" ref="img">
        </div>
        <div class="musicname" @click="opensongxq"> 
            <div class="name">{{nowmusic.name}} -</div>
            <div class="singer">{{music.nomusiczz}}</div>
        </div>
        <div class="play" @click="musicbotisplay">
            <van-circle layer-color="#cccbcb" :current-rate="currentRate" :rate="100" :speed="100" color="#393e46" />
            <i :class="musicboticon"></i>
        </div>
        <i class="iconfont icon-24gf-playlist2" @click="songlist"></i>
        <audio :src="music.nowmusicurl" ref="audio"></audio>
        <!-- 目前播放歌曲的列表 -->
        <van-popup :show="songlistshow" round position="bottom"  :style="{ height: '65%',width:'100%' }" @close="closesonglist" teleport="#home" >
        <div class="songlist">
            <div class="s-top">
            <div class="s-top-t">当前播放<span>({{userinfo.musicsum}})</span></div>
            <div class="s-top-b">
                <i class="iconfont icon-xunhuan" v-show="music.nowmusicplayorder==0" @click="switchplayorder"></i>

                <i class="iconfont icon-danquxunhuan" v-show="music.nowmusicplayorder==1" @click="switchplayorder"></i>

                <i class="iconfont icon-suiji" v-show="music.nowmusicplayorder==2" @click="switchplayorder"></i>

                <div class="text" v-show="music.nowmusicplayorder==0" @click="switchplayorder">列表循环</div>
                <div class="text" v-show="music.nowmusicplayorder==1" @click="switchplayorder">单曲循环</div>
                <div class="text" v-show="music.nowmusicplayorder==2" @click="switchplayorder">云随机</div>
                <i class="iconfont icon-xiazai"></i>
                <i class="iconfont icon-shoucang"></i>
                <van-icon name="delete-o" />
            </div>
            </div>
            <div class="s-bot" ref="sbot">
                <van-notice-bar v-for="(m,index) in JSON.parse(JSON.stringify(music.nowmusiclist))" :key="index" mode="closeable" :background="vnbgc" color="#000" :scrollable="false" @click="switchsong(m.id,JSON.parse(JSON.stringify(music.nowmusiclist),index),index)">
                    <div>{{m.name}}<span v-show="m.alia.length>0">({{m.alia[0]}})</span> - <span class="gs">{{music.musicar[index]!==''?music.musicar[index]:'未知'}}</span></div>
                </van-notice-bar>
            </div>
        </div>
        </van-popup>
    </div>
    
</template>

<script>
import useStore from '../pinia';
import emitter from '../bus';
import { ref,onMounted,toRaw,onUnmounted,nextTick} from 'vue';
export default {
    name:'musicbot',
    setup(){
        const vnbgc=ref('#fff')
        const vnb=ref(null)
        const sbot=ref(null)
        const startmusicflag=ref(null)
        const currentRate=ref(0)
        const times=ref(0)
        const startmusic=()=>{
            startmusicflag.value=setInterval(()=>{
                times.value+=100
                currentRate.value=(times.value/Math.floor(nowmusic.dt/1000))
            },1000)
        }
        const stopmusic=()=>{
            clearInterval(startmusicflag.value)
            startmusicflag.value=null
        }
        onMounted(()=>{
            if(audio.value!==null){
                stopmusic()
                startmusic()
                audio.value.play()
                music.changisplay(true)
                if(music.isplay){
                    img.value.style.animationPlayState='running'
                    musicboticon.value='iconfont icon-weibiaoti519'
                }else{
                    img.value.style.animationPlayState='paused'
                    musicboticon.value='iconfont icon-kaishi1'
                }
            }
        })
        const musicboticon=ref('iconfont icon-kaishi1')
        const songlistshow=ref(false)
        const audio=ref(null)
        const { music,userinfo } =useStore()
        const nowmusic=toRaw(music.nowmusic)

        const img=ref(null)
        const songlist=()=>{
            songlistshow.value=true
            nextTick(()=>{
                if(sbot.value!==null){
                    sbot.value.children[music.nowmusicindex].style.color='red'
                }
            })
        }
        //songxq发起的事件
        emitter.on('isplay',data=>{
            console.log('musicbot的isplay触发');
            if(audio.value!==null){
                if(data){
                    startmusic()
                    audio.value.play()
                    musicboticon.value='iconfont icon-weibiaoti519'
                    img.value.style.animationPlayState='running'
                }else{
                    stopmusic()
                    audio.value.pause()
                    musicboticon.value='iconfont icon-kaishi1'
                    img.value.style.animationPlayState='paused'
                }
            }
        })
        //songxq发起的事件
        emitter.on('opensonglist',data=>{
            if(data){
                songlist()
            }
        })
        
        //是否播放
        const musicbotisplay=()=>{
            if(music.isplay){
                stopmusic()
                music.changisplay(false)
                musicboticon.value='iconfont icon-kaishi1'
                audio.value.pause()
                img.value.style.animationPlayState='paused'
                emitter.emit('changsongxqicon',false)
            }else{
                startmusic()
                music.changisplay(true)
                musicboticon.value='iconfont icon-weibiaoti519'
                audio.value.play()
                img.value.style.animationPlayState='running'
                emitter.emit('changsongxqicon',true)
            }
        }
        //前往歌曲详情
        const opensongxq=()=>{
            emitter.emit('opensongxq',true)
        }
        //关闭歌曲列表
        const closesonglist=()=>{
          songlistshow.value=false
        }
        //切换播放方式
        const switchplayorder=()=>{
          if(music.nowmusicplayorder==2){
            music.Setnowmusicplayorder(0)
          }else{
            music.Setnowmusicplayorder(music.nowmusicplayorder+1)
          }
        }
        //弹出层的歌单列表的选择歌曲
        const switchsong=(id,songs,index)=>{
            for(let i=0;i<sbot.value.children.length;i++){
                sbot.value.children[i].style.color='#000'
            }
            sbot.value.children[index].style.color='red'
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
            emitter.emit('switchmusic',true)
            emitter.emit('changmusic',true)
        }
        onUnmounted(()=>{
            // emitter.off('switchmusic')
            // emitter.off('changmusic')
        })
        return{
            vnb,
            sbot,
            vnbgc,
            img,
            currentRate,
            nowmusic,
            music,
            userinfo,
            audio,
            musicboticon,
            songlistshow,
            songlist,
            opensongxq,
            musicbotisplay,
            closesonglist,
            switchplayorder,
            switchsong,
        }
    }
}
</script>

<style lang="less" scoped>
.music{
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
      width: 100%;
      height: 1rem;
      padding: 0 0.2rem;
      .img{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -0.1rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 1px solid #000;
        background-color: rgb(0, 0, 0);
        overflow: hidden;
        @keyframes imgrotate {
            from{
            transform: rotate(0);
            }
            to{
            transform: rotate(360deg);
            }
        }
        img{
            border-radius: 50%;
            height: 70%;
            animation: imgrotate 20s infinite linear;
        }
      }
      .musicname{
        display: flex;
        width: 70%;
        margin-left: 1.2rem;
        margin-right: 0.2rem;
        font-size: 0.3rem;
        height: 1rem;
        overflow: hidden;
        .name{
            line-height: 0.97rem;
        }
        .singer{
            margin-left: 0.1rem;
            line-height: 1rem;
            font-size: 0.2rem;
        }
      }
      :deep(.van-circle){
        width: 0.6rem;
        height: 0.6rem;
      }
      .play{
        margin-right: 0.4rem;
        position: relative;
        width: 0.6rem;
        height: 0.6rem;
        .icon-weibiaoti519,.icon-kaishi1{
          position: absolute;
          top: 50%;
          left: 55%;
          transform: translate(-50%,-50%);
        }
        .icon-weibiaoti519{
          left: 50%;
        }
      }
      .icon-24gf-playlist2{
        font-size: 0.45rem;
      }
      
}
</style>