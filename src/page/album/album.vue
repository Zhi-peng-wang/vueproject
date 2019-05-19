<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  //复用组件(3步骤)
  //1.导入组件
  import navBar from '../nav/navBar'
    export default {
      //2.映射成组件对象
      components: {
        navBar
      },
      created(){
        //修改vuex中的导航栏中默认激活的值
        this.$store.commit('activeNav', "2");
      },
    }
</script>

<style scoped>

</style>
