import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

/**
 * Common check for auth and reverse auth
 * @param {Object} next
 * @param {Boolean} reverse
 */
async function commonCheck(next, reverse = false) {
  // Step 1: Check if user is verified
  let isVerified = store.getters.getIsVerified;
  if (isVerified === "VERIFIED") {
    if (reverse) {
      return next({ name: "Home" });
    }
    return next();
  } else if (isVerified === "NOT_VERIFIED") {
    if (reverse) {
      return next();
    }
    return next({ name: "Login" });
  }

  // Step 2: Get token from the local storage
  const token = localStorage.getItem("token");

  // Step 3: See if token exists
  if (token === null) {
    store.commit("authClear");
    if (reverse) {
      return next();
    }
    return next({ name: "Login" });
  }

  // Step 4: Set the token
  store.commit("setToken", token);

  // Step 5: Verify
  await store.dispatch("verify");

  // Step 6: Check again
  isVerified = store.getters.getIsVerified;
  if (isVerified === "VERIFIED") {
    if (reverse) {
      return next({ name: "Home" });
    }
    return next();
  } else {
    if (reverse) {
      next();
    }
    return next({ name: "Login" });
  }
}

/**
 * Check if user is authentic
 * @param {Object} to
 * @param {Object} from
 * @param {Object} next
 */
async function auth(to, from, next) {
  // Pass to common check
  commonCheck(next);
}

/**
 * Check if user is authentic
 * @param {Object} to
 * @param {Object} from
 * @param {Object} next
 */
async function revAuth(to, from, next) {
  // Pass to common check
  commonCheck(next, true);
}

const routes = [
  /**
   * Requires route guards
   */
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: auth
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    beforeEnter: auth
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    beforeEnter: auth
  },
  {
    path: "/theatre",
    name: "Theatre",
    component: () => import("../views/Theatre.vue"),
    beforeEnter: auth
  },
  /**
   * Requires reverse route guards
   */
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: revAuth
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    beforeEnter: revAuth
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
