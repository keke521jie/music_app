<template>
  <div class="commentary">
    <div class="commentary-title">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>评论({{ total }})</span>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    <div class="songInfo">
      <div class="songImg">
        <img :src="musicList[playIndex].al.picUrl" alt="" />
      </div>
      <div class="songName">
        {{ musicList[playIndex].name
        }}<span
          class="singer"
          v-for="singer in musicList[playIndex].ar"
          :key="singer.id"
          >{{ singer.name }}</span
        >
      </div>
    </div>
    <div class="commentary-content">
      <div class="commentary-content-title">
        <h3>评论区</h3>
        <div class="commentary-type">
          <span class="active" ref="recommend" @click="changeType(0)">推荐</span>
          <span ref="zx" @click="changeType(1)">最新</span>
        </div>
      </div>
      <ul class="commentary-content-list" v-if="state.type == 0">
        <li
          class="commentary-list"
          v-for="list in comments"
          :key="list.commentId"
        >
          <div class="userInfo">
            <div class="user-img">
              <img :src="list.user.avatarUrl" alt="" />
            </div>
            <div class="username">
              <span class="name">{{ list.user.nickname }}</span><br>
              <span class="time">{{ list.timeStr }}</span>
            </div>
          </div>
          <div class="content">{{ list.content }}</div>
        </li>
      </ul>
      <ul class="commentary-content-list" v-else>
        <li
          class="commentary-list"
          v-for="list in hotComments"
          :key="list.commentId"
        >
          <div class="userInfo">
            <div class="user-img">
              <img :src="list.user.avatarUrl" alt="" />
            </div>
            <div class="username">
              <span class="name">{{ list.user.nickname }}</span><br>
              <span class="time">{{ list.timeStr }}</span>
            </div>
          </div>
          <div class="content">{{ list.content }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted,ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import API from "@/api";
export default {
  name: "Commentary",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      commentary: [],
      type:0
    });
    const recommend = ref(null);
    const zx = ref(null)
    onMounted(() => {
      getCommentary();
    });
    // 获取评论的方法
    async function getCommentary() {
      let result = await API.footerPlay.reqSongCommentary({
        id: route.params.id,
        limit: 100,
      });
      if (result.code == 200) {
        store.commit("UPDAYECOMMENTARYLIST", result);
      }
    }
    //获取vuex中的评论
    const comments = computed(() => {
      return store.getters.comments;
    });
    const hotComments = computed(() => {
      return store.getters.hotComments;
    });
    const total = computed(() => {
      return store.getters.total;
    });
    //获取当前正在播放的音乐信息
    const musicList = computed(() => {
      return store.getters.musicList;
    });
    const playIndex = computed(() => {
      return store.getters.playIndex;
    });
    // 点击切换类型的方法
    function changeType(type){
      if(type == 0){
        zx.value.classList.remove('active')
        recommend.value.classList.add('active')
        state.type = 0
      }
      if(type == 1){
        recommend.value.classList.remove('active')
        zx.value.classList.add('active')
        state.type = 1
      }
    }
    return {
      state,
      store,
      router,
      comments,
      hotComments,
      total,
      musicList,
      playIndex,
      recommend,
      zx,
      changeType
    };
  },
};
</script>

<style lang="less" scoped>
.commentary {
  .commentary-title {
    padding: 0.1rem 0.2rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.4rem;
    .left {
      display: flex;
      align-items: center;
    }
    .icon {
      width: 0.8rem;
      height: 0.8rem;
      fill: black;
    }
    span {
      margin-left: 0.1rem;
    }
  }
  .songInfo {
    padding: 0.1rem 0.2rem;
    width: 100%;
    height: 1.5rem;
    display: flex;
    align-items: center;
    .songImg {
      margin-right: 0.2rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .songName {
      width: 4rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.32rem;
      overflow: hidden;
      .singer {
        font-size: 0.28rem;
        color: #666;
        margin-left: 0.04rem;
      }
    }
  }
  .commentary-content {
    margin-top: 0.2rem;
    padding: 0.1rem 0.2rem;
    display: flex;
    flex-direction: column;
    .commentary-content-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        font-size: 0.4rem;
      }
      .commentary-type {
        font-size: 0.28rem;
        color: #666;
        span {
          padding: 0 0.1rem;
          border-right: 0.02rem solid #666;
          &:last-child {
            border: none;
          }
        }
        .active {
          color: #000;
        }
      }
    }
  }
  .commentary-content-list {
    display: flex;
    flex-direction: column;
    .commentary-list {
      margin-top: 0.3rem;
      width: 100%;
      height: 1.8rem;
      border-bottom: 0.02rem solid #eee;
      .userInfo {
        width: 100%;
        height: 1rem;
        display: flex;
        .user-img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.2rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .username {
          width: 3rem;
          height: 1rem;
          text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
          white-space: nowrap; /*让文字不换行*/
          overflow: hidden;
          .name {
            font-size: 0.4rem;
            color: #000;
          }
          .time {
            font-size: 0.26rem;
            color: #666;
          }
        }
      }
      .content {
        padding: 0.1rem;
        padding-left: 1.2rem;
        width: 100%;
        height: 1rem;
        font-size: 0.36rem;
        color: #000;
        text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
        white-space: nowrap; /*让文字不换行*/
        overflow: hidden;
      }
    }
  }
}
</style>