<template>
    <a-button type="primary" @click="showModalPro">Cuentas por cobrar</a-button>

    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px" title="Cuentas por Cobrar"
        @ok="handleOkPro">
        <a-row class="margen-arriba">
            <a-typography-text strong>Ventas al crédito</a-typography-text>

            <a-table bordered :data-source="data" :columns="columns" :pagination="{ pageSize: 5 }"
                class="ancho margen-arriba" :row-selection="rowSelection" size="small">
                <template #headerCell="{ column }">
                    <template v-if="column.key === 'tipDoc'">
                        <span style="color: #1890ff">Tipo Doc.</span>
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
                    <template v-if="column.key === 'rucDNI'">
                        <span style="color: #1890ff">RUC/DNI</span>
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
        <a-row class="ancho color" justify="center">
            <a-typography-text strong class="margen">Operación</a-typography-text>
            <a-row :gutter="16" class="ancho" justify="center">
                <a-col :span="5">
                    <a-button block :icon="h(PlusOutlined)">Añadir selección</a-button>
                    
                </a-col>
                <a-col :span="5">
                    
                    <a-button danger block :icon="h(ClearOutlined)">Limpiar</a-button>
                </a-col>
            </a-row>
        </a-row>
    </a-modal>
</template>

<script setup>
import { SearchOutlined, PlusOutlined, ClearOutlined } from '@ant-design/icons-vue';
import { Radio } from 'ant-design-vue';
import { reactive, ref, toRefs, h } from 'vue';

//  inicar modal
const openPro = ref(false);

const showModalPro = () => {
    openPro.value = true;
};

const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};


//tabla con los datos
const data = ref([{
    key: '1',
    rucDNI: '73343443',
    cliente: 'Empresa A',
    total: 140.00,
    amortizado: 0.00,
    saldo: 140.00,
}, {
    key: '2',
    rucDNI: '73759532523',
    cliente: 'Empresa C',
    total: 340.00,
    amortizado: 0.00,
    saldo: 340.00,

}, {
    key: '3',
    rucDNI: '94573257',
    cliente: 'Empresa B',
    total: 670.00,
    amortizado: 0.00,
    saldo: 670.00,

}, {
    key: '4',
    rucDNI: '87757348',
    cliente: 'Empresa D',
    total: 498.10,
    amortizado: 0.00,
    saldo: 498.10,

}]);

const state = reactive({
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],

    loading: false,
});
const searchInput = ref();
const columns = [{
    title: 'RUC/DNI',
    dataIndex: 'rucDNI',
    key: 'rucDNI',
    customFilterDropdown: true,
    onFilter: (value, record) => record.rucDNI.toString().toLowerCase().includes(value.toLowerCase()),
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
    title: 'Total',
    dataIndex: 'total',
    key: 'total',

}, {
    title: 'Amortizado',
    dataIndex: 'amortizado',
    key: 'amortizado',


}, {
    title: 'Saldo',
    dataIndex: 'saldo',
    key: 'saldo',
}];

//Buscar
const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
};

//reiniciar
const handleReset = clearFilters => {
    clearFilters({
        confirm: true,
    });
    state.searchText = '';
};

const stateAsRefs = toRefs(state)



// selección

const existe = ref(false);
const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        if (selectedRows) {
            existe.value = true;
        }
    },

};




//tabla con los datos b
const datab = ref([{
    key: '1',
    tipDoc: 'FAC',
    documento: '0004-83463247',
    fecDoc: '31/05/2023',
    total: 980.00,
    amortizado: 0.00,
    saldo: 980.00,
    cuenta: "01-1212",
    docRef: 'Doc ref a'
}, {
    key: '2',
    tipDoc: 'FAC',
    documento: '0004-4327743',
    fecDoc: '31/05/2023',
    total: 743.00,
    amortizado: 0.00,
    saldo: 743.00,
    cuenta: "01-1212",
    docRef: 'Doc ref a'
}, {
    key: '3',
    tipDoc: 'FAC',
    documento: '0004-1295756',
    fecDoc: '31/05/2023',
    total: 565.00,
    amortizado: 0.00,
    saldo: 565.00,
    cuenta: "01-1212",
    docRef: 'Doc ref a'
}, {
    key: '4',
    tipDoc: 'FAC',
    documento: '0004-56432546',
    fecDoc: '31/05/2023',
    total: 895.00,
    amortizado: 0.00,
    saldo: 895.00,
    cuenta: "01-1212",
    docRef: 'Doc ref a'
}]);

const stateb = reactive({
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],

    loading: false,
});
const searchInputb = ref();
const columnsb = [{
    title: 'Tipo Doc.',
    dataIndex: 'tipDoc',
    key: 'tipDoc',
    customFilterDropdown: true,
    onFilter: (value, record) => record.tipDoc.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInputb.value.focus();
            }, 100);
        }
    },
}, {
    title: 'Documento',
    dataIndex: 'documento',
    key: 'documento',
    customFilterDropdown: true,
    onFilter: (value, record) => record.documento.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInputb.value.focus();
            }, 100);
        }
    },


}, {
    title: 'Fecha Doc.',
    dataIndex: 'fecDoc',
    key: 'fecDoc',


}, {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
}, {
    title: 'Amortizado',
    dataIndex: 'amortizado',
    key: 'amortizado',


}, {
    title: 'Saldo',
    dataIndex: 'saldo',
    key: 'saldo',
}, {
    title: 'Cuenta',
    dataIndex: 'cuenta',
    key: 'cuenta',
}, {
    title: 'Doc. Ref.',
    dataIndex: 'docRef',
    key: 'docRef',
}];

//Buscar b
const handleSearchb = (selectedKeys, confirm, dataIndex) => {
    confirm();
    stateb.searchText = selectedKeys[0];
    stateb.searchedColumn = dataIndex;
};

//reiniciar b
const handleResetb = clearFilters => {
    clearFilters({
        confirm: true,
    });
    stateb.searchText = '';
};

const stateAsRefsb = toRefs(stateb)



// slección b


const rowSelectionb = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

    },

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

.margen-arriba {
    margin-top: 25px;
}

.margen {
    margin: 10px 0;
}
</style>