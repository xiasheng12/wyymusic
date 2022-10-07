import axios from 'axios'
import config from './config'

const api=axios.create({
    baseURL:config.url,
    timeout:10000
})
//请求拦截
api.interceptors.request.use(
    (config)=>{
        // console.log('请求配置',config);
        //业务逻辑
        return config
    },
    (error)=>{
        console.log(error,'请求拦截的失败消息');
    }
)
//响应拦截
api.interceptors.response.use(
    (res)=>{
        // console.log('响应结果',res);
        return res.data
    },
    (error)=>{
        // console.log(error,'响应拦截的失败消息');
        return error.response
    }
)
export default api