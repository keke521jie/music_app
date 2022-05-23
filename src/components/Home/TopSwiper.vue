<template>
  <div id="topSwiper">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image.bannerId">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import API from "../../api";
export default {
  name: "TopSwiper",
  setup() {
    const state = reactive({
      images: [
        "https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    onMounted(() => {
      async function getSwiperInfo() {
        const result = await API.home.reqGetBannerInfo();
        if (result.code == 200) {
          state.images = result.banners;
        }
      }
      getSwiperInfo();
    });

    return { state };
  },
};
</script>

<style lang="less" >
#topSwiper {
  width: 100%;
  padding: 0 0.2rem;
  height: 3rem;
  .van-swipe {
    width: 100%;
    border-radius: 0.2rem;
    overflow: hidden;
    .van-swipe__track {
      width: 100%;
      .van-swipe-item {
        width: 100%;
        height: 3rem;
        img {
          width: 100%;
          height: 3rem;
        }
      }
    }
  }
}
</style>