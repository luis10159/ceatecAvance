<template>
    <div>
        <!-- Impresión de datos - prueba de una api externa -->
        <datos></datos>
    </div>
</template>

<script setup>
// Importar funciones de vue
import { defineAsyncComponent } from 'vue'
// Importar componentes
const datos = defineAsyncComponent(() => import('@/modules/Reportes/components/datos.vue'));
</script>
