<template>
  <div class="footerPlay">
    <div class="footerPlay-left" @click="showDetails">
      <img :src="musicList[playIndex].al.picUrl" alt="" />
      <div class="content">
        <span class="music-name">{{ musicList[playIndex].name }}</span>
        <span class="text">左右滑动可以切换歌曲</span>
      </div>
    </div>
    <div class="footerPlay-right">
      <svg class="icon" aria-hidden="true" v-if="!isPlay" @click="playMusic">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="playMusic">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-16gf-playlistMusic"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${musicList[playIndex].id}`"
    ></audio>
    <van-popup
      v-model:show="state.show"
      position="left"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :playIndex="playIndex"
        :musicList="musicList"
        :changeShow="changeShow"
        :playMusic="playMusic"
      />
    </van-popup>
  </div>
</template>

<script>
import { computed, reactive, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";
import MusicDetail from "./MusicDetail";
export default {
  name: "FooterPlay",
  components: {
    MusicDetail,
  },
  methods: {
    playMusic() {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$store.commit("UPDATEISPLAY", true);
      } else {
        this.$refs.audio.pause();
        this.$store.commit("UPDATEISPLAY", false);
      }
    },
  },
  watch: {
    playIndex() {
      this.$refs.audio.autoplay = true;
      this.$store.commit("UPDATEISPLAY", true);
    },
    musicList() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.autoplay = true;
        this.$store.commit("UPDATEISPLAY", true);
      }
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      show: false,
    });
    // 修改show用于显示弹出层
    function showDetails() {
      state.show = !state.show;
    }
    // 自定义事件用于子组件改变弹出层状态
    function changeShow(bool) {
      state.show = bool;
    }
    const isPlay = computed(() => store.getters.isPlay);
    const playIndex = computed(() => store.getters.playIndex);
    const musicList = computed(() => store.getters.musicList);
    // 获取歌词数据
    function getLyric() {
      store.dispatch("getMusicLyric", musicList.value[playIndex.value].id);
    }
    onMounted(() => {
      getLyric();
    });
    onUpdated(() => {
      getLyric();
    });
    return {
      isPlay,
      playIndex,
      musicList,
      state,
      showDetails,
      changeShow,
    };
  },
};
</script>

<style lang="less" scoped>
.footerPlay {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.2rem;
  background-color: #fff;
  border-top: 1px solid #999;
  .footerPlay-left {
    display: flex;
    align-items: center;
    width: 70%;
    img {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
      margin-right: 0.3rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 70%;
      .music-name {
        width: 100%;
        height: 0.36rem;
        overflow: hidden;
        font-size: 0.32rem;
        font-weight: 700;
      }
      .text {
        font-size: 0.24rem;
        color: #999;
      }
    }
  }
  .footerPlay-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25%;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>