/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'

//1.登录接口
export const loginVerify = data => ajax('/api/loginVerify',data,"POST");

//2.导航条中使用，得到用户名及用户名头像
export const headMsg = data => ajax('/api/headMsg',data,"POST");

//3.主页中个人档信息
export const getSimpleInfo = data=>ajax('/api/getSimpleInfo',data,"POST");

//4.得到一级二级分类
export const listAllCategory = data =>ajax('/api/listAllCategory',data,"POST");

//5.添加日志/相册
export const insertContent = data =>ajax('/api/insertContent',data,"POST");

//6.添加日志/相册分类
export const insertCategory =data =>ajax('/api/insertCategory',data,"POST");

//7.删除日志/相册分类
export const deleteCategoty = data =>ajax('/api/deleteCategory',data,"POST");

//8.编辑日志/相册分类
export const updateCategory = data =>ajax('/api/updateCategory',data,"POST");

//9.得到留言的接口
export const listMessage= data =>ajax('/api/listMessage',data,"POST");

//10.添加留言接口
export const insertMessage = data =>ajax('/api/insertMessage',data,"POST");

//11.删除留言
export const deleteMessage=data=>ajax('/api/deleteMessage',data,"POST");

//12.得到全部日志的接口
export const pageAllBlog=data=>ajax('/api/pageAllBlog',data);

//13.个人中心的日志列表
export const pageAllContentAndCategory =data =>ajax('/api/pageAllContentAndCategory',data,"POST");

//14.根据contentid获取详细内容
export const getContentInfo = data =>ajax('/api/getContentInfo',data,"POST");

//15.个人中心日志列表的删除
export const deleteContent = data =>ajax('/api/deleteContent',data,"POST");

//16.根据日志的二级分类id拿到该分类下的所有数据
export const listContentByCategory =data =>ajax('/api/listContentByCategory',data);

//17.编辑日志
export const editContent = data =>ajax('/api/editContent',data,"POST");

//18.查看日志下的评论及其回复
export const listComment = data =>ajax('/api/listComment',data,"POST");

//19.添加日志的评论
export const insertComment =data =>ajax('/api/insertComment',data,"POST");

//20.删除日志下的评论或者回复
export const deleteComment = data =>ajax('/api/deleteComment',data,"POST");

//21.个人中心添加图片
export const insertPhoto = data =>ajax('/api/insertPhoto',data,"POST");

//22.相册的二级分类
export const listCategoryPhotoTwo = data =>ajax('/api/listCategoryPhotoTwo',data,"POST");









