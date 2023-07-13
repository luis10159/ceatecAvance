export default {
  children: [
    {
      path: "/crear-empresa",
      name: "crear-empresa",
      component: () =>
        import(
          /* webpackChunkName: "crear-empresa" */ "@/modules/Empresa/views/CrearEmpresaView.vue"
        ),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/asignar-empresa",
      name: "asignar-empresa",
      component: () =>
        import(
          /* webpackChunkName: "asignar-empresa" */ "@/modules/Empresa/views/AsignarEmpresaView.vue"
        ),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/crear-zona",
      name: "crear-zona",
      component: () =>
        import(
          /* webpackChunkName: "crear-zona" */ "@/modules/Empresa/views/CrearZonaView.vue"
        ),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/crear-unidad",
      name: "crear-unidad",
      component: () =>
        import(
          /* webpackChunkName: "crear-unidad" */ "@/modules/Empresa/views/CrearUnidadView.vue"
        ),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/mes-proceso",
      name: "mes-proceso",
      component: () =>
        import(
          /* webpackChunkName: "mes-proceso" */ "@/modules/Empresa/views/MesProcesoView.vue"
        ),
      meta: {
        requireAuth: true,
      },
    },
  ],
};
