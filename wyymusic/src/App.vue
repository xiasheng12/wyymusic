<template>
  <div id="home">
      <Sidebar v-show="Sidebar"></Sidebar>
      <router-view v-slot="{ Component }">
        <!-- <transition :name="animation">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive"></component>
          </keep-alive>
        </transition> -->
        <transition :name="animation">
            <component :is="Component"></component>
        </transition>
      </router-view>
      <!-- <router-view></router-view> -->
      <Bot></Bot>
  </div>
</template>

<script> 
  import Bot from './components/Bot.vue'
  import Sidebar from './components/Sidebar.vue'
  import{ watch,ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  export default{
    setup(){
      const router=useRouter()
      const route=useRoute()
      const animation=ref('')
      const Sidebar=ref(true)
      const botkey=ref(0)
      router.beforeEach((to,from,next)=>{
        if(to.meta.index==0&&from.meta.index==1){
          animation.value='right'
          Sidebar.value=true
        }else if(to.meta.index==1&&from.meta.index==0){
          animation.value='left'
          Sidebar.value=false
        }else{
          animation.value=''
        }
        next()
      })
      return{
        animation,
        Sidebar,
        botkey,
      }
    },
    components:{Bot,Sidebar},
  } 
</script>

<style lang="less">
.left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active {
    transition: all 0.3s;
    position :absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index :1;
}
.left-enter-from, .right-leave-to {
  transform: translateX(100%);
}
.right-enter-from, .left-leave-to {
  transform: translateX(-100%);
}
#home{
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background-color: var(--light-bg-color);
  .songlist{
    width: 100%;
    .s-top{
    position: fixed;
    z-index: 5;
    padding: 0.3rem;
    border-radius: 0.4rem 0.4rem 0 0;
    width: 100%;
    background-color: #fff;
    .s-top-t{
        font-size: 0.35rem;
        font-weight: bold;
        span{
        margin-left: 0.1rem;
        font-size: 0.2rem;
        font-weight: normal;
        color: rgb(143, 143, 143);
        }
    }
    .s-top-b{
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        i{
        font-size: 0.4rem;
        }
        .text{
        margin-left: 0.2rem;
        flex: 1;
        }
        .icon-shoucang{
        margin: 0 0.5rem;
        }
    }
    }
    .s-bot{
    padding-top: 2rem;
    .gs{
        font-size: 0.2rem;
      }
    }
  }
}
:root{
  --light-bg-color:#f6f6f6;
  --lightchlidern-bg-color:#fff;
  --light-font-size-color:rgb(0, 0, 0);
  --light-tag-fz-color:rgb(255, 0, 43);
  --light-tag-bg-color:rgb(250, 226, 230);
  --light-tag-text-fz-color:#8d8d8d;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
    color: #000;
    text-decoration: none;
}
ul,ol{
    margin: 0;
    list-style: none;
}
img{
    vertical-align: middle;
}
</style>
