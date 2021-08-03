<template>
  <div>
    <div class="logo">
      <img src="../../../assets/images/logo.ca1ae0c.png" alt="">
    </div>

    <div style="margin-top: 50px">
      <van-form @submit="onSubmit" class="RegisterFrom">
        <van-field
            v-model="userinfo.email"
            name="邮箱"
            label="邮箱"
            placeholder="请输入邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
            v-model="userinfo.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="button" style="margin: 16px;">
          <div class="link-login" @click="loginClick">
                        没有账号，立即注册
<!--            已有账号，立即登录-->
          </div>

          <van-button round block type="info" color="#44b883" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {login} from "../../../network/user";
// import { Dialog } from 'vant';
import { Toast } from 'vant';
export default {
  name: "LoginFrom",
  data(){
    return {
        userinfo: {
          email:'',
          password:'',
        }
    }
  },
  methods: {
    loginClick(){
      this.$router.push('/register')
    },
    onSubmit(){
      login(this.userinfo).then(res => {
        window.localStorage.setItem('token' , res.access_token)
        this.$store.commit('setIsLogin', true);
        // Dialog.alert({title: '登录成功'}).then(() =>{
        //   this.$router.go(-1)
        // })
        Toast.success("登录成功");
        setTimeout(()=>{
          this.$router.go(-1)
        }, 500);
        this.userinfo.email = ''
        this.userinfo.password = ''
      })
    }
  }
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