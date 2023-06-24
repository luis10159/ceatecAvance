<template>
    <!-- Botón para abrir el modal -->
    <a-button type="primary" @click="showModalPro">Inconsistencias</a-button>
    <!-- Modal inconsistencias de comprobantes -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px"
        title="Inconsistencias de comprobantes" @ok="handleOkPro">
        <!-- Formulario -->
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="24">
                    <a-row :gutter="16" justify="center">
                        <a-col :span="8">
                            <a-form-item label="Desde el mes" name="mes">
                                <a-date-picker v-model:value="form.mes" picker="month" placeholder="Mes" class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="Hasta el mes" name="mes">
                                <a-date-picker v-model:value="form.mes" picker="month" placeholder="Mes" class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item label="Año contable" name="mes">
                                <a-date-picker v-model:value="form.mes" picker="year" placeholder="Ingrese año contable"
                                    class="ancho" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Inconsistencias" name="inconsistencias">
                                <a-select class="ancho" placeholder="Seleccione la inconsistencia"
                                    v-model:value="form.inconsistencias" show-search :options="optInconsis"
                                    :filter-option="filterOptionInconsis" @focus="handleFocusInconsis"
                                    @blur="handleBlurInconsis" @change="handleChangeGrupA"></a-select>
                            </a-form-item>
                        </a-col>
                        <a-col>
                            <a-button type="primary" :icon="h(SearchOutlined)">Buscar</a-button>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-form>
        <a-row class="margen-arriba">
            <!-- Tabla de comprobantes -->
            <a-table bordered :data-source="data" :columns="columns" :pagination="{ pageSize: 5 }"
                class="ancho margen-arriba" :row-selection="rowSelection" size="small">
                <template #headerCell="{ column }">
                    <template v-if="column.key === 'nroDoc'">
                        <span style="color: #1890ff">Nro. Documento</span>
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
                        <template
                            v-for="(fragment, i) in text
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
                </template>
                <p>{{ message }}</p>
            </a-table>
        </a-row>
        <a-row class="margen-arriba" v-show="existe">
            <!-- Tabla oculta -->
            <a-table bordered :data-source="datab" :columns="columnsb" :pagination="{ pageSize: 5 }" class="ancho"
                :row-selection="rowSelectionb" :scroll="{ x: 1200 }" size="small">
                <template #headerCell="{ column }">
                    <template v-if="column.key === 'cuenta'">
                        <span style="color: #1890ff">Cuenta</span>
                    </template>
                </template>
                <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                    <div style="padding: 8px">
                        <a-input ref="searchInputb" :placeholder="`Buscar ${column.dataIndex}`" :value="selectedKeys[0]"
                            style="width: 188px; margin-bottom: 8px; display: block"
                            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                            @pressEnter="handleSearchb(selectedKeys, confirm, column.dataIndex)" />
                        <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
                            @click="handleSearchb(selectedKeys, confirm, column.dataIndex)">
                            <template #icon>
                                <SearchOutlined />
                            </template>
                            Buscar
                        </a-button>
                        <a-button size="small" style="width: 90px" @click="handleResetb(clearFilters)">
                            Reiniciar
                        </a-button>
                    </div>
                </template>
                <template #customFilterIcon="{ filtered }">
                    <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
                </template>
                <template #bodycell="{ text, column }">
                    <span v-if="stateAsRefsb.searchText && stateAsRefsb.searchedColumn === column.dataIndex">
                        <template
                            v-for="(fragment, i) in text
                                .toString()
                                .split(new RegExp(`(?<=${stateAsRefsb.searchText})|(?=${stateAsRefsb.searchText})`, 'i'))">
                            <mark v-if="fragment.toLowerCase() === stateAsRefsb.searchText.toLowerCase()" :key="i"
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
        </a-row>
    </a-modal>
</template>

<script setup>
// Importar iconos de ant design vue
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons-vue';
// Importar funciones de vue
import { reactive, ref, toRefs, h } from 'vue';
// Variable que controla la visibilidad del modal inconsistencias de comprobantes
const openPro = ref(false);
// Función que muestra inconsistencias de comprobantes
const showModalPro = () => {
    openPro.value = true;
};
// Función que se ejecuta al apretar aceptar en inconsistencias de comprobantes
const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};
// datos
const data = ref([{
    key: '1',
    nroDoc: '000100057373',
    ctaRegistro: '12121',
    debe: '9999',
    haber: '03',
    debeDolar: '0003-00238383',
    haberDolar: '06/06/2023',
    nro: '0.00'
}, {
    key: '2',
    nroDoc: '000100057373',
    ctaRegistro: '12121',
    debe: '9999',
    haber: '03',
    debeDolar: '0003-00072272',
    haberDolar: '06/06/2023',
    nro: '0.00'
}, {
    key: '3',
    nroDoc: '000100046565',
    ctaRegistro: '12121',
    debe: '9999',
    haber: '03',
    debeDolar: '0003-0064654',
    haberDolar: '06/06/2023',
    nro: '0.00'
}, {
    key: '4',
    nroDoc: '000100056779',
    ctaRegistro: '12121',
    debe: '9999',
    haber: '03',
    debeDolar: '0003-00344445',
    haberDolar: '06/06/2023',
    nro: '0.00'
}]);
// Objeto reactivo que guarda las filas encontradas, el texto a buscar y la columna que se busca
const state = reactive({
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
    loading: false,
});
//Variable que guarda la entrada del buscador
const searchInput = ref();
//Definición de las columnas
const columns = [{
    title: 'Nro. Docuemento',
    dataIndex: 'nroDoc',
    key: 'nroDoc',
    customFilterDropdown: true,
    onFilter: (value, record) => record.nroDoc.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },
}, {
    title: 'Cta. Registro',
    dataIndex: 'ctaRegistro',
    key: 'ctaRegistro',
    customFilterDropdown: true,
    onFilter: (value, record) => record.ctaRegistro.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },
}, {
    title: 'Debe',
    dataIndex: 'debe',
    key: 'debe',
}, {
    title: 'Haber',
    dataIndex: 'haber',
    key: 'haber',
}, {
    title: 'Debe Dolar',
    dataIndex: 'debeDolar',
    key: 'debeDolar',
}, {
    title: 'Nro.',
    dataIndex: 'nro',
    key: 'nro',
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
// Variable con controla la visibilidad de la segunda tabla
const existe = ref(false);
// Definición de tipo de selector e impresión de filas seleccionadas
const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        if (selectedRows) {
            existe.value = true;
        }
    },
};
// Datos de la tabla oculta
const datab = ref([{
    key: '1',
    cuenta: '6011',
    cCosto: '-',
    debe: 120.00,
    haber: 980.00,
    columnan: 0.00,
    columnam: 980.00,
    anexo: "-",
    colunmao: '01',
    numero: '0001-00068743',
    tf: '01',
    numerob: '0001-00068743',
    idCol: '378945',
    proveedor: '999',
    columnac: '-',
    columnad: '-',
}, {
    key: '2',
    cuenta: '87302',
    cCosto: '-',
    debe: 120.00,
    haber: 743.00,
    columnan: 0.00,
    columnam: 743.00,
    anexo: "-",
    colunmao: '01',
    numero: '0001-0003535',
    tf: '01',
    numerob: '0001-00068743',
    idCol: '378945',
    proveedor: '999',
    columnac: '-',
    columnad: '-',
}, {
    key: '3',
    cuenta: '53127',
    cCosto: '-',
    debe: 120.00,
    haber: 565.00,
    columnan: 0.00,
    columnam: 565.00,
    anexo: "-",
    colunmao: '01',
    numero: '0001-0006343',
    tf: '01',
    numerob: '0001-00068743',
    idCol: '378945',
    proveedor: '999',
    columnac: '-',
    columnad: '-',
}, {
    key: '4',
    cuenta: '2466',
    cCosto: '-',
    debe: 120.00,
    haber: 895.00,
    columnan: 0.00,
    columnam: 895.00,
    anexo: "-",
    colunmao: '01',
    numero: '0001-00035545',
    tf: '01',
    numerob: '0001-00068743',
    idCol: '378945',
    proveedor: '999',
    columnac: '-',
    columnad: '-',
}]);
// Objeto reactivo que guarda las filas encontradas, el texto a buscar y la columna que se busca
const stateb = reactive({
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],
    loading: false,
});
//Variable que guarda la entrada del buscador
const searchInputb = ref();
//Definición de las columnas
const columnsb = [{
    title: 'Cuenta',
    dataIndex: 'cuenta',
    key: 'cuenta',
    customFilterDropdown: true,
    onFilter: (value, record) => record.cuenta.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInputb.value.focus();
            }, 100);
        }
    },
}, {
    title: 'C. Costo',
    dataIndex: 'cCosto',
    key: 'cCosto',
    customFilterDropdown: true,
    onFilter: (value, record) => record.cCosto.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInputb.value.focus();
            }, 100);
        }
    },
}, {
    title: 'Debe',
    dataIndex: 'debe',
    key: 'debe',
}, {
    title: 'Haber',
    dataIndex: 'haber',
    key: 'haber',
}, {
    title: 'Columna n',
    dataIndex: 'columnan',
    key: 'columnan',
}, {
    title: 'Columna m',
    dataIndex: 'columnam',
    key: 'columnam',
}, {
    title: 'Anexo',
    dataIndex: 'anexo',
    key: 'anexo',
}, {
    title: 'Columna o',
    dataIndex: 'colunmao',
    key: 'colunmao',
}, {
    title: 'Numero',
    dataIndex: 'numero',
    key: 'numero',
}, {
    title: 'TF',
    dataIndex: 'tf',
    key: 'tf',
}, {
    title: 'Numero',
    dataIndex: 'numerob',
    key: 'numerob',
}, {
    title: 'Id',
    dataIndex: 'idCol',
    key: 'idCol',
}, {
    title: 'Proveedor',
    dataIndex: 'proveedor',
    key: 'proveedor',
}, {
    title: 'E...',
    dataIndex: 'columnac',
    key: 'columnac',
}, {
    title: 'U...',
    dataIndex: 'columnad',
    key: 'numerod',
}, {
    title: 'Operaciones',
    dataIndex: 'operation',
}];
//Función que se ejecuta después del enter y click al buscar
const handleSearchb = (selectedKeys, confirm, dataIndex) => {
    confirm();
    stateb.searchText = selectedKeys[0];
    stateb.searchedColumn = dataIndex;
};
//Función para formatear, se ejcuta después del click en reiniciar
const handleResetb = clearFilters => {
    clearFilters({
        confirm: true,
    });
    stateb.searchText = '';
};
//Contienen las datos a tener en cuenta para la busqueda
const stateAsRefsb = toRefs(stateb)
//Elimina un elemento
const onDelete = key => {
    datab.value = datab.value.filter(item => item.key !== key);
};


// Imprimir filas seleccionadas de la segunda tabla
const rowSelectionb = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
//------------- select - inconsistencias
// Objeto con los datos que se mostrarán en el select
const optInconsis = ref([{
    value: '00',
    label: 'Varias cancelaciones de un mismo documento',
}, {
    value: '01',
    label: "Voucher's que no cuadran",
}, {
    value: '02',
    label: 'Cancelaciones Automáticas sin provisiones',
}, {
    value: '03',
    label: 'Ctas Contables Sin Nivel de Cuentas como Registro',
}, {
    value: '04',
    label: 'Ctas de la Clase 6 sin destino',
}]);
// Función que imprime valor cada que es cambiado
const handleChangeGrupA = value => {
    console.log(`Seleccionado ${form.inconsistencias}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurInconsis = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusInconsis = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionInconsis = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    inconsistencias: null,
    ano: null,
    mes: null,
    mesb: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rules = {
    inconsistencias: [{
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
    mesb: [{
        required: true,
        message: 'Selecione el mes',
    }],
}
</script>

<style lang="scss" scoped>
.ancho {
    width: 100%;
}

.margen-arriba {
    margin-top: 25px;
}
</style>