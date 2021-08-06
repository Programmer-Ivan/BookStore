<template>
  <div class="order-detail-box">
    <nav-bar bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../assets/images/left.png" alt=""></div>
      <div slot="center">订单状态</div>
    </nav-bar>


    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{stateString}}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ state.order_no }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ state.created_at }}</span>
      </div>

      <van-button v-if="state.status == '1'" @click="payorder" style="margin-bottom: 10px" color="#1baeae" block>去支付
      </van-button>
      <van-button v-if="state.status == '2'" @click="handleConfirmOrder" block>确认订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥{{ showPrice }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>

    <van-card
        v-for="item in this.state.goods" :key="item.id"
        :num="item.num"
        :price="item.goods.price"
        desc="全场包邮"
        :title="item.goods.title"
        :thumb="item.goods.cover_url"
    />


    <div style="width:100%;height:50px;">

    </div>

    <van-popup
        v-model="showPay"
        position="bottom"
        :style="{ height: '30%' }" closeable>

      <div :style="{ width: '90%', margin: '0 auto'}">
        <van-grid :border="false" :column-num="2">
          <van-grid-item text="支付宝">
            支付宝二维码<br>
            <van-image width="150" height="150" :src="aliyun"/>
          </van-grid-item>
          <van-grid-item text="微信支付">
            微信二维码<br>
            <van-image width="150" height="150" :src="wechat"/>
          </van-grid-item>
        </van-grid>

      </div>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "../../components/content/navbar/NavBar";
import {getOrderDetail, payOrder, payOrderStatus , confirmOrder} from '../../network/order'
import { Dialog, Toast } from 'vant'
export default {
  name: 'OrderDetail',
  components: {
    NavBar
  },
  data() {
    return {
      showPay: false,
      //订单ID
      orderID: 0,
      //  订单数据
      state: {
        goods: [],
        status: '',
      },
      //  支付宝二维码
      aliyun: '',
      //  微信二维码
      wechat: '',
      orderstate:['', '未支付', '支付完成', '等待发货', '确认收货', '已过期']
    }
  },
  methods: {
    init() {
      this.orderID = this.$route.query.id
      getOrderDetail(this.$route.query.id).then(res => {
        // console.log(res)
        this.state = res
        this.state.goods = res.orderDetails.data
      })
    },
  //  支付订单
    payorder() {
      this.showPay = true
      //请求支付数据
      payOrder(this.orderID , {type: 'aliyun'}).then(res => {
        this.aliyun = res.qr_code_url;
        this.wechat = res.qr_code_url;
      })

       // 监听是否支付完成
      const timer = setInterval(()=>{
        payOrderStatus(this.orderID).then(res=>{
          // console.log(res)
          if(res =='2') {
            clearInterval(timer);
            this.showPay = false
            this.$router.push({path:'/orderdetail', query:{id:this.orderID}})
          }
        })
      }, 2000)
    },
    // 确认订单
    handleConfirmOrder() {
      Dialog.confirm({
        title:'是否确认订单'
      }).then(()=>{
        confirmOrder(this.orderID).then(res=>{
          Toast('确认成功');
          this.init();
        })
      }).catch(()=>{

      })
    }
  },
  computed: {
    //计算总价钱
    showPrice() {
      let sum = 0
      this.state.goods.forEach(n => {
        sum += parseInt(n.num) * parseFloat(n.price)
      })
      return sum
    },
    //订单的状态
    stateString() {
      return this.orderstate[this.state.status]
    }
  },
  mounted() {
    Toast.loading({message:'加载中...', forbidClick:true});
    this.init()
    Toast.clear();
  },
  activated() {
    this.init()
  }
}
</script>

<style scoped>
.order-detail-box {
  text-align: left;
  background: #f7f7f7;
}

.order-status {
  background: #fff;
  padding: 20px;
  font-size: 15px;
}

.status-item {
  margin-bottom: 10px;
}

.status-item label {
  color: #999;
}

.order-price {
  background: #fff;
  margin: 20px 0;
  padding: 20px;
  font-size: 15px;
}

.order-price .price-item {
  margin-bottom: 10px;

}

.order-price .price-item label {
  color: #999;
}

.van-card {
  margin-top: 0;
}

.van-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
