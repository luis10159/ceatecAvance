<template>
  <a-row justify="center">
    <!-- Título -->
    <a-col>
      <a-typography-title :level="3">Unidad</a-typography-title>
    </a-col>
  </a-row>
  <!-- Componentes -->
  <CrearUnidad></CrearUnidad>
  <TablaUnidad></TablaUnidad>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
//Importación de componentes
const CrearUnidad = defineAsyncComponent(() => import('@/modules/Empresa/components/CrearUnidad.vue'));
const TablaUnidad = defineAsyncComponent(() => import('@/modules/Empresa/components/TablaUnidad.vue'));
</script>
