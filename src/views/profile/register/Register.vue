<template>
  <div>
    <nav-bar class="nav-bar" bg="rgb(255, 129, 152)" color="#fff">
      <div slot="left"><img class="left-img" src="../../../assets/images/left.png" alt=""></div>
      <div slot="center">用户注册</div>
    </nav-bar>

    <RegisterFrom/>
  </div>
</template>

<script>
import NavBar from "@/components/content/navbar/NavBar";
import RegisterFrom from "./RegisterFrom";
export default {
name: "Register",
  components: {
    NavBar,
    RegisterFrom
  }
}
</script>

<style scoped>

</style>