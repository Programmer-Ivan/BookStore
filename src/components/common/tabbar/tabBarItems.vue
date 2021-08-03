<template>
  <div class="tab-bar-items" @click="bar">
    <div v-if="!isActive"><slot name="img"></slot></div>
    <div v-else><slot name="img-active"></slot></div>
    <div :style="colorB"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabBarItems",
  props:{
    link: String,
    colorA:{
      type:String,
      default:'blue'
    }
  },
  data(){
    return{
      // isActive:false
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.link) !== -1
    },
    colorB(){
      return this.isActive ? {color:this.colorA} : {}
    }
  },
  methods:{
    bar(){
      this.$router.push(this.link)
      // console.log(this.link)
    }
  }
}
</script>

<style scoped>
.tab-bar-items{
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-items img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>
