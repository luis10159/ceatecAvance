<template>
    <!-- Editar -->
    <a-row class="row-btn">
        <!-- Drawer para editar empresa-->
        <a-drawer title="Editar una cuenta" :width="520" :open="visibleEdit" :body-style="{ paddingBottom: '80px' }"
            :footer-style="{ textAlign: 'right' }" @close="onCloseE">
            <a-form :model="formEdit" :rules="rulesEdit" layout="vertical" class="row-btn">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="Código" name="codigo">
                            <a-input v-model:value="formEdit.codigo"
                                placeholder="Por favor, ingrese el nombre de la cuenta" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Cuenta contable" name="cuentaContable">
                            <a-input v-model:value="formEdit.cuentaContable"
                                placeholder="Por favor, ingrese el nombre de la cuenta" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="Nivel de cuenta" name="nivelCuenta">
                            <a-select v-model:value="formEdit.nivelCuenta" placeholder="Selecione el nivel de cuenta">
                                <a-select-option value="balance">Balance</a-select-option>
                                <a-select-option value="subCuenta">Sub Cuenta</a-select-option>
                                <a-select-option value="registro">Registro</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Tipo de cuenta" name="tipoCuenta">
                            <a-select v-model:value="formEdit.tipoCuenta" placeholder="Seleccione el tipo de cuenta">
                                <a-select-option value="private">Activo</a-select-option>
                                <a-select-option value="public">Pasivo</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12" v-if="formEdit.nivelCuenta == 'registro'">
                        <a-form-item label="Tipo de análisis" name="tipoAnalisis">
                            <a-select v-model:value="formEdit.tipoAnalisis" placeholder="Seleccione el tipo de análisis">
                                <a-select-option value="xiao">Sin análisis</a-select-option>
                                <a-select-option value="mao">Por documentos</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="Opciones" name="opciones">
                            <a-select v-model:value="formEdit.opciones" mode="multiple" style="width: 100%"
                                placeholder="Seleccione las opciones" max-tag-count="responsive"
                                :options="optionsE"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row class="row-btn" v-if="formEdit.nivelCuenta == 'registro' || formEdit.nivelCuenta == 'subCuenta'">
                    <a-col :span="20">
                        <a-col :span="24" class="row-btn"
                            v-if="sum != 100 || (porcentajesE[0] || porcentajesE[1] || porcentajesE[2] || porcentajesE[3]) != 0">
                            Cta. (Debe): <a-input-number id="inputNumber" :min="1" /> <a-input-number id="inputNumber"
                                v-on:change="suma" v-model:value="porcentajesE[0]" :min="0" :max="100"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
                        </a-col>
                        <a-col class="row-btn" :span="24"
                            v-if="(porcentajesE[0] != 0 && (sum != 100 && sum < 100)) || (porcentajesE[1] || porcentajesE[2] || porcentajesE[3]) != 0">
                            Cta. (Debe): <a-input-number id="inputNumber" :min="1" /> <a-input-number id="inputNumber"
                                v-on:change="suma" v-model:value="porcentajesE[1]" :min="0" :max="100"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
                        </a-col>
                        <a-col class="row-btn" :span="24"
                            v-if="(porcentajesE[1] != 0 && (sum != 100 && sum < 100)) || (porcentajesE[2] || porcentajesE[3] != 0)">
                            Cta. (Debe): <a-input-number id="inputNumber" :min="1" /> <a-input-number id="inputNumber"
                                v-on:change="suma" v-model:value="porcentajesE[2]" :min="0" :max="100"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
                        </a-col>
                        <a-col class="row-btn" :span="24"
                            v-if="(porcentajesE[2] != 0 && (sum != 100 && sum < 100)) || (porcentajesE[3] != 0)">
                            Cta. (Debe): <a-input-number id="inputNumber" :min="1" /> <a-input-number id="inputNumber"
                                v-on:change="suma" v-model:value="porcentajesE[3]" :min="0" :max="100"
                                :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
                        </a-col>
                    </a-col>
                    <a-col :span="4">
                        Cta. (Haber): <a-input-number class="row-btn" id="inputNumber" :min="1" />
                        Cta. (Cierre): <a-input-number class="row-btn" id="inputNumber" :min="1" />
                        <a-form-item label="Auxiliar" name="auxiliar">
                            <a-input v-model:value="formEdit.auxiliar" placeholder="Por favor, ingrese..." />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <a-row v-if="sum > 100" :span="24">
                <a-alert description="El porcentaje total no es valido, excede el 100%" type="error" show-icon
                    class="ancho-complet" />
            </a-row>
            <a-row v-if="sum < 100 && sum != 0">
                <a-alert description="El porcentaje total no es valido, es menor al 100%" type="error" show-icon
                    class="ancho-complet" />
            </a-row>
            <template #extra>
                <a-space>
                    <a-button @click="onCloseE">Cancelar</a-button>
                    <a-button type="primary" @click="onCloseE">Editar</a-button>
                </a-space>
            </template>
        </a-drawer>
    </a-row>
    <!-- tabla con los datos de las empresas -->
    <a-table bordered :data-source="data" :columns="columns" :pagination="{ pageSize: 5 }">
        <!-- Celda superior - Código -->
        <template #headerCell="{ column }">
            <template v-if="column.key === 'codigo'">
                <span style="color: #1890ff">Código</span>
            </template>
        </template>
        <!-- Busqueda -->
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
        <!-- Se muestras las columnas -->
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
            <!-- Operaciones editar - eliminar -->
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
// Importar iconos de ant design vue
import { SearchOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
// Importar funciones de vue
import { reactive, ref, toRefs } from 'vue';
//Datos
const data = ref([{
    key: '1',
    codigo: '001',
    cuentacontable: 'Cajan A',
    columnaa: '32',
    columnab: 'Columna B',
}, {
    key: '2',
    codigo: '002',
    cuentacontable: 'Caja chica',
    columnaa: '42',
    columnab: 'Columna B',
}, {
    key: '3',
    codigo: '003',
    cuentacontable: 'Efectivo y equivalentes de efectivo',
    columnaa: '32',
    columnab: 'Columna B',
}, {
    key: '4',
    codigo: '004',
    cuentacontable: 'Caja D',
    columnaa: '32',
    columnab: 'Columna B',
}, {
    key: '5',
    codigo: '004',
    cuentacontable: 'Caja D',
    columnaa: '32',
    columnab: 'Columna B',
}, {
    key: '6',
    codigo: '004',
    cuentacontable: 'Caja D',
    columnaa: '32',
    columnab: 'Columna B',
}, {
    key: '7',
    codigo: '004',
    cuentacontable: 'Caja D',
    columnaa: '32',
    columnab: 'Columna B',
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
    dataIndex: 'cuentacontable',
    key: 'cuentacontable',
    customFilterDropdown: true,
    onFilter: (value, record) => record.cuentacontable.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
        if (visible) {
            setTimeout(() => {
                searchInput.value.focus();
            }, 100);
        }
    },
}, {
    title: 'Columna A',
    dataIndex: 'columnaa',
    key: 'columnaa',
}, {
    title: 'Columna B',
    dataIndex: 'columnab',
    key: 'columnab',
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
// ----------------------Editar cuenta
// Objeto reactivo que va a capturar los campos en el formulario
const formEdit = reactive({
    codigo: '',
    cuentaContable: '',
    tipoAnalisis: null,
    tipoCuenta: null,
    nivelCuenta: null,
    opciones: [],
    auxiliar: '',
});

// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rulesEdit = {
    codigo: [{
        required: true,
        message: 'Ingrese el código',
    }],
    cuentaContable: [{
        required: true,
        message: 'Ingrese el nombre de la cuenta contable',
    }],
    tipoAnalisis: [{
        required: true,
        message: 'Seleccione el tipo de análisis',
    }],
    tipoCuenta: [{
        required: true,
        message: 'Seleccione el tipo de cuenta',
    }],
    nivelCuenta: [{
        required: true,
        message: 'Selecione el nivel de cuenta',
    }],
    opciones: [{
        required: true,
        message: 'Selecione las opciones que necesite',
        type: 'array',
    }],
    auxiliar: [{
        message: 'Ingresa el auxiliar',
    }],
};
// Variable que controla la visibilidad del drawer
const visibleEdit = ref(false);
// Función que muestra crear cuenta
const showDrawerE = () => {
    visibleEdit.value = true;
};
// Función que cierra crear cuenta
const onCloseE = () => {
    visibleEdit.value = false;
};
//Selector de opciones
const optionsE = ref([]);
for (let i = 1; i < 5; i++) {
    const value = i.toString(10) + i;
    optionsE.value.push({
        label: `Opciones que estaban con casillas selecionables: ${value}`,
        value,
    });
}
//procentajes - sum=contiene la suma de los porcentajes, suma=función que realiza la suma
const porcentajesE = reactive([0, 0, 0, 0]);
let sum = ref(0);
let suma = () => {
    sum.value = 0;
    for (let i = 0; i < 4; i++) {
        sum.value = sum.value + porcentajesE[i];
    }
}
</script>

<style lang="scss" scoped>
.btn-margin {
    margin-right: 15px;
}

.row-btn {
    margin-bottom: 20px;
}

.ancho-complet {
    width: 100%;
}
</style>