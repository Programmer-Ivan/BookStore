<template>
  <div class="category">
    <nav-bar bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../assets/images/left.png" alt=""></div>
      <div slot="center">图书兄弟-分类</div>
    </nav-bar>

    <div id="mainbox">
      <div class="ordertab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评化排序"></van-tab>
        </van-tabs>
      </div>

    <van-sidebar class="leftmenu" v-model="activeKey">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item v-for="(item,index) in category" :title="item.name" :name="item.name" :key="item.id">
          <van-sidebar-item v-for="sub in item.children" :title="sub.name" @click="leftClick(sub.id)" :key="sub.id"/>
        </van-collapse-item>
      </van-collapse>
    </van-sidebar>

      <Scroll class="goodslist" :probeTypes="3"
              ref="scroll" @scroll="scrollPosition"
              :pull-up-load="true" @pullingUp="downLoad">
          <van-card
              v-for="item in showGoods" :key="item.id"
              @click="itemClick(item.id)"
              :num="item.category_id"
              :tag="item.comments_count >= 0 ? '流行' : '标签'"
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
          />
      </Scroll>


    </div>

    <BackTop @click.native="backClick" v-if="backTop"></BackTop>
  </div>

</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";
import BackTop from "../../components/content/backtop/BackTop";
import Scroll from "../../components/common/scroll/Scroll";
import {getCategory , getCategoryGoods} from "../../network/category";

export default {
  name: "CateGory",
  components: {
    NavBar,
    Scroll,
    BackTop
  },
  data() {
    return {
      bscroll: 0,
      active: 0,
      activeKey: 0,
      activeName: 1,
      category: [],
      currentSort: 'sales',
      tabs: ['sales','price','comments_count'],
      currentId: 0,

      goods:{
        sales: {page: 0 , list: []},
        price: {page: 0 , list: []},
        comments_count: {page: 0 , list: []},
      },
    //  回到订单隐藏数据
      backTop: false
    }
  },
  methods: {
    //tab
    tabClick(index) {
      this.currentSort = this.tabs[index]
      // console.log("分类"+this.currentId)
      // console.log("排序"+this.currentSort)
      this.init(this.currentSort)
    },
    //侧边
    leftClick(id) {
      this.currentId = id
      console.log("分类"+this.currentId)
      console.log("排序"+this.currentSort)
      this.init(this.currentSort)
    },
    //点击跳转到对应的商品详情去
    itemClick(id) {
      this.$router.push({path: '/detail' , query: {id}})
    },
    init(type){
      const page = this.goods[type].page + 1
      getCategoryGoods(this.currentSort , this.currentId , page).then(res => {
        this.goods[type].list.push(...res.goods.data)
        this.goods[type].page += 1
        console.log(this.goods[type])
      //  数据加载完之后，在执行
        this.$refs.scroll.pullingUp()
      })
    },
  //  上拉加载更多
    downLoad() {
      // console.log('上拉加载更多')
      this.init(this.currentSort)
      this.$refs.scroll.refresh()
    },
    //回到顶部
    backClick(){
      this.$refs.scroll.scrollTop(0,0,200)
    },
  //  监听滚动
    scrollPosition(position) {
      // console.log(position.y)
      this.backTop = (-position.y) > 500 ? true : false
    }

  },
  mounted() {
    getCategory().then(res => {
      this.category = res.categories
    })
    this.init('sales');
  },
  activated() {
    //进入页面刷新数据
    this.$refs.scroll.refresh()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentSort].list
    }
  }
}
</script>

<style scoped>
.category{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#mainbox{
  position: relative;
  height: 100vh;
}
.ordertab{
  position: fixed;
  width: 70%;
  right: 0;
  z-index: 11;
}
.leftmenu{
  position: fixed;
  width: 30%;
  left: 0;
  top: 90px;
  z-index: 11;
}
.goodslist{
  position: absolute;
  /*height: 100vh;*/
  top: 44px;
  bottom: 0;
  right: 0;
  width: 70%;
  overflow: hidden;
  text-align: left !important;
}
.goodslist1{

}
</style>