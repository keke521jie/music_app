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
import { computed, reactive, onMounted, onUpdated, watch } from "vue";
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
        this.updatedCurrentTime();
        this.$store.commit("UPDATEDURATION", this.$refs.audio.duration);
      } else {
        this.$refs.audio.pause();
        this.$store.commit("UPDATEISPLAY", false);
        clearInterval(this.state.dingshiqi)
      }
    },
    // 修改歌曲播放的当前时间
    updatedCurrentTime() {
      clearInterval(this.state.dingshiqi)
      this.state.dingshiqi = setInterval(() => {
        this.$store.commit("UPDATECURRENTTIME", this.$refs.audio.currentTime);
      }, 1000);
    },
  },
  mounted() {
    this.$store.commit("UPDATEDURATION", this.$refs.audio.duration);
  },
  watch: {
    playIndex() {
      this.$refs.audio.autoplay = true;
      this.$store.commit("UPDATEISPLAY", true);
      this.updatedCurrentTime();
      setTimeout(()=>{   //这里开的定时器是为了获取最新的歌曲时长，不开定时器会获取到上一首的歌曲时长
        this.$store.commit("UPDATEDURATION", this.$refs.audio.duration);
      },500)
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
      // 定义一个接受定时器的变量
      dingshiqi: 0,
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
    const currentTime = computed(() => store.getters.currentTime);
    const duration = computed(() => store.getters.duration);
    // 监听歌曲播放完自动播放下一首
    watch(currentTime, (currentTime) => {
      if (currentTime == duration.value) {
        if (playIndex.value == musicList.value.length - 1) {
          store.commit("UPDATEPLAYINDEX", 0);
        } else {
          let newIndex =  playIndex.value + 1
          store.commit("UPDATEPLAYINDEX",newIndex);
        }
      }
    });
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
      currentTime,
      duration,
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