<template>
    <!-- Botón para abrir el modal -->
    <a-button type="primary" @click="showModalPro">Buscar Documento</a-button>
    <!-- Modal  buscar documento -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px" title="Buscar Documento"
        @ok="handleOkPro">
        <a-row justify="center">
            <a-col :span="8">
                <a-typography-text strong>Documento a buscar: </a-typography-text>
                <a-input-search v-model:value="buscador" placeholder="Ingrese el documento" enter-button
                    @search="enbusca" />
            </a-col>
        </a-row>
        <a-row class="margen-arriba">
            <a-table bordered :data-source="data" :columns="columns" :pagination="{ pageSize: 5 }"
                class="ancho margen-arriba" :row-selection="rowSelection" size="small" v-show="existeBusqueda">
                <template #headerCell="{ column }">
                    <template v-if="column.key === 'tipDoc'">
                        <span style="color: #1890ff">Tipo de Doc.</span>
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
            <a-table bordered :data-source="datab" :columns="columnsb" :pagination="{ pageSize: 5 }" class="ancho"
                :row-selection="rowSelectionb" :scroll="{ x: 1000 }" size="small">
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
                </template>
                <p>{{ message }}</p>
            </a-table>
        </a-row>
    </a-modal>
</template>

<script setup>
// Importar iconos de ant design vue
import { SearchOutlined } from '@ant-design/icons-vue';
// Importar funciones de vue
import { reactive, ref, toRefs, h } from 'vue';
// Variable que controla la visibilidad del modal buscar documento
const openPro = ref(false);
// Función que muestra buscar documento
const showModalPro = () => {
    openPro.value = true;
};
// Función que se ejecuta al apretar aceptar en buscar documento
const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};
// variable que guarda el valor de la entreda del buscador
const buscador = ref('')
// variable que controla si existe el valor ingresaso para busqueda
const existeBusqueda = ref(false)
// Función que realiza la busqueda y controla el error
const enbusca = async () => {
    try {
        const foundObj = await datos.value.filter(obj => obj.nroDoc === buscador.value);
        if (foundObj.length > 0) {
            data.value = foundObj;
            existeBusqueda.value = true;
        }
        console.log(data.value);
    } catch (error) {
        console.error(error);
    }
}
// -------- Tabla a
//Datos de la tabla a
const datos = ref([{
    key: '1',
    tipDoc: '01',
    nroDoc: '000100057373',
    fechDoc: '02/06/2023',
    voucherReg: '047786098',
    rucDNI: '20885665',
}, {
    key: '2',
    tipDoc: '01',
    nroDoc: '000100057373',
    fechDoc: '02/06/2023',
    voucherReg: '0473803293',
    rucDNI: '20885665',
}, {
    key: '3',
    tipDoc: '01',
    nroDoc: '000100046565',
    fechDoc: '02/06/2023',
    voucherReg: '0473803293',
    rucDNI: '20885665',
}, {
    key: '4',
    tipDoc: '01',
    nroDoc: '000100056779',
    fechDoc: '02/06/2023',
    voucherReg: '0473545463',
    rucDNI: '20885665',
}]);
//tabla con los datos de la busqueda
const data = ref([]);
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
    title: 'Tipo de Doc.',
    dataIndex: 'tipDoc',
    key: 'tipDoc',
    customFilterDropdown: true,
    onFilter: (value, record) => record.tipDoc.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },
}, {
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
    title: 'Fecha Doc.',
    dataIndex: 'fechDoc',
    key: 'fechDoc',
}, {
    title: 'Voucher/Resgistro',
    dataIndex: 'voucherReg',
    key: 'voucherReg',
}, {
    title: 'RUC/DNI',
    dataIndex: 'rucDNI',
    key: 'rucDNI',
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
// Variable que controla la visibilidad de la tabla de coincidencias
const existe = ref(false);
// Definición de la selección de las filas
const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        if (selectedRows) {
            existe.value = true;
        }
    },
};
//-------- Tabla b
//Datos de la tabla b
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
// Definición de la selección de las filas
const rowSelectionb = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
</script>

<style lang="scss" scoped>
.ancho {
    width: 100%;
}

.margen-arriba {
    margin-top: 25px;
}
</style>