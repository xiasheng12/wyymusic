<template>
  <div id="inpcode">
    <div class="top">手机号登录
        <div class="password" @click="passwordlogin">密码登录</div>
    </div>
    <div class="mid">
        <div class="t">请输入验证码</div>
        <div class="b">已发送至+86 {{login.codephone}}
            <span v-show="times==0" @click="againpostcode">重新发送</span>
            <span class="time" v-show="times!==0">重新发送 {{times}}s后</span>
        </div>
    </div>
    <van-password-input
    :value="value"
    :mask="false"
    :length="4"
    :focused="showKeyboard"
    @focus="showKeyboard = true"
    />
    <div class="bot">手机号已更换，无法接收短信？<van-icon name="arrow" /></div>
    <van-number-keyboard
    v-model="value"
    @input="inpcode"
    :show="showKeyboard"
    @blur="showKeyboard = false"
    />
    <van-popup :show="passwordshow" closeable close-icon-position="top-left" close-icon="arrow-left"  @click-close-icon="closepassword" position="right"  :style="{ height: '100%' ,width:'100%'}">
          <passwordVue v-if="passwordshow"></passwordVue>
    </van-popup>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import useStore from '../pinia';
import passwordVue from './password.vue';
import { ref ,onMounted ,getCurrentInstance} from 'vue';
import { useRouter } from 'vue-router';
export default {
    name:'inpcode',
    components:{passwordVue},
    setup(){
        const { proxy }=getCurrentInstance()
        const { login ,userinfo ,user} = useStore()
        const { loginphone ,captcha , password}=storeToRefs(login)
        const router=useRouter()
        const value = ref('');
        const passwordshow = ref(false);
        const showKeyboard = ref(true);
        const closepassword=()=>{
            passwordshow.value=false
        }
        const passwordlogin=()=>{
            passwordshow.value=true
        }
        const inpcode=()=>{
            // console.log(value.value);
            if(password.value!==null){
                if(value.value.length==3){
                    // console.log('验证验证玛');
                    captcha.value=value.value
                    setTimeout(()=>{
                        //验证验证码
                        let iscode=login.Yzcode({phone:loginphone.value,captcha:value.value})
                        iscode.then(
                            res=>{
                                if(res.code=='200'){
                                    console.log('yz成功');
                                    //登录
                                    let islogin=login.Login({phone:loginphone.value,password:login.getpassword})
                                    islogin.then(
                                        res=>{
                                            console.log(res);
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
                                                localStorage.setItem(`${loginphone.value}`,login.getpassword)
                                                localStorage.setItem('phone',loginphone.value)
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
                                    islogin.catch(
                                        err=>{
                                            console.log(err,'错误');
                                        }
                                    )
                                }else{
                                    console.log('yz失败');
                                    proxy.$toast({
                                        message:'验证码错误！',
                                        icon:'close'
                                    })
                                    value.value=''
                                }
                            }
                        )
                        iscode.catch(
                            err=>{
                                console.log(err);
                            }
                        )
                    },10)
                }
            }
        }
        const againpostcode=()=>{
            countdown()
            // console.log(1);
            let ispostcode=login.Postcode({phone:loginphone.value})
            ispostcode.then(
                res=>{
                    console.log(res);
                }
            )
            ispostcode.catch(
                err=>{
                    console.log(err);
                }
            )
        }
        let times=ref(0)
        const countdown=()=>{
            times.value=60
            let djs=setInterval(()=>{
                if(times.value<=0){
                    clearInterval(djs)
                }else{
                    times.value--
                }
            },1000)
        }
        onMounted(()=>{
            if(login.getpassword==null){
                proxy.$toast({
                    message: '第一次登录请用密码登录',
                    icon: 'close',
                });
                setTimeout(()=>{
                    passwordshow.value=true
                },500)
            }else{
                //发送验证码
                let ispostcode=login.Postcode({phone:loginphone.value})
                console.log(ispostcode);
                ispostcode.then(
                    res=>{
                        console.log(res);
                        if(res.code==400&&res.data==false){
                            proxy.$toast({
                                message:res.message+'请用密码登录',
                                icon:'close'
                            })
                            passwordshow.value=true
                        }
                    }
                )
                ispostcode.catch(
                    err=>{
                        console.log(err);
                    }
                )
                countdown()
            }
        })
        return {
            value,
            login,
            times,
            passwordshow,
            showKeyboard,
            closepassword,
            passwordlogin,
            inpcode,
            countdown,
            againpostcode
        }
    }
}
</script>

<style lang="less" scoped>
#inpcode{
    padding: 0.3rem;
    width: 100%;
    height: 100%;
    .top{
        position: relative;
        font-size: 0.4rem;
        text-align: center;
        .password{
            position: absolute;
            top: 0;
            right: 0;
            width: 1.4rem;
            height: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            border: 1px solid #000;
            border-radius: 0.3rem;
            font-size: 0.25rem;
        }
    }
    .mid{
        margin: 0.5rem 0 ;
        color: rgb(162, 162, 162);
        .t{
            margin-bottom: 0.1rem;
            color: #000;
            font-size: 0.4rem;
        }
        .b{
            span{
                float: right;
                font-size: 0.25rem;
                line-height: 0.45rem;
                color: rgb(3, 145, 216);
            }
            .time{
                font-size: 0.25rem;
                line-height: 0.45rem;
                color: rgb(153, 153, 153);
            }
        }
    }
    .bot{
        margin-top: 1rem;
        text-align: center;
        font-size: 0.2rem;
        color: rgb(175, 174, 174);
    }
}
</style>