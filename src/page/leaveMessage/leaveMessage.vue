<template>
    <div class="container">
      <!--3.标签式展现数据-->
      <navBar></navBar>
      <!--留言的欢迎语句-->
      <el-row>
        <el-card shadow="always">
          <p style="text-align: center;margin: 0;font-size: 26px;font-family: 幼圆;font-weight: 900">
            欢迎你来到我的空间！
          </p>
        </el-card>
      </el-row>
      <!--留言的输入框-->
      <el-row>
        <label style="margin-top: 15px">发表您的留言：</label>
        <!--发表留言输出框-->
        <el-input
          type="textarea"
          :rows="5"
          placeholder="发表您的留言"
          v-model="leaveMsg"
          style="margin-top: 15px">
        </el-input>
        <img @click="showToggle()" class="face" src="../../assets/leaveMessage/face.png">
        <el-button type="primary" size="mini"
                   @click="insertMessageAction()"
                   style="margin-top: 15px;float: right">
          发表留言
        </el-button>
        <emotion :height="300" @emotion="handleEmotion" v-if="!isShow"></emotion>
      </el-row>
      <!--留言及留言的回复的显示区域-->
      <el-row  style="margin: 30px 0px" v-for="(m,index) in totalMsg" :key="index">
        <!--留言的卡片-->
        <el-card shadow="hover" style="margin-bottom: 30px">
          <el-row style="height: 80px">
            <el-col :span="4">
              <img :src="m.userimg" alt="留言头像" style="margin-left: 50px" width="80px" height="80px">
            </el-col>
            <el-col :span="20">
              <el-row><h4 style="margin: 0">{{m.nickname}}</h4></el-row>
              <el-row>
                <p v-html="m.msgcontent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">{{m.msgcontent}}</p>
              </el-row>
              <!--回复的相关内容-->
              <el-row>
                <p style="float: left;color: #C0C0C0;margin: 0">
                  {{m.msgdate.slice(0,10)}}-{{m.msgdate.slice(11,16)}}
                </p>
                <!--回复图标及回复的输入框-->
                <el-popover
                  placement="top-start"
                  width="400"
                  trigger="click">
                  <p>回复：{{m.nickname}}</p>
                  <!--回复输入框-->
                  <div>
                    <div>
                      <!--文本输入框-->
                      <textarea class="text" rows="3" style="width: 370px" v-model="replayMsg"></textarea>
                      <img @click="showToggleReplay()" class="face" src="../../assets/leaveMessage/face.png">
                    </div>
                    <el-button @click="replayMsgInfo(m.msgid,m.userid)" size="mini"
                               style="margin: 5px 20px 0 0;float: right"
                               type="primary">
                      回复{{m.nickname}}
                    </el-button>
                    <!-- 表情选择框-->
                    <Emotion :height="200" @emotion="handleEmotionReplayMsg" v-if="isShowReplay" style="margin-top: 25px"></Emotion>
                  </div>
                  <img src="../../assets/leaveMessage/replay.png"
                       slot="reference"
                       style="margin-left: 20px;width: 15px;height: 15px">
                </el-popover>
                <!--删除图标-->
                <img src="../../assets/leaveMessage/delete.png"
                     @click="deleteMsg(m.msgid)"
                     v-if="bigPower||m.fromuserid===personId"
                     style="margin-left: 5px;width: 15px;height: 15px">
              </el-row>

              <!--对留言回复的回复   数据展示-->
              <el-row  v-for="(r,index) in replayMsgTotalMsg" :key="index">
                <div  v-if="r.msgparentid===m.msgid">
                  <el-row :gutter="20">
                    <!--左侧头像展示区域-->
                    <el-col :span="4">
                      <div style="margin: 0 auto">
                        <img :src="r.userimg" alt="留言头像" width="80px" height="80px">
                      </div>
                    </el-col>
                    <!--右侧内容区域-->
                    <el-col :span="18">
                      <el-row>
                        {{r.nickname}} 回复：{{m.nickname}}
                      </el-row>
                      <el-row>
                        <p v-html="r.msgcontent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">{{r.msgcontent}}</p>
                      </el-row>
                      <el-row>
                        <p style="float: left;color: #C0C0C0;margin: 0">
                          {{r.msgdate.slice(0,10)}}-{{r.msgdate.slice(11,16)}}
                        </p>
                        <el-popover
                          placement="top-start"
                          width="400"
                          trigger="click">
                          <p>回复：{{r.nickname}}</p>
                          <!--回复输入框-->
                          <div>
                            <div>
                              <!--文本输入框-->
                              <textarea class="text" rows="3" style="width: 370px" v-model="replayMsgByMsg"></textarea>
                              <img @click="showToggleReplay()" class="face" src="../../assets/leaveMessage/face.png">
                            </div>
                            <el-button @click="replayMsgInfoByMsg(m.msgid,r.userid)" size="mini"
                                       style="margin: 5px 20px 0 0;float: right"
                                       type="primary">
                              回复{{r.nickname}}
                            </el-button>
                            <!-- 表情选择框-->
                            <Emotion :height="200" @emotion="handleEmotionReplayByMsg" v-if="isShow"></Emotion>
                          </div>
                          <img src="../../assets/leaveMessage/replay.png"
                               slot="reference"
                               style="margin-left: 20px;width: 15px;height: 15px">
                        </el-popover>
                        <img src="../../assets/leaveMessage/delete.png"
                                @click="deleteReplyMsg(r.msgid)"
                                v-if="bigPower||r.fromuserid===personId"
                                style="margin-left: 5px;width: 15px;height: 15px">
                      </el-row>

                    </el-col>
                  </el-row>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <!--分页展示-->
      <div class="block" style="text-align: center">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalNum">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  //复用组件(3步骤)
  //1.导入组件
  import navBar from '../nav/navBar'
  import Emotion from '../../components/Emotion/index'
  import {deleteMessage, insertMessage, listMessage} from "../../api";
    export default {
      //2.映射成组件对象
      components: {
        navBar,Emotion
      },
      data(){
        return{
          leaveMsg:"",      //留言框中的数据
          isShow:true,      //留言框表情选择框的展示
          isShowReplay:false,     //回复的表情框
          totalMsg:[],      //留言的总数据
          pageSize:5,      //分页一共有多少条
          pageNo:1,        //当前页码数
          totalNum:0,      //总条数
          replayMsg:"",     //对留言的回复
          bigPower:false,     //日志的最大权限
          personId:"",       //个人中心的id值
          replayMsgTotalMsg:[],      //对所有留言回复产生的数组
          msgIds:[],        //存储所有的msgid
          replayMsgByMsg:"",      //对留言回复的回复信息
        }
      },
      created(){
        //修改vuex中的导航栏中默认激活的值
        this.$store.commit('activeNav', "4");
      },
      mounted(){
        //调用得到全部留言的方法
        this.getListMessage();
      },
      methods:{
        //删除留言的回复
        deleteReplyMsg(id){
          let data={
            msgid:id,
            userid:localStorage.getItem("loginUser")
          };
          deleteMessage(data)
            .then(res=>{
              console.log(res);
              //删除之后重新调用获取方法
              this.getListMessage()
            })
            .catch(err=>{
              console.log(err);
            })
        },
        //删除留言按钮
        deleteMsg(id){
          let data={
            msgid:id,
            userid:localStorage.getItem("loginUser")
          };
          deleteMessage(data)
            .then(res=>{
              console.log(res);
              //删除之后重新调用获取方法
              this.getListMessage()
            })
            .catch(err=>{
              console.log(err);
            })
        },
        //回复留言的回复的方法
        replayMsgInfoByMsg(msgid,userid){
          //准备数据
          let data ={
            fromuser:localStorage.getItem("loginUser"),      //来自谁的留言
            touser:userid,        //给谁的留言进行回复的
            userid:this.$route.params.id,        //谁的留言板
            msgtype:"1",      //是留言还是留言的回复
            msgcontent:this.replayMsgByMsg,    //留言的内容
            msgparentid:msgid
          };
          insertMessage(data)
            .then(res=>{
              console.log(res);
              this.totalMsg=[];
              this.replayMsgTotalMsg=[];
              this.replayMsgByMsg="";
              this.getListMessage();
            })
            .catch(err=>{
              console.log(err);
            })
        },
        //回复的留言的操作
        replayMsgInfo(msgid,userid){
          //准备数据
          let data ={
            fromuser:localStorage.getItem("loginUser"),      //来自谁的留言
            touser:userid,        //给谁的留言进行回复的
            userid:this.$route.params.id,        //谁的留言板
            msgtype:"1",      //是留言还是留言的回复
            msgcontent:this.replayMsg,    //留言的内容
            msgparentid:msgid
          };
          insertMessage(data)
            .then(res=>{
              console.log("对留言回复的接口执行了");
              console.log(res);
              this.totalMsg=[];
              this.replayMsgTotalMsg=[];
              this.replayMsg="";
              this.getListMessage();
            })
            .catch(err=>{
              console.log(err);
            })
        },
        //分页按钮的点击事件
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pageNo=`${val}`;
          console.log(this.pageNo);
          //重新调用方法得到相应页上的内容
          this.getListMessage()
        },
        //得到该用户的留言的全部数据
        getListMessage(){
          //将个人中心的值赋值上
          this.personId=localStorage.getItem("loginUser");
          //为获取全部留言准备数据
          let data ={
            userid:this.$route.params.id,     //得到哪个用户的留言板相关内容
            pageno:this.pageNo,         //得到第几页
            pagesize:5,        //一页显示多少条
          };
          listMessage(data)
            .then(res=>{
              console.log("获取全部的留言数据，并进行输出");
              console.log(res);
              //将数据存储在result中
              const result=res.object.content;
              this.totalMsg=[];
              this.replayMsgTotalMsg=[];
              this.totalNum=res.object.num;            //总条数进行赋值
              // 当地址栏上的地址与个人中心的id值相同，说明权限最大，判断是否有删除的权限（最大的权限问题）
              if (this.$route.params.id === localStorage.getItem("loginUser")) {
                this.bigPower = true
              }

              //留言的数组
              result.find(item=>{
                for (let i = 0; i < res.object.content.length; i++) {
                  if (item.msgparentid === "0") {
                    if (!~this.totalMsg.indexOf(item)) {
                      this.totalMsg.push(item);
                      console.log("此处打印只包含留言的相关内容");
                    }
                  }
                }
              });
              console.log("留言的数组");
              console.log(this.totalMsg);

              //得到留言数组的相关内容
              const resultReply=res.object.reply;
              this.replayMsgTotalMsg=resultReply;

              console.log("留言回复的数组");
              console.log(this.replayMsgTotalMsg);


            })
            .catch(err=>{
              console.log(err);
            })
        },
        //添加留言得到方法
        insertMessageAction(){
          console.log("添加留言的按钮被触发");
          let data={
            fromuser:localStorage.getItem("loginUser"),      //来自谁的留言
            touser:this.$route.params.id,        //给谁的留言
            userid:this.$route.params.id,        //谁的留言板
            msgtype:"0",      //是留言还是留言的回复
            msgcontent:this.leaveMsg,    //留言的内容
            msgparentid:"0"
          };
          console.log(data);
          insertMessage(data)
            .then(res=>{
              console.log("调用添加留言的接口");
              console.log(res);
              this.totalMsg=[];
              this.replayMsgTotalMsg=[];
              this.leaveMsg="";
              this.getListMessage();
            })
            .catch(err=>{
              console.log(err);
            })
        },
        // 表情图片掌控表情框的显示与隐藏
        showToggle() {
          this.isShow = !this.isShow;
        },
        // 表情图片掌控表情框的显示与隐藏
        showToggleReplay() {
          this.isShowReplay=!this.isShowReplay;
        },
        // 将点击表情的图片转换成文字进行输出到留言的输入框中
        handleEmotion(i) {
          this.leaveMsg += i;
        },
        //对留言的操作
        handleEmotionReplayMsg(i){
          this.replayMsg+= i;
        },
        // 对留言的回复上的表情进行转换操作，将匹配结果替换表情图片
        handleEmotionReplayByMsg(i) {
          this.replayMsgByMsg += i;
        },
        //文字进行匹配替换成表情图片
        emotion(res){
          let word = res.replace(/\#|\;/gi, '');
          const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
          let index = list.indexOf(word);
          return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
        },
      }
    }
</script>

<style scoped>
  .face {
    float: left;
    width: 17px;
    height: 17px;
    margin: 10px 20px 0 20px
  }
</style>
