<template>
  <div class="goods-list">
    <goods-item v-for="item in goods" :type="item"/>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "Goods",
  props: {
    goods: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    GoodsItem
  },
  methods: {
  }
}
</script>

<style scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  padding: 5px;
}
</style>