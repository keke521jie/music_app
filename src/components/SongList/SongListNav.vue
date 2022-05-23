<template>
  <div class="songListNav">
    <div class="content">
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <span>{{ playList.commentCount }}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playList.shareCount }}</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuanxuanzhong"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongListNav",
  props: ["playList"],
};
</script>

<style lang="less" scoped>
.songListNav {
  margin-top: 0.3rem;
  width: 100%;
  padding: 0 0.2rem;
  .content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
      }
      span {
        color: #fff;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>