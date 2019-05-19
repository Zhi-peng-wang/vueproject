<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <div>
        <h1>这是留言页面</h1>
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
        this.$store.commit('activeNav', "4");
      },
    }
</script>

<style scoped>

</style>
