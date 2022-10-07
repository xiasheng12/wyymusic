## vue3获取dom元素
const bot=ref(null)
bot.value

## 移动端的鼠标事件为touch事件包含touchstart、touchmove、touchend

## vue3挂载全局方法 app.provide('animate',animate)
## 组件使用该方法 const animate=inject('animate')

function animate(obj,target){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var step=(target-obj.offsetLeft)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        if(obj.offsetLeft==target){
            clearInterval(obj.timer);
        }    
        obj.style.left=obj.offsetLeft+step+'px'; 
    },15)
} 

## pinia持久化缓存
具体解决方案就是：
使用pinia-plugin-persist持久化状态管理插件，它会默认把你需要持久化的数据缓存在Session Storage里。使用方法：
第一步：安装pinia-plugin-persist插件
npm i pinia-plugin-persist --save

第二步：在你需要缓存的store 里开启 persist 
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三'
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true
  }
})
帖子链接： https://blog.csdn.net/qq_29517595/article/details/125218930

## 动画库 animate 的使用
<div class="animate__animated animate__bounce animate__delay-2s">Example</div>

## 文字超出部分显示省略号
单行 要设置宽度
.js{
    flex: 1;
    font-size: 0.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
多行
p{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;//这个是显示的行数
  overflow: hidden;
}

## 获取proxy里的值
1 序列化获取：JSON.parse(JSON.stringify(fileList))

2.// 导入toRaw函数
  import { toRaw } from '@vue/reactivity';
  // 该函数返回转换后的对象
  const crystal = toRaw(menu);

## 注册全局组件
1.import  playlist  from './GlobalComponent/playlist.vue'
2.app.component('playlist',playlist)
3.引入<playlist></playlist>

## v-if和v-for 
v2里v-for的优先级大于v-if v3则相反 可以用v-show但是还是会渲染页面

## js判断数组中是否存在某个值的几种方法
1. array.indexOf 判断数组中是否存在某个值，如果存在返回数组元素的下标，否则返回-1
2. array.includes(searchElement[, fromIndex]) 判断一个数组是否包含一个指定的值，如果存在返回 true，否则返回false。
3. array.find(callback[, thisArg])  返回数组中满足条件的第一个元素的值，如果没有，返回undefined
4. array.findIndex(callback[, thisArg]) 返回数组中满足条件的第一个元素的索引（下标）, 如果没有找到，返回-1
5. $.inArray(searchElement, arr) 使用jquery的inArray方法，该方法返回元素在数组中的下标，如果不存在与数组中，那么返回－１;