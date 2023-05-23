<template>
  <a-row justify="center">
    <a-col>
      <a-typography-title :level="3">Administración de parámetros</a-typography-title>
    </a-col>
  </a-row>


  <!-- contenido -->

  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="Parametros de Cuentas">
        <!-- Parametros de cuentas -->
        <ParameCuentas></ParameCuentas>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Cancelaciones Aut.">
        <!-- Cancelaciones Aut.  -->
        <CancelAut></CancelAut>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Porcentajes, Montos y Longitudes">
        <!-- Parámetros  -->
        <Porcentajes></Porcentajes>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Apariencia">
        <!-- Apariencia  -->
        <Apariencia></Apariencia>

      </a-tab-pane>
    </a-tabs>
  </div>
</template>


<script setup>
import { ref, defineAsyncComponent } from 'vue'
const ParameCuentas = defineAsyncComponent(() => import('@/modules/Herramientas/components/ParameCuentas.vue'));
const CancelAut = defineAsyncComponent(() => import('@/modules/Herramientas/components/CancelAut.vue'));
const Porcentajes = defineAsyncComponent(() => import('@/modules/Herramientas/components/Porcentajes.vue'));
const Apariencia = defineAsyncComponent(() => import('@/modules/Herramientas/components/Apariencia.vue'));

const activeKey = ref('1');

</script>

<style scoped>
/* menu superior */
.card-container p {
  margin: 0;
}

.card-container>.ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container>.ant-tabs-card .ant-tabs-content>.ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}

.card-container>.ant-tabs-card>.ant-tabs-nav::before {
  display: none;
}

.card-container>.ant-tabs-card .ant-tabs-tab,
[data-theme='compact'] .card-container>.ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}

.card-container>.ant-tabs-card .ant-tabs-tab-active,
[data-theme='compact'] .card-container>.ant-tabs-card .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}


[data-theme='compact'] .card-container>.ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -8px;
}

[data-theme='dark'] .card-container>.ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}


[data-theme='dark'] .card-container>.ant-tabs-card .ant-tabs-content>.ant-tabs-tabpane {
  background: #141414;
}

[data-theme='dark'] .card-container>.ant-tabs-card .ant-tabs-tab-active {
  background: #141414;
  border-color: #141414;
}
</style>