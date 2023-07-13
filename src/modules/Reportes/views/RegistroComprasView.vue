<template>
  <a-row justify="center">
    <!-- Titulo -->
    <a-col>
      <a-typography-title :level="3">Registro de compras</a-typography-title>
    </a-col>
  </a-row>
  <!-- Vista registro de compras -->
  <a-row justify="center">
    <a-col :span="6">
      <a-typography-title class="margen-texto" :level="5">Parámetros</a-typography-title>
      <a-tree-select v-model:value="value" style="width: 100%" :tree-data="treeData" tree-checkable allow-clear
        :show-checked-strategy="SHOW_PARENT" placeholder="Seleccione las sucursales y departamentos/oficinas" />
    </a-col>
  </a-row>
  <a-row justify="center" class="espacio-arriba">
    <a-col :span="6">
      <p class="margen-texto">Seleccione el rango de fechas</p>
      <a-space direction="vertical" :size="12">
        <a-range-picker v-model:value="value1" :placeholder="['Fecha de inicio', 'Fecha Final']" />
      </a-space>
    </a-col>
  </a-row>
  <a-row justify="center" class="espacio-arriba">
    <a-col :span="6">
      <p class="margen-texto">Ordando por</p>
      <a-radio-group v-model:value="valueradio">
        <a-radio :style="radioStyle" :value="1">Fecha - Documento</a-radio>
        <a-radio :style="radioStyle" :value="2">Docuemtno - Fecha</a-radio>
      </a-radio-group>
    </a-col>
  </a-row>
  <a-row justify="center" class="espacio-arriba">
    <a-col :span="6">
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary">Aceptar</a-button>
        <a-button style="margin-left: 10px">Cancelar</a-button>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row justify="center">
    <a-col :span="6">
      <a-radio-group v-model:value="valueradio2">
        <a-radio :style="radioStyle" :value="1">PLE Compras</a-radio>
      </a-radio-group>
    </a-col>
  </a-row>
</template>

<script setup>
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { ref, watch, reactive } from 'vue'
// Importar componentes de ant desing vue
import { TreeSelect } from 'ant-design-vue';
// Importar componentes
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
// Datos comtenidos en el arbol
const treeData = [{
  title: 'Todas las sucursales',
  value: '0-0',
  children: [{
    title: 'Sucursal A',
    value: '0-0-0',
  },
  {
    title: 'Sucursal B',
    value: '0-0-1',
  },
  {
    title: 'sucursal C',
    value: '0-0-2',
  }
  ],
}, {
  title: 'Todos los Departamentos/Oficinas',
  value: '0-1',
  children: [{
    title: 'Departamento A',
    value: '0-1-0',
    // disabled: true,
  }, {
    title: 'Departamento B',
    value: '0-1-1',
  }, {
    title: 'Departamento C',
    value: '0-1-2',
  }],
}];
// variable que guarda el valor de los parámetros elegidos - Sucursale y Departamentos/Oficinas
const value = ref([]);
watch(value, () => {
  console.log(value.value);
});
// Variable que guarda el rango de fechas
const value1 = ref();
// Varable que guarda la selección radio - Odenado Por
const valueradio = ref();
// Estilo de la radio
const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});
// Variable que guarda la selección radio de PLE Compras
const valueradio2 = ref();

// ---------------Modal
// Variable que controla la visibilidad del modal Actualización de movimientos
const open = ref(false);
// Función que muestra actualización de movimientos
const showModal = () => {
  open.value = true;
};
</script>

<style lang="scss" scoped>
.espacio-arriba {
  margin-top: 30px;
}

.margen-texto {
  margin-bottom: 15px;
}

</style>