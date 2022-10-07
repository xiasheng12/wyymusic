<template>
  <div id="userhome">
    <div class="jbxx">
        <div class="jbxx-top">
            <div class="jbxx-top-l">基本信息</div>
            <div class="jbxx-top-r">
                <i class="iconfont icon-ren"></i>
                <span>村民证</span>
            </div>
        </div>
        <ul class="jbxx-mid">
          <li>村龄：{{userinfo.createDays}}年（{{userinfo.enroll}}注册）</li>
          <li>性别：{{user.gender}}</li>
          <li>年龄：{{user.birthday}} 后 天蝎座</li>
          <li>个人简介：{{user.signature}}</li>
        </ul>
        <div class="jbxx-bot">
          <span>查看全部</span>
          <van-icon name="arrow" />
        </div>
    </div>
    <div class="yypw">
      <div class="jbxx-top">
            <div class="jbxx-top-l">音乐品味</div>
      </div>
      <ul class="yypw-bot">
        <li>
          <div class="top">
            <van-icon name="like" size="0.1rem" />
            <span>喜欢的音乐</span>
            <i class="iconfont icon-a-zu6618"></i>
          </div>
          <div class="mid">{{userinfo.playlist[0].trackCount}}首</div>
          <div class="bot">我的喜欢</div>
        </li>
        <li>
          <div class="top">
            <i class="iconfont icon-paihangbanggequ"></i>
            <span>听歌排行</span>
            <i class="iconfont icon-a-zu6618"></i>
          </div>
          <div class="mid">{{userinfo.listenSongs}}首</div>
          <div class="bot">累计听歌</div>
        </li>
        <li>
          <div class="top">
            <i class="iconfont icon-hourglass-fill"></i>
            <span>黑胶时光机</span>
          </div>
          <div class="mid">每一首歌都心动</div>
          <div class="bot">本周关键词</div>
        </li>
      </ul>
    </div>
    <div class="cjgd">
      <div class="jbxx-top">
            <div class="jbxx-top-l">创建的歌单
              <span>(3个)</span>
            </div>
            <i class="iconfont icon-yonghu2"></i>
      </div>
      <ul class="cjgd-bot" >
        <li v-for="(m,index) in userinfo.playlist" :key="index" v-show="index!==0">
          <div class="gdurl">
            <img :src="m.coverImgUrl" alt="">
          </div>
          <div class="gdname">
            <div class="top">{{m.name}}</div>
            <div class="bot">{{m.trackCount}}首，播放{{m.playCount}}次</div>
          </div>
        </li> 
      </ul>
    </div>
    <div class="wdpl">
      <div class="jbxx-top">
            <div class="jbxx-top-l">我的评论
              <span>(3个)</span>
            </div>
            <i class="iconfont icon-yonghu2"></i>
      </div>
      <div class="wdpl-bot">
        <div class="plmusic">
          <div class="img"></div>
          <div class="js">单曲【Come And Get It(Razihel Remix)】-kresdsad</div>
          <div class="dz">12
            <van-icon name="good-job-o" />
          </div>
        </div>
        <div class="plnr">下载</div>
        <div class="hfdpl">
          <span class="user">@亚达-：</span>
          <div class="nr">万一有一天网易云音乐停止运营了，我这么多收藏的好歌可怎么办，为这个问题已经好几天晚上没睡好觉了哭哭，到底该怎么办才好！经好几天晚上没睡好觉了哭哭</div>
        </div>
        <div class="pltime">2018年12月26日</div>
        <div class="jbxx-bot">
          <span>查看全部</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="yyqd">
      <div class="jbxx-top">
            <div class="jbxx-top-l">愿望清单</div>
            <div class="yyqd-top-r">发布愿望<van-icon name="arrow" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import useStore from '../../pinia';
import {onMounted} from 'vue';
export default {
    name:'userhome',
    setup() {
        const { userinfo ,user } = useStore()
        onMounted(()=>{
          console.log(userinfo.playlist);
        })
        return{
          user,
          userinfo
        }
    }
}
</script>

<style lang="less" scoped>
#userhome{
  margin-top: 0.3rem;
  width: 100%;
  // height: 10rem;
  padding: 0 0.2rem;
  .yyqd,.wdpl,.cjgd,.yypw,.jbxx{
    margin-bottom: 0.3rem;
    width: 100%;
    border-radius: 0.2rem;
    background-color: #fff;
    .jbxx-top{
      padding: 0.3rem 0.3rem 0 0.3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .yyqd-top-r{
        font-size: 0.1rem;
        color: rgb(153, 153, 153);
      }
      .jbxx-top-l{
        font-size: 0.4rem;
        span{
          font-size: 0.1rem;
        }
      }
      .icon-yonghu2{
        color: rgb(190, 190, 190);
      }
      .jbxx-top-r{
        padding: 0.05rem 0.2rem;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 0.3rem;
        font-size: 0.1rem;
        i{
          margin-right: 0.05rem;
        }
      }
    }
    .jbxx-mid{
      margin: 0.3rem 0;
      padding: 0rem 0.3rem 0 0.3rem;
      li{
        margin: 0.1rem 0;
        color: rgb(141, 141, 141);
      }
    }
    .jbxx-bot{
      border-top: 1px solid rgb(208, 208, 208);
      width: 100%;
      height: 0.66rem;
      text-align: center;
      line-height: 0.6rem;
      font-size: 0.28rem;
      color: rgb(141, 141, 141);
    }
    .yypw-bot{
      flex: 1;
      // margin-top: 0.3rem;
      padding: 0.3rem;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 3rem;
      // background-color: pink;
      li{
        padding: 0.15rem;
        width: 32%;
        height: 100%;
        border-radius: 0.2rem;
        background-color: pink;
        .top{
          display: flex;
          align-items: center;
          // justify-content: space-between;
          color: rgba(255, 255, 255,0.8);
          span{
            flex: 1;
            font-size: 0.1rem;
          }
          i{
            font-size: 0.1rem;
          }
        }
        .mid{
          margin-top: 0.1rem;
          width: 100%;
          height: 1.4rem;
          font-size: 0.33rem;
          color: #fff;
        }
        .bot{
          font-size: 0.1rem;
          color: rgba(255, 255, 255,0.8);
        }
      }
    }
    .cjgd-bot{
      padding: 0.3rem;
      width: 100%;
      // height: 3.2rem;
      li{
        margin-bottom: 0.15rem;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1rem;
        .gdurl{
          margin-right: 0.2rem;
          width: 1rem;
          height: 1rem;
          border-radius: 0.2rem;
          overflow: hidden;
          img{
            height: 100%;
          }
        }
        .gdname{
          flex: 1;
          .top{
            font-size: 0.35rem;
          }
          .bot{
            color: rgb(164, 164, 164);
            font-size: 0.25rem;
          }
        }
      }
    }
    .wdpl-bot{
      width: 100%;
      .plmusic{
        display: flex;
        align-items: center;
        padding:  0.3rem 0.3rem 0 0.3rem;
        .img{
          margin-right: 0.1rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 00.1rem;
          border: 1px solid #000;
        }
        .js{
          flex: 1;
          font-size: 0.1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .plnr{
        margin: 0.2rem 0;
        padding: 0 0.3rem;
        font-size: 0.35rem;
      }
      .hfdpl{
        // display: flex;
        margin-left: 0.3rem;
        // padding-left: 0.1rem;
        padding: 0 0.4rem 0 0.1rem;
        width: 100%;
        border-left: 2px solid rgb(185, 185, 185);
        .user{
          color: rgb(0, 148, 185);
        }
        .nr{
          color: rgb(147, 147, 147);
          flex: 1;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:3;//这个是显示的行数
          overflow: hidden;
        }
      }
      .pltime{
        margin: 0.1rem 0;
        padding: 0 0.3rem;
        font-size: 0.25rem;
        color: rgb(147, 147, 147);
      }
    }
  }
  .yypw{
    display: flex;
    flex-direction: column;
    height: 3.9rem;
  }
  .yyqd{
    .jbxx-top{
      padding: 0.3rem;
    }
  }
}
</style>