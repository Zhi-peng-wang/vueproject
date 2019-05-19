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
