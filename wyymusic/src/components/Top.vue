<template>
  <div id="index">
    <div id="top">
        <van-search class="s" background=var(--lightchlidern-bg-color) v-model="searchvalue" shape="round"  placeholder="请输入搜索关键词" />
        <i class="iconfont icon-mic-on-full"></i>
    </div>
    <div class="swipe">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
    </div>
    <div class="tag-box">
      <ul class="tag" @touchstart="down($event,tag,1)" ref="tag">
          <li v-for="(t,index) in tagvalue" :key="index">
              <div class="icon">
                  <i :class="t.icon"></i>
              </div>
              <div class="text">{{t.text}}</div>
          </li>
      </ul>
    </div>
    <div class="recommend">
      <div class="xian"></div>
       <div class="top">
          <h1>推荐歌单</h1>
          <div class="text">更多
            <i class="iconfont icon-xiangyou1"></i>
          </div>
       </div>
       <ul class="bot" ref="bot" @touchstart="down($event,bot,2)">
          <li>
              <van-swipe class="one" vertical :show-indicators="false" :autoplay="4000">
                <van-swipe-item>1</van-swipe-item>
                <van-swipe-item>2</van-swipe-item>
                <van-swipe-item>3</van-swipe-item>
                <van-swipe-item>4</van-swipe-item>
              </van-swipe>
              <i class="iconfont icon-circulationxunhuan"></i>
              <div class="wz">好听到单曲循环哟</div>
          </li>
          <li v-for="(m,index) in 5" :key="index">
              <img src="" alt="">
              <div class="musicsum">
                <i class="iconfont icon-xiangyousanjiaoxing">1223万</i>
              </div>
              <div class="wz">好听到单曲循环哟好听到单曲好听到单曲好听到单曲</div>
          </li>
       </ul>
    </div>
    <div class="fenge"></div>
    <div class="songlist">
      <div class="top">
        <i class="iconfont icon-shuaxin"> 好听的华语歌曲精选</i>
        <div class="text">
          <i class="iconfont icon-kaishi1"></i>
          播放
        </div>
      </div>
      <van-swipe class="my-swipe" :loop="false" :show-indicators="false" :width="360">
        <van-swipe-item v-for="(v,index) in 4 " :key="index">
          <ul>
            <li v-for="(m,index) in 3" :key=index>
              <div class="music">
                <img src="" alt="">
                <i class="iconfont icon-kaishi1"></i>
              </div>
              <div class="musicname">
                <div class="musicname-top">
                  <div class="name">哪里都是你 -</div>
                  <div class="singer">队长</div>
                </div>
                <div class="musicname-bot">昨日10万播放</div>
                <i class="iconfont icon-shipin"></i>
              </div>
            </li>
          </ul>
        </van-swipe-item>
        
      </van-swipe>
    </div>
    <div class="fenge"></div>
  </div>
</template>

<script>
  import { ref,reactive,onMounted,inject } from 'vue';
  
  export default {
    //主页
    name:'index',
    setup(){
      const searchvalue=ref('')
      const tag=ref(null)
      const bot=ref(null)
      const tagvalue=reactive([
        {
          icon:'',
          text:'每日推荐',
        },
        {
          icon:'iconfont icon-shouyinji',
          text:'私人FM',
        },
        {
          icon:'iconfont icon-gedan',
          text:'歌单',
        },
        {
          icon:'iconfont icon-paihangbang',
          text:'排行榜',
        },
        {
          icon:'iconfont icon-book-full',
          text:'有声书',
        },
        {
          icon:'iconfont icon-yinle',
          text:'数字专辑',
        },
        {
          icon:'iconfont icon-live',
          text:'直播',
        },
        {
          icon:'iconfont icon-wodeguanzhu',
          text:'关注新歌',
        },
        {
          icon:'iconfont icon-wujiaoxing',
          text:'歌房',
        },
        {
          icon:'iconfont icon-youxitianchong',
          text:'游戏专区',
        },
      ])
      const day=reactive(['icon-rili','icon-rili1','icon-rili3','icon-rili2','icon-rili4','icon-rili13','icon-rili5','icon-rili6','icon-rili8','icon-rili10','icon-rili7','icon-rili9','icon-rili11','icon-rili12','icon-rili14','icon-rili16','icon-rili15','icon-rili17','icon-rili18','icon-rili20','icon-rili19','icon-rili22','icon-rili24','icon-rili21','icon-rili23','icon-rili26','icon-rili25','icon-rili28','icon-rili27','icon-rili30','icon-rili29'])
      
      const animate=inject('animate')
      
      function down(e,obj,index){
        let first=e.touches[0].pageX
        let end=obj.offsetLeft
        obj.ontouchmove=function(e){
          let movex=e.touches[0].pageX-first
          obj.style.left=(end+movex)+'px'
        }
        obj.ontouchend=function(e){
          if(obj.offsetLeft>=0){
            animate(obj,0)
          }
          if(obj.offsetLeft<=-320 && index==1){
            animate(obj,-320)
          }else if(obj.offsetLeft<=-355 && index==2){
            animate(obj,-355)
          }
        }
      }
      
      onMounted(()=>{
        let Day=new Date()
        tagvalue[0].icon='iconfont '+day[Day.getDate()-1]
      })
      
      return{
        searchvalue,
        tagvalue,
        tag,
        bot,
        down
      }
    }
  }
</script>

<style lang="less" scoped>
#index{
  position: relative;
  padding-top: 1.3rem;
  padding-bottom: 3rem;
  width: 100%;
  // height: 100%;
  // overflow: hidden;
  // background-color: var(--lightchlidern-bg-color);
  #top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      z-index: 2;
      padding: 0.2rem;
      width: 100%;
      height: 1.3rem;
      color: var(--light-font-size-color);
      // background-color: var(--light-bg-color);
      background-color: var(--lightchlidern-bg-color);
      :deep(.van-search__content){
        background-color: var(--light-bg-color);
      }
      .s{
        margin-left: 0.7rem;
        width: 80%;
        height: 100%;
        padding: 0;
        background-color: var(--light-bg-color);
      }
      .iconfont{
        font-size: 0.4rem;
        
      }
  }
  .swipe{
    width: 100%;
    height: 2.4rem;
    padding: 0 0.2rem;
    // background-color: pink;
    background-color: var(--lightchlidern-bg-color);
    .my-swipe{
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
      background-color: pink;
    }
  }
  .tag-box{
    position: relative;
    width: 100%;
    height: 2rem;
    // height: 100%;
    background-color: #fff;
    .tag{
      position: absolute;
      left: 0;
      // margin: 0.5rem 0;
      padding: 0 0.2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      color: var(--light-tag-fz-color);
      background-color: var(--lightchlidern-bg-color);
      li{
        margin-right: 0.39rem;
        width: 1rem;
        // height: 100%;
        // background-color: pink;
        .icon{
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          background-color: var(--light-tag-bg-color);
          .iconfont{
            // color: red;
            font-size: 0.45rem;
          }
        }
        .text{
          margin-top: 0.1rem;
          text-align: center;
          font-size: 0.1rem;
          color: var(--light-tag-text-fz-color);
        }
      }
    }
  }
  
  .fenge{
    width: 100%;
    height: 0.15rem;
  }
  .recommend{
    position: relative;
    // margin-top: 2.01rem;
    padding: 0.2rem 0.2rem;
    width: 100%;
    height: 4.1rem;
    color: var(--light-font-size-color);
    border-radius: 0 0 0.2rem 0.2rem;
    // background-color: pink;
    background-color: var(--lightchlidern-bg-color);
    .xian{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgb(220, 220, 220);
    }
    .top{
      display: flex;
      justify-content: space-between;
      h1{
        font-size: 0.35rem;
      }
      .text{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.1rem;
        height: 0.5rem;
        line-height: 2;
        font-size: 0.1rem;
        border-radius: 0.2rem;
        border: 1px solid #d9d7d7;
        i{
          font-size: 0.1rem;
          
        }
      }
      
    }
    .bot{
      position: absolute;
      left: 0;
      display: flex;
      margin-top: 0.2rem;
      padding: 0 0.2rem;
      li{
        margin-right: 0.2rem;
        position: relative;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 0.2rem;
        background-color: pink;
        // overflow: hidden;
        .musicsum{
          position: absolute;
          top: 0.01rem;
          right: -0.06rem;
          // width: 1rem;
          height: 0.4rem;
          padding: 0 0.1rem;
          text-align: center;
          transform: scale(0.8);
          
          line-height: 1.5;
          border-radius: 0.2rem;
          background-color: #c3c3c3;
          i{
            color: #fff;
            font-size: 0.1rem ;
            
          }
        }
        .one{
          width: 100%;
          height: 100%;
        }
        .wz{
          margin-top: 0.1rem;
          width: 100%;
          height: 0.6rem;
          font-size: 0.2rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .icon-circulationxunhuan{
          position: absolute;
          top: 0;
          right: 0.1rem;
          font-size: 0.4rem;
          color: #fff;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .songlist{
    // padding: 0.2rem;
    width: 100%;
    height: 4.3rem;
    border-radius: 0.2rem;
    color: var(--light-font-size-color);
    // background-color: pink;
    background-color: var(--lightchlidern-bg-color);
    .top{
      padding: 0.2rem 0.2rem 0;
      display: flex;
      justify-content: space-between;
      .text{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.1rem;
          height: 0.5rem;
          border-radius: 0.2rem;
          border: 1px solid #d9d7d7;
          font-size: 0.1rem;
          i{
            font-size: 0.1rem;
          }
      }
    }
    .my-swipe{
      margin-top: 0.1rem;
      padding-left: 0.2rem;
      width: 100%;
      height: 3.5rem;
      // background-color: pink;
      .van-swipe-item{
        // margin-right: 0.1rem;
        padding: 0.1rem 0;
        // background-color: pink;
        ul{
          width: 100%;
          height: 100%;
          li{
            margin-bottom: 0.1rem;
            display: flex;
            justify-content: space-between;
            .music{
              position: relative;
              overflow: hidden;
              width: 0.9rem;
              height: 0.9rem;
              border-radius: 0.1rem;
              background-color: #fff;
              img{
                width: 100%;
                height: 100%;
              }
              i{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                // color: #fff;
                color: #000;
                opacity: 0.8;
              }
            }
            .musicname{
              position: relative;
              // display: flex;
              padding-bottom: 0.1rem;
              
              width: 83%;
              border-bottom: 1px solid #808080;
              .musicname-top{
                display: flex;
                width: 90%;
                .singer{
                  margin-left: 0.1rem;
                  line-height: 2;
                  font-size: 0.1rem;
                }
              }
              .musicname-bot{
                text-align: center;
                margin-left: -0.2rem;
                line-height: 1.8;
                width: 2rem;
                height: 0.4rem;
                font-size: 0.1rem;
                border-radius: 0.1rem;
                color: #ff8c31;
                transform: scale(0.8);
                background-color: #f2ecde;
              }
              .icon-shipin{
                position: absolute;
                top: 50%;
                right: 0.2rem;
                color: #808080;
                transform: translate(-50%,-50%);
              }
            }
          }
          li:last-child{
            .musicname{
              border-bottom: none;
            }
          }
        }
      }
    }
  }
}
</style>