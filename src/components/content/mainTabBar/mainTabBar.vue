<template>
  <tab-bar>
    <tab-bar-items link="/home">
      <img slot="img" src="../../../assets/img/tabbar/home.svg" alt="">
      <img slot="img-active" src="../../../assets/img/tabbar/home_active.svg" alt="">
      <div slot="text">首页</div>
    </tab-bar-items>
    <tab-bar-items link="/category">
      <img slot="img" src="../../../assets/img/tabbar/category.svg" alt="">
      <img slot="img-active" src="../../../assets/img/tabbar/category_active.svg" alt="">
      <div slot="text">分类</div>
    </tab-bar-items>
    <tab-bar-items link="/cart">

      <img slot="img" src="../../../assets/img/tabbar/shopcart.svg" alt="">
      <img slot="img-active" src="../../../assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="text" class="text">
        <van-badge :content="$store.state.count" class="van-badge1">
          <div class="child" />
        </van-badge>
        购物车</div>
    </tab-bar-items>

    <tab-bar-items link="/profile">
      <img slot="img" src="../../../assets/img/tabbar/profile.svg" alt="">
      <img slot="img-active" src="../../../assets/img/tabbar/profile_active.svg" alt="">
      <div slot="text">我的</div>
    </tab-bar-items>
  </tab-bar>
</template>

<script>
import tabBar from '@/components/common/tabbar/tabBar'
import tabBarItems from '@/components/common/tabbar/tabBarItems'
export default {
  name: "mainTabBar",
  components: {
    tabBar,
    tabBarItems
  }
}
</script>

<style scoped>
.text{
  position: relative;
}
.van-badge1{
  position: absolute;
  left: 60px;
  top: -20px;
}
</style>
