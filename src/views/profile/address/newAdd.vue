<template>
  <div>
    <nav-bar bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../../assets/images/left.png" alt=""></div>
      <div slot="center">{{type}}</div>
    </nav-bar>


    <van-address-edit
        :area-list="areaList"
        :show-delete="title === 'edit'"
        :address-info="addressInfo"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        delete-button-text="删除"
    />
  </div>
</template>

<script>
import { Toast ,Dialog} from 'vant';

import {tdist} from '../../../utils/address'

import {
  addAddress,
  getAddressDetail,
  EditAddress,
  DeleteAddress
} from '../../../network/address'
import NavBar from "@/components/content/navbar/NavBar";
export default {
  name: "newAdd",
  components: {
    NavBar
  },
  data() {
    return {
      title: '',
      AddressID: 0,
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {}
      },
      addressInfo: {},
      info: {}
      // info:{
      //   name: '',
      //   phone: '',
      //   province:'',
      //   city:'',
      //   county:'',
      //   addressDetail:'',
      //   is_default:false
      // }
    };
  },
  computed: {
    type(){
      return  this.title === 'add' ? '新增地址' :　'编辑地址'
    }
  },
  methods: {
    onSave(content) {
      Toast('保存中...')
       this.info = {
        name: content.name,
        phone:  content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        address: content.addressDetail,
        is_default: content.isDefault ? 1 : 0
      }
      //判断是否是编辑页面
      if(this.title === 'edit'){
        EditAddress(this.AddressID , this.info)
        Toast('修改成功')
      }else if(this.title === 'add'){
        addAddress(this.info)
      }
      setTimeout(()=>{
        this.$router.back();
      }, 1000)
    },
    //删除
    onDelete() {
      DeleteAddress(this.AddressID).then(() => {
        Toast('删除成功')
        this.$router.push('/address')
      })
    },
    //修改数据请求
    EditAddress(){
      if(this.title === 'edit'){
        getAddressDetail(this.AddressID).then(res => {
          this.addressInfo = {
            name:res.name,
            tel:res.phone,
            province: res.province,
            city:res.city,
            county:res.county,
            addressDetail:res.address,
            isDefault: !!res.is_default
          }
          // console.log(this.addressInfo)
        })
      }
    }

  },
  mounted() {

    tdist.getLev1().forEach(p => {
      this.areaList.province_list[p.id] = p.text
      tdist.getLev2(p.id).forEach(c => {
        this.areaList.city_list[c.id] = c.text
        tdist.getLev3(c.id).forEach(q => {
          this.areaList.county_list[q.id] = q.text
        })
      })
    })

    this.title = this.$route.query.type
    this.AddressID = this.$route.query.addressID

    this.EditAddress()
    console.log(this.type)
  },
  activated() {
    this.title = this.$route.query.type

  },
  deactivated() {
    Toast('您的网络故障')
    setTimeout(() =>{
      this.$router.go(0)
    },1000)
    console.log('不活跃没有销毁')

  },
  destroyed() {
    console.log('页面删除')
  }
}
</script>

<style scoped>

</style>