<template>
  <div>
    <el-card class="box-card" style="background:rgb(244, 244, 245)">
      <div slot="header" class="clearfix">
        <span style="font-weight: 800;font-size: 30px">日志标题：</span>
        <span style="font-weight: 400;font-size: 18px">{{blogTitle}}</span>
      </div>
      <div class="text item">
        <p v-html="blogContent">
          {{blogContent}}
        </p>
      </div>

      <div style="margin:30px 0px;border-bottom: 2px solid black;padding-bottom: 15px">
        <b>文章评论：</b>
      </div>

      <!--**********************该篇日志的评论区域******************************-->
      <div>

        <!--没有文章评论时候展示的-->
        <el-row v-if="blogComment.length===0">
          <el-col :span="24">
            <el-card shadow="hover">
              <p style="text-align: center;margin: 0">
                暂无评论，快来评论吧！
              </p>
            </el-card>
          </el-col>
        </el-row>

        <!--评论与回复的展示区域-->
        <div>
          <el-row v-for="(c,index) in blogComment" :key="index">
            <!--评论的头像显示区域-->
            <el-col :span="4" style="padding-bottom:33px;">
              <div style="width: 80px;margin: 0 auto">
                <img :src="c.userimg" alt="头像图片" height="60px" style="margin: 10px" width="60px">
              </div>
            </el-col>
            <!--评论内容及回复的显示区域-->
            <el-col :span="20">
              <div class="father" style="padding-bottom: 30px;">
                <!--评论人的名字以及评论的内容-->
                <div style="line-height: 40px;margin: 0;font-size: 18px">
                  {{c.nickname}}：<p style="margin-top: 0px;line-height: 40px"
                                    v-html="c.commentcontent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                  {{c.commentcontent}}</p>
                </div>
                <div style="margin: 0;font-size: 14px">
                  {{c.commentdate.slice(0,10)}}
                  <el-popover
                    placement="top-start"
                    width="400"
                    trigger="hover">
                    <p>回复：{{c.nickname}}</p>
                    <!--回复输入框-->
                    <div>
                      <div>
                        <!--文本输入框-->
                        <textarea class="text" rows="3" style="width: 370px"
                                  v-model="replayCommentContent"></textarea>
                        <img @click="showToggle()" class="face" src="../../assets/blogContent/face.png">
                      </div>
                      <el-button @click="replayComment(c.nickname,c.fromuser,c.commentid)" size="mini"
                                 style="margin: 5px 20px 0 0;float: right;color: white"
                                 type="primary">
                        回复{{c.nickname}}
                      </el-button>
                      <!-- 表情选择框-->
                      <Emotion :height="200" @emotion="handleEmotionReplay" v-if="isShow"></Emotion>
                    </div>
                    <div class="child"
                         plain size="mini"
                         style="margin-left: 15px"
                         slot="reference"
                         type="primary">
                      <img src="../../assets/blogContent/replay.png" style="width: 15px;height: 15px">
                    </div>
                  </el-popover>

                  <div @click="deleteCom(c.commentid)" class="child" plain
                       size="mini"
                       style="margin-left:5px">
                    <img src="../../assets/blogContent/delete.png" style="width: 15px;height: 15px">
                  </div>
                </div>
              </div>
<!--*******************************************************************************************************************-->
              <!--回复相关内容-->
              <el-row>
                <div v-for="(r,index) in answerComment">
                  <div v-if="r.parentid===c.commentid">
                    <el-col :span="4">
                      <div style="padding: 0">
                        <div style="padding-bottom: 30px;">
                          <img :src="r.userimg"
                               alt="图片" height="60px" style="margin: 10px" width="60px">
                        </div>
                      </div>
                    </el-col>

                    <el-col :span="20">
                      <div class="father">
                        <div style="padding-bottom: 50px;">
                          <div style="height: 80px">
                            <p style="line-height: 40px;margin: 0;font-size: 16px">
                              {{r.nickname}} 回复：{{r.touser}}：
                              <span v-html="r.commentcontent.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                              {{r.commentcontent}}
                            </span>
                            </p>
                            <div style="line-height: 40px;margin: 0;font-size: 12px">
                              {{r.commentdate.slice(0,10)}}
                              <el-popover
                                placement="top-start"
                                width="400"
                                trigger="hover">
                                <p>回复：{{r.nickname}}</p>
                                <!--回复输入框-->
                                <div>
                                  <div>
                                    <!--文本输入框-->
                                    <textarea class="text" rows="3" style="width: 370px"
                                              v-model="replayAnswer"></textarea>
                                    <img @click="showToggle()" class="face" src="../../assets/blogContent/face.png">
                                  </div>
                                  <el-button @click="replayAnswerAction(r.nickname,r.fromuser,c.commentid)" size="mini"
                                             style="margin: 5px 20px 0 0;float: right"
                                             type="primary">
                                    回复{{r.nickname}}
                                  </el-button>
                                  <!-- 表情选择框-->
                                  <Emotion :height="200" @emotion="handleEmotionReplayAnswer" v-if="isShow"></Emotion>
                                </div>

                                <div class="child"
                                     plain size="mini"
                                     style="margin-left: 15px"
                                     slot="reference"
                                     type="primary">
                                  <img src="../../assets/blogContent/replay.png" style="width: 15px;height: 15px">
                                </div>
                              </el-popover>
                              <div @click="deleteCom(r.commentid)" class="child" plain
                                   size="mini"
                                   style="margin-left: 5px">
                                <img src="../../assets/blogContent/delete.png" style="width: 15px;height: 15px">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>

                  </div>
                </div>
              </el-row>

            </el-col>


          </el-row>
        </div>

        <!--评论的文本输入框-->
        <el-row>
          <p style="margin: 15px 0;font-weight: 900">发表评论</p>
          <div>
            <!--文本输入框-->
            <textarea class="text" rows="5" v-model="commentContent"></textarea>
            <img @click="showToggle()" class="face" src="../../assets/blogContent/face.png">
          </div>
          <el-button @click="addComment()" size="mini"
                     style="margin: 5px 5px 0 0;float: right;color: white"
                     type="primary">
            发表评论
          </el-button>
          <!--表情选择框-->
          <Emotion :height="200" @emotion="handleEmotion" v-if="isShow"></Emotion>
        </el-row>


      </div>

    </el-card>
  </div>
</template>

<script>
  import {deleteComment, getContentInfo, insertComment, listComment} from "../../api";
  import Emotion from '@/components/Emotion/index'

  export default {

    data() {
      return {
        blogTitle: "",     //日志标题
        blogContent: "",     //日志内容
        blogComment: [],       //日志的评论数组
        commentContent: "",    //发表评论的文本输入框
        replayCommentContent: "",      //对评论得回复内容收集
        isShow: false,       //用来控制表情框的点击事件
        answerComment: [],     //回复得数组
        replayAnswer:""     //对回复的的回复的内容收集
      }
    },

    components: {
      Emotion
    },

    mounted() {
      //页面初始化时调用得到该篇日志的相关内容
      this.getBlogContent()
    },

    methods: {
      //对回复的回复点击事件
      replayAnswerAction(nickname, fromuser, commentid){
        let data = {
          parentid: commentid,
          toid: this.$route.query.contentid,
          fromuser: localStorage.getItem("loginUser"),
          touser: fromuser,
          commentcontent: this.replayAnswer,
        };
        insertComment(data)
          .then(res=>{
            if (res.status===200){
              console.log("对回复的回复的事件已发生");
              console.log(res);
              this.replayAnswer = "";
              //添加成功之后调用方法
              this.getBlogContent();
              this.$notify({
                title: '回复成功',
                message: '您的回复很快就能被看到啦！',
                type: 'success'
              });
            }

          })
          .catch(err=>{
            console.log(err);
          })
      },

      //对评论的回复的的表情，点击表情转换成文字保存在输入框中，之后在保存在数据库中
      handleEmotionReplayAnswer(i) {
        this.replayAnswer += i
      },

      //对评论的回复
      replayComment(nickname, fromuser, commentid) {
        let data = {
          parentid: commentid,
          toid: this.$route.query.contentid,
          fromuser: localStorage.getItem("loginUser"),
          touser: fromuser,
          commentcontent: this.replayCommentContent,
        };
        insertComment(data)
          .then(res => {
            if(res.status===200){
              console.log(res);
              this.replayCommentContent = "";
              //添加成功之后调用方法
              this.getBlogContent();
              this.$notify({
                title: '回复成功',
                message: '您的回复很快就能被看到啦！',
                type: 'success'
              });
            }else {
              this.$notify({
                title: '回复错误',
                message: '内部服务器错误',
                type: 'error'
              });
            }

          })
          .catch(err => {
            console.log(err);
          })
      },

      //删除评论及评论下的相关内容
      deleteCom(id) {
        let data = {
          commentid: id
        };
        deleteComment(data)
          .then(res => {
            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then((action) => {
              if (action === 'confirm') {    //成功的回调
                if (res.status === 200) {
                  console.log("删除评论得接口触发");
                  console.log(res);
                  this.blogComment=[];
                  this.answerComment=[];
                  this.$notify({
                    title: '删除评论成功',
                    message: '您删除了该评论',
                    type: 'success'
                  });
                  this.getBlogContent();
                } else {
                  this.$notify({
                    title: '删除评论失败',
                    message: '内部服务器失败',
                    type: 'error'
                  });
                }
              }
            }).catch((err) => {
              if (err === 'cancel') {       //失败的回调
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: '已取消添加'
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
          })
      },

      //对评论的回复的的表情，点击表情转换成文字保存在输入框中，之后在保存在数据库中
      handleEmotionReplay(i) {
        this.replayCommentContent += i
      },

      // 当点击表情图片时，将表情转换为相应的文字，并显示在评论的文本输入框上，进而保存在数据库中
      handleEmotion(i) {
        this.commentContent += i
      },

      // 得到数据库的表情的文本信息，然后通过下方转化成相应的图片(是一个解析的过程)
      emotion(res) {
        let word = res.replace(/\#|\;/gi, '');
        const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
        let index = list.indexOf(word);
        return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
      },

      //点击发表评论按钮触发发表评论事件
      addComment() {
        let data = {
          parentid: "0",
          toid: this.$route.query.contentid,
          fromuser: localStorage.getItem("loginUser"),
          touser: this.$route.params.id,
          commentcontent: this.commentContent,
        };
        insertComment(data)
          .then(res => {
            if (res.status === 200) {
              console.log("日志添加接口触发");
              console.log(res);
              this.commentContent = "";
              //添加成功之后调用方法
              this.getBlogContent();
              this.$notify({
                title: '评论成功',
                message: '您的评论很快就能被看到啦！',
                type: 'success'
              });
            } else {
              this.$notify({
                title: '评论错误',
                message: '内部服务器错误',
                type: 'error'
              });
            }

          })
          .catch(err => {
            console.log(err);
          })
      },

      //当点击日志的图片按钮时用来是否显示表情
      showToggle() {
        this.isShow = !this.isShow;
      },

      //通过日志id查询日志的详情内容
      getBlogContent() {
        //准备数据（日志的详情内容）
        let data1 = {
          contentid: this.$route.query.contentid,
          categoryid: this.$route.query.categoryid
        };
        //准备数据（日志内容的评论及其回复）
        let data2 = {
          toid: this.$route.query.contentid
        };
        //获取日志的详情内容
        getContentInfo(data1)
          .then(res => {
            console.log("得到该日志contentid下的内容");
            console.log(res);
            this.blogTitle = res.object.content.Title;
            this.blogContent = res.object.content.Content;
          })
          .catch(err => {
            console.log(err);
          });

        //获取日志的评论及回复数据
        listComment(data2)
          .then(res => {
            console.log("得到日志评论的接口触发");
            console.log(res);
            this.blogComment=[];
            this.answerComment=[];
            //获取本篇日志下的评论
            res.object.find(item => {
              for (let i = 0; i < res.object.length; i++) {
                if (item.parentid === "0") {
                  if (!~this.blogComment.indexOf(item)) {
                    this.blogComment.push(item);
                  }
                }
              }
            });

            //提取数组中得commentid数据
            const commentIds = res.object.map(item => ({
              commentid: item.commentid
            }));
            //回复得数组
            res.object.find(item => {
              for (let i = 0; i < res.object.length; i++) {
                if (item.parentid === commentIds[i].commentid) {
                  if (!~this.answerComment.indexOf(item)) {
                    this.answerComment.push(item)
                  }
                }
              }
            });
            console.log("回复的数组");
            console.log(this.answerComment);


          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped>
  * {
    color: #303133;
  }

  .father .child {
    display: none;
  }

  .father:hover .child {
    display: inline;
  }

  .text {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
    width: 690px;
    resize: none;
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 8px;
  }

  .face {
    width: 17px;
    height: 17px;
    margin-left: 20px
  }
</style>
