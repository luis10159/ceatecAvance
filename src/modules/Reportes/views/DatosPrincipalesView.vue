<template>
    <div>
        <a-button type="primary" @click="showModal">Abrir</a-button>
        <a-button type="primary" @click="showModalPro">Iniciar proceso</a-button>
        <a-modal ok-text="Iniciar Proceso" cancel-text="Cancelar" v-model:open="open" width="700px"
            title="Datos principales" @ok="handleOk">
            <a-form :model="form" :rules="rules" layout="vertical">
                <a-row :gutter="16">
                    <a-col :span="14" class="color">
                        <a-row :gutter="16">
                            <a-col :span="24">
                                <a-form-item label="Sucursal" name="sucursal">
                                    <a-select placeholder="Seleccione la sucursal" v-model:value="form.sucursal" show-search
                                        :options="optSucur" :filter-option="filterOption" @focus="handleFocus"
                                        @blur="handleBlur" @change="handleChange"></a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="Departamento/Oficina" name="oficina">
                                    <a-select placeholder="Seleccione el Departamento/Oficina" v-model:value="form.oficina"
                                        show-search :options="optDepar" :filter-option="filterOptionDepar"
                                        @focus="handleFocusDepar" @blur="handleBlurDepar"
                                        @change="handleChangeDepar"></a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>

                    </a-col>
                    <a-col :span="10">
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="Año" name="ctaConta">
                                    <a-select v-model:value="form.ano"
                                        :options="anosData.map(pro => ({ value: pro, label: pro }))"></a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Mes" name="ctaConta">
                                    <a-select v-model:value="form.mes"
                                        :options="cities.map(city => ({ value: city, label: city }))"></a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="16">
                                <a-typography-text strong>Mostrar Periodos</a-typography-text>
                            </a-col>
                            <a-col :span="8">
                                <a-switch v-model:checked="checked1" checked-children="Activos"
                                    un-checked-children="Cerrados" />
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="margen-arriba">
                    <a-col :span="24">
                        <a-form-item label="Grupos Contables" name="GrupAux">
                            <a-select class="ancho" placeholder="Seleccione el grupo auxiliar" v-model:value="form.GrupAux"
                                show-search :options="optGrupAux" :filter-option="filterOptionGrupA"
                                @focus="handleFocusGrupA" @blur="handleBlurGrupA" @change="handleChangeGrupA"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>

        <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px"
            title="Compras y obligaciones corrientes" @ok="handleOkPro">
            <a-form :model="form" :rules="rules" layout="vertical">

                <a-row :gutter="16" class="margen-arriba">
                    <a-col :span="24">
                        <a-tabs v-model:activeKey="activeKey" :tab-position="mode" :style="{ height: '720px' }"
                            @tabScroll="callback">
                            <a-tab-pane v-for="i in 10" :key="i" :tab="`Voucher-${i}`">
                                <a-row :gutter="16" justify="center">
                                    <a-col :span="8">
                                        <a-form-item name="fecha">
                                            <a-input placeholder="Seleccione el voucher" />
                                        </a-form-item>
                                    </a-col>

                                </a-row>

                                <a-row :gutter="16">
                                    <a-col :span="8">
                                        <a-form-item label="Periodo contable" name="fecha">
                                            <a-input placeholder="Ingrese el glosario" disabled />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="10">
                                        <a-form-item label="Libro auxiliar" name="glosario">
                                            <a-input placeholder="Ingrese el glosario" disabled />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-form-item label="N° de voucher" name="glosario">
                                            <a-input placeholder="Ingrese el glosario" disabled />
                                        </a-form-item>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="color">
                                    <a-col :span="8">
                                        <a-form-item label="Fecha" name="fecha">
                                            <a-date-picker class="ancho" placeholder="seleccione la fecha" />
                                        </a-form-item>
                                    </a-col>
                                    <a-col :span="16">
                                        <a-form-item label="Glosario" name="glosario">
                                            <a-input placeholder="Ingrese el glosario" />
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
                                    <a-col :span="10"><a-input-search v-model:value="valorBuscar" placeholder="Ingrese el Doc. a buscar"
                                            enter-button="Buscar Doc." size="small" @search="onSearch" /></a-col>
                                </a-row>
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
    <div>
        <datos></datos>
    </div>
</template>

<script setup>



import { ref, reactive, computed, watch, defineAsyncComponent } from 'vue'
const datos = defineAsyncComponent(() => import('@/modules/Reportes/components/datos.vue'));

// datos
const open = ref(false);

const showModal = () => {
    open.value = true;
};

const handleOk = (e) => {
    console.log(e);
    open.value = false;
};

//  inicar proceso
const openPro = ref(false);

const showModalPro = () => {
    openPro.value = true;
};

const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};

//datos modal
const form = reactive({
    sucursal: null,
    oficina: null,
    GrupAux: null,
    ano: null,
    mes: null,
});

const rules = {
    sucursal: [{
        required: true,
        message: 'Ingrese la sucursal',
    }],
    oficina: [{
        required: true,
        message: 'Ingrese el Departamento/Oficina',
    }],
    GrupAux: [{
        required: true,
        message: 'Selecione el grupo auxiliar',
    }],
    ano: [{
        required: true,
        message: 'Selecione el año',
    }],
    mes: [{
        required: true,
        message: 'Selecione el mes',
    }],
}

// select
const anosData = ['2023', '2022'];
const mesesData = {
    '2023': ['enero', 'febrero', 'marzo'],
    '2022': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'],

};

form.ano = anosData[0];
const anoRef = ref(form.ano)
form.mes = mesesData[form.ano][0];
const cities = computed(() => {
    return mesesData[form.ano];
});
watch(anoRef, val => {
    form.mes = mesesData[val][0];
});


//select sucursal
const optSucur = ref([{
    value: '6311',
    label: 'Sucursal a',
}, {
    value: '43111',
    label: 'Sucursal b',
}, {
    value: '6312',
    label: 'Sucursal c',
}, {
    value: '6361',
    label: 'Sucursal d',
}]);

const handleChange = value => {
    console.log(`Seleccionado ${form.sucursal}`);
};
const handleBlur = () => {
    console.log('blur');
};
const handleFocus = () => {
    console.log('focus');
};
const filterOption = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};



//select departamento
const optDepar = ref([{
    value: '6311',
    label: 'Departamento a',
}, {
    value: '43111',
    label: 'Departamento b',
}, {
    value: '6312',
    label: 'Departamento c',
}, {
    value: '6361',
    label: 'Departamento d',
}]);

const handleChangeDepar = value => {
    console.log(`Seleccionado ${form.oficina}`);
};
const handleBlurDepar = () => {
    console.log('blur');
};
const handleFocusDepar = () => {
    console.log('focus');
};
const filterOptionDepar = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};

const checked1 = ref(false)


//select grupos auxiliares
const optGrupAux = ref([{
    value: '00',
    label: 'Asiento de Apertura',
}, {
    value: '01',
    label: 'Cajas y Bancos - Ingresos',
}, {
    value: '02',
    label: 'Almacenes',
}, {
    value: '03',
    label: 'COmpras y obligaciones corrientes',
}]);

const handleChangeGrupA = value => {
    console.log(`Seleccionado ${form.GrupAux}`);
};
const handleBlurGrupA = () => {
    console.log('blur');
};
const handleFocusGrupA = () => {
    console.log('focus');
};
const filterOptionGrupA = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};

// tabs
const mode = ref('left');
const activeKey = ref(1);
const callback = val => {
    console.log(val);
};

// Tabla

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

// buscador
const valorBuscar = ref(null);
const onSearch = (searchValue) => {
  console.log('Usa este valor', searchValue);
  console.log('o usa este valor', valorBuscar.value);
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
</style>