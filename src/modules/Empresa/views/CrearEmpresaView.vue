<template>
  <a-row justify="center">
    <a-col>
      <!-- Título -->
      <a-typography-title :level="3">Empresa</a-typography-title>
    </a-col>
  </a-row>
  <!-- Componente Crear Empresa -->
  <CrearEmpresa></CrearEmpresa>
  <!-- Componente Tabla Empresa -->
  <TablaEmpresa></TablaEmpresa>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
// Importación de componnentes
const CrearEmpresa = defineAsyncComponent(() => import('@/modules/Empresa/components/CrearEmpresa.vue'));
const TablaEmpresa = defineAsyncComponent(() => import('@/modules/Empresa/components/TablaEmpresa.vue'));
</script>
