<template>
  <div class="tab-control">
    <div v-for="(item,index) in control" :class="{active: index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    control:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      this.$emit('TabControl',index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 15px;
  background: #fff;
}
.tab-control div{
  flex: 1;
  line-height: 40px;
}
.tab-control div span{
  padding: 5px;
}
.active{
  color: red;
}
.active span{
  border-bottom: 2px solid red;
}
</style>
