<template>
    <!-- Botón para abrir el modal -->
    <a-button type="primary" @click="showModalPro">Iniciar proceso</a-button>
    <!-- Modal compras y obligaciones corrientes -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px"
        title="Compras y obligaciones corrientes" @ok="handleOkPro">
        <!-- Formulario -->
        <a-form :model="formCompObli" :rules="rulesCompObli" layout="vertical">
            <a-row :gutter="16" class="margen-arriba">
                <a-col :span="24">
                    <a-tabs v-model:activeKey="activeKey" :tab-position="mode" :style="{ height: '720px' }"
                        @tabScroll="callback">
                        <a-tab-pane v-for="i in 10" :key="i" :tab="`Voucher-${i}`">
                            <a-row :gutter="16" justify="center">
                                <a-col :span="8">
                                    <a-form-item name="voucher">
                                        <a-input v-model:value="formCompObli.voucher" placeholder="Seleccione el voucher" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16">
                                <a-col :span="8">
                                    <a-form-item label="Periodo contable" name="PeriaCOnt">
                                        <a-input v-model:value="formCompObli.PeriaCOnt"
                                            placeholder="Ingrese el periodo contable" disabled />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="10">
                                    <a-form-item label="Libro auxiliar" name="LibroAux">
                                        <a-input v-model:value="formCompObli.LibroAux"
                                            placeholder="Ingrese el libro auxiliar" disabled />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="N° de voucher" name="NuVoucher">
                                        <a-input v-model:value="formCompObli.NuVoucher"
                                            placeholder="Ingrese el N° de voucher" disabled />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row :gutter="16" class="color">
                                <a-col :span="8">
                                    <a-form-item label="Fecha" name="fecha">
                                        <a-date-picker v-model:value="formCompObli.fecha" class="ancho"
                                            placeholder="seleccione la fecha" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="16">
                                    <a-form-item label="Glosario" name="glosario">
                                        <a-input v-model:value="formCompObli.glosario" placeholder="Ingrese el glosario" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row class="margen-arriba">
                                <a-col :span="25">
                                    <a-table :columns="columns" :data-source="data" bordered size="small"
                                        :pagination="{ pageSize: 10 }" :scroll="{ y: 235 }">
                                        <template #bodyCell="{ column, text }">
                                            <template v-if="column.dataIndex === 'name'">
                                                <a>{{ text }}</a>
                                            </template>
                                        </template>
                                    </a-table>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="14">
                                    <a-space direction="vertical">
                                        <a-typography-text strong>Cuenta : ...........</a-typography-text>
                                        <a-typography-text strong>C. Costo : ...........</a-typography-text>
                                        <a-typography-text strong>Proveedor : ...........</a-typography-text>
                                    </a-space>
                                </a-col>
                                <a-col :span="5">
                                    <a-space direction="vertical">
                                        <a-typography-text strong>Total Debe</a-typography-text>
                                        <a-typography-text>s/ 121337.00</a-typography-text>
                                        <a-typography-text>$ 0.00</a-typography-text>
                                    </a-space>
                                </a-col>
                                <a-col :span="5">
                                    <a-space direction="vertical">
                                        <a-typography-text strong>Total Haber</a-typography-text>
                                        <a-typography-text>s/ 121337.00</a-typography-text>
                                        <a-typography-text>$ 0.00</a-typography-text>
                                    </a-space>
                                </a-col>
                            </a-row>
                            <a-row justify="center" class="margen-arriba">
                                <a-col :span="10"><a-input-search v-model:value="valorBuscar"
                                        placeholder="Ingrese el Doc. a buscar" enter-button="Buscar Doc." size="small"
                                        @search="onSearch" /></a-col>
                            </a-row>
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup>
// Importar funciones de vue
import { ref, reactive } from 'vue'
// Variable que controla la visibilidad del modal Compras y obligaciones corrientes
const openPro = ref(false);
// Función que muestra Compras y obligaciones corrientes
const showModalPro = () => {
    openPro.value = true;
};
// Función que se ejecuta al apretar aceptar en buscar documento
const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};
// Variable que controla en que modo va a estar el tab
const mode = ref('left');
// Llave de activación
const activeKey = ref(1);

const callback = val => {
    console.log(val);
};
//Definición de las columnas
const columns = [{
    title: 'Cuenta',
    dataIndex: 'cuenta',
    key: 'cuenta',
}, {
    title: 'C. costo',
    dataIndex: 'cCosto',
    key: 'cCosto',
    width: 85,
}, {
    title: 'Debe Soles',
    dataIndex: 'debeSol',
    key: 'debeSol',
    ellipsis: true,
}, {
    title: 'Haber Soles',
    dataIndex: 'haberSol',
    key: 'haberSol',
    ellipsis: true,
}, {
    title: 'Anexo',
    dataIndex: 'anexo',
    key: 'anexo',
    ellipsis: true,
}, {
    title: 'Número',
    dataIndex: 'numero',
    key: 'numero',
    ellipsis: true,
},
];
//Datos de la tabla
const data = [{
    key: '1',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '123232',
    haberSol: '21323',
    anexo: '21323',
    numero: '2132-02028383',
    tags: ['nice', 'developer'],
}, {
    key: '2',
    cuenta: '7676',
    cCosto: 42,
    debeSol: '3224324',
    haberSol: '21323',
    anexo: '56',
    numero: '2132-02028383',
    tags: ['loser'],
}, {
    key: '3',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '87857',
    haberSol: '454353',
    anexo: '565',
    numero: '2132-02028383',
    tags: ['cool', 'teacher'],
}, {
    key: '4',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '87857',
    haberSol: '454353',
    anexo: '565',
    numero: '2132-02028383',
    tags: ['cool', 'teacher'],
}, {
    key: '5',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '87857',
    haberSol: '454353',
    anexo: '565',
    numero: '2132-02028383',
    tags: ['cool', 'teacher'],
}, {
    key: '6',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '87857',
    haberSol: '454353',
    anexo: '565',
    numero: '2132-02028383',
    tags: ['cool', 'teacher'],
}];

// buscador de documentos
const valorBuscar = ref(null);
// Función que imprime la entrada del buscador
const onSearch = (searchValue) => {
    console.log('Usa este valor', searchValue);
    console.log('o usa este valor', valorBuscar.value);
};
// Objeto reactivo que va a capturar los campos en el formulario
const formCompObli = reactive({
    voucher: null,
    PeriaCOnt: null,
    LibroAux: null,
    NuVoucher: null,
    fecha: null,
    glosario: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rulesCompObli = {
    voucher: [{
        required: true,
        message: 'Ingrese el voucher',
    }],
    PeriaCOnt: [{
        required: true,
        message: 'Ingrese el periodo contable',
    }],
    LibroAux: [{
        required: true,
        message: 'Selecione el N° de voucher',
    }],
    NuVoucher: [{
        required: true,
        message: 'Selecione el año',
    }],
    fecha: [{
        required: true,
        message: 'Selecione el mes',
    }],
    glosario: [{
        required: true,
        message: 'Selecione el glosario',
    }],
}
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