<template>
  <div class="create-order">
    <nav-bar bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../assets/images/left.png" alt=""></div>
      <div slot="center">图书兄弟-订单预览</div>
    </nav-bar>
<!--地址-->
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>联系人：{{address.name}}</span>
        <span style="margin-left: 50px">电话：{{address.phone}}</span>
      </div>
      <div class="address">
        {{address.province}} {{address.city}} {{address.county}} {{address.address}}
      </div>
      <van-icon class="arrow" name="arrow"/>
    </div>
<!--    商品-->
    <div class="good">
      <div class="good-item" v-for="item in carts">
        <div class="good-img"><img v-lazy="item.goods.cover_url" alt=""></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{item.goods.title}}</span>
            <span>x{{item.num}}</span>
          </div>
          <div class="good-btn">
            <div class="price"><small>¥</small>{{item.goods.price+'.00'}}</div>
          </div>
        </div>
      </div>
    </div>
<!--    生成订单-->
    <van-submit-bar
        class="submit-all"
        :price="showPrice * 100"
        button-text="生成订单"
        @submit="createorder"
    >
      商品金额
    </van-submit-bar>
<!--    二维码-->
    <van-popup v-model="showPay" position="bottom" :style="{ height: '30%' }" @close="closePopup" closeable>
      <van-grid :border="false" :column-num="2">
        <van-grid-item>
          支付宝二维码<br>
          <van-image width="150" height="150" :src="aliyun" />
        </van-grid-item>
        <van-grid-item>
          微信二维码<br>
          <van-image width="150" height="150" :src="wechat" />
        </van-grid-item>

      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "../../components/content/navbar/NavBar";
import {getOrderPreview , createOrder , payOrder,payOrderStatus} from '../../network/order'
import { Toast } from 'vant'
export default {
  name: "CreateOrder",
  components: {
    NavBar
  },
  data(){
    return {
      showPay: false,
      //地址数据存放对象
      address: {},
    //商品信息数据
      carts: [],
    //  是否显示二维码弹出层
      show: false,
      //创建订单数据
      createoder: {},
    //  支付宝二维码
      aliyun: '',
    //  微信二维码
      wechat: ''
    }
  },
  computed: {
    showPrice() {
      let sum = 0
      this.carts.forEach(n => {
          sum += parseInt(n.num) * parseFloat(n.goods.price);
      })
      return sum
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
  //  请求订单列表数据
    init() {
      getOrderPreview().then(res => {
        let address = res.address.filter(n => n.is_default == '1')
        //如果没有地址，默认显示
        if(address.length == 0){
          this.address = '还没有设置默认地址，请选择或填写地址信息'
        }else {
          //如果有地址把地址复制address对象
          this.address = address[0]
        }

      //  商品数据请求
        this.carts = res.carts
      })
    },
  //  点击修改订单或者无订单地址，跳转到添加订单页面
    goTo() {
      this.$router.push('/address')
    },
  //  点击生成订单
    createorder() {
      const params = {
        address_id: this.address.id
      }
      //创建清单数据
      createOrder(params).then(res => {
        Toast('创建定单成功');
        // console.log(res)
        this.$store.dispatch('updata')
        this.showPay = true
        this.createoder = {
          id: res.id
        }
        //二维码
        payOrder(this.createoder.id , {type: 'aliyun'}).then(res => {
          this.aliyun = res.qr_code_url;
          this.wechat = res.qr_code_url;
        })

      //  监听是否支付完成
        const timer = setInterval(()=>{
          payOrderStatus(this.createoder.id).then(res=>{
            if(res=='2') {
              clearInterval(timer);
              this.$router.push({path:'/orderdetail', query:{id:this.createoder.id}})
            }
          })
        }, 2000)
      })
    },
  //  点击关闭时，跳转到支付页面
    closePopup() {
      this.$router.push({path:'/orderdetail', query:{id:this.createoder.id}})
    }
  }
}
</script>

<style scoped>
.create-order {
  background: #f9f9f9;
}

.address-wrap {
  text-align: left;
  margin-bottom: 20px;
  background: #fff;
  position: relative;
  font-size: 14px;
  padding: 15px;
  color: #222333;
}

.address-wrap .name, .address {
  margin: 10px 0;
}

.address-wrap .arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}

.address-wrap::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
  background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
  background-size: 80px;
  content: '';
}


.good {
  margin-bottom: 120px;
}

.good-item {
  padding: 10px;
  background: #fff;
  display: flex;

}

.good-item .good-img img {
  width: 100px;
  height: auto;
}

.good-item .good-desc {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 20px;
}

.good-item .good-desc .good-title {
  display: flex;
  justify-content: space-between;
}

.good-item .good-desc .good-btn {
  display: flex;
  justify-content: space-between;

}

.good-item .good-desc .good-btn .price {
  font-size: 16px;
  color: red;
  line-height: 28px;
}

.good-item .good-desc .good-btn .van-icon-delete {
  font-size: 20px;
  margin-top: 4px;
}

.pay-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  padding: 10px 0;
  padding-bottom: 50px;
  border-top: 1px solid #e9e9e9;

}

.pay-wrap div {
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  margin: 10px 0;
  font-size: 14px;
}

.pay-wrap div span:nth-child(2) {
  color: red;
  font-size: 18px;
}

.pay-wrap .pay-btn {
  position: fixed;
  bottom: 7px;
  right: 0;
  left: 0;
  width: 90%;
  margin: 0 auto;
}

.submit-all {
  margin-bottom: 50px;
  z-index: 9 !important;
}
</style>
