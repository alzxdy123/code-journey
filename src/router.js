import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./section/Home.vue";
import pages1 from "./section/pages/pages1.vue";
// import pages2 from "./section/pages/pages2.vue";
import pages2C from "./section/pages/pages2C.vue";
import pages3 from "./section/pages/pages3.vue";
import pages2C2 from "./section/pages/pages2C2.vue";

import s1s1 from "./section/cuyuniversity/semester1/sesi1.vue";
import s1s2 from "./section/cuyuniversity/semester1/sesi2.vue";
import s1s3 from "./section/cuyuniversity/semester1/sesi3.vue";
import s1s4 from "./section/cuyuniversity/semester1/sesi4.vue";
import s1s5 from "./section/cuyuniversity/semester1/sesi5.vue";
import s1s6 from "./section/cuyuniversity/semester1/sesi6.vue";
import s1s7 from "./section/cuyuniversity/semester1/sesi7.vue";
import s1s8 from "./section/cuyuniversity/semester1/sesi8.vue";
import s1s9 from "./section/cuyuniversity/semester1/sesi9.vue";
import s1s10 from "./section/cuyuniversity/semester1/sesi10.vue";

import loading from "./section/Error/Loading.vue";

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

      {
        path: "/semester-1/sesi-1",
        component: s1s1,
      },
      {
        path: "/semester-1/sesi-2",
        component: s1s2,
      },
      {
        path: "/semester-1/sesi-3",
        component: s1s3,
      },
      {
        path: "/semester-1/sesi-4",
        component: s1s4,
      },
      {
        path: "/semester-1/sesi-5",
        component: s1s5,
      },
      {
        path: "/semester-1/sesi-6",
        component: s1s6,
      },
      {
        path: "/semester-1/sesi-7",
        component: s1s7,
      },
      {
        path: "/semester-1/sesi-8",
        component: s1s8,
      },
      {
        path: "/semester-1/sesi-9",
        component: s1s9,
      },
      {
        path: "/semester-1/sesi-10",
        component: s1s10,
      },

      {
        path: "/loading",
        component: loading,
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
