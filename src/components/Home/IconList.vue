<template>
  <div class="iconList">
    <a href="JavaScript:;">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </a>
    <a href="JavaScript:;">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sirenfm-copy-copy"></use>
      </svg>
      <span>私人FM</span>
    </a>
    <a href="JavaScript:;">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </a>
    <a href="JavaScript:;">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang2"></use>
      </svg>
      <span>排行榜</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "IconList",
};
</script>

<style lang="less" scoped>
    .iconList{
        display: flex;
        width: 100%;
        margin: 0.3rem 0;
        justify-content: space-around;
        a{
            display: flex;
            flex-direction: column;
            color: #000000;
            align-items: center;
            .icon{
                width: 0.9rem;
                height:0.9rem;
            }
            span{
                margin-top: .1rem;
            }
        }
    }
</style>