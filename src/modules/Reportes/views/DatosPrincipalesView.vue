<template>
    <!-- Componentes  -->
    <div>
        <ComprasObligaciones></ComprasObligaciones>
        <MantClienteProv></MantClienteProv>
        <ConsultarSunat></ConsultarSunat>
        <RegistroPlanillas></RegistroPlanillas>
        <RegistroPlanillasB></RegistroPlanillasB>
        <RegistroCajaBancos></RegistroCajaBancos>
        <CuentasPorCobrar></CuentasPorCobrar>
        <RegistrarCobranza></RegistrarCobranza>
        <TipoCambio></TipoCambio>
        <LibroRetenciones></LibroRetenciones>
        <Daot></Daot>
    </div>
    <div>
        <!-- Prueba con una api -->
        <datos></datos>
    </div>
</template>

<script setup>
// Importar funciones de vue
import { defineAsyncComponent } from 'vue'
// Importar componentes
const datos = defineAsyncComponent(() => import('@/modules/Reportes/components/datos.vue'));
const ComprasObligaciones = defineAsyncComponent(() => import('@/modules/Reportes/components/ComprasObligaciones.vue'));
const MantClienteProv = defineAsyncComponent(() => import('@/modules/Reportes/components/MantClienteProv.vue'));
const ConsultarSunat = defineAsyncComponent(() => import('@/modules/Reportes/components/ConsultarSunat.vue'));
const RegistroPlanillas = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistroPlanillas.vue'));
const RegistroPlanillasB = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistroPlanillasB.vue'));
const RegistroCajaBancos = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistroCajaBancos.vue'));
const CuentasPorCobrar = defineAsyncComponent(() => import('@/modules/Reportes/components/CuentasPorCobrar.vue'));
const RegistrarCobranza = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistrarCobranza.vue'));
const TipoCambio = defineAsyncComponent(() => import('@/modules/Reportes/components/TipoCambio.vue'));
const LibroRetenciones = defineAsyncComponent(() => import('@/modules/Reportes/components/LibroRetenciones.vue'));
const Daot = defineAsyncComponent(() => import('@/modules/Reportes/components/Daot.vue'));
</script>
