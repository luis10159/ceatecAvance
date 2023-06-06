<template>
    <div>
        <DatosPrincipales></DatosPrincipales>
        <ComprasObligaciones></ComprasObligaciones>
        <MantClienteProv></MantClienteProv>
        <ConsultarSunat></ConsultarSunat>
        <RegistroPlanillas></RegistroPlanillas>
        <ParametrosAux></ParametrosAux>
        <RegistroPlanillasB></RegistroPlanillasB>
        <RegistroCajaBancos></RegistroCajaBancos>
        <CuentasPorCobrar></CuentasPorCobrar>
        <RegistrarCobranza></RegistrarCobranza>
        <MantenimientoBancos></MantenimientoBancos>
        <TipoCambio></TipoCambio>
        <BuscarDocumento></BuscarDocumento>
        <InconsisComprobantes></InconsisComprobantes>
        <LibroDiario></LibroDiario>
        <BalanceComprobacion></BalanceComprobacion>
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
const RegistroPlanillasB = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistroPlanillasB.vue'));
const RegistroCajaBancos = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistroCajaBancos.vue'));
const CuentasPorCobrar = defineAsyncComponent(() => import('@/modules/Reportes/components/CuentasPorCobrar.vue'));
const RegistrarCobranza = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistrarCobranza.vue'));
const MantenimientoBancos = defineAsyncComponent(() => import('@/modules/Reportes/components/MantenimientoBancos.vue'));
const TipoCambio = defineAsyncComponent(() => import('@/modules/Reportes/components/TipoCambio.vue'));
const BuscarDocumento = defineAsyncComponent(() => import('@/modules/Reportes/components/BuscarDocumento.vue'));
const InconsisComprobantes = defineAsyncComponent(() => import('@/modules/Reportes/components/InconsisComprobantes.vue'));
const LibroDiario = defineAsyncComponent(() => import('@/modules/Reportes/components/LibroDiario.vue'));
const BalanceComprobacion = defineAsyncComponent(() => import('@/modules/Reportes/components/BalanceComprobacion.vue'));

</script>
