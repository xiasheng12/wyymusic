<template>
  <div id="login">
       <div class="logo">
          <img src="../../public/img/wyy.png" alt="">
       </div>
       <div class="quan"></div>
       <div class="quan2"></div>
       <div class="quan3"></div>
       <div class="mid">
          <!-- <div class="phone">199****4637</div> -->
          <div class="phone">{{login.codephone}}</div>
          <i class="iconfont icon-qiehuan" @click="loginfs(qiehuan)"></i>
       </div>
       <div class="tille">天翼账号提供认证服务</div>
      <div class="loginbtn" @click="loginfs(yjlogin)">
          <div class="text">一键登录</div>
          <div class="tj">推荐</div>
      </div>
      <div class="bot">
        <van-checkbox icon-size="0.3rem" v-model="checked"></van-checkbox>
        <div class="bot-tille" @click="checkbot">我已阅读并同意<span>《服务条款》</span>，<span>《隐私政策》</span><span>《天翼账号服务协议》</span></div>
      </div>
      <ul class="qt animate__animated animate__fadeIn" v-if="isqt">
        <li>
          <i class="iconfont icon-weixin"></i>
        </li>
        <li>
          <i class="iconfont icon-QQ"></i>
        </li>
        <li>
          <i class="iconfont icon-weibo"></i>
        </li>
        <li>
          <i class="iconfont icon-iphone"></i>
        </li>
        <li>
          <img src="../../public/img/y.png" alt="">
        </li>
      </ul>
      <ul class="dibu" ref="dibu">
        <li>登录遇到问题</li>
        <li @click="qtlogin" >其他登录方式
          <i class="iconfont icon-xiangyou1"></i>
        </li>
      </ul>
      <van-popup :show="show" @close="onPopup" position="bottom" round :style="{ height: '25%' }">
        <div class="p-top">服务协议和隐私政策等指引</div>
        <div class="p-mid">进入下一步前，请先阅读并同意网易云音乐的<span>《服务条款》</span>，<span>《隐私政策》</span>，<span>《天翼账号服务协议》</span></div>
        <div class="p-bot">
          <button class="no" @click="isty(false)">不同意</button>
          <button class="yes" @click="isty(true)">同意并继续</button>
        </div>
      </van-popup>
      <van-popup :show="qtphoneshow" closeable close-icon-position="top-left"  @click-close-icon="closeqtphone" position="right"  :style="{ height: '100%' ,width:'100%'}">
          <phoneloginVue v-if="qtphoneshow"></phoneloginVue>
      </van-popup>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import useStore from '../pinia';
import phoneloginVue from './phonelogin.vue';
import { ref ,getCurrentInstance} from 'vue';
import { useRouter , useRoute  } from 'vue-router';
export default {
    name:'login',
    components:{phoneloginVue},
    setup(){
        const router=useRouter()
        const route=useRoute()
        const { proxy }=getCurrentInstance()
        const { login , user ,userinfo} =useStore()
        const { loginphone} =storeToRefs(login)
        const show = ref(false);
        const qtphoneshow = ref(false);
        const checked = ref(false);
        const isqt = ref(false);
        const dibu=ref(null)
        const qt=ref(null)

        //存储登录方式
        let fs=null
        
        //是否选择我已阅读
        function checkbot(){
          console.log(1);
          if(checked.value==false){
            checked.value=true
          }else{
            checked.value=false
          }
        }
        //其他登录方式
        function qtlogin(){
          // console.log(dibu.value.children[1]);
          console.log(qt.value);
          dibu.value.children[1].classList.add('animate__animated')
          dibu.value.children[1].classList.add('animate__fadeOutRight')
          setTimeout(()=>{
            // console.log(1);
            dibu.value.children[1].style.display='none'
          },500)
          setTimeout(()=>{
            // console.log(1);
            isqt.value=true
          },600)
        }
        //不同意
        const onPopup = () => {
            show.value = false;
        };
        
        const loginfs=(callback)=>{
          fs=callback
          if(checked.value==false){
            show.value=true
          }
          callback()
        }
        //一键登录
        const yjlogin=()=>{
          //是否同意
          if(checked.value){
            //发起登录请求
            let islogin=login.Login({phone:loginphone.value,password:login.getpassword})
            islogin.then(
              res=>{
                if(res.code=='200'){
                  proxy.$toast({
                      message:'登录成功！',
                      icon:'smile-o'
                  })
                  //获取用户信息
                  let isgetusif=userinfo.Getuserinfo({uid:user.userId})
                  isgetusif.then(
                    res=>{
                      if(res.code=='200'){
                        console.log(res.message);
                      }else if(res.code=='502'){
                        console.log(res.message);
                      }
                    }
                  )
                  //获取用户歌单
                  let isgetplaylist=userinfo.Getplaylist({uid:user.userId})
                  isgetplaylist.then(
                    res=>{
                      if(res.code=='200'){
                        console.log(res.message,'获取用户歌单成功');
                      }else if(res.code=='502'){
                        console.log(res.message,'获取用户歌单失败');
                      }
                    }
                  )
                  setTimeout(()=>{
                      router.go(0)
                  },500)
                }else if(res.code=='502'){
                  proxy.$toast({
                      message:'登录失败！',
                      icon:'warning-o'
                  })
                }
              }
            )
          }
        }
        const qiehuan=()=>{
          if(checked.value){
            console.log('切换手机号');
            qtphoneshow.value=true
          }
        }
        const closeqtphone=()=>{
          qtphoneshow.value=false
        }
        //是否同意
        const isty=(flag)=>{
          if(flag){
            checked.value=flag
            show.value=!flag
            loginfs(fs)
          }else{
            show.value=flag
          }
        }
        return{
          checked,
          dibu,
          qt,
          isqt,
          show,
          login,
          qtphoneshow,
          checkbot,
          onPopup,
          loginfs,
          closeqtphone,
          qtlogin,
          yjlogin,
          qiehuan,
          isty,
        }
    }
}
</script>

<style lang="less" scoped>
#login{
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: linear-gradient(to bottom, rgb(255, 242, 241), rgb(255, 255, 255)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */      
  .logo{
    margin: 0 auto;
    margin-top: 2.5rem;
    width: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
    border-radius: 50%;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .quan3,.quan2,.quan{
    position: absolute;
    top: 2.7rem;
    left: 50%;
    transform: translate(-50%);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid rgb(247, 223, 223);
  }
  .quan2{
    top: 1.7rem;
    width: 5rem;
    height: 5rem;
    border: 1px solid rgb(247, 231, 231);
  }
  .quan3{
    top: 0.7rem;
    width: 7rem;
    height: 7rem;
    border: 1px solid rgb(246, 243, 243);
  }
  .mid{
    margin-top: 2.7rem;
    display: flex;
    width: 100%;
    justify-content: center;
    .phone{
      font-size: 0.4rem;
    }
    .iconfont{
      font-size: 0.4rem;
    }
  }
  .tille{
    font-size: 0.1rem;
    text-align: center;
    letter-spacing: 0.06rem;
    transform: scale(0.8);
  }
  .loginbtn{
    display: flex;
    margin-top: 0.3rem;
    width: 100%;
    height: 0.9rem;
    border-radius: 0.5rem;
    background-color: red;
    // text-align: center;
    justify-content: center;
    align-items: center;
    line-height: 0.9rem;
    font-size: 0.35rem;
    color: #fff;
    font-weight: bold;
    letter-spacing: 0.06rem;
    .tj{
      position: absolute;
      left: 4.5rem;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.5rem;
      width: 1rem;
      height: 0.5rem;
      border-radius: 0.2rem;
      transform: scale(0.7);
      background-color: rgba(255, 255, 255,0.5);
    }
  }
  .bot{
    margin-top: 0.15rem;
    padding: 0 0.1rem;
    display: flex;
    .bot-tille{
      margin-top: 0.3rem;
      font-size: 0.1rem;
      width: 94%;
      text-align: center;
      span{
        color: rgb(46, 161, 207);
      }
    }
  }
  .dibu{
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    li{
      margin-left: 0.2rem;
      padding-left: 0.2rem;
      font-size: 0.25rem;
      color: rgb(163, 162, 162);
      border-left: 1px solid rgb(163, 162, 162);
      i{
        font-size: 0.25rem;
      }
      &:first-child{
        border: none;
      }
    }
  }
  .qt{
    // margin-top: 1rem;
    position: absolute;
    left: 50%;
    bottom: 8%;
    transform: translate(-47%);
    display: flex;
    justify-content: center;
    li{
      margin: 0 0.1rem;
      width: 0.6rem;
      height: 0.6rem;
      text-align: center;
      line-height: 0.55rem;
      border-radius: 50%;
      border: 1px solid rgb(159, 159, 159);
      i{
        font-size: 0.4rem;
      }
      .icon-weixin{
        color: rgb(12, 242, 62);
      }
      .icon-QQ{
        color: rgb(1, 153, 255);
      }
      .icon-weibo{
        color: rgb(255, 0, 0);
      }
      img{
        width: 50%;
      }
    }
  }
  .p-top{
    margin: 0.2rem 0;
    font-size: 0.4rem;
    text-align: center;
  }
  .p-mid{
    color: rgb(151, 151, 151);
    font-size: 0.1rem;
    padding: 0 0.6rem;
    span{
      color: rgb(120, 209, 254);
    }
  }
  .p-bot{
    margin-top: 0.4rem;
    padding: 0 0.6rem;
    display: flex;
    justify-content: space-between;
    button{
      width: 48%;
      height: 0.9rem;
      border-radius: 0.5rem;
      border: 1px solid rgb(200, 200, 200);
    }
    .no{
      background-color: #fff;
    }
    .yes{
      background-color: red;
      color: #fff;
    }
  }
}
</style>