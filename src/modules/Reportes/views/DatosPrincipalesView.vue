<template>
    <div>
        <DatosPrincipales></DatosPrincipales>
        <ComprasObligaciones></ComprasObligaciones>
        
        <MantClienteProv></MantClienteProv>

        <ConsultarSunat></ConsultarSunat>
        <RegistroPlanillas></RegistroPlanillas>
        <ParametrosAux></ParametrosAux>
    </div>
    <div>
        <datos></datos>
    </div>
</template>

<script setup>



import { defineAsyncComponent } from 'vue'
const datos = defineAsyncComponent(() => import('@/modules/Reportes/components/datos.vue'));
const DatosPrincipales = defineAsyncComponent(() => import('@/modules/Reportes/components/DatosPrincipales.vue'));
const ComprasObligaciones = defineAsyncComponent(() => import('@/modules/Reportes/components/ComprasObligaciones.vue'));
const MantClienteProv = defineAsyncComponent(() => import('@/modules/Reportes/components/MantClienteProv.vue'));
const ConsultarSunat = defineAsyncComponent(() => import('@/modules/Reportes/components/ConsultarSunat.vue'));
const RegistroPlanillas = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistroPlanillas.vue'));
const ParametrosAux = defineAsyncComponent(() => import('@/modules/Reportes/components/ParametrosAux.vue'));

</script>

<style lang="scss" scoped>
.color {
    border: 2px solid rgba(0, 89, 255, 0.080);
    background-color: rgba(5, 170, 247, 0.024);
    border-radius: 10px
}

.ancho {
    width: 100%;
}

.margen-arriba {
    margin-top: 30px;
}
</style>