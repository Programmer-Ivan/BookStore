<template>
  <div>
    <nav-bar class="nav-bar" bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../../assets/images/left.png" alt=""></div>
      <div slot="center">用户登录</div>
    </nav-bar>

    <LoginFrom/>
  </div>
</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";

import LoginFrom from "./LoginFrom";
export default {
  name: "Login",
  components: {
    NavBar,
    LoginFrom
  }
}
</script>

<style scoped>

</style>