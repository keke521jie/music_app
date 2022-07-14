<template>
  <div class="songListInfo">
    <img :src="playList.coverImgUrl" alt="" class="header-bg" />
    <div class="header">
      <div class="header-left">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="header-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fangdajing"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-39"></use>
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <img :src="playList.coverImgUrl" alt="" />
      </div>
      <div class="content-right">
        <span class="title">{{ playList.name }}</span>
        <span class="user">
          <img :src="playList.creator.avatarUrl" alt="" />
          <span class="creator-name">{{ playList.creator.nickname }} </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </span>
        <span class="text">{{ playList.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongListInfo",
  props: ["playList"],
  setup(props) {
    if(props.playList.creator = ""){
      props.playList = JSON.parse(sessionStorage.getItem().playList) 
    }
    return {
     
    };
  },
};
</script>

<style lang="less" scoped>
.songListInfo {
  position: relative;
  width: 100%;
  .header-bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 6rem;
    filter: blur(20px);
    z-index: -1;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    .header-left,
    .header-right {
      display: flex;
      width: 25%;
      justify-content: space-between;
      .icon {
        fill: #fff;
      }
      span {
        font-size: 0.4rem;
        color: #fff;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.2rem;
    padding: 0 0.2rem;
    .content-left {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.16rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content-right {
      display: flex;
      flex-direction: column;
      width: 4rem;
      .title {
        width: 4rem;
        font-weight: 500;
        font-size: 0.3rem;
        color: #fff;
      }
      .user {
        display: flex;
        align-items: center;
        margin-bottom: .1rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.6rem;
          margin-right: 0.3rem;
        }
        .creator-name {
          font-size: 0.3rem;
          color: #e3eeee;
        }
        .icon{
            width: 0.3rem;
            height: 0.3rem;
            fill:#fff;
        }
      }
      .text {
        display: block;
        height: 0.7rem;
        overflow: hidden;
        font-size: 0.24rem;
        color: #e3eeee;
      }
    }
  }
}
</style>