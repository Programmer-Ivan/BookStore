<template>
  <div class="recommend">
      <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
        <a href="">
          <img v-lazy="item.cover_url" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
export default {
  name: "recommendView",
  props: {
    recommends:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  padding: 15px 0 30px;
  text-align: center;
  border-bottom: 8px solid #EEEEEE;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>