<template>
  <router-view></router-view>
  <FooterPlay />
</template>

<script>
import FooterPlay from './components/FooterPlay'

export default {
  name: 'App',
  components: {
    FooterPlay
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
</style>
