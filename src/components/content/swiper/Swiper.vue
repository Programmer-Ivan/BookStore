<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners">
      <img v-lazy="item.img_url" alt="" @load="bannersLoad">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    banners:{
      type: Array,
      default: []
    }
  },
  components: {
  },
  data(){
    return {
      flay: false
    }
  },
  methods: {
    bannersLoad(){
      if(!this.flay){
        this.$emit('bannersLoad')
        this.flay = true
      }
    }
  }
}
</script>

<style scoped>
van-swipe-item{
  width: 100%;
  height: 100px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
img{
  width: 100%;
  height: 160px !important;
}
</style>