import {createRouter, createWebHashHistory, createWebHistory,onBeforeRouteUpdate} from "vue-router"

const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            redirect:'/index'
        },
        {
            name:'index',
            path:"/index",
            component:()=>import('../components/Top.vue'),
            meta:{
                index:0
            },
            
        },
        {
            name:'blog',
            path:"/blog",
            component:()=>import('../components/blog.vue'),
            meta:{
                index:0
            }
        },
        {
            name:'mine',
            path:"/mine",
            component:()=>import('../components/mine.vue'),
            meta:{
                index:0
            }
        },
        {
            name:'focusOn',
            path:"/focusOn",
            component:()=>import('../components/focusOn.vue'),
            meta:{
                index:0
            }
        },
        {
            name:'Yuncun',
            path:"/Yuncun",
            component:()=>import('../components/Yuncun.vue'),
            meta:{
                index:0
            }
        },
        {
            redirect:'/usercenter/userhome',
            name:'usercenter',
            path:'/usercenter',
            component:()=>import('../views/usercenter.vue'),
            meta:{
                index:0,
            },
            children:[
                {
                    name:'userhome',
                    path:'/usercenter/userhome',
                    component:()=>import('../views/usercenterviews/userhome.vue')
                },
                {
                    name:'moving',
                    path:'/usercenter/moving',
                    component:()=>import('../views/usercenterviews/moving.vue')
                },
                {
                    name:'userblog',
                    path:'/usercenter/userblog',
                    component:()=>import('../views/usercenterviews/userblog.vue')
                }
            ]
        },
        {
            name:'playlist',
            path:"/playlist",
            component:()=>import('../views/playlist.vue'),
            meta:{
                index:1,
                
            }
        },
        {
            name:'Search',
            path:"/Search",
            component:()=>import('../views/Search.vue'),
            meta:{
                index:1
            }
        },
        {
            name:'Searchresults',
            path:"/Searchresults",
            redirect:'/Searchresults/searchsynthesis',
            component:()=>import('../views/Searchresults.vue'),
            meta:{
                index:1
            },
            children:[
                {
                    name:'searchsynthesis',
                    path:'/Searchresults/searchsynthesis',
                    component:()=>import('../views/Searchresultsviews/searchsynthesis.vue')
                },
                {
                    name:'searchsingle',
                    path:'/Searchresults/searchsingle',
                    component:()=>import('../views/Searchresultsviews/searchsingle.vue')
                },
                {
                    name:'searchPlaylist',
                    path:'/Searchresults/searchPlaylist',
                    component:()=>import('../views/Searchresultsviews/searchPlaylist.vue')
                },
                {
                    name:'searchVideo',
                    path:'/Searchresults/searchVideo',
                    component:()=>import('../views/Searchresultsviews/searchVideo.vue')
                },
                {
                    name:'searchsinger',
                    path:'/Searchresults/searchsinger',
                    component:()=>import('../views/Searchresultsviews/searchsinger.vue')
                },
                {
                    name:'searchblog',
                    path:'/Searchresults/searchblog',
                    component:()=>import('../views/Searchresultsviews/searchblog.vue')
                },
                {
                    name:'searchlyrics',
                    path:'/Searchresults/searchlyrics',
                    component:()=>import('../views/Searchresultsviews/searchlyrics.vue')
                },
                {
                    name:'searchalbum',
                    path:'/Searchresults/searchalbum',
                    component:()=>import('../views/Searchresultsviews/searchalbum.vue')
                },
                {
                    name:'searchsound',
                    path:'/Searchresults/searchsound',
                    component:()=>import('../views/Searchresultsviews/searchsound.vue')
                },
                {
                    name:'searchtopic',
                    path:'/Searchresults/searchtopic',
                    component:()=>import('../views/Searchresultsviews/searchtopic.vue')
                },
                {
                    name:'searchuser',
                    path:'/Searchresults/searchuser',
                    component:()=>import('../views/Searchresultsviews/searchuser.vue')
                },
            ]
        }
    ]
})

export default router