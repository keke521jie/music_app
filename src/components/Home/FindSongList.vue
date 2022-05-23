<template>
  <div class="findSongList">
    <div class="header">
      <div class="title">发现好歌单</div>
      <div class="findMore">查看更多</div>
    </div>
    <div class="content">
      <van-swipe
        :loop="false"
        :width="newWidth"
        :show-indicators="false"
        class="findSong-swiper"
      >
        <van-swipe-item
          v-for="list in state.songList"
          :key="list.id"
          class="listItem-content"
        >
          <router-link :to="{path:'/songlist',query:{id:list.id}}">
            <div class="listItem">
              <img :src="list.picUrl" :alt="list.copywriter" />
              <span class="playCount">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang"></use>
                </svg>
                {{ playCount(list.playCount) }}
              </span>
              <span class="title">{{ list.name }}</span>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from "vue";
import API from "../../api";
export default {
  name: "FindSongList",
  setup() {
    const state = reactive({
      songList: [],
      countWidth: 150,
    });
    //   获取歌单推荐
    async function getFindSongList() {
      let result = await API.home.reqGetFindSongListInfo();
      if (result.code == 200) {
        state.songList = result.result;
      }
    }

    // 计算歌单推荐列表每个元素的尺寸
    let newWidth = computed(() => {
      let nmb = document.documentElement.style.fontSize;
      const arr = nmb.split("p");
      return arr[0] * 1 * 3;
    });
    // 计算播放量
    function playCount(num) {
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
      return num;
    }
    onMounted(() => {
      getFindSongList();
    });

    return {
      state,
      playCount,
      newWidth,
    };
  },
};
</script>

<style lang="less" scoped>
.findSongList {
  width: 100%;
  padding: 0 0.2rem;
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .title {
      font-weight: 700;
      font-size: 0.36rem;
    }
    .findMore {
      width: 1.4rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.26rem;
      padding: 0 0.1rem;
      border: 0.02rem solid #eee;
      border-radius: 0.5rem;
      text-align: center;
    }
  }
  .content {
    width: 100%;
    height: 4rem;
    padding: 0.1rem 0;
    .findSong-swiper {
      width: 100%;
      .listItem-content {
        padding-right: 0.2rem;
        .listItem {
          position: relative;
          width: 100%;
          height: 3.9rem;
          img {
            width: 100%;
            height: 3rem;
            border-radius: 0.12rem;
          }
          .playCount {
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;
            font-size: 0.32rem;
            color: #fff;
            .icon {
              width: 0.32rem;
              height: 0.32rem;
              color: #fff;
            }
          }
          .title {
            font-size: 0.32rem;
            color: #000;
          }
        }
      }
    }
  }
}
</style>