<template>
    <!-- Botón para abrir el modal -->
    <a-button type="primary" @click="showModalPro">Mantenimiento Bancos</a-button>
    <!-- Modal mantenimiento de bancos -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px" title="Mantenimiento de bancos"
        @ok="handleOkPro">
        <!-- Formulario -->
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16" class="margen-arriba">
                <a-col :span="24">
                    <a-tabs v-model:activeKey="activeKey" :tab-position="mode" :style="{ height: '320px' }"
                        @tabScroll="callback">
                        <a-tab-pane v-for="i in 5" :key="i" :tab="`Voucher-${i}`">
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
                            <a-typography-text strong>Ventas al crédito</a-typography-text>
                            <a-row class="margen-arriba" :gutter="16">
                                <a-col :span="12">
                                    <a-form-item label="Cuenta" name="cuenta">
                                        <a-select placeholder="Seleccione la cuenta" v-model:value="form.cuenta" show-search
                                            :options="cuenta" :filter-option="filterOption" @focus="handleFocus"
                                            @blur="handleBlur" @change="handleChange"></a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="Entidad Financiera" name="EntFinan">
                                        <a-select ref="select" v-model:value="form.EntFinan" :options="optEntFinan"
                                            @focus="focusEntFinan" @change="handleEntFinan"
                                            placeholder="Seleccione la entidad financiera"></a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="Nro. de cuenta Cte." name="nroCuen">
                                        <a-input v-model:value="form.nroCuen"
                                            placeholder="Ingrese el Nro. de cuenta Cte." />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="Moneda" name="moneda">
                                        <a-select ref="select" v-model:value="form.moneda" :options="optMoneda"
                                            @focus="focusMoneda" @change="handleMoneda"
                                            placeholder="Seleccione la moneda"></a-select>
                                    </a-form-item>
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
// Importar funciones de vue
import { ref, reactive, h } from 'vue'
// Importar iconos de ant design vue
import { PrinterOutlined, PlusOutlined, MinusOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue';
// Variable que controla la visibilidad del modal mantenimiento de bancos
const openPro = ref(false);
// Función que muestra mantenimiento de bancos
const showModalPro = () => {
    openPro.value = true;
};
// Función que se ejecuta al apretar aceptar en mantenimiento de bancos
const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};
// Variable que controla la posición del tabs
const mode = ref('left');
const activeKey = ref(1);
const callback = val => {
    console.log(val);
};
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    cuenta: null,
    EntFinan: null,
    nroCuen: null,
    NuVoucher: null,
    fecha: null,
    glosario: null,

});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rules = {
    cuenta: [{
        required: true,
        message: 'Ingrese la cuenta',
    }],
    EntFinan: [{
        required: true,
        message: 'Ingrese la entidad financiera',
    }],
    nroCuen: [{
        required: true,
        message: 'Selecione el N° de cuenta Cte.',
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
//----------Select - entidad financiera
// Objeto con los datos que se mostrarán en el select
const optEntFinan = ref([{
    value: '001',
    label: 'Mi Banco',
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
// Función que imprime un valor cuando está en blur
const focusEntFinan = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleEntFinan = value => {
    console.log(`Seleccionado ${value}`);
};
//---------- Select - moneda
// Objeto con los datos que se mostrarán en el select
const optMoneda = ref([{
    value: '001',
    label: 'Dólares americanos',
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
// Función que imprime un valor cuando está en blur
const focusMoneda = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleMoneda = value => {
    console.log(`Seleccionado ${value}`);
};
//---------- select - cuenta
// Objeto con los datos que se mostrarán en el select
const cuenta = ref([{
    value: '6211',
    label: 'Cuenta a',
}, {
    value: '43111',
    label: 'Cuenta b',
}, {
    value: '7312',
    label: 'Cuenta c',
}, {
    value: '6361',
    label: 'Cuenta d',
}]);
// Función que imprime valor cada que es cambiado
const handleChange = value => {
    console.log(`Seleccionado ${form.cuenta}`);
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
</script>

<style lang="scss" scoped>
.margen-abajo {
    margin-bottom: 30px;
}

.margen-arriba {
    margin-top: 20px;
}
</style>