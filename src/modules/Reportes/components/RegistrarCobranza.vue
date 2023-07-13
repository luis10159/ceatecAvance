<template>
    <!-- Modal registrar cobranza -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="store.regisCobran" width="700px" title="Registrar cobranza"
        @ok="handleOk">
        <!-- Formulario -->
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-config-provider :component-size="componentSize">
                <a-row :gutter="16" class="margen-abajo" align="bottom">
                    <a-col :span="5">
                        <a-form-item label="Nro Voucher" name="NumDoc">
                            <a-input v-model:value="form.NumDoc" placeholder="Ingrese" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="10">
                        <a-form-item label="Cliente" name="cliente">
                            <a-select placeholder="Seleccione el cliente" v-model:value="form.cliente" show-search
                                :options="cliente" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                                @change="handleChange"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item label="Tipo de operación" name="TipOper">
                            <a-select ref="select" v-model:value="form.TipOper" :options="optTipOper" @focus="focusTipo"
                                @change="handleChangeTipo" placeholder="Seleccione el tipo de operación"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="10">
                        <a-form-item label="Cuenta" name="cuenta">
                            <a-select ref="select" v-model:value="form.Cuenta" :options="optCuenta" @focus="focusCuenta"
                                @change="handleChangeCuenta" placeholder="Seleccione la cuenta"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Documento" name="tipDoc">
                            <a-select placeholder="Ingrese el doc." v-model:value="form.tipDoc" show-search
                                :options="tipDoc" :filter-option="filterOptionTipDoc" @focus="handleFocusTipDoc"
                                @blur="handleBlurTipDoc" @change="handleChangeTipDoc"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item name="NumDoc">
                            <a-input v-model:value="form.NumDoc" placeholder="Ingrese el número de doc." />
                        </a-form-item>
                    </a-col>
                    <a-col :span="10">
                        <a-form-item label="Flujo Efec." name="FlujEfec">
                            <a-input v-model:value="form.FlujEfec" placeholder="Ingrese flujo Efec." />
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Fecha Cobranza" name="fecha">
                            <a-date-picker class="ancho" v-model:value="form.fecha" placeholder="Selecione la fecha" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Tipo de cambio" name="TipCamb">
                            <a-input-number v-model:value="form.TipCamb" placeholder="Ingrese el tipo de cambio" @click="store.cambiarTipCambio()">
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
                    <a-col :span="5">
                        <a-form-item label="Monto a pagar" name="montoPagar">
                            <a-input-number class="ancho" v-model:value="form.montoPagar"
                                placeholder="Ingrese el monto a pagar" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="19">
                        <a-form-item label="Detalle" name="detalle">
                            <a-input v-model:value="form.detalle" placeholder="Ingrese el detalle" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-config-provider>
        </a-form>
        <!-- Tabla -->
        <a-table bordered :data-source="data" :columns="columns" :pagination="{ pageSize: 5 }" :scroll="{ x: 1000 }"
            size="small">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'ruc'">
                    <span style="color: #1890ff">RUC</span>
                </template>
            </template>
            <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                <div style="padding: 8px">
                    <a-input ref="searchInput" :placeholder="`Buscar ${column.dataIndex}`" :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                    <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
                        @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
                        <template #icon>
                            <SearchOutlined />
                        </template>
                        Buscar
                    </a-button>
                    <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                        Reiniciar
                    </a-button>
                </div>
            </template>
            <template #customFilterIcon="{ filtered }">
                <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
            </template>
            <template #bodycell="{ text, column }">
                <span v-if="stateAsRefs.searchText && stateAsRefs.searchedColumn === column.dataIndex">
                    <template v-for="(fragment, i) in text
                        .toString()
                        .split(new RegExp(`(?<=${stateAsRefs.searchText})|(?=${stateAsRefs.searchText})`, 'i'))">
                        <mark v-if="fragment.toLowerCase() === stateAsRefs.searchText.toLowerCase()" :key="i"
                            class="highlight">
                            {{ fragment }}
                        </mark>
                        <template v-else>{{ fragment }}</template>
                    </template>
                </span>
            </template>
            <template #bodyCell="{ column, record }">
                <!-- Operaciones -->
                <template v-if="column.dataIndex === 'operation'">
                    <a-row>
                        <a-popconfirm v-if="data.length" title="¿Seguro de eliminar?" ok-text="Sí" cancel-text="No"
                            @confirm="onDelete(record.key)">
                            <a-button class="btn-margin" type="primary" danger><template #icon>
                                    <DeleteOutlined />
                                </template> Eliminar</a-button>
                        </a-popconfirm>
                    </a-row>
                </template>
            </template>
            <p>{{ message }}</p>
        </a-table>
        <a-row justify="end" class="margen-abajo">
            <a-col :span="8">
                <a-button block :icon="h(CheckOutlined)">Actualizar valor a pagar</a-button>
            </a-col>
        </a-row>
        <a-row :gutter="16" justify="end">
            <a-col :span="6">
                <a-form-item label="Monto total" name="montoTotal">
                    <a-input-number disabled="true" class="ancho" v-model:value="form.montoTotal"
                        placeholder="Ingrese el monto total" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Total a pagar" name="totalPagar">
                    <a-input-number disabled="true" class="ancho" v-model:value="form.montoPagar"
                        placeholder="Ingrese el total a pagar" />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row class="ancho color margen-abajo" justify="center">
            <a-typography-text strong class="margen">Operación</a-typography-text>
            <a-row :gutter="16" class="ancho" justify="center">
                <a-col :span="5">
                    <a-button block :icon="h(PlusOutlined)">Nuevo</a-button>
                </a-col>
                <a-col :span="5">
                    <a-button type="dashed" block :icon="h(SaveOutlined)">Grabar</a-button>
                </a-col>
                <a-col :span="5">
                    <a-button type="dashed" block :icon="h(ArrowLeftOutlined)">Volver</a-button>
                </a-col>
            </a-row>
        </a-row>
    </a-modal>
    <TipoCambio></TipoCambio>
</template>

<script setup>
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { ref, reactive, h, toRefs, defineAsyncComponent } from 'vue'
// Importar iconos de ant design vue
import { PlusOutlined, ArrowLeftOutlined, SaveOutlined, DeleteOutlined, CheckOutlined, SearchOutlined } from '@ant-design/icons-vue';
// Importar componentes
const TipoCambio = defineAsyncComponent(() => import('@/modules/Reportes/components/TipoCambio.vue'));
// Variable que controla el tamaño de los componentes
const componentSize = ref('middle');
// Función que se ejecuta al apretar aceptar en registrar cobranza
const handleOk = (e) => {
    console.log(e);
    store.regisCobran = false;
};
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    cliente: null,
    proveedor: null,
    checProvee: false,
    tipDoc: null,
    NumDoc: null,
    detalle: null,
    fecha: null,
    checFecVen: false,
    ctaBanco: null,
    montoPagar: null,
    montoTotal: null,
    FlujEfec: null,
    TipCamb: null,
    moneda: "PER",
    debe: null,
    haber: null,
    TipOper: null,
    cuenta: null,
    checReparo: null,
    afectIGV: null,
    checafectIGV: false,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rules = {
    cliente: [{
        required: true,
        message: 'Ingrese el cliente',
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
    montoPagar: [{
        required: true,
        message: 'Ingrese el monto a pagar',
    }],
    montoTotal: [{
        required: true,
        message: 'Ingrese el monto total',
    }],
    totalPagar: [{
        required: true,
        message: 'Ingrese el total a pagar',
    }],
    FlujEfec: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    TipCamb: [{
        required: true,
        message: 'Escriba el tipo de cambio',
    }],
    debe: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    haber: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    TipOper: [{
        required: true,
        message: 'Seleccione el tipo de operación',
    }],
    cuenta: [{
        required: true,
        message: 'Seleccione la cuenta',
    }],
}
//----------- Select - cliente
// Objeto con los datos que se mostrarán en el select
const cliente = ref([{
    value: '6211',
    label: 'Cliente a',
}, {
    value: '43111',
    label: 'Cliente b',
}, {
    value: '7312',
    label: 'Cliente c',
}, {
    value: '6361',
    label: 'Cliente d',
}]);
// Función que imprime valor cada que es cambiado
const handleChange = value => {
    console.log(`Seleccionado ${form.cliente}`);
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
//--------- select - tipo de doc.
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
//---------- Select - tipo
// Objeto con los datos que se mostrarán en el select
const optTipOper = ref([{
    value: '001',
    label: 'Depósito en cuenta',
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
// Función que imprime un valor cuando está en Focus
const focusTipo = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangeTipo = value => {
    console.log(`Seleccionado ${value}`);
};
//-----------select - cuenta
// Objeto con los datos que se mostrarán en el select
const optCuenta = ref([{
    value: '001',
    label: 'Caja',
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
// Función que imprime un valor cuando está en Focus
const focusCuenta = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangeCuenta = value => {
    console.log(`Seleccionado ${value}`);
};
//Datos de la tabla
const data = ref([{
    key: '1',
    ruc: '2089874356',
    cliente: 'Empresas de transportes el AGRO S.A',
    codVenta: 'FAC',
    nroDoc: '0004-000586',
    fechaDoc: '02/06/2023',
    deuda: 880.00,
    amortizar: 0.00,
}, {
    key: '2',
    ruc: '2089874356',
    cliente: 'Empresas de transportes el AGRO S.A',
    codVenta: 'FAC',
    nroDoc: '0004-05475',
    fechaDoc: '01/06/2023',
    deuda: 700.00,
    amortizar: 0.00,
}, {
    key: '3',
    ruc: '2089874355',
    cliente: 'Empresas de transportes el AGRO S.A',
    codVenta: 'FAC',
    nroDoc: '0004-00643',
    fechaDoc: '01/06/2023',
    deuda: 980.00,
    amortizar: 0.00,
}, {
    key: '4',
    ruc: '2089874351',
    cliente: 'Empresas de transportes el AGRO S.A',
    codVenta: 'FAC',
    nroDoc: '0004-00566',
    fechaDoc: '31/05/2023',
    deuda: 1000.00,
    amortizar: 0.00,
}]);
// Objeto reactivo que guarda las filas encontradas, el texto a buscar y la columna que se busca
const state = reactive({
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
    loading: false,
});
// Objeto reactivo que guarda las filas encontradas, el texto a buscar y la columna que se busca
const searchInput = ref();
//Definición de las columnas
const columns = [{
    title: 'RUC',
    dataIndex: 'ruc',
    key: 'ruc',
    customFilterDropdown: true,
    onFilter: (value, record) => record.ruc.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },
}, {
    title: 'Cliente',
    dataIndex: 'cliente',
    key: 'cliente',
    customFilterDropdown: true,
    onFilter: (value, record) => record.cliente.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },
}, {
    title: 'CódVenta',
    dataIndex: 'codVenta',
    key: 'codVenta',
}, {
    title: 'Nro. Docuemnto',
    dataIndex: 'nroDoc',
    key: 'nroDoc',
}, {
    title: 'Fecha Doc.',
    dataIndex: 'fechaDoc',
    key: 'fechaDoc',
}, {
    title: 'Deuda',
    dataIndex: 'deuda',
    key: 'deuda',
}, {
    title: 'Amortizar',
    dataIndex: 'amortizar',
    key: 'amortizar',
}, {
    title: 'Operaciones',
    dataIndex: 'operation',
}];
//Función que se ejecuta después del enter y click al buscar
const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
};
//Función para formatear, se ejcuta después del click en reiniciar
const handleReset = clearFilters => {
    clearFilters({
        confirm: true,
    });
    state.searchText = '';
};
//Contienen las datos a tener en cuenta para la busqueda
const stateAsRefs = toRefs(state)
//Elimina un elemento
const onDelete = key => {
    data.value = data.value.filter(item => item.key !== key);
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

.margen {
    margin: 10px 0;
}

.margen-abajo {
    margin-bottom: 20px;
}
</style>