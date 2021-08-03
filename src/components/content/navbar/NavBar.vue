<template>
  <div class="nav-bar" :style="bgcolor">
    <div class="left" @click="itemClick"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props:{
    bg:{
      type:String,
      default:"blue"
    },
    color:{
      type:String,
      default:"blue"
    }
  },
  computed:{
    bgcolor(){
      return this.$route ? {background:this.bg,color:this.color} : {}
    }
  },
  methods: {
    itemClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .nav-bar .left,
  .nav-bar .right{
    width: 60px;
  }
  .nav-bar .center{
    flex: 1;
  }
</style>
