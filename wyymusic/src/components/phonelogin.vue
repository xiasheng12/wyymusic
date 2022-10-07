<template>
  <div id="phonelogin">
    <div class="top">手机号登录</div>
    <div class="mid">
        <div class="t">登录体验更多</div>
        <div class="b">未注册手机号登录后将自动创建账号</div>
    </div>
    <div class="inp">
        <div class="phone">+86</div>
        <input type="text" ref="input" placeholder="输入手机号" :value="phone" @click="showjp">
        <van-icon @click="deleteall" v-show="phone.length>0" class="deleteall" name="close" />
    </div>
    <van-button type="danger" size="large" :disabled="btnflag" round @click="next">下一步</van-button>
    <div class="bot">找回账号</div>
    <van-number-keyboard
    :show="show"
    @input="onInput"
    @delete="onDelete"
    @blur="noshow"
    />
    <van-popup :show="codeshow" closeable close-icon-position="top-left"  @click-close-icon="closecode" position="right"  :style="{ height: '100%' ,width:'100%'}">
          <inpcodeVue v-if="codeshow"></inpcodeVue>
      </van-popup>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import useStore from '../pinia';
import inpcodeVue from './inpcode.vue';
import { ref , onMounted,getCurrentInstance} from 'vue';
export default {
    name:'phonelogin',
    components:{inpcodeVue},
    setup(){
        const { proxy }=getCurrentInstance()
        const { login } = useStore()
        const { loginphone }=storeToRefs(login)
        const input=ref(null)
        let phone=ref('')
        const show = ref(false);
        const codeshow = ref(false)
        const btnflag = ref(true);
        const closecode=()=>{
          codeshow.value=false
        }
        const onInput = (value) => {
            if(phone.value.length>=0){
                btnflag.value=false
            }else{
                btnflag.value=true
            }
            phone.value+=value
            loginphone.value=phone.value
        };
        const onDelete = () => {
            console.log(phone.value.length);
            if(phone.value.length<=1){
                btnflag.value=true
            }else{
                btnflag.value=false
            }
            phone.value=phone.value.slice(0,phone.value.length-1)
        };
        const showjp=()=>{
            show.value=true
        }
        const noshow=()=>{
            show.value=false
        }
        const deleteall=()=>{
            phone.value=''
            show.value=true
            input.value.focus()
        }
        const next=()=>{
            if(phone.value.length!==11){
                proxy.$toast({
                    message: '手机号码应该是11位数字',
                    icon: 'close',
                });
            }else{
                // console.log(loginphone.value);
                codeshow.value=true
            }
        }
        onMounted(()=>{
            // console.log(loginphone.value,password.value);
            show.value=true
            input.value.focus()
        })
        return{
            login,
            show,
            input,
            phone,
            btnflag,
            codeshow,
            onInput,
            onDelete,
            showjp,
            deleteall,
            noshow,
            next,
            closecode
        }
    }
}
</script>

<style lang="less" scoped>
#phonelogin{
    padding: 0.3rem;
    width: 100%;
    height: 100%;
    .top{
        font-size: 0.4rem;
        text-align: center;
    }
    .mid{
        margin: 0.5rem 0 ;
        color: rgb(162, 162, 162);
        .t{
            margin-bottom: 0.1rem;
            color: #000;
            font-size: 0.4rem;
        }
    }
    .inp{
        position: relative;
        margin-bottom: 0.6rem;
        .phone{
            position: absolute;
            left: 0;
            font-size: 0.4rem;
        }
        input{
            padding-left: 0.8rem;
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
    .bot{
        margin-top: 0.4rem;
        text-align: center;
        color: rgb(0, 128, 255);
    }
}
</style>