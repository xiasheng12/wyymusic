import { defineStore } from "pinia";
import { getsearchdefault ,getsearchmusic } from "../http/api/search";
export const useSearchStore=defineStore('search',{
    state:()=>{
        return{
            searchdefault:'',
            Historysearch:[],
            searchvalue:''
        }
    },
    persist:{
        enabled: true,
        strategies:[
            { storage:localStorage,paths:['Historysearch'] }
        ]
    },
    getters:{
        
    },
    actions:{
        async Getsearchdefault(){
            try {
                let g=await getsearchdefault()
                this.searchdefault=g
                return {
                    showsong:g.data.showKeyword
                }
                console.log(g);
            } catch (error) {
                console.log(error);
                return error
            }
        },
        //搜索的结果
        async Getsearchmusic(params){
            this.Historysearch.push(params)
            try {
                let g=await getsearchmusic(params)
                this.searchvalue=g
            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
})