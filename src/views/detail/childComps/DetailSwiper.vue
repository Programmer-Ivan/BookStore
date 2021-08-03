<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>
      <img v-lazy="banners" alt="">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "DetailSwiper",
  props: {
    banners: String
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>