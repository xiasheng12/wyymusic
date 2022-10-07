<template>
  <div id="password">
    <div class="top">账号密码登录</div>
    <div class="inp">
        <input type="text" ref="input" placeholder="输入密码" v-model="Password"  @keyup="inppassword()">
        <van-icon @click="deleteall" v-show="Password.length>0" class="deleteall" name="close" />
    </div>
    <van-button type="danger" size="large" :disabled="btnflag" round @click="next">立即登录</van-button>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import useStore from '../pinia';
import { ref , getCurrentInstance} from 'vue';
import { useRouter , useRoute  } from 'vue-router';
export default {
    name:'password',
    setup(){
        const router=useRouter()
        const { proxy }=getCurrentInstance()
        const { login , user ,userinfo } = useStore()
        const { loginphone , password}=storeToRefs(login)
        const Password=ref('')
        const btnflag=ref(true)
        const input=ref(null)
        const deleteall=()=>{
            Password.value=''
        }
        const inppassword=()=>{
            if(Password.value.length>0){
                btnflag.value=false
            }else{
                btnflag.value=true
            }
        }
        const next=()=>{
            password.value=Password.value
            //登录
            let islogin= login.Login({phone:loginphone.value,password:password.value})
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
                        localStorage.setItem(`${loginphone.value}`,password.value)
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
                    console.log(err,'err');
                }
            )
        }
        return{
            Password,
            btnflag,
            input,
            deleteall,
            inppassword,
            next
        }
    }
}
</script>

<style lang="less" scoped>
#password{
    padding: 0.3rem;
    width: 100%;
    height: 100%;
    .top{
        position: relative;
        font-size: 0.4rem;
        text-align: center;
    }
    .inp{
        position: relative;
        margin: 0.8rem 0;
        .phone{
            position: absolute;
            left: 0;
            font-size: 0.4rem;
        }
        input{
            padding-bottom: 0.2rem;
            font-size: 0.4rem;
            width: 100%;
            border: none;
            border-bottom: 1px solid #000;
        }
        .deleteall{
            position: absolute;
            top: 10%;
            right: 0;
            font-size: 0.4rem;
        }
    }
}
</style>