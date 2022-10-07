<template>
    <div id="bot" ref="Bot">
        <musicbot :key="musickey"></musicbot>
        <div class="nav " ref="bot">
            <div @click="checked(index,b.name)" v-for="(b,index) in botvalue" :key="index">
                <i :class="b.iconfont" v-show="b.check==false"></i>
                <div class="checke" v-show="b.check">
                    <i :class="b.iconfont"></i>
                </div>
                <div class="text">{{b.text}}</div>
            </div>
        </div>
        <!-- 歌曲详情组件 -->
        <van-popup :show="songshow" position="bottom"  :style="{ height: '100%',width:'100%' }" teleport="body">
            <songxq v-show="songshow" :key="songxqkey"></songxq>
        </van-popup>
    </div>
</template>

<script>
    import musicbot from './musicbot.vue'
    import useStore from '../pinia';
    import emitter from '../bus';
    import { ref, reactive , onMounted ,toRaw  } from 'vue';
    import { useRouter , useRoute  } from 'vue-router';
    export default {
        name:'bot',
        components:{musicbot},
        setup(){
            const { music } =useStore()
            const router=useRouter()
            const route=useRoute()
            const musickey=ref(0)
            const botvalue=reactive([
                {
                    iconfont:'iconfont icon-yinle2',
                    text:'发现',
                    check:false,
                    name:'index'
                },
                {
                    iconfont:'iconfont icon-faxian',
                    text:'博客',
                    check:false,
                    name:'blog'
                },
                {
                    iconfont:'iconfont icon-yinle1',
                    text:'我的',
                    check:false,
                    name:'mine'
                },
                {
                    iconfont:'iconfont icon-guanzhu1',
                    text:'关注',
                    check:false,
                    name:'focusOn'
                },
                {
                    iconfont:'iconfont icon-guanzhu',
                    text:'云村',
                    check:false,
                    name:'Yuncun'
                }
            ])
            const bot=ref(null)
            const Bot=ref(null)

            const songshow=ref(false)
            const songxqkey=ref(0)


            const nowmusic=toRaw(music.nowmusic)
            function checked(index,name){
                for(let i=0;i<bot.value.children.length;i++){
                    bot.value.children[i].children[1].classList.remove('animate__animated')
                    bot.value.children[i].children[1].classList.remove('animate__fadeIn')
                    bot.value.children[i].children[1].classList.remove('animate__faster')
                    bot.value.children[i].children[2].style.color='#393e46'
                    botvalue[i].check=false
                }
                botvalue[index].check=true
                bot.value.children[index].children[1].classList.add('animate__animated')
                bot.value.children[index].children[1].classList.add('animate__fadeIn')
                bot.value.children[index].children[1].classList.add('animate__faster')
                bot.value.children[index].children[2].style.color='red'
                
                // console.log(name);
                // console.log(route.fullPath);
                router.push({
                    name,
                    query:{
                        active:index
                    }
                })
               
               
               

            }
            onMounted(()=>{
                if(route.path=='/'){
                    botvalue[0].check=true
                    bot.value.children[0].children[1].classList.add('animate__animated')
                    bot.value.children[0].children[1].classList.add('animate__fadeIn')
                    bot.value.children[0].children[1].classList.add('animate__faster')
                    bot.value.children[0].children[2].style.color='red'
                }
            })
            emitter.on('gotousercenter',data=>{
                if(data==true){
                    Bot.value.style.transform='translateY(1.38rem)'
                }
            })
            emitter.on('gotolistxq',data=>{
                if(data==true){
                    Bot.value.style.transform='translateY(1.38rem)'
                }
            })
            //个人中心的回退
            emitter.on('goback',data=>{
                if(data==true){
                    Bot.value.style.transform='translateY(0)'
                }
            })
            emitter.on('changmusic',data=>{
                if(data){
                    console.log('触发');
                    musickey.value++
                }
            })
            //playlist的打开songxq
            emitter.on('gotosongxq',data=>{
                if(data){
                    songshow.value=data
                    songxqkey.value++
                }
            })
            //musicbot的打开songxq
            emitter.on('opensongxq',data=>{
                if(data){
                    songshow.value=data
                }
            })
            //歌曲详情的back
            emitter.on('back',data=>{
                songshow.value=data
            })
            //切换歌曲刷新
            emitter.on('switchmusic',data=>{
                if(data){
                    console.log('触发');
                    songxqkey.value++
                }
            })
            return{
                botvalue,
                bot,
                Bot,
                nowmusic,
                music,
                musickey,
                songshow,
                songxqkey,
                checked,
            }
        },
    }
</script>

<style lang="less" scoped>
#bot{
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 0;
    z-index: 101;
    padding: 0 0 0.2rem 0;
    width: 100vw;
    // height: 2.1rem;
    color: var(--light-font-size-color);
    background-color: var(--lightchlidern-bg-color);
    backdrop-filter: blur(5px);
    transition: all 0.4s;
    transform: translateY(0);
    border-radius: 0.2rem 0.2rem 0 0;
    .nav{
        display: flex;
        justify-content: space-around;
        padding-top: 0.2rem;
        width: 100%;
        height: 50%;
        
        div{
            // color: #393e46;
            color: var(--light-tag-text-fz-color);
            .checke{
                display: flex;
                justify-content: center;
                align-items: center;
                padding-left: 1px;
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                background: linear-gradient(to top right, rgb(233, 0, 27), rgb(255, 212, 212));
                // background-color: red;
                .iconfont{
                    font-size: 0.4rem;
                    color: #fff;
                }   
            }
            .iconfont{
                font-size: 0.6rem; 
                // transform: scale(0.8); 
                // transition: all 0.5s;    
            }
            .text{
                text-align: center;
                font-size: 0.2rem;
            }
        }
    }

}
</style>