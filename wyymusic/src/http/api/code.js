import api from ".."

//发送验证码
export const postcode=(params)=>{
    return api({
        method:"get",
        url:"/captcha/sent",
        params
    })
}
//验证验证码
export const yzcode=(params)=>{
    return api({
        method:'get',
        url:'/captcha/verify',
        params
    })
}