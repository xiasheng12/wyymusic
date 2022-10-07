<template>
  <div id="Searchresults">
    <div class="top" >
        <div class="t-top">
            <van-icon name="arrow-left" size="0.4rem" @click="goback" />
            <van-search class="s" background=var(--lightchlidern-bg-color) v-model="searchvalue" shape="round"   @search="searchmusic" />
            <div class="text" @click="searchmusic">搜索</div>
        </div>
    </div>
    <van-tabs :active="active" sticky animated offset-top="1rem">
      <van-tab v-for="(t,index) in tabs" :key="index" :title="t.tille" :to="t.name">
        <router-view></router-view>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import useStore from '../pinia';
import { useRouter ,useRoute} from 'vue-router';
import { ref,reactive,toRaw ,onMounted} from 'vue';
export default {
    name:"Searchresults",
    setup(){
      const router=useRouter()
      const route=useRoute()
      const active=ref('')
      const searchvalue=ref('')
      const { search } = useStore();
      const goback=()=>{
        router.go(-1)
      }
      onMounted(()=>{
        searchvalue.value=route.query.searchvalue
        console.log(search.searchvalue,Searchresults);
      })
      const searchmusic=()=>{

      }
      const tabs=reactive([
        {
          tille:'综合',
          name:'searchsynthesis'
        },
        {
          tille:'单曲',
          name:'searchsingle'
        },
        {
          tille:'歌单',
          name:'searchPlaylist'
        },
        {
          tille:'视频',
          name:'searchVideo'
        },
        {
          tille:'歌手',
          name:'searchsinger'
        },
        {
          tille:'博客',
          name:'searchblog'
        },
        {
          tille:'歌词',
          name:'searchlyrics'
        },
        {
          tille:'专辑',
          name:'searchalbum'
        },
        {
          tille:'声音',
          name:'searchsound'
        },
        {
          tille:'话题',
          name:'searchtopic'
        },
        {
          tille:'用户',
          name:'searchuser'
        },
      ])
        return {
          active,
          searchvalue,
          tabs,
          goback,
          searchmusic
        }
    }
}
</script>

<style lang="less" scoped>
#Searchresults{
  position: relative;
  padding-top: 1rem;
  
  width: 100%;
  height: 100vh;
  .top{
        position: fixed;
        z-index: 3;
        top: 0;
        padding: 0.2rem;
        width: 100%;
        height: 1rem;
        background-color: #fff;
        .t-top{
            display: flex;
            align-items: center;
            margin-top: 0.2rem;
            width: 100%;
            height: 50%;
            .s{
                flex: 1;
            }
        }
    }
}
</style>