<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2019/5/6" placement="top">
            <el-card>
              <div class="left">
                <img src="../../../assets/visitCenter/timg.jpg"/>
              </div>
              <div class="right">
                <h5>查看了小王八的日志</h5><br/>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;"那一年，他离开女儿国。她在城头似哭似笑，当着百官的面，对着他的背影大喊“唐玄奘，下辈子娶我可好?”。
                  夕阳下，白衣骑白马。风沙漫天看不见他的表情。僧人不语，只余风声喧嚣。。。
                  这一年。他圆寂。千佛诵经，万众朝宗。。他走时候却只笑着留下一句莫名奇妙的“好!”......"</p>
              </div>
              <p>小王八蛋&nbsp;&nbsp;&nbsp;2019/5/6 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2019/5/5" placement="top">
            <el-card>
              <div class="left">
                <img src="../../../assets/visitCenter/timg.jpg"/>
              </div>
              <div class="right">
                <h5>查看了小王八的相册</h5><br/>
                <img src="../../../assets/visitCenter/xwb.jpg" style="height: 150px;width: 200px;margin-bottom: 10px"/></div>
              <p>小王八蛋&nbsp;&nbsp;&nbsp;2019/5/6 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2019/5/4" placement="top">
            <el-card>
              <div class="left">
                <img src="../../../assets/visitCenter/timg.jpg"/>
              </div>
              <div class="right">
                <h5>访问了了小王八的主页</h5><br/>
              </div>
              <p>小王八蛋&nbsp;&nbsp;&nbsp;2019/5/6 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
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
