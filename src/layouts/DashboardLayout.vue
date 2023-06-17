<template>
    <article>
        <a-layout class="layout">
            <dashsidebar ref="ref1"></dashsidebar>
            <a-layout>
                <dashheader ref="ref2"></dashheader>
                <a-layout-content style="margin: 0 16px">
                    <!-- Ruta de navegación -->
                    <a-page-header class="demo-page-header" style="border: 1px solid rgb(235, 237, 240)" title="Titulo"
                        sub-title="Subtitulo" @back="() => $router.go(-1)">
                        <template #extra>
                            <a-button key="3">Botón 2</a-button>
                            <a-button key="2">Botón 1</a-button>
                            <a-button key="1" type="primary">botón</a-button>
                        </template>
                        <div :style="{ padding: '24px', minHeight: '360px', borderRadius: '15px' }">
                        <Suspense>
                            <router-view />
                        </Suspense>
                        <a-button type="primary" @click="handleOpen(true)">Empezar Tour</a-button>
                        <a-tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />
                    </div>
                    </a-page-header>
                </a-layout-content>
                <div ref="ref3">
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
import { defineAsyncComponent, ref, createVNode } from "vue";
// Importar componentes
const dashsidebar = defineAsyncComponent(() => import('@/components/DashSideBar.vue'));
const dashheader = defineAsyncComponent(() => import('@/components/DashHeader.vue'));
const dashfooter = defineAsyncComponent(() => import('@/components/DashFooter.vue'));
// Importar iconos de antdesign vue
import { PlusCircleOutlined, EditOutlined, FileAddOutlined, UsergroupAddOutlined, ReconciliationOutlined, DollarOutlined } from '@ant-design/icons-vue';
// Tour - guiar a los usuarios a través de la aplicación
const open = ref(false);
const ref1 = ref(null);
const ref2 = ref(null);
const ref3 = ref(null);
const current = ref(0);
const steps = [{
    title: 'Menú lateral',
    description: 'Opciones mostradas a la izquierda de la pantalla',
    placement: 'right',
    target: () => ref1.value && ref1.value.$el,
}, {
    title: 'Menú superior',
    description: 'Opciones mostradas arriba de la ventana',
    target: () => ref2.value && ref2.value.$el,
}, {
    title: 'Footer',
    description: 'Footer de la aplicación',
    target: () => ref3.value && ref3.value.$el,
}];
const handleOpen = val => {
    open.value = val;
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
  