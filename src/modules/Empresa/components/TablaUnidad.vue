<template>
    <!-- Editar -->
    <a-row class="row-btn">
        <!-- Formulario eeditar cuenta -->
        <a-drawer title="Editar Unidad" :width="520" :open="visibleEdit" :body-style="{ paddingBottom: '80px' }"
            :footer-style="{ textAlign: 'right' }" @close="onCloseE">
            <a-form :model="formEdit" :rules="rulesEdit" layout="vertical" class="row-btn">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="Código" name="codigo">
                            <a-input v-model:value="formEdit.codigo"
                                placeholder="Por favor, ingrese el código" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Sucursal" name="sucursal">
                            <a-select v-model:value="formEdit.sucursal" placeholder="Ingrese la sucursal">
                                <a-select-option value="sucursala">Sucursal A</a-select-option>
                                <a-select-option value="sucursalb">Sucursal B</a-select-option>
                                <a-select-option value="sucursalc">Sucursal C</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="Descripción Corta" name="descCorta">
                            <a-input v-model:value="formEdit.descCorta"
                                placeholder="Por favor, ingrese la descripción corta" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Descrpción larga" name="descLarga">
                            <a-input v-model:value="formEdit.descLarga"
                                placeholder="Por favor, ingrese la descripción larga" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <template #extra>
                <a-space>
                    <a-button @click="onCloseE">Cancelar</a-button>
                    <a-button type="primary" @click="onCloseE">Editar</a-button>
                </a-space>
            </template>
        </a-drawer>
    </a-row>



    <!-- tabla con los datos -->
    <a-table bordered :data-source="data" :columns="columns" :pagination="{ pageSize: 5 }">
        <template #headerCell="{ column }">
            <template v-if="column.key === 'codigo'">
                <span style="color: #1890ff">Código</span>
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
                    <mark v-if="fragment.toLowerCase() === stateAsRefs.searchText.toLowerCase()" :key="i" class="highlight">
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
                    <a-popconfirm v-if="data.length" title="¿Seguro de editar?" ok-text="Sí" cancel-text="No"
                        @confirm="showDrawerE">
                        <a-button class="btn-margin" type="primary"><template #icon>
                                <EditOutlined />
                            </template> Editar</a-button>
                    </a-popconfirm>
                </a-row>

            </template>
        </template>
        <p>{{ message }}</p>
    </a-table>
</template>

<script setup>
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { reactive, ref, toRefs } from 'vue';



//tabla con los datos
const data = ref([{
    key: '1',
    codigo: 'Código...a',
    descLarga: 'Descripción Larga...a',
 
}, {
    key: '2',
    codigo: 'Código...b',
    descLarga: 'Descripción Larga...b',
   
}, {
    key: '3',
    codigo: 'Código...c',
    descLarga: 'Descripción Larga...c',
    
}, {
    key: '4',
    codigo: 'Código...d',
    descLarga: 'Descripción Larga...d',
   
}, {
    key: '5',
    codigo: 'Código...e',
    descLarga: 'Descripción Larga...e',

}, {
    key: '6',
    codigo: 'Código...f',
    descLarga: 'Descripción Larga...f',
    
}, {
    key: '7',
    codigo: 'Código...g',
    descLarga: 'Descripción Larga...g',
    
}]);

const state = reactive({
    searchText: '',
    searchedColumn: '',
    selectedRowKeys: [],

    loading: false,
});
const searchInput = ref();
const columns = [{
    title: 'codigo',
    dataIndex: 'codigo',
    key: 'codigo',
    customFilterDropdown: true,
    onFilter: (value, record) => record.codigo.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },
}, {
    title: 'Cuenta Contable',
    dataIndex: 'descLarga',
    key: 'descLarga',
    customFilterDropdown: true,
    onFilter: (value, record) => record.descLarga.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },


}, {
    title: 'Operaciones',
    dataIndex: 'operation',


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

//Eliminar
const onDelete = key => {
    data.value = data.value.filter(item => item.key !== key);

};

// -------------------Editar

// Objeto reactivo que captura los cambios
const formEdit = reactive({
    codigo: '',
    sucursal: null,
    desCorta: '',
    descLarga: '',

});

// Detalle de los campos
const rulesEdit = {
    codigo: [{
        required: true,
        message: 'Ingrese la descripción corta',
    }],
    sucursal: [{
        required: true,
        message: 'Ingrese la sucursal',
    }],
    descCorta: [{
        required: true,
        message: 'Ingrese la descripción corta',
    }],
    descLarga: [{
        required: true,
        message: 'Ingrese la descripción larga',
    }]
};

const visibleEdit = ref(false);
// Mostrar editar
const showDrawerE = () => {
    visibleEdit.value = true;
};
// cerrar Editar
const onCloseE = () => {
    visibleEdit.value = false;
};

</script>

<style lang="scss" scoped>
.btn-margin {
    margin-right: 15px;

}

.row-btn {
    margin-bottom: 20px;
}

</style>