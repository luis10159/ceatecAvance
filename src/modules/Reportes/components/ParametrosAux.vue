<template>
    <a-button type="primary" @click="showModalPro">Parametros Aux</a-button>

    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px" title="Parámetros Auxiliares"
        @ok="handleOkPro">
        <a-form :model="form" :rules="roles" layout="vertical">

            <a-row :gutter="16" class="margen-arriba">
                <a-col :span="24">
                    <a-tabs v-model:activeKey="activeKey" :tab-position="mode" :style="{ height: '620px' }"
                        @tabScroll="callback">
                        <a-tab-pane v-for="i in 10" :key="i" :tab="`${i} - Opción`">
                            <a-row justify="center" class="margen-abajo">
                                <a-col>
                                    <a-space wrap>

                                        <a-button block :icon="h(PlusOutlined)">Nuevo</a-button>
                                        <a-button type="dashed" block :icon="h(ArrowLeftOutlined)">Deshacer</a-button>
                                        <a-button danger block :icon="h(MinusOutlined)">Eliminar</a-button>
                                        <a-button block :icon="h(PrinterOutlined)">Imprimir</a-button>
                                    </a-space>
                                </a-col>
                            </a-row>

                            <a-typography-text strong>Parámetros Auxiliares</a-typography-text>
                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-form-item label="Descripción" name="glosario">
                                        <a-input v-model:value="form.glosario" placeholder="Ingrese la descripción" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="Cta. Debe" name="debe">
                                        <a-input v-model:value="form.debe" placeholder="Ingrese Cta. Debe" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="Cta. Haber" name="haber">
                                        <a-input v-model:value="form.haber" placeholder="Ingrese Cta. Haber" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="Valor" name="valor">
                                        <a-input-number v-model:value="form.valor" :min="0" :max="100"
                                            :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="ancho"/>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="Tipo" name="tipo">
                                        <a-select ref="select" v-model:value="form.tipo" :options="optClientProv"
                                            @focus="focusTipo" @change="handleChangeTipo"
                                            placeholder="Ingrese tipo"></a-select>
                                    </a-form-item>
                                </a-col>

                                <a-col :span="6">
                                    <a-form-item label="Situación" name="descripcion">
                                        <a-checkbox v-model:checked="form.checkCtaCont">Activo</a-checkbox>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-item label="Orden" name="debe">
                                        <a-input-number v-model:value="form.debe" class="ancho"
                                            placeholder="Ingrese el orden" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row class="margen-arriba" :gutter="16" align="middle">
                                <a-col :span="18">
                                    <a-typography-text strong>Historico</a-typography-text>
                                    <a-table :columns="columns" :data-source="data" bordered size="small"
                                        :pagination="{ pageSize: 10 }" :scroll="{ y: 235 }">
                                        <template #bodyCell="{ column, text }">
                                            <template v-if="column.dataIndex === 'name'">
                                                <a>{{ text }}</a>
                                            </template>
                                        </template>
                                    </a-table>
                                </a-col>
                                <a-col :span="6">
                                    <a-button block :icon="h(PlusOutlined)">Agregar</a-button>
                                    <a-button type="dashed" block :icon="h(EditOutlined)">Modifica</a-button>
                                    <a-button danger block :icon="h(MinusOutlined)">Eliminar</a-button>

                                </a-col>
                            </a-row>


                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, reactive, h } from 'vue'
import { PrinterOutlined, PlusOutlined, MinusOutlined, ArrowLeftOutlined, EditOutlined } from '@ant-design/icons-vue';

//  inicar proceso
const openPro = ref(false);

const showModalPro = () => {
    openPro.value = true;
};

const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};


// tabs
const mode = ref('left');
const activeKey = ref(1);
const callback = val => {
    console.log(val);
};

// Tabla

const columns = [{
    title: 'Amones',
    dataIndex: 'cuenta',
    key: 'cuenta',
}, {
    title: 'Monto',
    dataIndex: 'cCosto',
    key: 'cCosto',
    width: 85,
}, {
    title: 'Estado',
    dataIndex: 'debeSol',
    key: 'debeSol',
    ellipsis: true,
}
];
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

}, {
    key: '4',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '87857',

}, {
    key: '5',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '87857',

}, {
    key: '6',
    cuenta: '7673',
    cCosto: 32,
    debeSol: '87857',

}];

//datos modal
const form = reactive({
    descripcion: null,
    debe: null,
    haber: null,
    valor: null,
    tipo: null,
    checkSituac: null,

});

const roles = {
    descripcion: [{
        required: true,
        message: 'Ingrese la descripción',
    }],
    debe: [{
        required: true,
        message: 'Ingrese el debe',
    }],
    haber: [{
        required: true,
        message: 'Selecione el haber',
    }],
    valor: [{
        required: true,
        message: 'Selecione el valor',
    }],
    fecha: [{
        required: true,
        message: 'Selecione la fecha',
    }],
    tipo: [{
        required: true,
        message: 'Selecione el tipo',
    }],
    tipo: [{
        required: true,
        message: 'Selecione el tipo',
    }],
    tipo: [{
        required: true,
        message: 'Selecione el tipo',
    }],
}

// Select tipo

const optClientProv = ref([{
    value: '001',
    label: 'Cliente/Proveedor',
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

const focusTipo = () => {
    console.log('focus');
};
const handleChangeTipo = value => {
    console.log(`Seleccionado ${value}`);
};



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

.margen-abajo {
    margin-bottom: 30px;
}
</style>