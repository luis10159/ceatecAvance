<template>
    <a-row class="margen-cancelacion">
        <!-- Mostrar imagen -->
        <a-col :span="8">
            <a-image src="https://aliyuncdn.antdv.com/logo.png" />
        </a-col>
        <!-- Mostrar mensaje -->
        <a-col :span="16" class="padding-izq">
            <a-typography-text> Las cancelaciones Automatica son movimientos que el sistema genera sin necesidad de la
                intervención del usuario. A pesar de representar un considerable ahorro de tiempo, su uso debe ser
                constantemente monitoriado por personal capacitado</a-typography-text>
        </a-col>
    </a-row>
    <!-- Formulario para cancelación automática -->
    <a-form :model="cancelacion" :rules="rulesC" layout="vertical" class="row-btn">
        <a-row class="margen-abajo">
            <a-checkbox v-model:checked="cancelacion.checked">Cancelación automática</a-checkbox>
        </a-row>
        <a-row align="middle" justify="space-around">
            <a-col :span="5">
                <a-form-item label="Cta. destino Compras" name="destCompras">
                    <a-select placeholder="Seleccione Cta. destino Compras" v-model:value="cancelacion.destCompras"
                        show-search :options="optionsDestComp" :filter-option="filterOptionDestComp"
                        @focus="handleFocusDestComp" @blur="handleBlurDestComp" @change="handleChangeDestComp"></a-select>
                </a-form-item>
            </a-col>
            <a-col :span="5">
                <a-form-item label="Cta. destino Ventas" name="destVentas">
                    <a-select placeholder="Seleccione Cta. destino ventas" v-model:value="cancelacion.destVentas"
                        show-search :options="optionsDestVent" :filter-option="filterOptionDestVent"
                        @focus="handleFocusDestVent" @blur="handleBlurDestVent" @change="handleChangeDestVent"></a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
    <!-- Impresión de datos - Solo para prueba -->
    <a-button type="primary" @click="pruebaC">Datos en consola</a-button>
</template>

<script setup>
// Importar funciones de vue
import { ref, reactive } from 'vue'
// -------------------------Cancelación
// Objeto reactivo que va a capturar los campos en el formulario
const cancelacion = reactive({
    destCompras: null,
    destVentas: null,
    checked: false,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rulesC = {
    destCompras: [{
        required: true,
        message: 'Ingrese el destino de compras',
    }],
    destVentas: [{
        required: true,
        message: 'Ingrese el destino de ventas',
    }],
};
// select cta destino compras
const optionsDestComp = ref([{
    value: 'empresaa',
    label: 'CtaDestinoCompras A',
}, {
    value: 'empresab',
    label: 'CtaDestinoCompras B',
}, {
    value: 'empresac',
    label: 'CtaDestinoCompras C',
}]);
// Imprimir valor cambiado
const handleChangeDestComp = value => {
    console.log(`Seleccionado ${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurDestComp = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusDestComp = () => {
    console.log('focus');
};
// Busqueda
const filterOptionDestComp = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// select cta destino ventas
const optionsDestVent = ref([{
    value: 'empresaa',
    label: 'DestVent A',
}, {
    value: 'empresab',
    label: 'DestVent B',
}, {
    value: 'empresac',
    label: 'DestVent C',
}]);
// Imprimir valor cambiado
const handleChangeDestVent = value => {
    console.log(`Seleccionado${value}`);
};
// Imprimir valor cuando está en blur
const handleBlurDestVent = () => {
    console.log('blur');
};
// Imprimir valor cuando está en focus
const handleFocusDestVent = () => {
    console.log('focus');
};
// Busqueda
const filterOptionDestVent = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// Imprimir datos - prueba: cancelación
const pruebaC = () => {
    console.log(cancelacion)
}
</script>

<style lang="scss" scoped>
.padding-izq {
    padding-left: 15px;
}
.margen-abajo {
    margin-bottom: 30px;
}
.margen-cancelacion {
    margin: 0 10vw 30px;
}
</style>