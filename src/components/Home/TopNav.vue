<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-39"></use>
      </svg>
    </div>
    <div class="topMiddle">
      <span>我的</span><span class="active">发现</span><span>云村</span><span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fangdajing"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style lang="less" scoped>
    .topNav{
        display: flex;
        padding: .2rem;
        width: 100%;
        height: 1rem;
        font-size: .36rem;
        justify-content: space-between;
        .topMiddle{
            display: flex;
            width: 60%;
            justify-content: space-around;
            /*align-items: center;*/
        }
        .active{
            font-weight: 900;
        }
    }
</style>