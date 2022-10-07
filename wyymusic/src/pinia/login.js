import { defineStore } from "pinia";
import { postcode , yzcode} from "../http/api/code";
import { login } from "../http/api/login";
import { useUserStore } from "./user"; 
export const useLoginStore=defineStore('login',{
    state:()=>{
        return{
            loginphone:localStorage.getItem('phone'),
            password:'',
            captcha:'',
            user:''
        }
    },
    getters:{
        codephone(state){
            return state.loginphone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
        },
        getpassword(state){
            return localStorage.getItem(state.loginphone)
        }
    },
    actions:{
        //获取user-pinia的数据
        getuser(value){
            const user=useUserStore()
            user.userprofile=value
            // console.log(user.profile);
        },
        //发送验证码
        async Postcode(loginphone){
            // console.log(loginphone,'获取验证码');
            let p=await postcode(loginphone)
            return p
            // console.log(p);
        },
        //验证验证码
        async Yzcode(params){
            let y=await yzcode(params)
            return y
            
        },
        //登录
        async Login(params){
            try {
                let l=await login(params)
                // console.log(l);
                this.getuser(l)
                return {
                    message:'登录成功',
                    code:'200'
                }
            } catch (error) {
                console.log('登录错误！');
                return {
                    message:'登录失败',
                    code:'502'
                }
                
            }
            // return l
        }
    }
})