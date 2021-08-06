<template>
  <div class="detail">
    <nav-bar class="nav" bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../assets/images/left.png" alt=""></div>
      <div slot="center">图书兄弟-商品详情</div>
    </nav-bar>


    <scroll class="scrollY" ref="scroll">
        <detail-swiper :banners="goods_list.banners"/>

        <div class="content">
          <div class="title">
            <p>{{ goods_list.title }}</p>
            <p>{{ goods_list.description }}</p>
            <div class="f">
              <span>新书</span>
              <span>推荐</span>
            </div>
          </div>
          <p style="margin-top: 20px">￥{{ goods_list.price }}</p>
        </div>

        <van-tabs v-model="activeName" class="tab">
          <van-tab title="概述" name="a">
            <div id="con1" v-html="goods_list.details"></div>
          </van-tab>
          <van-tab title="热评" name="b">
            评论~~~~~
            <div id="con1" v-html="goods_list.details"></div>
          </van-tab>
          <van-tab title="相关书籍" name="c">
            <goods-list :goods="like_goods"/>
          </van-tab>
        </van-tabs>
    </scroll>


    <van-goods-action class="footer">
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.state.count"/>
      <van-goods-action-icon icon="star" :text="collect?'已收藏':'收藏'" :color="collect?'#ff5000': ''" @click="cellectClick"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addcart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buy"/>
    </van-goods-action>
  </div>
</template>

<script>
import GoodsList from "../../components/content/goods/GoodsList";
import NavBar from "@/components/content/navbar/NavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import TabControl from "../../components/content/tabcontrol/TabControl";
import {getDetail, detailBanner} from '@/network/detail'
import {collect} from "../../network/collect";
import {addCart} from '@/network/cart'
import {Toast} from 'vant';
import Scroll from "../../components/common/scroll/Scroll";
export default {
  name: "Detail",
  components: {
    NavBar,
    DetailSwiper,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      //商品ID
      id: null,
      activeName: 0,
      // 请求下来的数据
      goods_list: {},
      //传递给推荐书籍
      like_goods:[],
    //  收藏变量
      collect: false,
    }
  },
  methods: {
    addcart() {
      addCart({goods_id: this.id, num: 1}).then(res => {
        if (res.status == '201' || res.status == '204') {
          Toast.success('添加成功')
          this.$store.dispatch('updata')
        }
      })
    },
    buy() {
      addCart({goods_id: 25, num: 1}).then(res => {
        if (res.status == '201' || res.status == '204') {
          Toast.success('添加成功,显示购物车');
          this.$store.dispatch('updata')
          this.$router.push('/cart')
        }
      })
    },
    itemClick(index) {
      // console.log(index)
    },
    collectload() {
      collect(this.id).then(res => {
        if(res.status === 201){
          console.log(res)
          Toast.success('收藏成功')
        }else if(res.status === 204){
          console.log(res)
          Toast.success('取消收藏')
        }
      })
    },
  //  点击是否收藏
    cellectClick() {
      this.collect = !this.collect
      if(this.collect){
        this.collectload()
      }else{
        this.collectload()
      }
    }
  },
  created() {
    this.id = this.$route.query.id
    console.log(this.id)
    getDetail(this.id).then(res => {
      // console.log(this.id)
      this.goods_list = {
        banners: res.goods.cover_url,
        stock: res.goods.stock,
        price: res.goods.price,
        description: res.goods.description,
        title: res.goods.title,
        details: res.goods.details
      }
      this.like_goods = res.like_goods
    })
  },
  updated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.detail {
  position: relative;
}
.scrollY{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.content{
  padding-left: 30px;
}
.footer {
  position: fixed;
  bottom: 0;
  z-index: 999;
}

.f span {
  border: 1px solid red;
  padding: 2px;
  font-size: 10px;
  color: red;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
}
</style>