<template>
  <div>
    <nav-bar bg="rgb(255, 129, 152)" color="#fff">
      <div slot="center">图书兄弟-购物车</div>
    </nav-bar>

    <div class="content">
      <van-checkbox-group ref="checkboxGroup" v-model="userGoods.result" @change="onChange">
        <van-cell-group>
          <van-cell v-for="(item,index) in userGoods.list">
            <template #right-icon>
              <van-checkbox class="chebox" :name="item.id" ref="checkboxes" />
            </template>

            <div class="shopping">
              <div class="left">
                <img class="img" v-lazy="item.goods.cover_url" alt="">
              </div>
              <div class="right">
                <div class="top">
                  <span>{{item.goods.title}}</span>
                  <span  class="count" @click="delete1(item.id)">删除</span>
                </div>
                <div class="bottom">
                  <span class="price">￥{{item.goods.price  + '.00'}}</span>

                  <div class="button">
<!--                    <van-stepper integer :min="1" :max="item.goods.stock"-->
<!--                                 :model-value="3" :name="item.id"-->
<!--                                 async-change-->
<!--                                 @change="updateChange"/>-->
                    <van-stepper integer :value="item.num" async-change @change="updateChange"
                                 :min="1" :max="item.goods.stock" :name="item.id" />
                  </div>
                </div>
              </div>
            </div>

          </van-cell>

        </van-cell-group>
      </van-checkbox-group>

      <div v-if="this.userGoods['list'].length">
        <van-submit-bar class="submit" :price="showSum * 100" button-text="提交订单" @submit="onSubmit">
          <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>

    <div class="empty" v-if="!this.userGoods['list'].length">
      <img class="empty-cart" src="../../assets/images/empty-car.png" alt="空购物车">
      <div class="title">购物车空空如也</div>
      <van-button round color="#1baeae" type="primary" block @click="goto">前往选购</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";
import { Toast ,Dialog } from 'vant'
import {getCart , modifyCart , deleteCartItem ,checkedCard} from '../../network/cart'
export default {
  name: "Cart",
  data(){
    return {
      checked: false,
      userGoods:{
        list: [],
        result: [],
      }
    }
  },
  components: {
    NavBar,
    Scroll
  },
  computed:{
    //计算价格
    showSum(){
      let sum = 0
        this.userGoods.list.filter(item => this.userGoods.result.includes(item.id)).forEach(item =>{
              sum += parseInt(item.num) * parseFloat(item.goods.price);
            })
      return sum
    }
  },
  methods: {
    goto(){
      this.$router.push('/home')
    },
    // 异步改变购物车数量
    //组件里提供name属性通过name可以获取两个参数，第一个是数量，第二个是当前商品的id
    updateChange(value , detail) {
      Toast.loading({message:'修改中...', forbidClick:true});
      console.log(value , detail)
      modifyCart(detail.name , {num:value}).then(res => {
        this.userGoods.list.forEach(item => {
          if(item.id == detail.name) {
            item.num = value;
          }
        })
        Toast.clear();

      })
    },
    //点击当选按钮
    onChange(result){
      this.userGoods.result = result
      checkedCard({cart_ids:result})
      // console.log(this.userGoods.result)
      if(result.length === this.userGoods.list.length){
          this.checked = true
      }else{
        this.checked = false
      }
    },
    //删除商品
    delete1(id){
      Dialog.confirm({
        message: '是否确认删除',
      }).then(() =>{
        deleteCartItem(id).then(res=>{
          //重新刷新数据
          this.getCart()
          //重新刷新状态管理数据
          this.$store.dispatch('updata'); //改变vuex中的状态数量
        })
      })
    },
    onSubmit(){
      if(this.userGoods.result.length === 0){
        Toast.fail("请选择商品进行结算");
        return
      }else
      {
        this.$router.push('/createorder')
      }
    },
    //全选
    checkAll(){
      if(this.checked){
        this.userGoods.result = this.userGoods.list.map(n => n.id)
      }else{
        this.userGoods.result = []
      }
    },
  //  请求数据
    getCart(){
      getCart('include=goods').then(res => {
        Toast.loading({message:'加载中...', forbidClick:true});
        this.userGoods["list"] = res.data

        // this.userGoods['result'] = res.data.filter(n => n.is_checked = 1).map(item => item.id)
        //数组里is_checked==1的数据过滤出来，之后使用map函数把id返回
        this.userGoods.result = res.data.filter(n=>n.is_checked == 1).map(item => item.id)
        // .map(item => item.id)
        // console.log(this.userGoods.result)
        Toast.clear();
      })
    }
  },
  mounted() {
    this.getCart()
  },
  //进入时重新刷新页面数据
  activated() {
    this.getCart()
  }
}
</script>

<style scoped>
.content{
  position: relative;
  width: 100%;
}
.shopping{
  position: relative;
  width: 100%;
  height: 100px;
  /*border: 1px solid red;*/
}
.left{
  position: absolute;
  left: 20px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 25%;
  /*border: 1px solid red;*/

}
.left .img{
  width: 100%;
  vertical-align: middle;
  margin-top: 7px;
}
.right{
  position: absolute;
  left: 35%;
  width: 65%;
  height: 100%;
  /*border:1px solid burlywood;*/
  padding: 6px 0;
}
.right .count{
  position: absolute;
  right: 0;
}
.bottom{
  display: flex;
  justify-content: space-between;
  /*border: 1px solid slateblue;*/
  margin-top: 40px;
}
.bottom .price{
  color: red;
  font-size: 16px;
}
.chebox{
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.empty {
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  margin-top: 200px;
}
.empty-cart {
  width: 150px;
  margin-bottom: 20px;
}
.van-icon-smile-o {
  font-size: 50px;
}
.title {
  font-size: 16px;
  margin-bottom: 20px;
}
.submit{
  bottom: 49px;
}
</style>