<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="type.cover_url" alt="" @load="imageLoad">
    <div>
      <p class="title">{{ type.title }}</p>
      <span class="price"><small>￥</small>{{type.price}}</span>
      <span class="collect">{{type.collects_count}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    type: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },

    itemClick(){
      this.$router.push({
        path: '/detail',
        query: {
          id: this.type.id
        }
      })
    }
  }
}
</script>

<style scoped>
.goods-item{
  width: 44%;
  border-radius: 5px;
  padding-bottom: 10px;
}
img{
  width: 100%;
  margin-bottom: 5px;
}
.title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}
.price{
  color: red;
}
.collect{
  margin-left: 25px;
  position: relative;
}
.collect::before{
  content: '';
  position: absolute;
  left: -16px;
  top: 1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/images/collect.png") 0 0/14px 14px;
}
</style>