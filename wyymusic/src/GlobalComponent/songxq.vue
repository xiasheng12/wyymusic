<template>
  <div id="songxq">
      <div class="songtop">
          <i class="iconfont icon-xialajiantouxiao" @click="goback"></i>
          <div class="musicname">
            <van-notice-bar color="#fff" background="none"  :text="nowmusic.name" class="vnb" />
            <van-notice-bar color="#fff" background="none"  :text="music.nomusiczz" :scrollable="false" class="zz" />
          </div>
          <div class="zhibo"></div>
          <i class="iconfont icon-fenxiang2"></i>
      </div>
      <div class="main">
          <div class="songimg" ref="songimg">
            <img :src="nowmusic.al.picUrl" alt="">
          </div> 
          <div class="quan-box" ref="quanbox">
              <div class="quan">
                <div class="yuan"></div>
              </div>
              <div class="quan1">
                <div class="yuan"></div>
              </div>
              <div class="quan2">
                <div class="yuan"></div>
              </div>
          </div>
      </div>
      <div class="songbot">
        <div class="top">
          <van-icon name="like" color="red" />
          <i class="iconfont icon-xiazai"></i>
          <i class="iconfont icon-yinlechangpian"></i>
          <i class="iconfont icon-pinglun2"></i>
          <i class="iconfont icon-gengduo"></i>
        </div>
        <div class="mid">
          <div class="mid-l">{{getnowmusictime(bftime)}}</div>
          <van-slider v-model="bftime" @change="onChange" :min="0" :max="nowmusic.dt" active-color="#d9d9d9" class="mid-m" >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <div class="mid-r">{{nowmusictime}}</div>
        </div>
        <div class="bot">
          <i class="iconfont icon-xunhuan" v-show="music.nowmusicplayorder==0" @click="switchplayorder"></i>
          <i class="iconfont icon-danquxunhuan" v-show="music.nowmusicplayorder==1" @click="switchplayorder"></i>
          <i class="iconfont icon-suiji" v-show="music.nowmusicplayorder==2" @click="switchplayorder"></i>
          <i class="iconfont icon-xiangzuo" @click="Previous">
            <span></span>
          </i>
          <van-icon  :name="playicon" size="1.2rem" @click="playsong" />
          <i class="iconfont icon-xiangyou" @click="Next">
            <span class="you"></span>
          </i>
          <i class="iconfont icon-24gf-playlist2" @click="opensonglist"></i>
        </div>
      </div>
      <div class="bgc">
        <img :src="nowmusic.al.picUrl" alt="">
      </div>
  </div>
</template>

<script>
import { ref,reactive ,onMounted,onUnmounted,toRaw} from 'vue'
import useStore from '../pinia'
import emitter from '../bus'
export default {
    name:'songxq',
    setup(){
        const songtime=ref(0)
        const { music ,userinfo} = useStore()
        const playicon=ref('play-circle-o')
        const goback=()=>{
          emitter.emit('back',false)
        }
        emitter.on('changsongxqicon',data=>{
          if(data){
            playicon.value='pause-circle-o'
            if(songimg.value!==null){
              startmusic()
              songimg.value.style.animationPlayState='running'
              for(let i=0;i<quanbox.value.children.length;i++){
                quanbox.value.children[i].style.animationPlayState='running'
              }
            }
          }else{
            playicon.value='play-circle-o'
            if(songimg.value!==null){
              stopmusic()
              songimg.value.style.animationPlayState='paused'
              for(let i=0;i<quanbox.value.children.length;i++){
                quanbox.value.children[i].style.animationPlayState='paused'
              }
            }
          }
        })
        //播放的时间-number
        const bftime = ref(0);
 
        const onChange = (value) => {
          bftime.value=value
        }
        const nowmusic=toRaw(music.nowmusic)

        const getnowmusictime=(nowmusictime)=>{
          let m=Math.floor(Math.floor(nowmusictime/1000)/60)
          let s=Math.floor(nowmusictime/1000)-Math.floor(Math.floor(nowmusictime/1000)/60)*60
          m=m.toString()>10?m:'0'+m
          s=s.toString()>10?s:'0'+s
          return m+':'+s
        }

        const startmusicflag=ref(null)

        const startmusic=()=>{
          startmusicflag.value=setInterval(()=>{
            bftime.value+=1000
            if(bftime.value/1000>=nowmusic.dt/1000){
              console.log('下一首');
              stopmusic()
              Next()
            }
          },1000)
        }
        const stopmusic=()=>{
          clearInterval(startmusicflag.value)
          startmusicflag.value=null
        }
        const nowmusictime=getnowmusictime(nowmusic.dt)
        const songimg=ref(null)
        
        onMounted(()=>{

          if(music.isplay){

            startmusic()
            playicon.value='pause-circle-o'

            songimg.value.style.animationPlayState='running'

            for(let i=0;i<quanbox.value.children.length;i++){
              quanbox.value.children[i].style.animationPlayState='running'
            }
          }else{

            playicon.value='play-circle-o'

            songimg.value.style.animationPlayState='paused'

            for(let i=0;i<quanbox.value.children.length;i++){
              quanbox.value.children[i].style.animationPlayState='paused'
            }
          }
          //获取歌词
          // music.Getlyrics({id:music.getmusicsid[music.nowmusicindex]})
        })  
        //是否播放
        const playsong=()=>{
          if(music.isplay){
            playicon.value='play-circle-o'
            stopmusic()
            music.changisplay(false)

            emitter.emit('isplay',false)

            songimg.value.style.animationPlayState='paused'
            for(let i=0;i<quanbox.value.children.length;i++){
              quanbox.value.children[i].style.animationPlayState='paused'
            }
          }else{
            startmusic()
            music.changisplay(true)
            playicon.value='pause-circle-o'
            emitter.emit('isplay',true)
            songimg.value.style.animationPlayState='running'
            for(let i=0;i<quanbox.value.children.length;i++){
              quanbox.value.children[i].style.animationPlayState='running'
            }
          }
        }
        const quanbox=ref(null)

        
        //下一首
        const Next=()=>{
          stopmusic()
          //判断是否为列表循环
          if(music.nowmusicplayorder==0){
            if(music.nowmusicindex+1==music.nowmusiclist.length){
              console.log('最后');
              music.Switchmusic(toRaw(music.nowmusiclist[0]),toRaw(music.nowmusiclist)[0].id,toRaw(music.musicar)[0],0)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
            }else{
              music.Switchmusic(toRaw(music.nowmusiclist[music.nowmusicindex+1]),toRaw(music.nowmusiclist)[music.nowmusicindex+1].id,toRaw(music.musicar)[music.nowmusicindex+1],music.nowmusicindex+1)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
            }
          }else if(music.nowmusicplayorder==1){
              music.Switchmusic(toRaw(music.nowmusiclist[music.nowmusicindex]),toRaw(music.nowmusiclist)[music.nowmusicindex].id,toRaw(music.musicar)[music.nowmusicindex],music.nowmusicindex)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
          }else{
            let rindex=Math.floor(Math.random()*music.nowmusiclist.length)
            if(toRaw(music.nowrandomindex).indexOf(rindex)=='-1'&&toRaw(music.nowrandomindex).length<toRaw(music.nowmusiclist).length){
              music.Setrandomindex(rindex)
              console.log(toRaw(music.nowrandomindex));
              music.Switchmusic(toRaw(music.nowmusiclist[rindex]),toRaw(music.nowmusiclist)[rindex].id,toRaw(music.musicar)[rindex],rindex)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
            }else if(toRaw(music.nowrandomindex).indexOf(rindex)!=='-1'&&toRaw(music.nowrandomindex).length<toRaw(music.nowmusiclist).length){
              Next()
            }else if(toRaw(music.nowrandomindex).indexOf(rindex)!=='-1'&&toRaw(music.nowrandomindex).length==toRaw(music.nowmusiclist).length){
              console.log('随机播放完毕');
              music.Clearrandomindex()
              Next()
            }
          }
          
        }
        //上一首
        const Previous=()=>{
          stopmusic()
          if(music.nowmusicplayorder==0){
            if(music.nowmusicindex-1==-1){
              console.log('最后');
              music.Switchmusic(toRaw(music.nowmusiclist[music.nowmusiclist.length-1]),toRaw(music.nowmusiclist)[music.nowmusiclist.length-1].id,toRaw(music.musicar)[music.nowmusiclist.length-1],music.nowmusiclist.length-1)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
            }else{
              music.Switchmusic(toRaw(music.nowmusiclist[music.nowmusicindex-1]),toRaw(music.nowmusiclist)[music.nowmusicindex-1].id,toRaw(music.musicar)[music.nowmusicindex-1],music.nowmusicindex-1)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
            }
          }else if(music.nowmusicplayorder==1){
              music.Switchmusic(toRaw(music.nowmusiclist[music.nowmusicindex]),toRaw(music.nowmusiclist)[music.nowmusicindex].id,toRaw(music.musicar)[music.nowmusicindex],music.nowmusicindex)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
          }else{
            let rindex=Math.floor(Math.random()*music.nowmusiclist.length)
            if(toRaw(music.nowrandomindex).indexOf(rindex)=='-1'&&toRaw(music.nowrandomindex).length<toRaw(music.nowmusiclist).length){
              music.Setrandomindex(rindex)
              console.log(toRaw(music.nowrandomindex));
              music.Switchmusic(toRaw(music.nowmusiclist[rindex]),toRaw(music.nowmusiclist)[rindex].id,toRaw(music.musicar)[rindex],rindex)
              emitter.emit('switchmusic',true)
              emitter.emit('changmusic',true)
            }else if(toRaw(music.nowrandomindex).indexOf(rindex)!=='-1'&&toRaw(music.nowrandomindex).length<toRaw(music.nowmusiclist).length){
              Previous()
            }else if(toRaw(music.nowrandomindex).indexOf(rindex)!=='-1'&&toRaw(music.nowrandomindex).length==toRaw(music.nowmusiclist).length){
              music.Clearrandomindex()
              Previous()
            }
          }
        }

        //打开目前歌单播放列表
        const opensonglist=()=>{
          emitter.emit('opensonglist',true)
        }
        const switchplayorder=()=>{
          if(music.nowmusicplayorder==2){
            music.Setnowmusicplayorder(0)
          }else{
            music.Setnowmusicplayorder(music.nowmusicplayorder+1)
          }
        }
        onUnmounted(()=>{
          
        })
        return{
          quanbox,
          songtime,
          songimg,
          bftime,
          music,
          nowmusic,
          playicon,
          nowmusictime,
          onChange,
          goback,
          playsong,
          Next,
          Previous,
          getnowmusictime,
          opensonglist,
          switchplayorder,
        }
    }
}
</script>

<style lang="less" scoped>
#songxq{
 width: 100%;
 height: 100vh;
 color: #fff;
 background-color: rgba(0, 0, 0,0.5);
 .songtop{
  position: absolute;
  top: 0.1rem;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4rem;
  width: 100%;
  height: 1rem;
  overflow: hidden;
  color: rgb(255, 255, 255);            
  .musicname{
    width: 50%;
    flex: 1;
    .zz{    
      line-height: 0.4rem;
      width: 100%;
      height: 0.6rem;
      text-align: center;
      /deep/.van-notice-bar__wrap{
        justify-content: center;
      }
    }
    .vnb{
      margin-top: 0.1rem;
      width: 100%;
      height: 0.6rem;
      text-align: center;
      font-size: 0.4rem;
      /deep/.van-notice-bar__wrap{
        justify-content: center;
      }
    }
    
  }
  .zhibo{
    margin: 0 0.4rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    border: 1px solid #000;
  }
  i{
    font-size: 0.4rem;
  }
  .icon-xialajiantouxiao{
    margin-right: 1.3rem;
  }
 }
 .main{
  position: absolute;
  top: 9%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 65%;
  overflow: hidden;
  @keyframes imgrotate {
    from{
      transform: rotate(0);
    }
    to{
      transform: rotate(360deg);
    }
  }
  .songimg{
    position: absolute;
    z-index: 3;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    // transform: rotate(360deg);
    animation: imgrotate 20s infinite linear ;
    border: 0.09rem solid rgba(141, 141, 141,0.5);
    img{
      height: 100%;
      // transform: rotate(360deg);
    }
  }
  @keyframes quantobig {
    from{
      width: 5rem;
      height: 5rem;
      transform: rotate(0);
      opacity: 0.8;
    }
    to{
      width: 7.5rem;
      height: 7.5rem;
      transform: rotate(-90deg);
      opacity: 0;
    }
  }
  .quan-box{
    position: absolute;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    .quan1,.quan2,.quan{
      position: absolute;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      border: 1px solid rgb(255, 255, 255);
      animation: quantobig 3s infinite linear 1s;
      .yuan{
        position: absolute;
        top: 50%;
        left: -0.1rem;
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        background-color: rgb(255, 255, 255);
      }
    }
    .quan1{
      animation: quantobig 3s infinite linear 2s;
      .yuan{
        top: 87%;
        left: 80%;
      }
    }
    .quan2{
      animation: quantobig 3s infinite linear 3s;
      .yuan{
        top: 1%;
        left: 65%;
      }
    }
  }
 }
 .songbot{
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 3.6rem;
  .top{
    margin-bottom: 0.6rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.4rem;
    i{
      width: 20%;
      font-size: 0.5rem;
      text-align: center;
    }
  }
  .mid{
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    width: 100%;
    height: 0.5rem;
    .mid-m{
      margin: 0 0.15rem;
      width: 100%;
      .custom-button{
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        background-color: #fff;
      }
    }
    .big{
      transform: scale(1.01);
    }
    .mid-l,.mid-r{
      font-size: 0.1rem;
      
    }
  }
  .bot{
    // padding: 0 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // height: 1.6rem;
    // background-color: #fff;
    i{
      position: relative;
      width: 20%;
      font-size: 0.5rem;
      text-align: center;
      span{
        position: absolute;
        left: 0.58rem;
        width: 0.04rem;
        height: 100%;
        border-radius: 0.02rem;
        background-color: rgb(255, 255, 255);
      }
      .you{
        left: 0.89rem;
      }
    }

  }
 }
 .bgc{
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  filter: blur(50px);
  overflow: hidden;
  img{
    height: 100%
  }
 }
}
</style>