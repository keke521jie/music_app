<template>
  <div class="musicDetail">
    <img :src="musicList[playIndex].al.picUrl" alt="" class="bg" />
    <div class="head">
      <div class="head-left">
        <svg class="icon" aria-hidden="true" @click="quit">
          <use xlink:href="#icon-zuojiantou1"></use>
        </svg>
      </div>
      <div class="head-middle">
        <div class="name">
          <!-- 跑马灯组件 -->
          <Vue3Marquee
            style="font-size: 0.36rem; color: #fff; font-weight: 700"
          >
            {{ musicList[playIndex].name }}
          </Vue3Marquee>
          <span class="arName"
            ><span
              style="marginright: 0.1rem"
              v-for="item in musicList[playIndex].ar"
              :key="item.id"
              >{{ item.name }}</span
            ></span
          >
        </div>
      </div>
      <div class="head-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="musicImg" v-show="state.isShowLyric" @click="showMusicLyric">
      <img
        src="../../../assets/needle.png"
        alt=""
        class="needle"
        :class="{ needle_active: !isPlay }"
      />
      <img src="../../../assets/cd.png" alt="" class="cd" />
      <img
        :src="musicList[playIndex].al.picUrl"
        alt=""
        class="musicImg"
        :class="{ musicImg_active: isPlay, musicImg_pauesd: !isPlay }"
      />
    </div>

    <div
      class="musicLyric"
      v-show="!state.isShowLyric"
      ref="mLyric"
      @click="showMusicLyric"
    >
      <p
        v-for="item in musicLyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 <= item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goCommentary">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-geci"></use>
        </svg>
      </div>
      <div class="footerMiddle">
        <input
          type="range"
          class="range"
          :min="0"
          :max="duration"
          v-model="currentTime"
          step=".5"
          @change="changeRange"
        />
      </div>
      <div class="footerBottom">
        <div class="platType">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shunxubofang"></use>
          </svg>
        </div>
        <svg class="icon" aria-hidden="true" @click="changMusic(1)">
          <use xlink:href="#icon-xiayiqu1"></use>
        </svg>
        <div class="isplay">
          <svg class="icon" aria-hidden="true" v-if="isPlay" @click="play">
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else @click="play">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
        </div>
        <svg class="icon" aria-hidden="true" @click="changMusic(2)">
          <use xlink:href="#icon-xiayiqu"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "MusicDetail",
  components: {
    Vue3Marquee,
  },
  props: ["playIndex", "musicList", "changeShow", "playMusic"],
  setup(props) {
    const state = reactive({
      isShowLyric: true,
    });
    const store = useStore();
    const router = useRouter();
    const isPlay = computed(() => store.getters.isPlay);
    const currentTime = computed(() => store.getters.currentTime);
    const duration = computed(() => store.getters.duration);
    const songProgress = computed(() => store.getters.songProgress);
    // 点击退出详情页的方法
    function quit() {
      props.changeShow(false);
    }
    // 处理点击评论按钮的方法
    function goCommentary() {
      quit();
      router.push({
        name: "Commentary",
        params: {
          id: props.musicList[props.playIndex].id,
        },
      });
    }
    // 控制音乐的播放
    function play() {
      props.playMusic();
    }
    // 点击上(下)一曲切换播放的音乐
    function changMusic(a) {
      if (a == 1) {
        let newIndex = props.playIndex - 1;
        store.commit("UPDATEPLAYINDEX", newIndex);
      } else if (a == 2) {
        let newIndex = props.playIndex + 1;
        store.commit("UPDATEPLAYINDEX", newIndex);
      }
    }
    const musicLyric = computed(() => {
      let arr;
      arr = store.getters.lrc.split(/[(\r\n)\r\n]+/).map((item) => {
        let min = item.slice(1, 3);
        let sec = item.slice(4, 6);
        let mill = item.slice(7, 9);
        let lrc =
          item.slice(10, 11)[0] == "]"
            ? item.slice(11, item.length)
            : item.slice(10, item.length);
        let time = min * 60 * 1000 + sec * 1000 + mill * 10;
        return { arr, min, sec, mill, lrc, time };
      });
      arr.forEach((item, i) => {
        if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
          item.pre = 99999;
        } else {
          item.pre = arr[i + 1].time;
        }
      });
      return arr;
    });
    // 展示歌词
    function showMusicLyric() {
      state.isShowLyric = !state.isShowLyric;
    }
    // 歌曲滚动条拖动
    function changeRange(e) {
      console.log(e);
    }
    // 歌词滚动
    // const mLyric = ref(null);
    // watch(currentTime, () => {
    //   let p = document.querySelector("p.active");
    //   if(p.offsetTop > 300){
    //     console.log(mLyric.value.scrollTop = p.offsetTop - 300);
    //   }
    // });

    return {
      quit,
      isPlay,
      play,
      changMusic,
      state,
      showMusicLyric,
      musicLyric,
      currentTime,
      // mLyric,
      songProgress,
      duration,
      // timer,
      changeRange,
      router,
      goCommentary,
    };
  },
};
</script>

<style lang="less" scoped>
.musicDetail {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  .bg {
    /*背景图*/
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(20px);
  }
  .head {
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .head-middle {
      .name {
        display: flex;
        flex-direction: column;
        width: 2.6rem;
        align-items: center;
        .arName {
          width: 80%;
          height: 0.28rem;
          overflow: hidden;
          margin-top: 0.06rem;
          font-size: 0.24rem;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  .musicImg {
    position: relative;
    width: 100%;
    height: 9rem;
    .needle {
      position: absolute;
      width: 2.3rem;
      height: 3.28rem;
      top: 0.4rem;
      left: 3.3rem;
      z-index: 99;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .needle_active {
      position: absolute;
      width: 2.3rem;
      height: 3.28rem;
      top: 0.4rem;
      left: 3.3rem;
      z-index: 99;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }
    .cd {
      position: absolute;
      width: 5rem;
      height: 5rem;
      left: 50%;
      /*水平居中*/
      margin-left: -2.5rem;
      /*垂直居中*/
      top: 50%;
      margin-top: -2.5rem;
    }
    .musicImg {
      position: absolute;
      width: 3.6rem;
      height: 3.6rem;
      z-index: -1;
      border-radius: 50%;
      /*水平居中*/
      left: 50%;
      margin-left: -1.8rem;
      /*垂直居中*/
      top: 50%;
      margin-top: -1.8rem;
      animation: rotate 15s linear infinite;
    }
    .musicImg_active {
      animation-play-state: running;
    }
    .musicImg_pauesd {
      animation-play-state: paused;
    }
    @keyframes rotate {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .musicLyric {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 0.2rem;
    overflow: scroll;
    p {
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      margin-bottom: 0.4rem;
      color: #fff;
    }
    .active {
      color: pink;
      font-size: 0.5rem;
    }
  }
  .detailFooter {
    margin-top: 0.4rem;
    padding: 0 0.2rem;
    display: flex;
    flex-direction: column;
    .footerTop {
      display: flex;
      justify-content: space-around;
      .icon {
        width: 0.6rem;
        height: 0.7rem;
      }
    }
    .footerMiddle {
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      padding: 0 0.2rem;
      text-align: center;
      .range {
        width: 100%;
        height: 0.06rem;
      }
    }
    .footerBottom {
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .isplay {
        width: 1rem;
        height: 1rem;
        .icon {
          width: 1rem;
          height: 1rem;
          fill: #fff;
        }
      }
    }
  }
}
</style>





<!-- 待解决： -->
<!-- offsetTop 一直为0 -->