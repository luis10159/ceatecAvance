<template>
    <!-- Modal Tipo de Cambio -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="store.tipCambio" width="900px" title="Tipo de Cambio"
        @ok="handleOkPro">
        <!-- Formulario -->
        <a-form :model="form" :rules="roles" layout="vertical">
            <a-row class="margen-arriba" :gutter="16" align="middle">
                <a-col :span="10">
                    <a-table :columns="columns" :data-source="data" bordered size="small" :pagination="{ pageSize: 10 }"
                        :scroll="{ y: 235 }">
                        <template #bodyCell="{ column, text }">
                            <template v-if="column.dataIndex === 'name'">
                                <a>{{ text }}</a>
                            </template>
                        </template>
                    </a-table>
                </a-col>
                <a-col :span="14">
                    <a-row :gutter="16">
                        <a-col :span="10">
                            <a-form-item label="Moneda" name="moneda">
                                <a-select ref="select" v-model:value="form.moneda" :options="optMoneda" @focus="focusMoneda"
                                    @change="handleMoneda" placeholder="Seleccione la moneda"></a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="7">
                            <a-form-item label="Año" name="ano">
                                <a-date-picker v-model:value="form.ano" picker="year" placeholder="Año" class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="7">
                            <a-form-item label="Mes" name="mes">
                                <a-date-picker v-model:value="form.mes" picker="month" placeholder="Mes" class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-typography-text strong>Registro/Modificación</a-typography-text>
                        </a-col>
                        <a-col :span="10">
                            <a-form-item label="Fecha" name="fecha">
                                <a-date-picker class="ancho" v-model:value="form.fecha" placeholder="Fecha" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="7">
                            <a-form-item label="T.C. Venta" name="venta">
                                <a-input v-model:value="form.venta" placeholder="Ingrese Cta. Haber" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="7">
                            <a-form-item label="T.C. Compra" name="compra">
                                <a-input v-model:value="form.compra" placeholder="Ingrese Cta. Haber" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row justify="center" class="margen-abajo">
                <a-col>
                    <a-space wrap>
                        <a-button block :icon="h(GlobalOutlined)">T. Cambio SUNAT</a-button>
                        <a-button block :icon="h(PlusOutlined)">Nuevo</a-button>
                        <a-button block :icon="h(SaveOutlined)">Guardar</a-button>
                    </a-space>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup>
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { ref, reactive, h } from 'vue'
// Importar iconos de ant design vue
import { GlobalOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons-vue';
// Función que se ejecuta al apretar aceptar en Tipo de Cambio
const handleOkPro = (e) => {
    console.log(e);
    store.tipCambio = false;
};
//Definición de las columnas
const columns = [{
    title: 'Fecha',
    dataIndex: 'fecha',
    key: 'fecha',
}, {
    title: 'Compra',
    dataIndex: 'compra',
    key: 'compra',
    width: 85,
}, {
    title: 'Venta',
    dataIndex: 'venta',
    key: 'venta',
    ellipsis: true,
}
];
//Datos
const data = [{
    key: '1',
    fecha: '01/06/2023',
    compra: 32,
    venta: '123232',
    haberSol: '21323',
    anexo: '21323',
    numero: '2132-02028383',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    fecha: '01/06/2023',
    compra: 42,
    venta: '3224324',
    haberSol: '21323',
    anexo: '56',
    numero: '2132-02028383',
    tags: ['loser'],
}, {
    key: '3',
    fecha: '01/06/2023',
    compra: 32,
    venta: '87857',
}, {
    key: '4',
    fecha: '01/06/2023',
    compra: 32,
    venta: '87857',
}, {
    key: '5',
    fecha: '01/06/2023',
    compra: 32,
    venta: '87857',
}, {
    key: '6',
    fecha: '01/06/2023',
    compra: 32,
    venta: '87857',
}];
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    ano: null,
    mes: null,
    venta: null,
    compra: null,
    moneda: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const roles = {
    ano: [{
        required: true,
        message: 'Ingrese el año',
    }],
    venta: [{
        required: true,
        message: 'Ingrese el T.C. venta',
    }],
    compra: [{
        required: true,
        message: 'Selecione el T.C. Compra',
    }],
    fecha: [{
        required: true,
        message: 'Selecione la fecha',
    }],
    mes: [{
        required: true,
        message: 'Selecione el mes',
    }],
    moneda: [{
        required: true,
        message: 'Selecione la moneda',
    }]
}
//---------- Select - moneda
// Objeto con los datos que se mostrarán en el select
const optMoneda = ref([{
    value: '001',
    label: 'Dólares americanos',
}, {
    value: '002',
    label: 'Selección 2',
}, {
    value: '003',
    label: 'Selección 3',
}, {
    value: '004',
    label: 'Selección 4',
}]);
// Función que imprime un valor cuando está en blur
const focusMoneda = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleMoneda = value => {
    console.log(`Seleccionado ${value}`);
};
</script>

<style lang="scss" scoped>
.ancho {
    width: 100%;
}

.margen-arriba {
    margin-top: 30px;
}

.margen-abajo {
    margin-bottom: 30px;
}
</style>