<template>
  <div id="mine" ref="mine" @scroll="showding">
    <div class="ding" ref="ding">
       <div class="main animate__animated animate__slideInDown animate__faster	500ms" ref="main">
        <img v-if="user.userprofile!==null" :src="user.avatarUrl" alt="">
        <span v-if="user.userprofile!==null">{{user.nickname}}</span>
        <van-icon name="user-circle-o" size="0.6rem" v-if="user.userprofile==null" @click="ljlogin" />
        <span v-if="user.userprofile==null" @click="ljlogin">立即登录</span>
       </div>
    </div>
    <van-sticky class="ss" offset-top="0.4rem" @click="gotosearch">
      <i class="iconfont icon-search" ></i>
    </van-sticky>
    <div class="p">
      <div class="user">
      <div class="tx">
        <van-icon name="user-circle-o" size="1.2rem" v-if="user.userprofile==null" />
        <img v-if="user.userprofile!==null" :src="user.avatarUrl" alt="" >
      </div>
      <div class="username" v-if="user.userprofile!==null">{{user.nickname}}
        <div class="xf">VIP 续费 ></div>
      </div>
      <div class="username" v-if="user.userprofile==null" @click="ljlogin">立即登录<van-icon name="arrow" /></div>
      <ul class="qt" v-show="user.userprofile!==null" >
        <li>{{user.follows}} 关注</li>
        <li>{{user.followeds}} 粉丝</li>
        <li>Lv: {{userinfo.level}}</li>
      </ul>
      </div>
      <div class="app">
      <ul>
        <li v-for="(a,index) in appvalue" :key="index">
          <i :class="a.icon"></i>
          <div class="text">{{a.text}}</div>
        </li>
        
      </ul>
      <div class="bot">
        <i class="iconfont icon-zengjia"></i>
        音乐应用</div>
      </div>
      <div class="mylike" v-if="userinfo.userplaylist!==null" @click="gotolistxq(userinfo.playlist[0].id,userinfo.playlist[0].coverImgUrl)">
        <div class="tp" >
          <img :src="userinfo.playlist[0].coverImgUrl" alt="">
        </div>
        <div class="mid">
          <div class="top">我喜欢的音乐</div>
          <div class="bot">
            <!-- <i class="iconfont icon-icon--yes"></i> -->
            <span>{{userinfo.playlist[0].trackCount}}首</span>
          </div>
        </div>
        <div class="right">
          <i class="iconfont icon-xindong"></i>
          <span>心动模式</span>
        </div>
      </div>
      <div class="mylike" v-if="userinfo.userplaylist==null">
        <div class="tp" >
          <van-icon name="like" color="#fff" size="0.45rem"/>
        </div>
        <div class="mid">
          <div class="top">我喜欢的音乐</div>
          <div class="bot">
            <span>0首</span>
          </div>
        </div>
        <div class="right">
          <i class="iconfont icon-xindong"></i>
          <span>心动模式</span>
        </div>
      </div>
    </div>
    <van-tabs offset-top="1.2rem" :active="activeName" scrollspy  sticky :background="bgc" @scroll="scroll" v-if="userinfo.userplaylist!==null">  
          <van-tab  title="创建歌单" name="cjgd">
            <div class="pl" v-show="userinfo.userplaylist!==null ">
              <div class="creatsonlist">
              <div class="top">
                <div class="left">创建歌单 ( {{userinfo.playlist.length-1}}个)</div>
                <i class="iconfont icon-zengjia"></i>
                <i class="iconfont icon-gengduo-shuxiang"></i>
              </div>
              <van-swipe-cell class="creatsonlist-bot" v-for="(list,index) in userinfo.playlist" :key="index" v-show="index!==0" :before-close="beforeClose" :name="index" >
                <div class="list" @click="gotolistxq(list.id,list.coverImgUrl)">
                  <div class="left">
                    <img :src="list.coverImgUrl" alt="">
                  </div>
                  <div class="mid">
                    <div class="name">{{list.name}}</div>
                    <div class="sum">
                      <!-- <i class="iconfont icon-icon--yes"></i> -->
                      {{list.trackCount}}首</div>
                  </div>
                </div>
                <template #right>
                  <van-button square type="danger" text="删除" />
                </template>
              </van-swipe-cell>
              <div class="creatsonlist-bot">
                <div class="list">
                    <div class="left">
                      <i class="iconfont icon-daoru"></i>
                    </div>
                    <div class="mid">
                      <div>一键导入外部音乐</div>
                    </div>
                </div>
              </div>
              </div>
            </div>

          </van-tab>
          <van-tab title="收藏歌单" name="scgd">
            <div class="pl">
              <div class="scsonlist">
              <div class="top">
                <div class="left">{{userinfo.playlistBeSubscribedCount==0?'收藏歌单' : `收藏歌单（${userinfo.playlistBeSubscribedCount}）`}}</div>
                <i class="iconfont icon-gengduo-shuxiang"></i>
              </div>
              <div v-if="userinfo.playlistBeSubscribedCount==0" class="zwgd">暂无收藏的歌单</div>
              <van-swipe-cell class="creatsonlist-bot"  :before-close="beforeClose" :name="index" v-if="userinfo.playlistBeSubscribedCount!==0" >
                <div class="list" @click="gotolistxq(list.id,list.coverImgUrl)">
                  <div class="left">
                    <img :src="list.coverImgUrl" alt="">
                  </div>
                  <div class="mid">
                    <div class="name">{{list.name}}</div>
                    <div class="sum">
                      <!-- <i class="iconfont icon-icon--yes"></i> -->
                      {{list.trackCount}}首</div>
                  </div>
                </div>
                <template #right>
                  <van-button square type="danger" text="删除" />
                </template>
              </van-swipe-cell>
              </div>
            </div>
          </van-tab>
          <van-tab title="歌单助手" name="gdzs">
            <div class="pl">
              <div class="sonlistzs">
              <div class="top">
                <div class="left">歌单助手</div>
              </div>
              <div class="mid">
                <van-divider :style="{fontSize: '0.25rem'}">你可以从歌单中筛选出</van-divider>
              </div>
              <van-swipe style="height: 30px;" :autoplay="3000" vertical  :show-indicators="false">
                <van-swipe-item class="vsi">
                  <span class="one">适合</span>
                  <span class="two">夜晚</span>
                  <span class="three">听的</span>
                  <span class="four">日语</span>
                </van-swipe-item>
                <van-swipe-item class="vsi">
                  <span class="one">80年代</span>
                  <span class="four">华语</span>
                  <span class="three">老歌</span>
                </van-swipe-item>
                <van-swipe-item class="vsi">
                  <span class="four">最近一年发布</span>
                  <span class="three">的</span>
                  <span class="one">二次元</span>
                </van-swipe-item>
              <van-swipe-item class="vsi">
                  <span class="one">最近收藏</span>
                  <span class="three">的</span>
                  <span class="four">日语女生合辑</span>
                </van-swipe-item>
              </van-swipe>
              <div class="look">试试看</div>
              </div>
            </div>
          </van-tab>
    </van-tabs>
    <van-tabs offset-top="1.2rem" :active="activeName" scrollspy  sticky :background="bgc" @scroll="scroll" v-if="userinfo.userplaylist==null">  
          <van-tab  title="创建歌单" name="cjgd">
            <div class="pl">
              <div class="creatsonlist">
              <div class="top">
                <div class="left">创建歌单</div>
                <i class="iconfont icon-zengjia"></i>
                <i class="iconfont icon-gengduo-shuxiang"></i>
              </div>
              <div class="creatsonlist-bot">
                <div class="list">
                  <div class="left">
                    <i class="iconfont icon-daoru"></i>
                  </div>
                  <div class="mid">
                    <div>一键导入外部音乐</div>
                  </div>
                </div>
              </div>  
              </div>
            </div>
          </van-tab>
          <van-tab title="收藏歌单" name="scgd">
            <div class="pl">
              <div class="creatsonlist">
              <div class="top">
                <div class="left">收藏歌单</div>
                <i class="iconfont icon-gengduo-shuxiang"></i>
              </div>
              <div class="bot">暂无收藏的歌单</div> 
              </div>
            </div>
          </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Dialog } from "vant"
import emitter from '../bus';
import useStore from '../pinia';
import { ref,reactive,onMounted,onBeforeUnmount,toRaw, } from 'vue';
import { useRouter,useRoute} from "vue-router";
export default {
    name: "mine",
    setup() {
        const router=useRouter()
        const route=useRoute()
        const { user, userinfo } = useStore();
        const ding = ref(null);
        const main = ref(null);
        const mine = ref(null);
        const activeName = ref("创建歌单");
        const vtvalue = reactive(["创建歌单", "收藏歌单", "歌单助手"]);
        const appvalue = reactive([
            {
                icon: "iconfont icon-bianzubeifen3",
                text: "本地/下载"
            },
            {
                icon: "iconfont icon-shangchuanyunpan",
                text: "云盘"
            },
            {
                icon: "iconfont icon-gouwu",
                text: "已购"
            },
            {
                icon: "iconfont icon-24gf-playCircle",
                text: "最近播放"
            },
            {
                icon: "iconfont icon-haoyoutuijie",
                text: "我的好友"
            },
            {
                icon: "iconfont icon-shoucang-shoucang",
                text: "收藏和赞"
            },
            {
                icon: "iconfont icon-faxian",
                text: "我的博客"
            },
            {
                icon: "iconfont icon-shouye1",
                text: "音乐罐子"
            },
        ]);
        const ljlogin = () => {
            emitter.emit("ljlogin", true);
        };
        const bgc = ref("#f6f6f6");
        const scroll = (value) => {
            if (value.isFixed) {
                bgc.value = "#ffffff";
            }
            else {
                bgc.value = "#f6f6f6";
            }
        };
        //顶部的显示
        const showding = function () {
            ding.value.style.opacity = mine.value.scrollTop / 40;
            if (ding.value.style.opacity >= 1) {
                main.value.style.display = "flex";
                main.value.classList.remove("animate__slideOutUp");
                main.value.classList.add("animate__slideInDown");
            }
            else {
                main.value.classList.remove("animate__slideInDown");
                main.value.classList.add("animate__slideOutUp");
            }
        };
        //创建歌单的删除事件
        const beforeClose = ({ name, position }) => {
            switch (position) {
                case "left":
                case "cell":
                case "outside":
                    return true;
                case "right":
                    return new Promise(() => {
                        Dialog.confirm({
                            title: "确定删除吗？",
                        }).then(res => {
                            console.log("确认删除", name);
                        }).catch(err => {
                            console.log(err, "取消");
                        });
                    });
            }
        };
        const popup=ref(null)
        //前往歌单详情
        const gotolistxq = (id,bgurl) => {
            emitter.emit('gotolistxq',true)
            router.push({
              name:'playlist',
              query:{
                id,
                bgurl
              }
            })
        };
        onMounted(() => {;
            
        });
        onBeforeUnmount(() => {

        });
        const gotosearch=()=>{
          console.log('搜索');
          router.push({
            name:'Search'
          })
          emitter.emit('gotolistxq',true)
        }
        return {
            user,
            userinfo,
            appvalue,
            ding,
            main,
            mine,
            bgc,
            activeName,
            vtvalue,
            popup,
            ljlogin,
            scroll,
            beforeClose,
            gotolistxq,
            showding,
            gotosearch
        };
    },
    

}
</script>

<style lang="less" scoped>
#mine{
  padding-top: 0.5rem;
  padding-bottom: 3rem;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  .ding{
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 1.2rem;
    background-color: rgb(255, 255, 255);
    opacity: 0;
    .main{
      // width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      display: none;
      
      img{
        margin-right: 0.2rem;
        height: 50%;
        border-radius: 50%;
      }
      span{
        font-weight: bold;
      }
    }
  }
  .ss{
    position: absolute;
    right: 0;
    z-index: 3;
    // width: 20%;
    text-align: right;
    .icon-search{
      margin-right: 0.2rem;
      font-size: 0.45rem;
      font-weight: bold;
      color: var(--light-font-size-color);
    }
  }
  .p{
    margin-top: 1.3rem;
    padding: 0 0.2rem;
    .user{
    position: relative;
    margin-top: 0.8rem;
    width: 100%;
    height: 2rem;
    padding-top: 0.8rem;
    border-radius: 0.2rem;
    background-color: var(--lightchlidern-bg-color);
    .tx{
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translate(-50%,30%);
      width: 1.2rem;
      height: 1.2rem;
      // background-color: #000;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .username{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
      color: var(--light-font-size-color);
      .xf{
          transform: scale(0.8);
          line-height: 0.55rem;
          width: 1.5rem;
          height: 0.5rem;
          border-radius: 0.2rem;
          font-size: 0.1rem;
          color: #fff;
          background-color: rgb(172, 172, 172);
      }
    }
    .qt{
      margin-top: 0.2rem;
      display: flex;
      justify-content: center;
      line-height: 1;
      font-size: 0.1rem;
      color: rgb(170, 170, 170);
      li{
        margin-right: 0.3rem;
      }
    }
    }
  }
  .app{
    margin: 0.3rem 0;
    width: 100%;
    border-radius: 0.2rem;
    background-color: var(--lightchlidern-bg-color);
    ul{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: 80%;
      padding: 0.2rem;
      color: var(--light-tag-text-fz-color);
      li{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 1.5rem;
        i{
          font-size: 0.45rem;
          color: var(--light-tag-fz-color);
        }
        .text{
          margin-top: 0.1rem;
          font-size: 0.1rem;
        }
      }
    }
    .bot{
      border-top: 1px solid rgb(209, 209, 209);
      width: 100%;
      text-align: center;
      line-height: 0.7rem;
      font-size: 0.1rem;
      color: rgb(183, 183, 183);
    }
  }
  .mylike{
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.4rem;
    padding: 0 0.3rem;
    border-radius: 0.2rem;
    background-color: var(--lightchlidern-bg-color);
    .tp{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 0.2rem;
      background-color: rgb(134, 134, 134);
      overflow: hidden;
      img{
        height: 100%;
      }
    }
    .mid{
      margin-left: 0.2rem;
      width: 57%;
      .top{
        color: var(--light-font-size-color);
      }
      .bot{
        font-size: 0.1rem;
         color: var(--light-tag-text-fz-color);
        i{
          margin-right: 0.1rem;
          color: rgb(0, 183, 255);
          font-size: 0.1rem;
        }
      }
    }
    .right{
        width: 1.7rem;
        height: 0.5rem;
        border-radius: 0.3rem;
        border: 1px solid rgb(154, 153, 153);
        text-align: center;
        font-size: 0.1rem;
        transform: scale(0.9);
        color: var(--light-font-size-color);
        i{
          margin-right: 0.03rem;
          line-height: 0.5rem;
          vertical-align: middle;
        }
      }
  }
  .tag{
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-evenly;
    li{
      text-align: center;
      width: 30%;
      color: var(--light-font-size-color);
      border-right: 1px solid rgb(209, 209, 209);
      &:last-child{
          border: none;
      }
    }
  }
  .pl{
    padding: 0 0.2rem;
    .sonlistzs,.scsonlist,.creatsonlist{
    margin-top: 0.3rem;
    padding: 0.3rem;
    width: 100%;
    overflow: hidden;
    // height: 4rem;
    
    background-color: var(--lightchlidern-bg-color);
    border-radius: 0.2rem;
    .zwgd{
      line-height: 1.5rem;
      text-align: center;
      width: 100%;
      height: 1.5rem;
      font-size: 0.25rem;
      color: rgb(164, 164, 164);
    }
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: rgb(174, 174, 174);
      .left{
        width: 80%;
        font-size: 0.1rem;
      }
      i{
        font-size: 0.4rem;
      }
    }
    .bot{
      width: 100%;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      font-size: 0.25rem;
      color: rgb(171, 171, 171);
    }
    .creatsonlist-bot{
      margin-top: 0.2rem;
      margin-right: -0.34rem;
      
      .list{
        // margin-bottom: 0.2rem;
        display: flex;
        align-items: center;
        width: 100%;
        height: 1rem;
        .left{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.2rem;
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 0.2rem;
            background-color: rgba(238, 238, 238, 0.5);
            overflow: hidden;
            i{
              font-size: 0.45rem;
            }
            img{
              height: 100%;
            }
        }
        .mid{
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .name{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .sum{
            margin-top: 0.1rem;
            color: rgb(147, 147, 147);
            font-size: 0.1rem;
          }
        }
      }
    }
    .vsi{
      display: flex;
      justify-content: center;
      align-items: center;
      .one{
        margin-right: 0.1rem;
        display: inline-block;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        background-color: rgb(247, 207, 213);
        color: rgb(252, 128, 128);
      }
      .two{
        margin-right: 0.1rem;
        display: inline-block;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        background-color: rgba(255, 0, 38,0.5);
        color: rgb(255, 0, 0);
      }
      .three{
        margin-right: 0.1rem;
        color: rgb(149, 149, 149);
      }
      .four{
        margin-right: 0.1rem;
        display: inline-block;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        background-color: rgba(58, 121, 255, 0.5);
        color: rgb(0, 94, 255);
      }
    }
    .look{
      margin: 0 auto;
      margin-top: 0.2rem;
      width: 2rem;
      height: 0.5rem;
      border-radius: 0.3rem;
      line-height: 0.55rem;
      font-size: 0.25rem;
      text-align: center;
      color: #fff;
      background: linear-gradient(to right, rgb(255, 65, 108), rgb(255, 75, 43)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */      
    }
    }
  }
  // .popup{
  //   position: fixed;
  //   top: 0;
  //   z-index: 100;
  //   right: -100%;
  //   width: 100%;
  //   // height: 100vh;
  //   background-color: pink;
  // }
  
}
</style>