<template>
  <div id="home">
    <nav-bar class="nav-bar" bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../assets/images/left.png" alt=""></div>
      <div slot="center">兄弟图书</div>
    </nav-bar>

    <tab-control v-show="isTabFixed" ref="controlOffsetTop1"
                 @TabControl="itemTab"
                 :control="['畅销','新书','精选']"
                 class="tabControl"/>

    <scroll class="content"
            ref="scroll"
            @scroll="scrollPotion"
            :probeTypes="3"
            :pull-up-load="true"
            @pullingUp="pullingUp">

      <div ref="OffsetHeight">
        <swiper :banners="goodsBanner" @bannersLoad="bannersLoad"/>

        <RecommendView :recommends="recommends"/>
      </div>

      <tab-control ref="controlOffsetTop" @TabControl="itemTab" :control="['畅销','新书','精选']"/>

      <GoodsList :goods="showGoods"/>

    </scroll>

    <back-top @click.native="backitem" v-show="isShowBack"/>
  </div>
</template>

<script>
//公共组件
import NavBar from "@/components/content/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";
import {debounce} from "../../components/common/uitls/debounce";
//业务组件
import RecommendView from "./ChidComps/RecommendView";
import TabControl from "../../components/content/tabcontrol/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backtop/BackTop";
import Swiper from "../../components/content/swiper/Swiper";
//数据请求
import {getHomeAllData,getHomeGoods} from "@/network/home";
export default {
  name: "Home",
  components: {
    //公共
    NavBar,
    Scroll,

    //业务
    GoodsList,
    TabControl,
    RecommendView,
    BackTop,
    Swiper
  },
  data(){
    return {
      recommends: [],
      // remit: 0,
      goods: {
        sales: {page:0,list:[]},
        new: {page:0,list:[]},
        recommend: {page:0,list:[]}
      },
      goodsBanner: [],
      currentType: 'sales',
      types: ['sales','new','recommend'],
      isShowBack: false,
    //  获取nav-control的offsetTop
      tabOffsetTop: 0,
      isTabFixed: false,
    //  记录离开时保存的位置
      saveY: 0
    }
  },
  activated() {
    this.$refs.scroll.scrollTop(0 , this.saveY , 0)
    //拿到数据时，最好重新刷新数据
    this.$refs.scroll.refresh()
    // console.log('进入时'+ this.saveY)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.saveY()
    // console.log('离开时'+this.saveY)
  },
  mounted() {
    //请求数据1
    this.getHomeAllData()
    //请求数据2
    // getHomeGoods("sales").then(res => {
    //     this.goods['sales'].list = res.goods.data
    //     // console.log(this.goods['sales'].list)
    // })
    // getHomeGoods("new").then(res => {
    //   this.goods['new'].list = res.goods.data
    //   // console.log(this.goods['new'].list)
    // })
    // getHomeGoods("recommend").then(res => {
    //   this.goods['recommend'].list = res.goods.data
    //   // console.log(this.goods['recommend'].list)
    // })
    this.getHomeGoods("sales")
    this.getHomeGoods("new")
    this.getHomeGoods("recommend")
    getHomeGoods().then(res => {
      this.goodsBanner.push(...res.slides)
      console.log(this.goodsBanner)
    })

    //  监听图片是否加载完成
    const refresh = debounce(this.$refs.scroll.refresh , 50)
    this.$bus.$on('itemImageLoad', () => {
      // this.$refs.scroll.refresh()
      refresh()
      console.log("高度："+this.$refs.scroll.scroll.scrollerHeight)
    })
  },
  methods: {
    //上拉加载更多数据
    pullingUp(){
      // const page = this.goods[this.currentType].page + 1
      // getHomeGoods(this.currentType , page).then(res => {
      //   this.goods[this.currentType].list.push(...res.goods.data)
      //   this.goods[this.currentType].page += 1
      //
      //   this.$refs.scroll.pullingUp()

      // })
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
      // console.log("高度："+this.$refs.scroll.scroll.scrollerHeight +
      //             "类型："+this.currentType +
      //             "页数："+this.goods[this.currentType].page)
    },
    //请求数据1
    getHomeAllData(){
      getHomeAllData().then(res => {
        this.recommends = res.goods.data
        // console.log(this.recommends)
      })
    },
    //请求数据2
    // getHomeGoods(type){
    //   const page = this.goods[type].page + 1
    //   getHomeGoods(type , page).then(res => {
    //     this.goods[type].list.push(...res.goods.data)
    //     this.goods[type].page += 1
    //     console.log(res.goods.data)
    //   })
    // },
    getHomeGoods(type){
      const page = this.goods[this.currentType].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.goods.data)
        this.goods[type].page += 1
        // console.log(this.goods[type].page)
        this.$refs.scroll.pullingUp()
      })
    },
    //事件相关
    //tab选项卡
    itemTab(index){
      // this.remit = index
      this.currentType = this.types[index]
      //当点击的时候，将两个control组件的点击保持一致
      this.$refs.controlOffsetTop1.currentIndex = index
      this.$refs.controlOffsetTop.currentIndex = index
      // console.log(this.$refs.controlOffsetTop.$el.offsetTop)
      // switch (index){
      //   case 0:
      //     this.currentType = 'sales'
      //     break;
      //   case 1:
      //     this.currentType = 'new'
      //     break;
      //   case 2:
      //     this.currentType = 'recommend'
      //     break;
      // }
      // console.log(this.currentType)
    },
  //  返回顶部
    backitem(){
      this.$refs.scroll.scrollTop(0 ,0)
    },
  //  scroll传递信息
    scrollPotion(position){
      this.isShowBack = (-position.y) > 500

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    bannersLoad(){
      // this.tabOffsetTop = this.$refs.controlOffsetTop.$el.offsetTop
      this.tabOffsetTop = this.$refs.OffsetHeight.offsetHeight
      // console.log(this.tabOffsetTop)
      // console.log(this.$refs.controlOffsetTop.$el.offsetTop)
      // console.log(this.$refs.OffsetHeight.offsetHeight);
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
#home{
  height: 100vh;
}

.content{
  /*第一个方案*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
  /*  第二方案*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
}
.tabControl{
  position: relative;
  z-index: 9;
}
</style>