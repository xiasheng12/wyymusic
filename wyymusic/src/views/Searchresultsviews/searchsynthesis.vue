<template>
  <div id="searchsynthesis">
    <div class="interest">
      <div class="i-top">你可能感兴趣</div>
      <div class="i-singer">
        <div class="avarter">
          <img src="" alt="">
        </div>
        <div class="right">
          <div class="right-top">歌手:<span class="name">队长 </span><span class="neiname">(杨浪，youngcaptain)</span></div>
          <div class="right-bot">粉丝:327万，歌曲:99</div>
        </div>
      </div>
      <div class="i-playlist">
        <div class="avarter">
          <img src="" alt="">
        </div>
        <div class="right">
          <div class="right-top">歌单: <span class="name">队长</span><span class="neiname">合集</span></div>
          <div class="right-bot">歌曲:30,播放:1786.5万</div>
        </div>
      </div>
    </div>
    <div class="playlist">
      <div class="p-top">
        <div class="p-t-l">单曲</div>
        <div class="p-t-r">
          <van-icon name="play" size="0.3rem"/>
          <span>播放</span>
        </div>
      </div>
      <ul class="p-bot">
        <li>
          <div class="left">
            <div class="musicname">NUNA 2.0</div>
            <div class="singer">
              <div class="s-left">原唱</div>
              <div class="s-mid">队长/<span>叶琼琳 - NUNA 2.0</span></div>
            </div>
          </div>
          <div class="right">
            <i class="iconfont icon-shipin"></i>
            <i class="iconfont icon-gengduo"></i>
          </div>
        </li>
        
      </ul>
      <div class="p-di">查看更多<span>队长</span>的歌曲 <van-icon name="arrow" /></div>
    </div>
    <div class="songlist">
      <div class="p-top">
        <div class="p-t-l">歌单</div>
      </div>
      <ul class="p-bot">
        <li>
          
        </li>
      </ul>
      <div class="p-di">查看更多<span>队长</span>的歌单 <van-icon name="arrow" /></div>
    </div>
    <div class="video">
      <div class="p-top">
        <div class="p-t-l">视频</div>
      </div>
      <ul class="p-bot">
        <li>
          
        </li>
      </ul>
      <div class="p-di">查看更多<span>队长</span>的视频 <van-icon name="arrow" /></div>
    </div>
  </div>
</template>

<script>
  import useStore from '../../pinia';
  import { ref,onMounted,toRaw,reactive } from 'vue';
  export default {
      name:'searchsynthesis',
      setup(){
        const { search } = useStore();
        onMounted(()=>{
          console.log(search.searchvalue,searchsynthesis);
        })
          return {
           
          }
      }
  }
</script>

<style lang="less" scoped>
#searchsynthesis{
    width: 100%;
    padding: 0 0.2rem 2rem 0.2rem;
    .interest{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 0.2rem;
      padding: 0.4rem;
      width: 100%;
      height: 3.5rem;
      border-radius: 0.3rem;
      background-color: #fff;
      .i-top{
        font-size: 0.1rem;
        color: rgb(170, 170, 170);
        
      }
      .i-playlist,.i-singer{
        display: flex;
        align-items: center;
        width: 100%;

        .avarter{
          margin-right: 0.2rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: pink;
        }
        .right{
          .right-top{
            .name{
              color: rgb(143, 212, 242);
            }
            .neiname{
              color: rgb(170, 170, 170);
            }
          }
          .right-bot{
            margin-top: 0.1rem;
            font-size: 0.25rem;
            color: rgb(170, 170, 170);
          }
        }
      }
      .i-playlist{
        .avarter{
          border-radius: 0.15rem;
        }
      }
    }
    .video,.songlist,.playlist{
      margin-top: 0.3rem;
      padding: 0.4rem  0 0 0;
      border-radius: 0.3rem;
      width: 100%;
      background-color: #fff;
      .p-top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.4rem;
        padding-bottom: 0.2rem;
        .p-t-l{
          font-size: 0.35rem;
          font-weight: bold;
        }
        .p-t-r{
          font-size: 0.25rem;
          border-radius: 0.3rem;
          padding: 0.1rem 0.2rem;
          border: 1px solid #000;
        }
      }
      .p-bot{
        padding: 0 0.4rem;
        width: 100%;
        // height: 100%;
        li{
          display: flex;
          align-items: center;
          padding: 0.3rem 0;
          width: 100%;
          border-top: 1px solid rgb(226, 226, 226);
          .left{
            flex: 1;
            .musicname{
              font-size: 0.35rem;
            }
          .singer{
              margin-top: 0.1rem;
              display: flex;
              font-size: 0.2rem;
              .s-left{
                margin-right: 0.1rem;
                padding:0 0.1rem;
                color: #fff;
                border-radius: 0.1rem;
                background-color: red;
              }
            .s-mid{
                font-size: 0.25rem;
                color: rgb(85, 202, 210);
                span{
                  color: rgb(187, 187, 187);
                }
              }
            }
          }
          .right{
            
            color: rgb(169, 169, 169);
            i{
              font-size: 0.35rem;
            }
            .icon-gengduo{
              
              margin-left: 0.3rem;
            }
          }
        }
        
      }
      .p-di{
        width: 100%;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.25rem;
        border-top: 1px solid rgb(214, 214, 214);
        color: rgb(186, 186, 186);
        span{
          color: rgb(85, 202, 210);
        }
      }
    }
    .video,.songlist{
      .p-bot{
        li{
          border: none;
        }
      }
    }
}
</style>