<template>
    <!-- Botón para abrir el modal -->
    <a-button type="primary" @click="showModalPro">Libro de Retenciones</a-button>
    <!-- Modal balance de comprobación -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="800px" title="Balance de comprobación"
        @ok="handleOkPro">
        <!-- Formulario -->
        <a-form :model="form" :rules="roles" layout="vertical">
            <a-row class="margen-arriba" :gutter="16" align="middle">
                <a-col :span="10">
                    <a-row class="padd">
                        <a-tree-select v-model:value="form.valorSucursal" show-search class="ancho"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Seleccione la sucursal"
                            allow-clear tree-default-expand-all :tree-data="sucursales">
                        </a-tree-select>
                    </a-row>
                    <a-row class="padd">
                        <a-tree-select v-model:value="form.valorDeparta" show-search class="ancho margen-arriba"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            placeholder="Seleccione el departamento" allow-clear tree-default-expand-all
                            :tree-data="departamentos">
                        </a-tree-select>
                    </a-row>
                </a-col>
                <a-col :span="14">
                    <a-row :gutter="16" justify="center">
                        <a-row :gutter="16" class="ancho margen-abajo" justify="end">
                            <a-col :span="24">
                                <a-typography-text strong>Requiere</a-typography-text>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox v-model:checked="form.checkApertura">Solo apertura</a-checkbox>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" class="color">
                            <a-col :span="24">
                                <a-typography-text strong>Parámetros</a-typography-text>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Desde el mes" name="mes">
                                    <a-date-picker v-model:value="form.mes" picker="month" placeholder="Mes"
                                        class="ancho" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Hasta el mes" name="mes">
                                    <a-date-picker v-model:value="form.mesb" picker="month" placeholder="Mes"
                                        class="ancho" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item label="Año contable" name="mes">
                                    <a-date-picker v-model:value="form.ano" picker="year" placeholder="Ingrese año contable"
                                        class="ancho" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-row>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script setup>
// Importar funciones de vue
import { ref, reactive, watch } from 'vue'
// Variable que controla la visibilidad del modal balance de comprobación
const openPro = ref(false);
// Función que muestra balance de comprobación
const showModalPro = () => {
    openPro.value = true;
};
// Función que se ejecuta al apretar aceptar en balance de comprobación
const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};
// Objeto reactivo que va a capturar los campos en el formulario
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
    opciones: [],
    checkApertura: false,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
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
// Datos del arbol de selecciones - Sucursales
const sucursales = ref([{
    title: 'Todas las sucursales',
    value: 'todas',
    children: [{
        title: 'Lino SAC',
        value: 'sucursal-a',
    }, {
        title: 'Zona b',
        value: 'sucursal-b',
    }],
}]);
// Imprimir valor cada que es cambiado
watch(() => form.valorSucursal, (newValue) => {
    console.log(newValue);
});
// Datos del arbol de selecciones - departamentos
const departamentos = ref([{
    title: 'Todos las departamentos',
    value: 'todas',
    children: [{
        title: 'Lino SAC',
        value: 'departamento-a',
    }, {
        title: 'Unidad b',
        value: 'departamento-b',
    }],
}]);
// Imprimir valor cada que es cambiado
watch(() => form.valorDeparta, (newValue) => {
    console.log(newValue);
});
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

.padd {
    padding-right: 10px;
}
</style>