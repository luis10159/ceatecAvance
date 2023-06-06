<template>
    <a-button type="primary" @click="showModalPro">Libro diario</a-button>

    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px" title="Libro Diario"
        @ok="handleOkPro">
        <a-form :model="form" :rules="roles" layout="vertical">
            <a-row class="margen-arriba" :gutter="16" align="middle">
                <a-col :span="10">
                    <a-row>
                        <a-tree-select v-model:value="form.valorSucursal" show-search class="ancho"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Seleccione la sucursal"
                            allow-clear tree-default-expand-all :tree-data="sucursales">

                        </a-tree-select>
                    </a-row>
                    <a-row>
                        <a-tree-select v-model:value="form.valorDeparta" show-search class="ancho margen-arriba"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Seleccione la sucursal"
                            allow-clear tree-default-expand-all :tree-data="departamentos">

                        </a-tree-select>
                    </a-row>
                    <a-row>
                        <a-tree-select v-model:value="form.valorGrupos" show-search class="ancho margen-arriba"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Seleccione la sucursal"
                            allow-clear tree-default-expand-all :tree-data="grupos">

                        </a-tree-select>
                    </a-row>
                    <a-row class="margen-arriba" :gutter="16">
                        <a-col span="24" class="color">
                            <a-checkbox v-model:checked="form.checkCuentas">Todas las cuentas</a-checkbox>

                            <a-select class="ancho" placeholder="Cuenta" v-model:value="form.cuentas" show-search
                                :options="optCuentas" :filter-option="filterOptionCuentas" @focus="handleFocusCuentas"
                                @blur="handleBlurCuentas" @change="handleChangeCuentas"></a-select>

                            <a-select class="ancho margen-arriba margen-abajo" placeholder="Cuenta"
                                v-model:value="form.cuentasB" show-search :options="optCuentasB"
                                :filter-option="filterOptionCuentasB" @focus="handleFocusCuentasB"
                                @blur="handleBlurCuentasB" @change="handleChangeCuentasB"></a-select>

                        </a-col>
                    </a-row>

                </a-col>
                <a-col :span="14">
                    <a-row :gutter="16" justify="center">
                        <a-col :span="6">
                            <a-form-item label="Desde el mes" name="mes">
                                <a-date-picker v-model:value="form.mes" picker="month" placeholder="Mes" class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Hasta el mes" name="mes">
                                <a-date-picker v-model:value="form.mesb" picker="month" placeholder="Mes" class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Año contable" name="mes">
                                <a-date-picker v-model:value="form.ano" picker="year" placeholder="Ingrese año contable"
                                    class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Digitos" name="digitos">
                                <a-input-number class="ancho" v-model:value="form.digitos" :min="1" :max="10"
                                    :disabled="true" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-typography-text strong>Datos generales</a-typography-text>
                            <a-row :gutter="16">
                                <a-col :span="24" class="color">
                                    <a-checkbox v-model:checked="form.checkVouchers">Todos los vouchers</a-checkbox>

                                    <a-form-item label="Folio" name="folio">
                                        <a-select ref="select" v-model:value="form.folio" :options="optFolio"
                                            @focus="focusFolio" @change="handleFolio"
                                            placeholder="Seleccione el folio"></a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>

                        </a-col>
                        <a-col :span="18" class="margen-arriba">
                            <a-row justify="space-between" class="margen abajo">
                                <a-col :span="12">
                                    <a-checkbox v-model:checked="form.checkCuentConso">Cuentas consolidadas</a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox v-model:checked="form.checkPleDiar">PLE Diario</a-checkbox>
                                </a-col>
                            </a-row>

                        </a-col>
                    </a-row>

                </a-col>
            </a-row>

        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, reactive, h, watch } from 'vue'
import { GlobalOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons-vue';

// Buscador

const buscador = ref(null)

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
    mes: null,
    mesb: null,
    ano: null,
    digitos: 2,
    folio: null,
    valorSucursal: 'todas',
    valorDeparta: 'todas',
    valorGrupos: 'todas',
    checkVouchers: false,
    cuentas: null,
    checkCuentConso: false,
    checkPleDiar: false,
    checkCuentas: false,

});

const roles = {
    ano: [{
        required: true,
        message: 'Ingrese el año',
    }],
    digitos: [{
        message: 'Ingrese los digitos',
    }],
    compra: [{
        required: true,
        message: 'Selecione el T.C. Compra',
    }],
    fecha: [{
        required: true,
        message: 'Selecione la fecha',
    }],
    folio: [{
        required: true,
        message: 'Selecione la folio',
    }]
}



// Select folio

const optFolio = ref([{
    value: '001',
    label: 'Folio 1',
}, {
    value: '002',
    label: 'Folio 2',
}, {
    value: '003',
    label: 'Folio 3',
}, {
    value: '004',
    label: 'Folio 4',
}]);

const focusFolio = () => {
    console.log('focus');
};
const handleFolio = value => {
    console.log(`Seleccionado ${value}`);
};



const sucursales = ref([{
    title: 'Todas las sucursales',
    value: 'todas',
    children: [{
        title: 'Lino SAC',
        value: 'sucursal-a',
    }, {
        title: 'Sucursal b',
        value: 'sucursal-b',
    }],
}]);
watch(() => form.valorSucursal, (newValue) => {
    console.log(newValue);
});


const departamentos = ref([{
    title: 'Todos las Dptos/Ofic.',
    value: 'todas',
    children: [{
        title: 'Lino SAC',
        value: 'departamento-a',
    }, {
        title: 'Departamento b',
        value: 'departamento-b',
    }],
}]);
watch(() => form.valorDeparta, (newValue) => {
    console.log(newValue);
});


const grupos = ref([{
    title: 'Todos los Grupos',
    value: 'todas',
    children: [{
        title: 'Asiento de apertura',
        value: 'grupo-a',
    }, {
        title: 'Cajas y bancos - Ingresos',
        value: 'grupo-b',
    }, {
        title: 'Almacenes',
        value: 'grupo-c',
    }, {
        title: 'Grupo d',
        value: 'grupo-d',
    }, {
        title: 'Grupo e',
        value: 'grupo-e',
    }, {
        title: 'Grupo f',
        value: 'grupo-f',
    }, {
        title: 'Grupo g',
        value: 'grupo-g',
    }],
}]);

watch(() => form.valorGrupos, (newValue) => {
    console.log(newValue);
});

//select cuentas
const optCuentas = ref([{
    value: '00',
    label: 'Cuenta 1',
}, {
    value: '01',
    label: "Cuenta 2",
}, {
    value: '02',
    label: 'Cuenta 3',
}, {
    value: '03',
    label: 'Cuenta 4',
}, {
    value: '04',
    label: 'Cuenta 5',
}]);

const handleChangeCuentas = value => {
    console.log(`Seleccionado ${form.cuentasB}`);
};
const handleBlurCuentas = () => {
    console.log('blur');
};
const handleFocusCuentas = () => {
    console.log('focus');
};
const filterOptionCuentas = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};


//select cuentas b
const optCuentasB = ref([{
    value: '00',
    label: 'Cuentab 1',
}, {
    value: '01',
    label: "Cuentab 2",
}, {
    value: '02',
    label: 'Cuentab 3',
}, {
    value: '03',
    label: 'Cuentab 4',
}, {
    value: '04',
    label: 'Cuentab 5',
}]);

const handleChangeCuentasB = value => {
    console.log(`Seleccionado ${form.cuentasB}`);
};
const handleBlurCuentasB = () => {
    console.log('blur');
};
const handleFocusCuentasB = () => {
    console.log('focus');
};
const filterOptionCuentasB = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};


</script>

<style lang="scss" scoped>
.ancho {
    width: 100%;
}

.margen-arriba {
    margin-top: 25px;
}

.margen-abajo {
    margin-bottom: 20px;
}

.color {
    border: 2px solid rgba(0, 89, 255, 0.080);
    background-color: rgba(5, 170, 247, 0.024);
    border-radius: 10px
}
</style>