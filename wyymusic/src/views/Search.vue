<template>
  <div id="Search">
    <div class="top" >
        <div class="t-top">
            <van-icon name="arrow-left" size="0.4rem" @click="goback" />
            <van-search class="s" background=var(--lightchlidern-bg-color) v-model="searchvalue" shape="round"  :placeholder="placeholder" @search="searchmusic" />
            <div class="text" @click="searchmusic">搜索</div>
        </div>
        <ul class="t-bot" >
            <li>
                <i class="iconfont icon-geshou-copy"></i>
                <span>歌手</span>
            </li>
            <li>
                <i class="iconfont icon-gedan"></i>
                <span>曲风</span>
            </li>
            <li>
                <i class="iconfont icon-yinle4"></i>
                <span>专区</span>
            </li>
            <li>
                <i class="iconfont icon-mic-on-full"></i>
                <span>识曲</span>
            </li>
        </ul>
    </div>
    <div class="search_history" >
        <div class="s_h-top">
            <div>历史</div>
            <van-icon name="delete-o" color="#808080" size="0.4rem" />
        </div>
        <ul class="s_h-bot">
            <li v-for="(s,index) in historyvalue" :key="index" v-show="index<historyvaluesum">{{s}}</li>
            <li class="last" @click="openhistory">
                <van-icon :name="s_h_bot_icon" />
            </li>
        </ul>
    </div>
    <div class="search_recommend" >
        <div class="s_h-top">
            <div>推荐</div>
            <van-icon name="replay" color="#808080" size="0.4rem" />
        </div>
        <ul class="s_h-bot">
            <li v-for="(s,index) in historyvalue" :key="index" v-show="index<3">{{s}}</li>
        </ul>
    </div>
    <div class="bot-box" ref="bot_box" @touchstart="start" >
        <ul class="bot" ref="bot">
            <li class="addpadding" v-for="(b,index) in botvalue" :key="index" >
                    <div class="b-l-top">
                        <div class="l">{{b.toptext}}</div>
                        <div class="r" v-if="b.ishaveplay">
                            <van-icon name="play" />
                            <span>播放</span>
                        </div>
                    </div>
                    <ul class="b-l-bot">
                        <li v-for="(s,index) in b.bottext" :key="index">
                            <div class="ranking">{{index+1}}</div>
                            <div class="name">{{s.searchWord}}</div>
                            <van-icon :name='s.iconUrl' size="0.5rem" />
                        </li>
                    </ul>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { getsearchhot } from '../http/api/search';
import useStore from '../pinia';
import { ref,reactive ,onMounted,inject,toRaw} from 'vue';
import { useRouter , useRoute  } from 'vue-router';
import emitter from '../bus';
export default {
    name:'Search',
    setup(){
        //获取热搜
        Getserchhot()
        const route=useRoute()
        const router=useRouter()
        const { search } = useStore()
        //搜索变量
        const searchvalue=ref('')
        const historyvalue=reactive(['樱花树下的约定','樱花树下','樱花树下的约','樱花树下的约定','樱花树约定','樱花约定','樱花树','adsada'])
        const historyvaluesum=ref(3)
        const s_h_bot_icon=ref('arrow-down')
        //打开历史记录
        const openhistory=()=>{
            if(s_h_bot_icon.value=='arrow-down'){
                historyvaluesum.value=historyvalue.length
                s_h_bot_icon.value='arrow-up'
            }else{
                historyvaluesum.value=3
                s_h_bot_icon.value='arrow-down'
            }
            
        }
        const botvalue=reactive([
            {
                toptext:'热搜榜',
                ishaveplay:true,
                bottext:[]
            },
            {
                toptext:'话题榜',
                ishaveplay:false,
                bottext:[]
            },
            {
                toptext:'有声书榜',
                ishaveplay:false,
                bottext:[]
            },
            {
                toptext:'播客榜',
                ishaveplay:false,
                bottext:[]
            },
            {
                toptext:'视频榜',
                ishaveplay:false,
                bottext:[]
            },
        ])
        const bot_box=ref(null)
        const bot=ref(null)
        const placeholder=ref('')
        onMounted(()=>{
            let issearch= search.Getsearchdefault()
            issearch.then(res=>{
                placeholder.value=res.showsong
            }).catch(
                err=>{
                    console.log(err);
                }
            )
        })
        //获取热搜
        async function Getserchhot(){
            let g=await getsearchhot()
            for(let i=0;i<g.data.length;i++){
                toRaw(botvalue[0]).bottext[i]=g.data[i]
            }
            for(let j=1;j<toRaw(botvalue).length;j++){
                toRaw(botvalue)[j].bottext=toRaw(botvalue)[0].bottext
            }
        }
        const animate=inject('animate')
        const startindex=ref(0)
        const start=(e)=>{
            let first=e.touches[0].pageX
            let end=bot.value.offsetLeft
            let move=undefined
            bot.value.ontouchmove=function(e){
                let movex=e.touches[0].pageX-first
                bot.value.style.left=(movex+end)+'px'
                move=movex
            }
            bot.value.ontouchend=function(e){
                if(bot.value.offsetLeft>=0){
                    animate(bot.value,startindex.value*bot.value.children[0].offsetWidth)
                }else if(bot.value.offsetLeft<0&&move<=-120){
                    startindex.value++
                    animate(bot.value,-bot.value.children[0].offsetWidth*startindex.value)
                }else if(bot.value.offsetLeft<0&&move>=-120&&move<=0){
                    animate(bot.value,-startindex.value*bot.value.children[0].offsetWidth)
                }else if(bot.value.offsetLeft<0&&move>=120){
                    startindex.value--
                    animate(bot.value,-bot.value.children[0].offsetWidth*startindex.value)
                }else if(bot.value.offsetLeft<0&&move>0&&move<120){
                    animate(bot.value,-bot.value.children[0].offsetWidth*startindex.value)
                }
            }
        }
        //退出搜索
        const goback=()=>{
            router.go(-1)
            emitter.emit('goback',true)
        }
        const searchmusic=()=>{
            search.Getsearchmusic({keywords:searchvalue.value})
            router.push({
                name:'Searchresults',
                query:{
                    searchvalue:searchvalue.value
                }
            })
        }
        return {
            placeholder,
            historyvaluesum,
            historyvalue,
            searchvalue,
            s_h_bot_icon,
            bot_box,
            bot,
            botvalue,
            openhistory,
            start,
            goback,
            searchmusic,
        }
    }
}
</script>

<style lang="less" scoped>
#Search{
    position: relative;
    padding-top: 2rem;
    width: 100%;
    height: 100vh;
    .top{
        position: fixed;
        z-index: 3;
        top: 0;
        padding: 0.2rem;
        width: 100%;
        height: 2rem;
        background-color: #fff;
        .t-top{
            display: flex;
            align-items: center;
            width: 100%;
            height: 50%;
            .s{
                flex: 1;
            }
        }
        .t-bot{
            position: absolute;
            z-index: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 50%;
            background-color: #fff;
            li{
                margin-right: 0rem;
                text-align: center;
                width: 25%;
                height: 50%;
                border-right: 1px solid #000;
                i{
                    margin-right: 0.1rem;
                    color: red;
                }
                span{
                    font-weight: bold;
                }
                &:last-child{
                    border: none;
                }
            }
        }
    }
    .search_recommend,.search_history{
        margin-top: 0.3rem;
        padding: 0 0.2rem;
        .s_h-top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }
        .s_h-bot{
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.2rem;
            width: 100%;
            li{
                margin-right: 0.15rem;
                margin-bottom: 0.2rem;
                padding: 0.1rem 0.2rem;
                border-radius: 0.3rem;
                background-color: #fff;
                font-size: 0.25rem;
                line-height: 0.4rem;
                color: var(--light-tag-text-fz-color);
            }
            .last{
                padding: 0;
                width: 0.6rem;
                height: 0.6rem;
                text-align: center;
                line-height: 0.6rem;
                font-size: 0.3rem;
                border-radius: 50%;
            }
        }
    }
    .bot-box{
        position: relative;
        width: 330%;
        .bot{
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            padding: 0.2rem;
            padding-bottom: 1rem;
            width: 100%;
            li{
                margin-right: 0.2rem;
                border-radius: 0.2rem;
                width: 65%;
                height: 100%;
                background-color: #fff;
                .b-l-top{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding-bottom: 0.2rem;
                    border-bottom: 1px solid rgb(217, 217, 217);
                    .l{
                        font-weight: bold;
                    }
                    .r{
                        width: 1rem;
                        height: 0.4rem;
                        text-align: center;
                        font-size: 0.2rem;
                        border-radius: 0.2rem;
                        border: 1px solid rgb(159, 159, 159);
                    }
                }
                .b-l-bot{
                    margin-top: 0.2rem;
                    li{
                        margin-bottom: 0.2rem;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        .ranking{
                            color: rgb(142, 142, 142);
                            width: 0.35rem;
                            font-size: 0.35rem;
                        }
                        .name{
                            margin: 0 0.2rem;
                        }
                        &:last-child{
                            margin-bottom: 0;
                        }
                        &:nth-child(1),&:nth-child(2),&:nth-child(3){
                            .ranking{
                                color: red;
                            }
                        }
                    }
                }
                
            }
            .addpadding{
                padding: 0.3rem;
            }
        }
    }
    .searchshow{
        position: absolute;
        top: 1.3rem;
        width: 100%;
        height: 100%;
        z-index: 2;
        background-color: rgb(255, 255, 255);
        ul{
            width: 100%;
            height: 100%;
            li{
                display: flex;
                align-items: center;
                padding: 0 0 0 0.2rem;
                width: 100%;
                height: 0.9rem;
                
                .iconfont{
                   margin-right: 0.1rem;
                   font-size: 0.35rem;
                }
                .searchtext{
                    flex: 1;
                    line-height: 1rem;
                    height: 100%;
                    border-bottom: 1px solid rgb(164, 164, 164);
                }
            }
        }
    }
}

</style>