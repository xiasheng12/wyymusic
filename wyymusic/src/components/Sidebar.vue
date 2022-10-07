<template>
  <div id="sidebar" v-show="sidebarshow">
    <i class="iconfont icon-cebianlan" @click="showPopup"></i>
    <van-popup :show="show"  @close="onPopup"  position="left" :style="{ width:'85%',height:'100%'}" class="popup" >
        <div class="popup-main" >
            <div class="top">
                <i class="iconfont icon-touxiang" @click="loginshowPopup" v-show="user.userprofile==null" ></i>
                <div class="avater" v-show="user.userprofile!==null">
                    <van-icon  :name="user.avatarUrl" size="0.5rem" />
                </div>
                <div class="text" v-show="user.userprofile==null"  @click="loginshowPopup">立即登录
                    <van-icon name="arrow" />
                </div>
                <div class="text" @click="gotousercenter" v-show="user.userprofile!==null">
                    {{user.nickname}}
                    <van-icon name="arrow" />
                </div>
                <i class="iconfont icon-saoyisao"></i>
            </div>
            <div class="vip">
                <div class="vip-top">
                    <div class="vip-top-left">
                        <div class="vip-top-left-top">开通黑胶VIP</div>
                        <div class="vip-top-left-bot">立享超21项专属特权 ></div>
                    </div>
                    <div class="vip-top-right">会员中心</div>
                </div>
                <div class="vip-bot">
                    <div class="vip-bot-left">新客专属 黑胶￥0.2/天，抽万元大奖</div>
                    <div class="vip-bot-right">
                        
                    </div>
                </div>
            </div>
            <ul class="center">
                <li>
                    <i class="iconfont icon-xiaoxi"></i>
                    <div class="text">消息中心</div>
                    <i class="iconfont icon-xiangyou1"></i>
                    <!-- <van-icon name="arrow" /> -->
                </li>
                <li>
                    <i class="iconfont icon-bei"></i>
                    <div class="text">云贝中心
                        <div class="tille">做任务赚云贝</div>
                    </div>
                    
                    <i class="iconfont icon-xiangyou1"></i>
                    <!-- <van-icon name="arrow" /> -->
                </li>
            </ul>
            <div class="Musicservices">
                <div class="Musicservices-top">音乐服务</div>
                <ul class="Musicservices-bot">
                    <li v-for="(ms,index) in msvalue" :key="index">
                         <i :class="ms.icon"></i>
                        <div class="text">{{ms.text}}
                            <div class="nr">
                                <div class="tille">{{ms.tille}}</div>
                                <i :class="ms.iconright"></i>
                            </div>
                        </div>
                        <i class="iconfont icon-xiangyou1"></i>
                    </li>
                </ul>
            </div>
            <div class="other">
                <div class="Musicservices-top">其他</div>
                <ul class="Musicservices-bot">
                    <li v-for="(ms,index) in othervalue" :key="index">
                         <i :class="ms.icon"></i>
                        <div class="text">{{ms.text}}
                            <div class="nr">
                                <div class="tille">{{ms.tille}}</div>
                                <i :class="ms.iconright"></i>
                            </div>
                        </div>
                        <i v-if="index!==1" class="iconfont icon-xiangyou1"></i>
                        <van-switch @click="open" class="btn" v-if="index==1"  v-model="checked" />
                    </li>
                </ul>
            </div>
            <div class="other2">
                <ul class="Musicservices-bot">
                    <li v-for="(ms,index) in othervalue2" :key="index">
                         <i :class="ms.icon"></i>
                        <div class="text">{{ms.text}}
                            <div class="nr">
                                <div class="tille">{{ms.tille}}</div>
                                <i :class="ms.iconright"></i>
                            </div>
                        </div>
                        <i class="iconfont icon-xiangyou1" ></i>
                    </li>
                </ul>
            </div>
            <div class="tuic" v-show="user.userprofile!==null"  @click="loginout">退出登录</div>
        </div>
    
    </van-popup>
    <van-popup :show="loginshow" closeable close-icon-position="top-left" position="bottom" @click-close-icon="loginonPopup" :style="{ height: '100%' }" >
        <login v-if="loginshow"></login>
    </van-popup>
  </div>
  
</template>

<script>
import emitter from '../bus';
import { Dialog } from 'vant';
import 'vant/es/dialog/style';
import useStore from '../pinia';
import login from '../components/login.vue'
import { ref ,reactive } from 'vue';
import { useRouter  } from 'vue-router';
export default {
    name:'sidebar',
    components:{login,},
    setup(){
        const { user ,userinfo } =useStore()
        const router=useRouter()
        const msvalue=reactive([
            {
                icon:'iconfont icon-youhuiquan one',
                text:'云村有票',
                tille:'热门演出',
                iconright:'iconfont icon-shoushoushi',
            },
            {
                icon:'iconfont icon-shengdanlu one',
                text:'多多西西口袋',
            },
            {
                icon:'iconfont icon-shouye one',
                text:'商城',
                tille:'新品迪士尼tws直降180',
                iconright:'iconfont icon-erji',
            },
            {
                icon:'iconfont icon-hearbeat one',
                text:'Beat专区',
                tille:'本周精选歌单更新',
                iconright:'iconfont icon-shoushoushi',
            },
            {
                icon:'iconfont icon-lingdang one',
                text:'口袋彩铃',
                tille:'你看批哥了吗？',
                iconright:'iconfont icon-shoushoushi',
            },
            {
                icon:'iconfont icon-youxi one',
                text:'游戏专区',
            },
        ])
        const othervalue=reactive([
            {
                icon:'iconfont icon-shezhi one',
                text:'设置',
            },
            {
                icon:'iconfont icon-iconset0454 one',
                text:'深色模式',
            },
            {
                icon:'iconfont icon-dingshizuoye one',
                text:'定时关闭',
            },
            {
                icon:'iconfont icon-clothes one',
                text:'个性装扮',
                tille:'本周精选歌单更新',
                iconright:'iconfont icon-shoushoushi',
            },
            {
                icon:'iconfont icon-shiting one',
                text:'边听边存',
                tille:'未开启'
            },
            {
                icon:'iconfont icon-liuliang one',
                text:'在线听歌免流量',
            },
            {
                icon:'iconfont icon-a-icon_diejiawendang one',
                text:'添加Siri捷径',
            },
            {
                icon:'iconfont icon-heimingdan one',
                text:'音乐黑名单',
            },
            {
                icon:'iconfont icon-dunpaibaoxianrenzheng_o one',
                text:'青少年模式',
                tille:'未开启'
            },
            {
                icon:'iconfont icon-naozhong one',
                text:'音乐闹钟',
            },
        ])
        const othervalue2=reactive([
            {
                icon:'iconfont icon-kefu one',
                text:'我的客服',
            },
            {
                icon:'iconfont icon-dingdan2 one',
                text:'我的订单',
            },
            {
                icon:'iconfont icon-youhuiquan1 one',
                text:'优惠券',
            },
            {
                icon:'iconfont icon-fenxiang1 one',
                text:'分享网易云音乐',
            },
            {
                icon:'iconfont icon-a-xinxiyuyinxinxitishixinxi-04 one',
                text:'个人信息收集与使用清单',
            },
            {
                icon:'iconfont icon-KJ_012 one',
                text:'个人信息第三方共享清单',
            },
            {
                icon:'iconfont icon-dunpaisuo one',
                text:'个人信息与隐私保护',
            },
            {
                icon:'iconfont icon-guanyu1 one',
                text:'关于',
            },
        ])
        const show = ref(false);
        const sidebarshow = ref(true);
        
        const loginshow = ref(false);
        const checked = ref(false);

        emitter.on('ljlogin',data=>{
            loginshow.value=data
        })


        const showPopup = () => {
            show.value = true;
        };
        const onPopup = () => {
            show.value = false;
        };
        const loginshowPopup = () => {
            show.value = false;
            loginshow.value = true;

        };
        const loginonPopup = () => {
            loginshow.value = false;
        };
        const loginout=()=>{
            Dialog.confirm({
            title: '网易云音乐',
            message:
                '确定退出当前账号吗？',
            })
            .then(() => {
                console.log('yes');
                user.userprofile=null
                userinfo.Userinfo=null
                userinfo.userplaylist=null
                router.go(0)
            })
            .catch(() => {
                console.log('no');
            });
        }
        //开启深色模式
        function open(){
            if(checked.value==true){
                console.log('开启深色模式');
                document.documentElement.style.setProperty('--lightchlidern-bg-color','#1e2022')
                document.documentElement.style.setProperty('--light-font-size-color','#fff')
                document.documentElement.style.setProperty('--light-bg-color','#000')
                document.documentElement.style.setProperty('--light-tag-bg-color','rgb(255, 0, 43,0.3)')
            }else{
                console.log('关闭');
                document.documentElement.style.setProperty('--lightchlidern-bg-color','#fff')
                document.documentElement.style.setProperty('--light-font-size-color','#000')
                document.documentElement.style.setProperty('--light-bg-color','#f6f6f6')
                document.documentElement.style.setProperty('--light-tag-bg-color','rgb(250, 226, 230)')
            }
            
        }
        
        //前往个人中心
        const gotousercenter=()=>{
            console.log('前往个人中心');
            show.value=false
            sidebarshow.value=false
            //给bot组件的事件
            emitter.emit('gotousercenter',true)
            router.push({
                name:'usercenter'
            })
        }
        emitter.on('goback',data=>{
            if(data==true){
                sidebarshow.value=true
            }
        })
        return{
            user,
            show,
            sidebarshow,
            loginshow,
            msvalue,
            othervalue,
            othervalue2,
            checked,
            showPopup,
            onPopup,
            loginshowPopup,
            loginonPopup,
            open,
            loginout,
            gotousercenter
        }
    },
}
</script>

<style lang="less" scoped>
#sidebar{
    position: fixed;
    top: 0.44rem;
    left: 0.2rem;
    z-index: 999;
    color: var(--light-font-size-color);
    .avater{
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .popup-main{
    //    position: relative;
       width: 100%;
       height: 240%;
       padding: 0.3rem 0.2rem;
    //    background-color: #ececed;
       background-color: var(--light-bg-color);
       .top{
            position: absolute;
            // padding-right: 0.2rem;
            // margin-bottom: 0.2rem;
            
            display: flex;
            align-items: center;
            font-size: 0.5rem;
            // width: 100%;
            width: 96%;
            background-color: var(--light-bg-color);
            // height: 0.5rem;
            // background-color: pink;
            .text{
                margin-left: 0.1rem;
                width: 80%;
                font-size: 0.3rem;
                font-weight: bold;
            }
            .icon-touxiang{
                color: var(--light-font-size-color);
            }
            .iconfont{
                font-size: 0.5rem;
            }
       }
       .vip{
            margin: 0.7rem 0 0.3rem;
            padding: 0.2rem 0.2rem 0.2rem 0.3rem;
            width: 100%;
            height: 1.8rem;
            border-radius: 0.25rem;
            background: linear-gradient(to bottom, rgb(36, 36, 36), rgb(67, 67, 67)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
            .vip-top{
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 70%;
                border-bottom: 1px solid #3d352a;
                .vip-top-left{
                    width: 80%;
                    .vip-top-left-top{
                        color: #fedead;
                    }
                    .vip-top-left-bot{
                        color: #85745a;
                        font-size: 0.1rem;
                    }
                }
                .vip-top-right{
                    text-align: center;
                    line-height: 2;
                    width: 1.5rem;
                    height: 0.5rem;
                    font-size: 0.1rem;
                    color: #85745a;
                    border-radius: 0.2rem;
                    transform: scale(0.8);
                    border: 1px solid #fedead;
                }
            }
            .vip-bot{
                margin-top: 0.1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .vip-bot-left{
                    width: 80%;
                    color: #85745a;
                    font-size: 0.1rem;
                }
                .vip-bot-right{
                    margin-right: 0.13rem;
                    width: 0.4rem;
                    height: 0.4rem;
                    border-radius: 0.1rem;
                    background-color: pink;
                }
            }    
       }
       .center{
            width: 100%;
            height: 2rem;
            padding: 0.2rem 0 0.2rem 0.3rem;
            border-radius: 0.25rem;
            background-color: var(--lightchlidern-bg-color);
            li{
                display: flex;
                align-items: center;
                margin-bottom: 0.1rem;
                width: 100%;
                height: 50%;
                border-bottom: 1px solid rgb(235, 234, 234);
                .icon-bei,.icon-xiaoxi{
                    margin-right: 0.2rem;
                }
                .text{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 80%;
                    .tille{
                        margin-right: 0.1rem;
                        color: rgb(181, 181, 181);
                        font-size: 0.1rem;
                    }
                }
                .icon-xiangyou1{
                    color: rgb(181, 181, 181);
                    font-size: 0.3rem;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
            
       }
       .other2,.other,.Musicservices{
            margin-top: 0.3rem;
            width: 100%;
            height: 6rem;
            padding: 0.2rem 0 0.2rem;
            border-radius: 0.25rem;
            background-color: var(--lightchlidern-bg-color);
            .Musicservices-top{
                padding-left: 0.3rem;
                width: 100%;
                height: 0.5rem;
                color: rgb(181, 181, 181);
                font-size: 0.1rem;
                border-bottom: 1px solid rgb(181, 181, 181);
            }
            .Musicservices-bot{
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                width: 100%;
                height: 100%;
                padding: 0 0 0.3rem 0.3rem;
                li{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    // height: 16%; 
                    .one{
                        margin-right: 0.2rem;
                    }
                    .text{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 80%;
                        .nr{
                            display: flex;
                            align-items: center;
                            margin-right: 0.1rem;
                            .tille{
                                margin-right: 0.1rem;
                                text-align: right;
                                // margin-left: 1.5rem;
                                color: rgb(181, 181, 181);
                                font-size: 0.1rem;
                            }
                            .icon-shoushoushi{
                                color: rgb(188, 1, 1);
                            }
                        }
                    }
                    .icon-xiangyou1{
                        color: rgb(181, 181, 181);
                        font-size: 0.3rem;
                    }
                    .btn{
                        margin-right: 0.25rem;
                        font-size: 0.5rem;
                    }
                }
            }
       }
       .other{
            height: 10rem;
       }
       .other2{
            padding: 0;
            height: 8rem;
            .Musicservices-bot{
                padding: 0  0  0 0.3rem;
            }
       }
       .tuic{
            margin-top: 0.3rem;
            width: 100%;
            height: 1rem;
            // padding: 0.2rem 0 0.2rem;
            line-height: 1rem;
            border-radius: 0.25rem;
            text-align: center;
            color: red;
            background-color: var(--lightchlidern-bg-color);
       }
    }
}
</style>