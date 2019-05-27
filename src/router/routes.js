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
    component:App.components.homePage,
    meta: {
      requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
    },
  },
  //点击主页上的个人资时跳转的页面
  {
    path:'/:id/personOutInfo',
    name:'personOutInfo',
    component:App.components.personOutInfo,
    meta: {
      requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
    },
  },
  //点击主页上的更多访客时跳转的页面
  {
    path:'/:id/visitCenter',
    component:App.components.visitCenter,
    meta: {
      requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
    },
  },
  //修改密码页面路由
  {
    path:'/:id/editPassword',
    component:App.components.editPassword
  },
  //日志及其子路由
  {
    path:'/:id/blog',
    name:'blog',
    component:App.components.blog,
    meta: {
      requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
    },
    children:[
      {
        path:'',
        component:App.components.newBlogList
      },
      //日志的详情内容
      {
        path:'blogContent',
        component:App.components.blogContent
      },
      //日志列表
      {
        path:'blogList',
        component:App.components.blogList
      }
    ]
  },
  //个人中心及其子页面
  {
    path:'/:id/personalCenter',
    name:'personalCenter',
    component:App.components.personalCenter,
    meta: {
      requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
    },
    children: [
      //个人中心下默认显示的二级路由
      {
        path:'',
        component:App.components.personData
      },
      //个人资料路由
      {
        path:'personData',
        component:App.components.personData
      },
      //日志列表路由
      {
        path:'allBlogList',
        component:App.components.allBlogList
      },
      //日志类别路由
      {
        path:'blogCategory',
        component:App.components.blogCategory
      },
      //相册列表路由
      {
        path:'allAlbumList',
        component:App.components.allAlbumList
      },
      //相册类别路由
      {
        path:'albumCategory',
        component:App.components.albumCategory
      },
      //我评论的路由
      {
        path:'myComment',
        component:App.components.myComment
      },
      //我参与的路由
      {
        path:'myParticipate',
        component:App.components.myParticipate
      },
      //添加日志
      {
        path:'addBlog',
        component:App.components.addBlog
      },
      //添加相片
      {
        path:'addPhoto',
        component:App.components.addPhoto
      },
      //编辑日志路由
      {
        path:'editBlog',
        component:App.components.editBlog
      }
    ]
  },
  //相册页面
  {
    path:'/:id/album',
    component:App.components.album,
    meta: {
      requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
    },
    children:[
      //相册二级分类
      {
        path:'',
        component:App.components.albumClass
      },
      //相册分类下的相册列表
      {
        path:'albumClassList',
        component:App.components.albumClassList
      }
    ]
  },
  //留言页面
  {
    path:'/:id/leaveMessage',
    component:App.components.leaveMessage,
    meta: {
      requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
    },
  }
]




