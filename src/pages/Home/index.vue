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
export default {
  name: "Home",
  components: {
    TopNav,
    TopSwiper,
    IconList,
    FindSongList
  },
};
</script>

<style scoped>
</style>
