<template>

    <!-- Modal mantenimineto de clientes y proveedores -->
    <a-modal ok-text="Guardar" cancel-text="Cancelar" v-model:open="store.mantCliProv" width="700px"
        title="Mantenimineto de clientes y proveedores" @ok="handleOk">
        <!-- Formulario -->
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16" align="bottom" class="color margen-abajo">
                <a-col :span="18">
                    <a-form-item label="Tipo" name="tipo">
                        <a-select ref="select" v-model:value="form.tipo" :options="optClientProv" @focus="focus"
                            @change="handleChange" placeholder="Ingrese tipo"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item name="checked">
                        <a-checkbox v-model:checked="form.checked">Mostrar todos</a-checkbox>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-typography-text strong>Mantenedor de archivos</a-typography-text>
            <a-row :gutter="16" align="bottom" class="color">
                <a-row justify="end" class="ancho">
                    <a-col :span="5">
                        <a-form-item name="checkedb">
                            <a-checkbox v-model:checked="form.checkedb">Eliminado</a-checkbox>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-col :span="9">
                    <a-form-item label="Tipo Doc." name="tipoDoc">
                        <a-select ref="select" v-model:value="form.tipoDoc" :options="optTipDoc" @focus="focusTipDoc"
                            @change="handleChangeTipDoc" placeholder="Ingrese tipo doc."></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item name="NuDoc">
                        <a-input v-model:value="form.NuDoc" placeholder="Ingrese el tipo de doc." />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="Razón social" name="razonSoc">
                        <a-input v-model:value="form.razonSoc" placeholder="Ingrese la razón social" />
                    </a-form-item>
                </a-col>
                <a-row :gutter="16" justify="space-between" class="ancho">
                    <a-col :span="8">
                        <a-form-item label="Nombre" name="nombre">
                            <a-input v-model:value="form.nombre" placeholder="Ingrese el nombre" />
                        </a-form-item>
                        <a-form-item label="Apellido" name="apellido">
                            <a-input v-model:value="form.apellido" placeholder="Ingrese el apellido" />
                        </a-form-item>
                        <a-form-item label="Teléfono" name="telefono">
                            <a-input v-model:value="form.telefono" placeholder="Ingrese el teléfono" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Dirección" name="direccion">
                            <a-input v-model:value="form.direccion" placeholder="Ingrese el direccion" />
                        </a-form-item>
                        <a-form-item label="Representante legal" name="repreLegal">
                            <a-input v-model:value="form.repreLegal" placeholder="Ingrese el representante legal" />
                        </a-form-item>
                        <a-form-item label="Página web" name="pagWeb">
                            <a-input v-model:value="form.pagWeb" addon-before="https://" addon-after=".com">
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item label="Cobrador" name="cobrador">
                            <a-input v-model:value="form.cobrador" placeholder="Ingrese el cobrador" disabled="true" />
                        </a-form-item>
                        <a-form-item label="Correo" name="correo">
                            <a-input v-model:value="form.correo" placeholder="Ingrese el correo" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-row>
            <a-row justify="center" class="ancho" :gutter="16">
                <a-col :span="8">
                    <a-form-item label="Aval" name="aval">
                        <a-input v-model:value="form.aval" placeholder="Ingrese el aval" />
                    </a-form-item>
                    <a-form-item label="Dirección" name="direccionb">
                        <a-input v-model:value="form.direccionb" placeholder="Ingrese el direccionb" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Código" name="codigo">
                        <a-input v-model:value="form.codigo" placeholder="Ingrese el codigo" />
                    </a-form-item>
                    <a-form-item label="Teléfono" name="telefonob">
                        <a-input v-model:value="form.telefonob" placeholder="Ingrese el telefonob" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row justify="center">
                <a-col>
                    <a-space wrap>
                        <a-button type="primary" block :icon="h(GlobalOutlined)" @click="store.cambiarConsulSunat()">Consultar SUNAT</a-button>
                        <a-button block :icon="h(PlusOutlined)">Nuevo</a-button>
                        <a-button type="dashed" block :icon="h(ArrowLeftOutlined)">Deshacer</a-button>
                        <a-button danger block :icon="h(MinusOutlined)">Eliminar</a-button>
                    </a-space>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
    <ConsultarSunat></ConsultarSunat>
</template>

<script setup>
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { ref, reactive, h, defineAsyncComponent } from 'vue'
// Importar iconos de ant design vue
import { GlobalOutlined, PlusOutlined, MinusOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue';
// Importar componentes
const ConsultarSunat = defineAsyncComponent(() => import('@/modules/Reportes/components/ConsultarSunat.vue'));
// Función que se ejecuta al apretar aceptar en mantenimineto de clientes y proveedores
const handleOk = (e) => {
    console.log(e);
    store.mantCliProv = false;
};
//----------- Select - tipo
// Objeto con los datos que se mostrarán en el select
const optClientProv = ref([{
    value: '001',
    label: 'Cliente/Proveedor',
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
// Función que imprime el valor cuando está en blur
const focus = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChange = value => {
    console.log(`Seleccionado ${value}`);
};
//-------- Select - tipo Doc
// Objeto con los datos que se mostrarán en el select
const optTipDoc = ref([{
    value: '001',
    label: 'Cliente/Proveedor',
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
const focusTipDoc = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangeTipDoc = value => {
    console.log(`Seleccionado ${value}`);
};
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    tipo: null,
    checked: false,
    tipoDoc: null,
    NuDoc: null,
    razonSoc: null,
    nombre: null,
    apellido: null,
    repreLegal: null,
    direccion: null,
    telefono: null,
    cobrador: null,
    correo: null,
    pagWeb: null,
    aval: null,
    direccionb: null,
    telefonob: null,
    checkedb: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rules = {
    tipo: [{
        required: true,
        message: 'Ingrese el tipo',
    }],
    tipoDoc: [{
        required: true,
        message: 'Ingrese el tipo de doc.',
    }],
    NuDoc: [{
        required: true,
        message: 'ingrese el doc.',
    }],
    razonSoc: [{
        required: true,
        message: 'Ingrese la razón social',
    }],
    repreLegal: [{
        required: true,
        message: 'Escriba el mes',
    }],
    nombre: [{
        required: true,
        message: 'Escriba el nombre',
    }],
    apellido: [{
        required: true,
        message: 'Escriba el apellido',
    }],
    direccion: [{
        required: true,
        message: 'Ingrese la dirección',
    }],
    repreLegal: [{
        required: true,
        message: 'Ingrese el representante legal',
    }],
    telefono: [{
        required: true,
        message: 'Escriba el teléfono',
    }],
    cobrador: [{
        required: true,
        message: 'Escriba el cobrador',
    }],
    correo: [{
        required: true,
        message: 'Escriba un correo valido',
        type: 'email',
    }],
    pagWeb: [{
        required: true,
        message: 'Escriba la página web',
    }],
    aval: [{
        required: true,
        message: 'Escriba el aval',
    }],
    direccionb: [{
        required: true,
        message: 'Escriba la dirección',
    }],
    codigo: [{
        required: true,
        message: 'Escriba el código',
    }],
    telefonob: [{
        required: true,
        message: 'Escriba el teléfono',
    }],
}
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

.margen-abajo {
    margin-bottom: 30px;
}
</style>