<template>
  <div class="search">
    <div class="search-top">
      <svg class="icon" aria-hidden="true" @click="router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
        type="text"
        placeholder="周杰伦"
        @blur="searchHandle"
        @keydown="searchHandle"
      />
    </div>
    <div class="search-history">
      <span class="title">历史</span>
      <span
        class="list"
        v-for="searchList in state.searchHistory"
        :key="searchList"
        @click="search(searchList)"
      >
        {{ searchList }}</span
      >
      <span class="deleteList" v-show="state.searchHistory.length > 0" @click="clearSearchHistory">清除所有历史</span
      >
    </div>
    <div class="search-playList">
      <div class="playAll">
        <svg class="icon" aria-hidden="true" @click="playMusic(0)">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span>播放全部</span>
      </div>
      <ul class="musicContent">
        <li
          class="search-songList"
          v-for="(music, $index) in state.musicList"
          :key="music.id"
        >
          <div class="left" @click="playMusic($index)">
            <span class="index">{{ $index + 1 }}</span>
            <span class="name">
              <span class="music-name">{{ music.name }}</span>
              <span class="song-name">
                <span v-for="sname in music.ar" :key="sname.id">{{
                  sname.name
                }}</span>
              </span>
            </span>
          </div>
          <div class="right">
            <span class="icon-content">
              <svg class="icon" aria-hidden="true" v-if="music.mv != 0">
                <use xlink:href="#icon-mv"></use>
              </svg>
            </span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-39"></use>
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import API from "@/api/index";
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from 'vuex';
export default {
  name: "Search",
  setup() {
    const router = useRouter();
    const store = useStore()
    const state = reactive({
      searchHistory: [],
      musicList: [],
    });
    onMounted(() => {
      if (localStorage.searchHistoryList) {
        state.searchHistory = JSON.parse(
          localStorage.getItem("searchHistoryList")
        );
      }
    });
    //点击播放音乐的方法
    function playMusic($index){
      store.commit("UPDATEMUSICLIST",state.musicList)
      store.commit("UPDATEPLAYINDEX",$index)
    }
    //清除所有搜索历史的方法
    function clearSearchHistory(){
        state.searchHistory = []
        localStorage.setItem(
          "searchHistoryList",
          JSON.stringify(state.searchHistory)
        );
    }
    //用于搜索的方法
    async function search(data) {
      const result = await API.search.reqSearch(data);
      if (result.code == 200) {
        state.musicList = result.result.songs;
      }
    }
    //处理输入完毕搜索的方法
    function searchHandle(e) {
      if (
        (e.keyCode == 13 || e.type == "blur") &&
        e.target.value.trim() != ""
      ) {
        search(e.target.value);
        let isExist = state.searchHistory.find(item => {
            return item == e.target.value
        })
        if(!isExist){
            state.searchHistory.push(e.target.value);
        }
        localStorage.setItem(
          "searchHistoryList",
          JSON.stringify(state.searchHistory)
        );
        e.target.value = "";
      }
    }
    return {
      router,
      searchHandle,
      state,
      playMusic,
      search,
      clearSearchHistory,
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  padding: 0.1rem 0.2rem;
  .search-top {
    display: flex;
    width: 100%;
    height: 1rem;
    font-size: 0.32rem;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
    input {
      height: 0.6rem;
      width: 85%;
      margin-left: 0.1rem;
      padding-left: 0.1rem;
      border: none;
      border-bottom: 0.02rem solid #eee;
      font-size: 0.4rem;
    }
  }
  .search-history {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 0.2rem;
    .title {
      font-size: 0.5rem;
      font-weight: 700;
      color: #000;
      margin-right: 0.2rem;
    }
    .list {
      font-size: 15px;
      color: #666;
      padding: 0.08rem 0.1rem;
      background: #eee;
      border-radius: 10px;
      margin: 0.1rem 0.1rem;
    }
    .deleteList {
      font-size: 15px;
      color: #ff3c22;
      padding: 0.08rem 0.1rem;
      background: #eee;
      border-radius: 10px;
      margin: 0.1rem 0.1rem;
    }
  }
  .search-playList {
    width: 100%;
    margin-top: 0.1rem;
    margin-bottom: 1.4rem;
    .playAll {
      width: 100%;
      height: .8rem;
      display: flex;
      align-items: center;
      span {
        font-size: 0.36rem;
        margin-left: 0.1rem;
      }
    }
    .search-songList {
      display: flex;
      margin: 0.2rem 0;
      justify-content: space-between;
      width: 100%;
      .left {
        display: flex;
        width: 75%;
        align-items: center;
        .index {
          font-size: 0.26rem;
          width: 8%;
          margin-right: 0.1rem;
        }
        .name {
          width: 90%;
          display: flex;
          flex-direction: column;
          .music-name {
            width: 100%;
            overflow: hidden;
            font-size: 0.28rem;
            font-weight: 700;
            text-overflow: ellipsis;
            height: 0.36rem;
          }
          .song-name {
            width: 100%;
            overflow: hidden;
            font-size: 0.24rem;
            height: 0.3rem;
            color: #999;
            text-overflow: ellipsis;
          }
        }
      }
      .right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 20%;
        .icon-content {
          width: 0.5rem;
          height: 0.5rem;
        }
        .icon {
          width: 0.5rem;
          height: 0.5rem;
          fill: #999;
        }
      }
    }
  }
}
</style>