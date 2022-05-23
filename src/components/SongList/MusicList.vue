<template>
  <div class="musicList">
    <div class="playStart">
      <div class="play-left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <span class="play">播放全部<span class="musicCount">{{playList.trackCount-1}}</span></span>
      </div>
      <div class="play-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianjia"></use>
        </svg>
        <span>收藏({{playList.subscribedCount}})</span>
      </div>
    </div>
    <ul class="musicContent">
      <li
        class="musicItem"
        v-for="(music, $index) in musicList"
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
</template>

<script>
import store from '../../store'
export default {
  name: "MusicList",
  props: ["playList", "musicList"],
  setup(props){
    function playMusic($index){
      store.commit("UPDATEMUSICLIST",props.musicList)
      store.commit("UPDATEPLAYINDEX",$index)
    }


    return {
      playMusic
    }
  }
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  margin-top: 0.2rem;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem 0.2rem 0 0;
  background-color: #fff;
  margin-bottom: 1.2rem;
  .playStart{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .play-left{
      display: flex;
      align-items: center;
      .icon{
        width: .5rem;
        height: .5rem;
        margin-right: .4rem;
      }
      .play{
        font-size: .32rem;
        font-weight: 700;
        .musicContent{
          font-size: .24rem;
          color: #999;
        }
      }
    }
    .play-right{
      display: flex;
      padding: .2rem;
      align-items: center;
      /*width: 2.6rem;*/
      height: .9rem;
      border-radius: .9rem;
      background-color: pink;
      .icon{
        width: .5rem;
        height: .5rem;
        margin-right: .2rem;
      }
      span{
        color: #fff;
        font-size: .32rem;
      }
    }
  }
  .musicContent {
    width: 100%;
    .musicItem {
      display: flex;
      margin: .2rem 0;
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
            height: .3rem;
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