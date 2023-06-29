<template>
  <a-row justify="center">
    <a-col>
      <!-- Título -->
      <a-typography-title :level="3">Unidad</a-typography-title>
    </a-col>
  </a-row>
  <!-- Componentes -->
  <CrearZona></CrearZona>
  <TablaZona></TablaZona>
</template>

<script setup>
// Importar funciones de vue
import { defineAsyncComponent } from 'vue'
//Importación de componenetes
const CrearZona = defineAsyncComponent(() => import('@/modules/Empresa/components/CrearZona.vue'));
const TablaZona = defineAsyncComponent(() => import('@/modules/Empresa/components/TablaZona.vue'));

</script>
