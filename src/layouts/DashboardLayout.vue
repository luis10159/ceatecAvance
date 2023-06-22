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
        <a-float-button>
            <template #icon>
                <DollarOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <ReconciliationOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <UsergroupAddOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <FileAddOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <EditOutlined />
            </template>
        </a-float-button>
        <a-back-top />
    </a-float-button-group>
</template>

<script setup>
// Importar funciones de vue
import { defineAsyncComponent } from "vue";
// Importar componentes
const dashsidebar = defineAsyncComponent(() => import('@/components/DashSideBar.vue'));
const dashheader = defineAsyncComponent(() => import('@/components/DashHeader.vue'));
const dashfooter = defineAsyncComponent(() => import('@/components/DashFooter.vue'));
// Importar iconos de antdesign vue
import { PlusCircleOutlined, EditOutlined, FileAddOutlined, UsergroupAddOutlined, ReconciliationOutlined, DollarOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
.layout {
    min-height: 100vh;
}

.demo-page-header :deep(tr:last-child td) {
    padding-bottom: 0;
}
</style>
  