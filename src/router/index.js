import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  /**
   * Requires route guards
   */
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue")
  },
  {
    path: "/theatre",
    name: "Theatre",
    component: () => import("../views/Theatre.vue")
  },
  /**
   * Requires reverse route guards
   */
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * Dynamically change the title
 */
router.beforeEach((to, from, next) => {
  // Step 1: Change the title
  document.title = `PVR | ${to.name}`;

  // Step 2: Next
  next();
});

export default router;
