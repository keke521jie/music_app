<template>
  <div>
    <TopNav />
    <TopSwiper />
    <IconList />
    <FindSongList />
  </div>
</template>

<script>
import TopNav from "../../components/Home/TopNav.vue";
import TopSwiper from "../../components/Home/TopSwiper.vue";
import IconList from "../../components/Home/IconList.vue"
import FindSongList from "../../components/Home/FindSongList.vue"
import { onMounted } from '@vue/runtime-core';
import API from '@/api/index'
export default {
  name: "Home",
  components: {
    TopNav,
    TopSwiper,
    IconList,
    FindSongList
  },
  setup(){
    onMounted(()=>{
      // getUserCookie()
    })
    // 获取游客cookie
    // async function getUserCookie(){
    //   const result = await API.home.reqUserCookie()
    //   if(result.code === 200){
    //     console.log(result);
    //   }
    // }
  }
};
</script>

<style scoped>
</style>
