import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    meta: {
      name: '',
      requiresAuth: false
    },
    component: () => import(`../views/Login.vue`),
    children: [
      {
        path: '',
        component: () => import(`../views/LoginForm.vue`)
      }
    ]
  },
  {
    path: '/dashboard',
    meta: {
      name: '',
      requiresAuth: false
    },
    component: () => import(`../components/moni/DashBoard.vue`)
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
