export default {
  children: [
    {
      path: "/registro-compras",
      name: "registro-compras",
      component: () =>
        import(
          /* webpackChunkName: "registro-compras" */ "@/modules/Reportes/views/RegistroComprasView.vue"
        ),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/datos-principales",
      name: "datos-principales",
      component: () =>
        import(
          /* webpackChunkName: "datos-principales" */ "@/modules/Reportes/views/DatosPrincipalesView.vue"
        ),
      meta: {
        requireAuth: true,
      },
    },
  ],
};
