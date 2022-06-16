import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "KMC Neighborhoods",
    meta: {
      requiresAuth: true,
      navName: "KMC Neighborhoods",
    },
    component: () =>
      import(
        /* webpackChunkName: "neighborhood" */ "../views/Neighborhood.vue"
      ),
  },
  {
    path: "/neighborhood/:id",
    name: "MonitorNeighborhood",
    meta: {
      requiresAuth: true,
      navName: "KMC Neighborhoods",
    },
    component: () =>
      import(
        /* webpackChunkName: "neighborhooddetail" */ "../views/Monitoring.vue"
      ),
  },
  {
    path: "/403",
    name: "Fobidden",

    component: () =>
      import(
        /* webpackChunkName: "forbidden" */ "../views/errors/Forbidden.vue"
      ),
  },
  {
    path: "/neighborhood-mapping/:id",
    name: "NeighborhoodMapping",
    meta: {
      requiresAuth: true,
      navName: "KMC Neighborhoods",
    },
    component: () =>
      import(/* webpackChunkName: "mapping" */ "../views/Mapping.vue"),
  },
  {
    path: "/devices",
    name: "Device Management",
    meta: {
      requiresAuth: true,
      navName: "Device Management",
    },
    component: () =>
      import(
        /* webpackChunkName: "devices" */ "../views/DeviceManagementV2.vue"
      ),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {
      requiresVisitor: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    path: "/404",
    name: "404",

    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/NotAllowed.vue"),
  },
  {
    path: "/test",
    name: "40Test4",
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "login" */ "@/views/Test.vue"),
  },
  {
    path: "/auth/change-password",
    name: "ChangePassword",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "changepassword" */ "@/views/ChangePassword.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
