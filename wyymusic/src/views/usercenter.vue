<template>
  <div id="usercenter" @scroll="showding" ref="usercenter">
    <div class="top" ref="ding">
        <i class="iconfont icon-xiangzuo1" ref="zuo1" @click="goback"></i>
        <i class="iconfont icon-xiangzuo1 fz" ref="zuo2" @click="goback"></i>
        <i class="iconfont icon-gengduo1" ref="you1"></i>
        <i class="iconfont icon-gengduo1 fz" ref="you2"></i>
        <div class="name" ref="name">{{user.nickname}}</div>
    </div>
    <div class="bgc">
        <img :src="user.backgroundUrl" alt="">
    </div>
    <div class="main">
        <div class="p">
            <div class="userinfo">
            <div class="tx" ref="tx">
                <img :src="user.avatarUrl" alt="">
            </div>
            <div class="nickname" ref="nickname">{{user.nickname}}</div>
            <div class="qt">
                <span>{{user.follows}} 关注</span>
                <span>{{user.followeds}} 粉丝</span>
                <span>Lv.{{userinfo.level}}</span>
            </div>
            <ul class="zl">
                <li>IP归属地：{{user.city.substring(0,2)}}</li>
                <li>
                    <i class="iconfont icon-nanxing" v-show="user.gender=='男'"></i>
                    <i class="iconfont icon-nvxing" v-show="user.gender=='女'"></i>
                    <van-icon class="wz" name="question-o" size="0.3rem" v-show="user.gender=='未知'" />
                    <div>{{user.birthday}} 后 天蝎座</div>
                </li>
                <li>{{user.city}}</li>
                <li>
                    <i class="iconfont icon-xiangyou1"></i>
                </li>
            </ul>
            <div class="bjzl">
                <div class="bjzl-c">编辑资料</div>
                <div class="bjzl-c-i">
                    <i class="iconfont icon-xialajiantouxiao"></i>
                </div>
            </div>
            </div>
        </div>
    </div>
    <van-tabs offset-top="0.9rem" :active="active" sticky :background="bgc" @scroll="scroll" swipeable @change="tagchang">
            <van-tab to="/usercenter/userhome"  title="主页" name="userhome">
                <router-view></router-view>
            </van-tab>
            <van-tab to="/usercenter/moving" title="动态" name="moving">
                <router-view></router-view>
            </van-tab>
            <van-tab to="/usercenter/userblog" title="博客" name="userblog">
                <router-view></router-view>
            </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import useStore from '../pinia';
import { ref ,onMounted,onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import emitter from '../bus';
export default {
    name:'usercenter',
    beforeRouteEnter:((to,from,next)=>{
        // console.log(to,from);
        to.meta.firstname=from.name
        next(vm=>{
            vm.gothisfirstname=to.meta.firstname
        })
    }),
    setup(){
        const zuo1=ref(null)
        const zuo2=ref(null)
        const you1=ref(null)
        const you2=ref(null)
        const ding=ref(null)
        const name=ref(null)
        const tx=ref(null)
        const nickname=ref(null)
        const usercenter=ref(null)
        const router=useRouter()
        const route=useRoute()
        const { user ,userinfo }=useStore()
        const active = ref('主页');
        const bgc=ref('#f6f6f6')
        const gothisfirstname=ref('')
        const showding=()=>{
            zuo1.value.style.opacity=1-(usercenter.value.scrollTop/191)
            zuo2.value.style.opacity=usercenter.value.scrollTop/191
            you1.value.style.opacity=1-(usercenter.value.scrollTop/191)
            you2.value.style.opacity=usercenter.value.scrollTop/191
            if(usercenter.value.scrollTop/191>=1){
                ding.value.style.backgroundColor='#fff'
                name.value.style.opacity=1
            }else{
                ding.value.style.backgroundColor='rgba(255, 255, 255,0)'
                name.value.style.opacity=0
            }
            tx.value.style.opacity=1-(usercenter.value.scrollTop/100-0.6)
            nickname.value.style.opacity=1.8-(usercenter.value.scrollTop/100-0.7)
        }
        const goback=()=>{
            //发起事件给bot组件和sidebar组件
            emitter.emit('goback',true)
            console.log(gothisfirstname.value);
            router.push({
                name:gothisfirstname.value
            })
        }
        onMounted(()=>{
            // console.log(user);
            window.addEventListener("scroll", showding);
        })
        onBeforeUnmount(() => {
            window.removeEventListener("scroll", showding);
        });
        const scroll=(value)=>{
          if(value.isFixed){
            bgc.value='#ffffff'
          }else{
            bgc.value='#f6f6f6'
          }
        }
        const tagchang=(name)=>{
            router.push({
                name
            })
        }
        
        return{
            zuo1,
            zuo2,
            you1,
            you2,
            ding,
            name,
            tx,
            nickname,
            usercenter,
            gothisfirstname,
            user,
            userinfo,
            active,
            bgc,
            scroll,
            tagchang,
            goback,
            showding
        }
    }
}
</script>

<style lang="less" scoped>
#usercenter{
    padding-bottom: 2.1rem;
    width: 100%;
    height: 100vh;
    overflow: scroll;
    background-color: #f6f6f6;
    .top{
        position: fixed;
        top: 0;
        z-index: 5;
        width: 100%;
        height: 1rem;
        color: #fff;
        // background-color: pink;
        .name{
            position: absolute;
            top: 50%;
            left: 50%;
            color: #000;
            font-size: 0.4rem;
            transform: translate(-50%,-50%);
            opacity: 0;
        }
        i{
            position: absolute;
            top: 50%;
            transform: translate(0,-50%);
            font-size: 0.4rem;
        }
        .icon-xiangzuo1{
            left: 0.2rem;
        }
        .icon-gengduo1{
            right: 0.2rem;
        }
        .fz{
            color: #000;
            opacity: 0;
        }
    }
    .bgc{
        width: 100%;
        height: 5.5rem;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .main{
        // padding: 0 0.2rem;
        .p{
            padding: 0 0.2rem;
            .userinfo{
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -0.3rem;
            padding: 0.3rem 0;
            width: 100%;
            // height: 3.5rem;
            border-radius: 0.3rem;
            background-color: #fff;
            .tx{
                position: absolute;
                top: -22%;
                width: 1.3rem;
                height: 1.3rem;
                border-radius: 50%;
                overflow: hidden;
                img{
                    height: 100%;
                }
            }
            .nickname{
                margin-top: 0.4rem;
                font-size: 0.4rem;
            }
            .qt{
                margin-top: 0.1rem;
                span{
                    margin: 0 0.1rem;
                    font-size: 0.28rem;
                }
            }
            .zl{
                margin-top: 0.2rem;
                display: flex;
                li{
                    display: flex;
                    align-items: center;
                    margin-right: 0.1rem;
                    padding: 0.03rem 0.05rem;
                    border-radius: 0.1rem;
                    border: 1px solid rgb(197, 197, 197);
                    font-size: 0.1rem;
                    .icon-nanxing{
                        margin:0 0.05rem;
                        color: rgb(0, 162, 255);
                    }
                    .icon-nvxing{
                        margin:0 0.05rem;
                        color: rgb(255, 0, 0);
                    }
                }
            }
            .bjzl{
                margin-top: 0.2rem;
                display: flex;
                .bjzl-c{
                    margin:0 0.1rem;
                    padding: 0.1rem 0.2rem;
                    border: 1px solid rgb(197, 197, 197);
                    border-radius: 0.3rem;
                }
                .bjzl-c-i{
                    text-align: center;
                    line-height: 0.65rem;
                    width: 0.65rem;
                    height: 0.65rem;
                    // font-size: 1rem;
                    border-radius: 50%;
                    border: 1px solid rgb(197, 197, 197);
                }
            }
            }
        }
    }
}
</style>