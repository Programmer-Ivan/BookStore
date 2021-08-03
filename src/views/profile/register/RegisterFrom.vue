<template>
  <div>
    <div class="logo">
      <img src="../../../assets/images/logo.ca1ae0c.png" alt="">
    </div>

    <div style="margin-top: 50px">
      <van-form @submit="onSubmit" class="RegisterFrom">
        <van-field
            v-model="userinfo.name"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="userinfo.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
            v-model="userinfo.password_confirmation"
            type="password"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '确认密码' }]"
        />
        <van-field
            v-model="userinfo.email"
            type="email"
            name="邮箱"
            label="邮箱"
            placeholder="请输入邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <div class="button" style="margin: 16px;">
          <div class="link-login" @click="$router.push({path:'/login'})">
<!--            没有账号，立即注册-->
            已有账号，立即登录
          </div>

          <van-button round block type="info" color="#44b883" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {register} from '../../../network/user'

import { Notify } from 'vant';
import { Dialog } from 'vant';
export default {
  name: "RegisterFrom",
  data(){
    return {
      userinfo: {
        name: '',
        password: '',
        password_confirmation: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit(){
      if(this.userinfo.password != this.userinfo.password_confirmation){
        Notify('密码不一致')
      }else {
        register(this.userinfo).then(res => {
          console.log(res)
          if(res.status == '201'){
            Dialog.alert({title: '注册成功'}).then(() =>{
              this.$router.push('/login')
            })
          }

          this.userinfo.password = ''
          this.userinfo.password_confirmation = ''
        })
      }
    }
  },
}
</script>

<style scoped>
.logo{
  width: 150px;
  height: 80px;
  margin: 0 auto;
  padding: 50px 0 ;
}
.logo img{
  width: 150px;
  height: 80px;
}
.link-login {
  font-size:14px;
  margin-bottom: 20px;
  color:#42b983;
  display: inline-block;
  text-align: left;
  float:left;
}
</style>