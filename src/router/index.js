import { createRouter, createWebHistory } from "vue-router";
import Inicio from "@/modules/Inicio/router/index.js";
import Tabla from "@/modules/Tabla/router/index.js";
import Login from "@/modules/Login/router/index.js";
import MainLayout from "@/layouts/DashboardLayout.vue";
import Empresa from "@/modules/Empresa/router/index.js";
import Herramientas from "@/modules/Herramientas/router/index.js";
import Reportes from "@/modules/Reportes/router/index.js";
// import ModuloB from '../modules/TablaGeneral/router/index.js'
import { useIndexStore } from "@/store/index";

const routes = [
  {
    path: "/dash",
    component: MainLayout,
    children: [
      {
        ...Inicio,
      },
      {
        ...Tabla,
      },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/principal",
    component: MainLayout,
    meta: {
      requireAuth: true,
    },
    ...Empresa,
    
  },
  {
    path: "/secundario",
    component: MainLayout,
    meta: {
      requireAuth: true,
    },
    ...Herramientas,
  },
  {
    path: "/terciario",
    component: MainLayout,
    meta: {
      requireAuth: true,
    },
    ...Reportes,
  },
  {
    path: "/",
    name: "home",
    ...Login,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("../views/ErrorNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useIndexStore();
  if ((to.meta.requireAuth == true) && (store.token == false)) {
    next('login')
  } else {
    next()
  }
});

export default router;
