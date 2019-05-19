<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <div>
        <h1>这是点击更多访客跳转过来的访客中心页面</h1>
      </div>
    </div>
</template>

<script>
  //复用组件(3步骤)
  //1.导入组件
  import navBar from '../../nav/navBar'
    export default {
      //2.映射成组件对象
      components: {
        navBar
      },
    }
</script>

<style scoped>

</style>
