import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/table1",
      component: () => import("./views/Table1.vue")
    },
    {
      path: "/table2",
      component: () => import("./views/Table2.vue")
    },
    {
      path: "/table3",
      component: () => import("./views/Table3.vue")
    }
  ]
})
