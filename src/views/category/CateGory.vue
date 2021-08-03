<template>
  <div>
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
          <van-sidebar-item v-for="sub in item.children" :title="sub.name" @click="leftClick(sub.id)"/>
        </van-collapse-item>
      </van-collapse>
    </van-sidebar>

      <scroll class="goodslist">
            <van-card
                v-for="item in showGoods" :key="item.id"
                @click="itemClick(item.id)"
                :num="item.comments_count"
                :tag="item.comments_count >= 0 ? '流行' : '标签'"
                :price="item.price"
                :desc="item.updated_at"
                :title="item.title"
                :thumb="item.cover_url"
                :lazy-load="true"
            />
      </scroll>

    </div>
  </div>

</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";

import Scroll from "../../components/common/scroll/Scroll";
import {getCategory , getCategoryGoods} from "../../network/category";

export default {
  name: "CateGory",
  components: {
    NavBar,
    Scroll
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
    }
  },
  methods: {
    tabClick(index) {
      this.currentSort = this.tabs[index]
      // console.log("分类"+this.currentId)
      // console.log("排序"+this.currentSort)
      this.init(this.currentSort)
    },
    leftClick(id) {
      this.currentId = id
      // console.log("分类"+this.currentId)
      // console.log("排序"+this.currentSort)
      this.init(this.currentSort)
    },
    init(type){
      const page = this.goods[type].page + 1
      getCategoryGoods(this.currentSort , this.currentId , page).then(res => {
        this.goods[type].list = res.goods.data
        this.goods[type].page += 1
        // console.log(this.goods[type].list)
      })
    }
  },
  mounted() {
    getCategory().then(res => {
      this.category = res.categories
    })

    this.init('sales');
  },
  computed: {
    showGoods() {
      return this.goods[this.currentSort].list
    }
  }
}
</script>

<style scoped>
#mainbox {
  margin-top: 45px;
  display: flex;
}

.ordertab {
  flex: 1;
  float: right;
  height: 50px;
  z-index: 9;
  position: fixed;
  top: 45px;
  right: 0;
  left: 130px;
}

.leftmenu {
  position: fixed;
  top: 95px;
  left: 0;
  width: 130px;
}

.goodslist {
  flex: 1;
  position: absolute;
  left: 130px;
  right: 0;
  height: 100vh;
  padding: 10px;
  text-align: left !important;
}

.van-card__thumb {
  width: 68px !important
}
</style>