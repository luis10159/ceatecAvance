<template>
    <!-- Modal nuevo RUC -->
    <a-modal ok-text="Iniciar Proceso" cancel-text="Cancelar" v-model:open="store.ingresoMov" width="700px" title="Datos principales"
        @ok="handleOk">
        <!-- Formulario -->
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
                            show-search :options="optGrupAux" :filter-option="filterOptionGrupA" @focus="handleFocusGrupA"
                            @blur="handleBlurGrupA" @change="handleChangeGrupA"></a-select>
                    </a-form-item>
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
import { ref, reactive, computed, watch } from 'vue'
// Función que se ejecuta al apretar aceptar en nuevo RUC
const handleOk = (e) => {
    console.log(e);
    store.ingresoMov = false;
};
//------ select - sucursal
// Objeto con los datos que se mostrarán en el select
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
// Función que imprime valor cada que es cambiado
const handleChange = value => {
    console.log(`Seleccionado ${form.sucursal}`);
};
// Función que imprime un valor cuando está en blur
const handleBlur = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocus = () => {
    console.log('focus');
};
// Búsqueda
const filterOption = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
//------------select - departamento
// Objeto con los datos que se mostrarán en el select
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
// Función que imprime valor cada que es cambiado
const handleChangeDepar = value => {
    console.log(`Seleccionado ${form.oficina}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurDepar = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusDepar = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionDepar = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
// Variable que guarda el valor del switch
const checked1 = ref(false)
//-----------select - grupos auxiliares
// Objeto con los datos que se mostrarán en el select
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
// Función que imprime valor cada que es cambiado
const handleChangeGrupA = value => {
    console.log(`Seleccionado ${form.GrupAux}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurGrupA = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusGrupA = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionGrupA = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    sucursal: null,
    oficina: null,
    GrupAux: null,
    ano: null,
    mes: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
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
// select - año mes
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