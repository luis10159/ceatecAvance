<template>
    <article>
        <a-layout class="layout">
            <dashsidebar></dashsidebar>
            <a-layout>
                <dashheader></dashheader>
                <a-layout-content style="margin: 0 16px">
                    <!-- Cabecera  -->
                    <a-page-header class="demo-page-header" style="border: 1px solid rgb(235, 237, 240)" title="Tabla"
                        sub-title="Plan Contable" @back="() => $router.go(-1)">
                        <div :style="{ padding: '24px', minHeight: '360px', borderRadius: '15px' }">
                            <Suspense>
                                <router-view />
                            </Suspense>
                        </div>
                    </a-page-header>
                </a-layout-content>
                <div>
                    <dashfooter></dashfooter>
                </div>
            </a-layout>
        </a-layout>
    </article>
    <!-- Menú flotante -->
    <a-float-button-group trigger="hover" type="primary" :style="{ right: '50px' }">
        <template #icon>
            <PlusCircleOutlined />
        </template>
        <a-tooltip placement="left" title="Opción 5" :get-popup-container="getPopupContainer" color="blue">
            <a-float-button>
                <template #icon>
                    <router-link :to="{ name: 'plan-contable' }">
                        <DollarOutlined />
                    </router-link>
                </template>
            </a-float-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Plan Contable" :get-popup-container="getPopupContainer" color="blue">
            <a-float-button>
                <template #icon>
                    <router-link :to="{ name: 'plan-contable' }">
                        <ReconciliationOutlined />
                    </router-link>
                </template>
            </a-float-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Opción 3" :get-popup-container="getPopupContainer" color="blue">
            <a-float-button>
                <template #icon>
                    <UsergroupAddOutlined />
                </template>
            </a-float-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Ingreso de movimientos" :get-popup-container="getPopupContainer" color="blue">
            <a-float-button>
                <template #icon>
                    <FileAddOutlined @click="store.cambiarIngresoMov()" />
                </template>
            </a-float-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Opción 1" :get-popup-container="getPopupContainer" color="blue">
            <a-float-button>
                <template #icon>
                    <router-link :to="{ name: 'plan-contable' }">
                        <EditOutlined />
                    </router-link>
                </template>
            </a-float-button>
        </a-tooltip>
        <a-tooltip placement="left" title="Subir" :get-popup-container="getPopupContainer" color="blue">
            <a-back-top />
        </a-tooltip>
    </a-float-button-group>
    <!-- Componente para abrir -->
    <DatosPrincipales></DatosPrincipales>
</template>

<script setup>
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { defineAsyncComponent } from "vue";
// Importar componentes
const dashsidebar = defineAsyncComponent(() => import('@/components/DashSideBar.vue'));
const dashheader = defineAsyncComponent(() => import('@/components/DashHeader.vue'));
const dashfooter = defineAsyncComponent(() => import('@/components/DashFooter.vue'));
//Componentes modales
const DatosPrincipales = defineAsyncComponent(() => import('@/modules/Reportes/components/DatosPrincipales.vue'));

// Importar iconos de antdesign vue
import { PlusCircleOutlined, EditOutlined, FileAddOutlined, UsergroupAddOutlined, ReconciliationOutlined, DollarOutlined } from '@ant-design/icons-vue';
//Tooltip ingreso de movimientos
const getPopupContainer = trigger => {
    return trigger.parentElement;
};
</script>

<style lang="scss" scoped>
.layout {
    min-height: 100vh;
}

.demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
}
</style>
  