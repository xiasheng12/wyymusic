<template>
  <h1>博客</h1>
</template>

<script>
    import { ref, reactive , onMounted  } from 'vue';   
    import { useRouter , useRoute  } from 'vue-router';
    export default {
        name:"blog",
        setup(){
            const router=useRouter()
            const route=useRoute()
            onMounted(()=>{
                // console.log(route.name);
            })


            return{
                
            }
        }
    }
</script>

<style>

</style>