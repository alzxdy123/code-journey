import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./section/Home.vue";
import pages1 from "./section/pages/pages1.vue";
// import pages2 from "./section/pages/pages2.vue";
import pages2C from "./section/pages/pages2C.vue";
import pages3 from "./section/pages/pages3.vue";
import pages2C2 from "./section/pages/pages2C2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/pages1",
        component: pages1,
      },
      // {
      //   path: "/pages2",
      //   component: pages2,
      // },
      {
        path: "/pages2-children1",
        component: pages2C,
      },
      {
        path: "/pages2-children2",
        component: pages2C2,
      },
      {
        path: "/pages3",
        component: pages3,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;