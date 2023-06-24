<template>
        <!-- Se muestra datos de una api -->
        <div>{{ pokemons.count }}</div>
</template>

<script setup>
// Importar funciones de vue
import { ref  } from 'vue'
// Importar el store auth
import useAuth from '@/store/auth'
const store = useAuth();
const pokemons = ref([])
pokemons.value = await store.obtenerDatos()
</script>