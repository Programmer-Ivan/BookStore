<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeTypes: {
      type : Number,
      default: 0
    },
    PullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll: null
    }
  },
  methods: {
    scrollTop(x , y ,time = 300){
      this.scroll && this.scroll.scrollTo(x , y, time)
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    pullingUp(){
      this.scroll && this.scroll.finishPullUp()
    },
  //  动态获取保存的位置
    saveY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper , {
      click: true,
      probeType: this.probeTypes,
      pullUpLoad: this.PullUpLoad,
      mouseWheel: true,
      disableTouch: false,
    })
    console.log(this.scroll)
    if(this.probeTypes === 2 || this.probeTypes === 3){
      this.scroll.on('scroll' , position => {
        this.$emit('scroll' , position)
      })
    }
    if(this.PullUpLoad){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  }
}
</script>

<style scoped>
/*.wrapper{*/
/*  position: absolute;*/
/*  top: 44px;*/
/*  bottom: 49px;*/
/*  left: 0;*/
/*  right: 0;*/
/*  overflow: hidden;*/
/*}*/
</style>