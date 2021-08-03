<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view/></keep-alive>
    <main-tab-bar/>
  </div>
</template>
<script>

import mainTabBar from "./components/content/mainTabBar/mainTabBar";
export default {
  name: "app",
  components: {
    mainTabBar
  },
  mounted() {
    this.$store.dispatch('updata')
  }
}
</script>
<style lang="scss">
@import "assets/css/base.css";
.left-img{
  width: 25px;
  height: 25px;
  margin-top: 9px;
}
</style>
