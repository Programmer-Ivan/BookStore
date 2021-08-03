<template>
  <div class="detail">
    <nav-bar class="nav" bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../assets/images/left.png" alt=""></div>
      <div slot="center">图书兄弟-商品详情</div>
    </nav-bar>


    <div class="content-pro">
      <detail-swiper :banners="banners"/>

      <div class="content">
        <div class="title">
          <p>{{ this.title }}</p>
          <p>{{ this.description }}</p>
          <div class="f">
            <span>新书</span>
            <span>推荐</span>
          </div>
        </div>
        <p style="margin-top: 20px">￥{{ this.price }}</p>
      </div>

      <van-tabs v-model="activeName" class="tab">
        <van-tab title="概述" name="a">
          <div id="con1" v-html="this.details"></div>
        </van-tab>
        <van-tab title="热评" name="b">
          评论~~~~~
          <div id="con1" v-html="this.details"></div>
        </van-tab>
        <van-tab title="相关书籍" name="c">
          推荐······
          <div id="con1" v-html="this.details"></div>
        </van-tab>
      </van-tabs>
    </div>


    <van-goods-action class="footer">
      <van-goods-action-icon icon="chat-o" text="客服" dot/>
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5"/>
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addcart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buy"/>
    </van-goods-action>
  </div>
</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import TabControl from "../../components/content/tabcontrol/TabControl";
import {getDetail, detailBanner} from '@/network/detail'
import {addCart} from '@/network/cart'
import {Toast} from 'vant';

export default {
  name: "Detail",
  components: {
    NavBar,
    DetailSwiper,
    TabControl
  },
  data() {
    return {
      id: null,
      banners: '',
      stock: 0,
      price: 0,
      description: '',
      title: 0,
      details: '',
      activeName: 0,
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
          this.$router.push('/cart')
        }
      })
    },

    itemClick(index) {
      console.log(index)
    }
  },
  created() {
    this.id = this.$route.query.id
    getDetail(this.id).then(res => {
      console.log(this.id)
      this.banners = res.goods.cover_url
      this.stock = res.goods.stock
      this.price = res.goods.price
      this.description = res.goods.description
      this.title = res.goods.title
      this.details = res.goods.details
    })

  }
}
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
}

.content-pro {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
  background: #FFFFFF;
  z-index: 9;
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

.control {
  background: slateblue;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
}
</style>