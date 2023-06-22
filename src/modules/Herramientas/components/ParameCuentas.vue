<template>
    <!-- Formulario  -->
    <a-form :model="form" :rules="rules" layout="vertical" class="row-btn">
        <a-row align="middle" justify="space-around">
            <a-col :span="5">
                <a-form-item label="Cuenta IGV" name="cuentaIGV">
                    <a-select placeholder="Seleccione una cuenta IGV" v-model:value="form.cuentaIGV" show-search
                        :options="optionsIGV" :filter-option="filterOptionIGV" @focus="handleFocusIGV" @blur="handleBlurIGV"
                        @change="handleChangeIGV"></a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Cuenta ISC" name="cuentaISC">
                    <a-select placeholder="Seleccione la cuenta ISC" v-model:value="form.cuentaISC" show-search
                        :options="optionsISC" :filter-option="filterOptionISC" @focus="handleFocusISC" @blur="handleBlurISC"
                        @change="handleChangeISC"></a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Cuenta IES" name="cuentaIES">
                    <a-input class="ancho" v-model:value="form.cuentaIES" placeholder="Ingrese cuenta IES" />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row align="middle" justify="space-around">
            <a-col :span="5">
                <a-form-item label="Percepciones" name="percepciones">
                    <a-select placeholder="Seleccione las percepciones" v-model:value="form.percepciones" show-search
                        :options="optionsPercep" :filter-option="filterOptionPercep" @focus="handleFocusPercep"
                        @blur="handleBlurPercep" @change="handleChangePercep"></a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Detracciones" name="detracciones">
                    <a-select placeholder="Seleccione las detracciones" v-model:value="form.detracciones" show-search
                        :options="optionsDetra" :filter-option="filterOptionDetra" @focus="handleFocusDetra"
                        @blur="handleBlurDetra" @change="handleChangeDetra"></a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Cierre Compras" name="cierreCompras">
                    <a-select placeholder="Seleccione el cierre de compras" v-model:value="form.cierreCompras" show-search
                        :options="optionsCComp" :filter-option="filterOptionCComp" @focus="handleFocusCComp"
                        @blur="handleBlurCComp" @change="handleChangeCComp"></a-select>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row align="middle" justify="space-around">
            <a-col :span="5">
                <a-form-item label="Cierre ventas" name="cierreVentas">
                    <a-select placeholder="Seleccione el cierre de ventas" v-model:value="form.cierreVentas" show-search
                        :options="optionsCVent" :filter-option="filterOptionCVent" @focus="handleFocusCVent"
                        @blur="handleBlurCVent" @change="handleChangeCVent"></a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Difer. Cambio (+)" name="diferCambioP">
                    <a-input-number class="ancho" v-model:value="form.diferCambioP"
                        placeholder="Ingrese Difer. Cambio (+)" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Difer. Cambio (-)" name="diferCambioN">
                    <a-select placeholder="Seleccione  Difer. Cambio (-)" v-model:value="form.diferCambioN" show-search
                        :options="optionsDifCamNe" :filter-option="filterOptionDifCamNe" @focus="handleFocusDifCamNe"
                        @blur="handleBlurDifCamNe" @change="handleChangeDifCamNe"></a-select>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row align="middle" justify="space-around">
            <a-col :span="5">
                <a-form-item label="Cuenta Reten. 4ta" name="cuentaReten">
                    <a-select placeholder="Seleccione  Cuenta Reten. 4ta" v-model:value="form.cuentaReten" show-search
                        :options="optionsCuenRet" :filter-option="filterOptionCuenRet" @focus="handleFocusCuenRet"
                        @blur="handleBlurCuenRet" @change="handleChangeCuenRet"></a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Cuenta IVAP" name="cuentaIVAP">
                    <a-input-number class="ancho" v-model:value="form.cuentaIVAP" placeholder="Ingrese cierre ventas" />
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Cuenta Auxiliar" name="cuentaAuxiliar">
                    <a-input-number class="ancho" v-model:value="form.cuentaAuxiliar"
                        placeholder="Ingrese cuenta axiliar" />
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
    <a-button type="primary" @click="consola">Datos en consola</a-button>
</template>

<script setup>
// Importar funciones de vue
import { ref, reactive } from 'vue'
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    cuentaIGV: null,
    cuentaISC: null,
    cuentaIES: null,
    percepciones: null,
    detracciones: null,
    cierreCompras: null,
    cierreVentas: null,
    diferCambioP: null,
    diferCambioN: null,
    cuentaReten: null,
    cuentaIVAP: null,
    cuentaAuxiliar: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rules = {
    cuentaIGV: [{
        required: true,
        message: 'Ingrese la cuenta IGV',
    }],
    cuentaISC: [{
        required: true,
        message: 'Ingrese la cuenta ISC',
    }],
    cuentaIES: [{
        required: true,
        message: 'Ingrese la cuenta IES',
    }],
    percepciones: [{
        required: true,
        message: 'Ingrese las percepciones',
    }],
    detracciones: [{
        required: true,
        message: 'Ingrese las detracciones',
    }],
    cierreCompras: [{
        required: true,
        message: 'Ingrese el cierre de compras',
    }],
    cierreVentas: [{
        required: true,
        message: 'Ingrese el cierre de ventas',
    }],
    diferCambioP: [{
        required: true,
        message: 'Ingrese la Difer. Cambio (+)',
    }],
    diferCambioN: [{
        required: true,
        message: 'Ingrese la Difer. Cambio (-)',
    }],
    cuentaReten: [{
        required: true,
        message: 'Ingrese la cuenta Reten. 4ta',
    }],
    cuentaIVAP: [{
        required: true,
        message: 'Ingrese la cuenta IVAP',
    }],
    cuentaAuxiliar: [{
        required: true,
        message: 'Ingrese la cuenta Auxiliar',
    }]
};
// ------select - cuenta IGV
const optionsIGV = ref([{
    value: 'empresaa',
    label: 'CuentaIGV A',
}, {
    value: 'empresab',
    label: 'CuentaIGV B',
}, {
    value: 'empresac',
    label: 'CuentaIGV C',
}]);
// Imprimir valor cada que es cambiado
const handleChangeIGV = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurIGV = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusIGV = () => {
    console.log('focus');
};
// Busqueda
const filterOptionIGV = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// ----- select - cuenta ISC
const optionsISC = ref([{
    value: 'empresaa',
    label: 'CuentaISC A',
}, {
    value: 'empresab',
    label: 'CuentaISC B',
}, {
    value: 'empresac',
    label: 'CuentaISC C',
}]);
// Imprimir valor cada que es cambiado
const handleChangeISC = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurISC = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusISC = () => {
    console.log('focus');
};
// Busqueda
const filterOptionISC = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// ----- select - percepciones
const optionsPercep = ref([{
    value: 'empresaa',
    label: 'Percepción A',
}, {
    value: 'empresab',
    label: 'Percepción B',
}, {
    value: 'empresac',
    label: 'Percepción C',
}]);
// Imprimir valor cada que es cambiado
const handleChangePercep = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurPercep = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusPercep = () => {
    console.log('focus');
};
// Busqueda
const filterOptionPercep = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// ------- select - detracciones
const optionsDetra = ref([{
    value: 'empresaa',
    label: 'Detracciones A',
}, {
    value: 'empresab',
    label: 'Detracciones B',
}, {
    value: 'empresac',
    label: 'Detracciones C',
}]);
// Imprimir valor cada que es cambiado
const handleChangeDetra = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurDetra = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusDetra = () => {
    console.log('focus');
};
// Busqueda
const filterOptionDetra = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// ------ select - cierre compras
const optionsCComp = ref([{
    value: 'empresaa',
    label: 'Cierre Compras A',
}, {
    value: 'empresab',
    label: 'Cierre Compras B',
}, {
    value: 'empresac',
    label: 'Cierre Compras C',
}]);
// Imprimir valor cada que es cambiado
const handleChangeCComp = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurCComp = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusCComp = () => {
    console.log('focus');
};
// Busqueda
const filterOptionCComp = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// ------ select - cierre ventas
const optionsCVent = ref([{
    value: 'empresaa',
    label: 'CierreVentas A',
}, {
    value: 'empresab',
    label: 'CierreVentas B',
}, {
    value: 'empresac',
    label: 'CierreVentas C',
}]);
// Imprimir valor cada que es cambiado
const handleChangeCVent = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurCVent = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusCVent = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionCVent = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// ------ select - Dif cambio +
const optionsDifCamNe = ref([{
    value: 'empresaa',
    label: 'DifCamNe A',
}, {
    value: 'empresab',
    label: 'DifCamNe B',
}, {
    value: 'empresac',
    label: 'DifCamNe C',
}]);
// Imprimir valor cada que es cambiado
const handleChangeDifCamNe = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurDifCamNe = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusDifCamNe = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionDifCamNe = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// ------- select - Cuenta reten.
const optionsCuenRet = ref([{
    value: 'empresaa',
    label: 'CuentaReten A',
}, {
    value: 'empresab',
    label: 'CuentaReten B',
}, {
    value: 'empresac',
    label: 'CuentaReten C',
}]);
// Imprimir valor cada que es cambiado
const handleChangeCuenRet = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurCuenRet = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusCuenRet = () => {
    console.log('focus');
};
// Busqueda
const filterOptionCuenRet = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// Prueba - Impresión de datos ingresados en el formulario
const consola = () => {
    console.log(form)
}
</script>

<style lang="scss" scoped>
.ancho {
    width: 100%;
}
</style>