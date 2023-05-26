<template>
    <a-button type="primary" @click="showModalPro">Parametros Aux</a-button>

    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px" title="Parámetros Auxiliares"
        @ok="handleOkPro">
        <a-form :model="formCompObli" :rules="rulesCompObli" layout="vertical">

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

                            <a-typography-text strong >Parámetros Auxiliares</a-typography-text>
                            <a-row :gutter="16" class="color">
                                <a-col :span="8">
                                    <a-form-item label="Descripción" name="glosario">
                                        <a-input v-model:value="formCompObli.glosario" placeholder="Ingrese la descripción" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="16">
                                    <a-form-item label="Cta. Debe" name="glosario">
                                        <a-input v-model:value="formCompObli.glosario" placeholder="Ingrese Cta. Debe" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-typography-title :level="3" style="color: red;">Falta terminar</a-typography-title>
                            <a-row class="margen-arriba">
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
                            </a-row>


                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PrinterOutlined, PlusOutlined, MinusOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

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
const formCompObli = reactive({
    voucher: null,
    PeriaCOnt: null,
    LibroAux: null,
    NuVoucher: null,
    fecha: null,
    glosario: null,

});

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
.margen-abajo {
    margin-bottom: 30px;
}
</style>