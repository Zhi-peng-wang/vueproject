import App from '../App'

export default [
   /******************登陆注册***************** */
   //登录
  {
    path:'/',
    name:'signIn',
    component:App.components.signIn
  },
  //注册
  {
    path:'/signUp',
    name:'signUp',
    component:App.components.signUp
  },
  //主页
  {
    path:'/:id/homePage',
    name:'homePage',
    component:App.components.homePage
  }
]
