import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter);

const router=new VueRouter({
  mode: 'history',
  routes:routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {     // 哪些需要验证
    if (!sessionStorage.getItem("token")) {                      // token存在条件
      next({
        path: '/',                                               // 验证失败要跳转的页面
      });
      alert("请先进行登录!!!")
    } else {
      next()
    }
  } else {
    next()                                                       // 确保一定要调用 next()
  }
});

export default router
