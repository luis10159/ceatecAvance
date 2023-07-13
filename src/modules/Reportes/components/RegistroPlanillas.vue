<template>
    <!-- Modal registro de movimientos: Planillas -->
    <a-modal ok-text="Actualizar" cancel-text="Cancelar" v-model:open="store.regPlani" width="700px"
        :title="titulo" @ok="handleOk">
        <!-- Formulario -->
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16" justify="center" class="margen-abajo">
                <a-col :span="12">
                    <a-checkbox v-model:checked="form.checkCtaCont"></a-checkbox>
                    <a-form-item label="Cta. Contable" name="ctaCont">
                        <a-select placeholder="Seleccione la cuenta contable" v-model:value="form.ctaCont" show-search
                            :options="ctaCont" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                            @change="handleChange"></a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16" align="bottom" class="color">
                <a-col :span="9">
                    <a-checkbox v-model:checked="form.checProvee"></a-checkbox>
                    <a-form-item label="Proveedor" name="proveedor">
                        <a-select placeholder="Seleccione el proveedor" v-model:value="form.proveedor" show-search
                            :options="proveedor" :filter-option="filterOptionPro" @focus="handleFocusPro"
                            @blur="handleBlurPro" @change="handleChangePro"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Tipo de doc." name="tipDoc">
                        <a-select placeholder="Seleccione el tipo de doc." v-model:value="form.tipDoc" show-search
                            :options="tipDoc" :filter-option="filterOptionTipDoc" @focus="handleFocusTipDoc"
                            @blur="handleBlurTipDoc" @change="handleChangeTipDoc"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="Nro Doc" name="NumDoc">
                        <a-input v-model:value="form.NumDoc" placeholder="Ingrese el número de doc." />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Documento N°" name="tipDoc">
                        <a-select v-model:value="form.tipDoc" show-search :options="tipDoc"
                            :filter-option="filterOptionTipDoc" @focus="handleFocusTipDoc" @blur="handleBlurTipDoc"
                            @change="handleChangeTipDoc" disabled="true"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item>
                        <a-input disabled="" />
                    </a-form-item>
                </a-col>
                <a-col :span="15">
                    <a-form-item label="Detalle" name="detalle">
                        <a-input v-model:value="form.detalle" placeholder="Ingrese el detalle" />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-checkbox v-model:checked="form.checFecVen"><a-typography-text strong>Sin fecha
                            Vencto</a-typography-text></a-checkbox>
                    <a-form-item label="Fecha Emisión / Vencto" name="fecha">
                        <a-range-picker v-model:value="form['fecha']" :placeholder="['Fecha emisión', 'Fecha vencto']" />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="Cta. Banco" name="ctaBanco">
                        <a-input v-model:value="form.ctaBanco" placeholder="Ingrese  la cta. banco" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="C. Costo" name="CCosto">
                        <a-input v-model:value="form.CCosto" placeholder="Ingrese la C.Costo" />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="Flujo Efec." name="FlujEfec">
                        <a-input v-model:value="form.FlujEfec" placeholder="Ingrese flujo Efec." />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="Tipo de cambio" name="TipCamb">
                        <a-input-number v-model:value="form.TipCamb" placeholder="Ingrese el tipo de cambio">
                            <template #addonBefore>
                                <a-select v-model:value="form.moneda" style="width: 60px">
                                    <a-select-option value="USD">$</a-select-option>
                                    <a-select-option value="EUR">€</a-select-option>
                                    <a-select-option value="GBP">£</a-select-option>
                                    <a-select-option value="CNY">¥</a-select-option>
                                    <a-select-option value="PER">S/</a-select-option>
                                </a-select>
                            </template>
                        </a-input-number>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Debe" name="debe">
                        <a-input v-model:value="form.debe" placeholder="Ingrese el debe" />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="Haber" name="haber">
                        <a-input v-model:value="form.haber" placeholder="Ingrese el haber" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row justify="center" class="ancho">
                    <a-col>
                        <a-button block :icon="h(TeamOutlined)" @click="store.cambiarRegPlani2()">Registro Planillas</a-button>
                    </a-col>
                </a-row>
        </a-form>
    </a-modal>
    <RegistroPlanillasB></RegistroPlanillasB>
</template>

<script setup>
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { ref, reactive, computed, h, defineAsyncComponent } from 'vue'
// Importar iconos de ant design vue
import { TeamOutlined } from '@ant-design/icons-vue';
// importar componenetes
const RegistroPlanillasB = defineAsyncComponent(() => import('@/modules/Reportes/components/RegistroPlanillasB.vue'));

// Función que se ejecuta al apretar aceptar en libro diario
const handleOk = (e) => {
    console.log(e);
    store.regPlani = false;
};
const titulo = computed(() => {
  return "Actualización de Movimientos - " + store.formCompObliga.titulo;
});
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    ctaCont: null,
    proveedor: null,
    checProvee: false,
    checkCtaCont: false,
    tipDoc: null,
    NumDoc: null,
    detalle: null,
    fecha: null,
    checFecVen: false,
    ctaBanco: null,
    CCosto: null,
    FlujEfec: null,
    TipCamb: null,
    moneda: "PER",
    debe: null,
    haber: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rules = {
    ctaCont: [{
        required: true,
        message: 'Ingrese la ctaCont',
    }],
    proveedor: [{
        required: true,
        message: 'Ingrese el proveedor',
    }],
    tipDoc: [{
        required: true,
        message: 'Escriba el tipo de doc',
    }],
    NumDoc: [{
        required: true,
        message: 'Escriba el número de doc.',
    }],
    detalle: [{
        required: true,
        message: 'Escriba el detalle',
    }],
    fecha: [{
        required: true,
        message: 'Ingrese el rango de fechas',
    }],
    ctaBanco: [{
        required: true,
        message: 'Escriba ela cta. Banco',
    }],
    CCosto: [{
        required: true,
        message: 'Escriba la C. Costo',
        type: 'email',
    }],
    FlujEfec: [{
        required: true,
        message: 'Escriba la C. Costo',
        type: 'email',
    }],
    TipCamb: [{
        required: true,
        message: 'Escriba el tipo de cambio',
    }],
    debe: [{
        required: true,
        message: 'Escriba la C. Costo',
        type: 'email',
    }],
    haber: [{
        required: true,
        message: 'Escriba la C. Costo',
        type: 'email',
    }],
}
//--------- select - ctaCont
// Objeto con los datos que se mostrarán en el select
const ctaCont = ref([{
    value: '6211',
    label: 'Cta. contable a',
}, {
    value: '43111',
    label: 'Cta. contable b',
}, {
    value: '7312',
    label: 'Cta. contable c',
}, {
    value: '6361',
    label: 'Cta. contable d',
}]);
// Función que imprime valor cada que es cambiado
const handleChange = value => {
    console.log(`Seleccionado ${form.ctaCont}`);
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
//--------- select - proveedor
// Objeto con los datos que se mostrarán en el select
const proveedor = ref([{
    value: '6211',
    label: 'Proveedor a',
}, {
    value: '43111',
    label: 'Proveedor b',
}, {
    value: '7312',
    label: 'Proveedor c',
}, {
    value: '6361',
    label: 'Proveedor d',
}]);
// Función que imprime valor cada que es cambiado
const handleChangePro = value => {
    console.log(`Seleccionado ${form.proveedor}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurPro = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusPro = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionPro = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
//---------select - tipo de doc.
// Objeto con los datos que se mostrarán en el select
const tipDoc = ref([{
    value: '00',
    label: 'Tipo de doc. a',
}, {
    value: '01',
    label: 'Tipo de doc. b',
}, {
    value: '02',
    label: 'Tipo de doc. c',
}, {
    value: '03',
    label: 'Tipo de doc. d',
}]);
// Función que imprime valor cada que es cambiado
const handleChangeTipDoc = value => {
    console.log(`Seleccionado ${form.tipDoc}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurTipDoc = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusTipDoc = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionTipDoc = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
</script>

<style lang="scss" scoped>
.color {
    border: 2px solid rgba(0, 89, 255, 0.080);
    background-color: rgba(5, 170, 247, 0.024);
    border-radius: 10px
}

.margen-abajo {
    margin-bottom: 30px;
}
</style>