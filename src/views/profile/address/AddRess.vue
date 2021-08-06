<template>
  <div>
    <nav-bar bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../../assets/images/left.png" alt=""></div>
      <div slot="center">地址管理</div>
    </nav-bar>


    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />

  </div>
</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";
import {getAddressList} from '../../../network/address'
import { Toast } from 'vant';
export default {
  name: "AddRess",
  components:{
    NavBar
  },
  data() {
    return {
      chosenAddressId: '0',
      list: [],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ],
    };
  },
  methods: {
    onAdd() {
      this.$router.push({path:'/newadd',query:{type: 'add'}})
    },
    onEdit(item) {
      this.$router.push({path:'/newadd',query:{type: 'edit',addressID: item.id}})
    },
    //请求数据
    getAddressList(){
      getAddressList().then(res => {
        // console.log(res)
        this.list = res.data.map(item => {
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            isDefault: item.is_default,
          }
        })
      })
    }
  },
  mounted() {
    this.getAddressList()
  },
  activated() {
    this.getAddressList()
  }
};

</script>

<style scoped>

</style>