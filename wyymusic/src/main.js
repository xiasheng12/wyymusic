import { createApp } from 'vue'
import App from './App.vue'
import { Search ,ConfigProvider,Collapse, CollapseItem ,SwipeCell, PasswordInput, NumberKeyboard ,Checkbox, CheckboxGroup ,Button ,Circle ,Tab, Divider ,Tabs ,Swipe, Switch , SwipeItem ,Popup ,Sticky ,NoticeBar,Loading ,Slider } from 'vant';
import { Toast } from 'vant';
import 'vant/es/toast/style';
import router from './router';
import 'animate.css';
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import songxq from './GlobalComponent/songxq.vue'
const pinia=createPinia()

pinia.use(piniaPluginPersist)

const app=createApp(App)

//注册全局组件
app.component('songxq',songxq)

app.use(router)
app.use(pinia)

app.use(Toast)
app.use(PasswordInput)
app.use(Search).use(Slider).use(Collapse).use(CollapseItem)
app.use(Loading)
app.use(NoticeBar)
app.use(Checkbox)
app.use(NumberKeyboard)
app.use(CheckboxGroup)
app.use(Button)
app.use(SwipeCell)
app.use(Circle)
app.use(Sticky)
app.use(Switch)
app.use(Divider)
app.use(Tab)
app.use(Tabs)
app.use(Swipe)
app.use(Popup)
app.use(SwipeItem)
app.use(ConfigProvider)


//挂载全局方法
app.provide('animate',animate)

function animate(obj,target){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var step=(target-obj.offsetLeft)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        if(obj.offsetLeft==target){
            clearInterval(obj.timer);
        }    
        obj.style.left=obj.offsetLeft+step+'px'; 
    },12)
} 

app.mount('#app')




