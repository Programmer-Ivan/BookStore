<template>
  <div>
    <nav-bar bg="rgb(255, 129, 152)" color="#fff">
      <div slot="center">图书兄弟-个人中心</div>
    </nav-bar>
      
    <div class="content">
      <div class="top-content">
        <div class="left">
          <img class="img" src="../../assets/images/user.png" alt="">
        </div>
        <div class="right">
          <p>昵称：{{user.name}}</p>
          <p>登录名称：{{user.email}}</p>
          <p>个性签名：aaa
          </p>
        </div>
      </div>

      <div>
        <div class="bottom-content" @click="goto('/collect')">
          <div class="left">我的收藏</div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="bottom-content" @click="goto('/order')">
          <div class="left">我的订单</div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="bottom-content" @click="goto('/setting')">
          <div class="left">账号管理</div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="bottom-content" @click="goto('/address/')">
          <div class="left">地址管理</div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="bottom-content" @click="goto('/about')">
          <div class="left">关于我们</div>
          <div class="right">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    
    
    <div style="margin: 16px;">
      <van-button round block  color="#42b983" @click="tologout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";
import { Toast } from 'vant';

import {getUser, logout} from "../../network/user";
export default {
  name: "Profile",
  data(){
    return {
      user: {}
    }
  },
  components: {
    NavBar,
  },
  methods: {
    tologout(){
      logout().then(res => {
          if(res.status == '204'){
            Toast.success("退出成功");
            window.localStorage.setItem('token' , '')

            this.$store.commit('setIsLogin', false);

            setTimeout(()=>{
              this.$router.push('/login')
            }, 500);
          }
      })
    },
    goto(path , query){
      this.$router.push({path , query : query || {}})
    }
  },
  mounted() {
    getUser().then(res =>{
        this.user = res
    })
  }
}
</script>

<style scoped>
.content{
  padding: 15px 10px;
}
.top-content{
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  border-radius: 10px;
  margin-bottom: 30px;
  background: linear-gradient(90deg,#31c7A7,#A1c7c7);
  box-shadow: 0 2px 5px #269090;
}
.top-content .left{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 20px;
}
.top-content .left .img{
  width: 100%;
}
.top-content .right{
  margin-left: 13px;
  font-size: 14px;
  color: #FFFFFF;
}
.top-content .right p{
  margin: 5px 0;
}
.bottom-content{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(245,246,248);
  padding: 0 5px;
  font-size: 14px;
}
</style>