
<template>
  <nav>
    <router-link :to="{ name: 'home' }">Inicio</router-link> |
    <router-link :to="{ name: 'login' }">Login</router-link> |
    <router-link :to="{ name: 'dashboard' }">Dashboard</router-link> |
    <router-link :to="{ name: 'plan-contable' }">Plan Contable</router-link> |
    <router-link :to="{ name: 'registro-compras' }">Registro Compras</router-link> |
    <router-link :to="{ name: 'datos-principales' }">Algunas "ventanas"</router-link> |
    <router-link :to="{ name: 'parametros' }">Parámetros</router-link> |
    <router-link :to="{ name: 'crear-empresa' }">Empresa</router-link> |
    <router-link :to="{ name: 'crear-zona' }">Crear Zona</router-link> |
    <router-link :to="{ name: 'crear-unidad' }">Crear Unidad</router-link> |
    <router-link :to="{ name: 'mes-proceso' }">Apertura mes proceso</router-link> |
  </nav>
  <router-view />
</template>