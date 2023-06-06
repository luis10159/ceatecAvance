<template>
    <a-button type="primary" @click="showModalPro">Balance de comprobación</a-button>

    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="900px" title="Balance de comprobación"
        @ok="handleOkPro">
        <a-form :model="form" :rules="roles" layout="vertical">
            <a-row class="margen-arriba" :gutter="16" align="middle">
                <a-col :span="8">
                    <a-row class="padd">
                        <a-tree-select v-model:value="form.valorSucursal" show-search class="ancho"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Seleccione la zona"
                            allow-clear tree-default-expand-all :tree-data="zonas">
                        </a-tree-select>
                    </a-row>
                    <a-row class="padd">
                        <a-tree-select v-model:value="form.valorDeparta" show-search class="ancho margen-arriba"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="Seleccione la unidad"
                            allow-clear tree-default-expand-all :tree-data="unidades">

                        </a-tree-select>
                    </a-row>


                </a-col>
                <a-col :span="16">
                    <a-row :gutter="16" justify="center">
                        <a-col :span="24">
                            <a-form-item label="Opciones" name="opciones">
                                <a-select v-model:value="form.opciones" mode="multiple" class="ancho"
                                    placeholder="Seleccione las opciones" max-tag-count="responsive"
                                    :options="options"></a-select>
                            </a-form-item>
                        </a-col>
                        <a-row :gutter="16" class="color">
                            <a-col :span="24">
                                <a-typography-text strong>Parámetros</a-typography-text>
                            </a-col>
                            <a-col :span="6">
                                <a-form-item label="Desde el mes" name="mes">
                                    <a-date-picker v-model:value="form.mes" picker="month" placeholder="Mes"
                                        class="ancho" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="6">
                                <a-form-item label="Hasta el mes" name="mes">
                                    <a-date-picker v-model:value="form.mesb" picker="month" placeholder="Mes"
                                        class="ancho" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="6">
                                <a-form-item label="Año contable" name="mes">
                                    <a-date-picker v-model:value="form.ano" picker="year" placeholder="Ingrese año contable"
                                        class="ancho" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="6">
                                <a-form-item label="Dihitos" name="digitos">
                                    <a-input-number class="ancho" v-model:value="form.digitos" :min="1" :max="10" />
                                </a-form-item>
                            </a-col>

                            <a-col :span="24">
                                <a-row justify="center" class="margen-abajo ancho">

                                    <a-col :span="5">
                                        <a-checkbox v-model:checked="form.checkPleDiar">PLE Diario</a-checkbox>
                                    </a-col>
                                </a-row>

                            </a-col>
                        </a-row>

                    </a-row>

                </a-col>
            </a-row>

        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

// Buscador

const buscador = ref(null)

//  inicar proceso
const openPro = ref(false);

const showModalPro = () => {
    openPro.value = true;
};

const handleOkPro = (e) => {
    console.log(e);
    openPro.value = false;
};


//datos modal
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
});

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


// opciones

const options = ref([{
    label: 'Solo apertura',
    value: '01',
}, {
    label: 'Con Mov. Mensual',
    value: '02',
}, {
    label: 'Incluye Saldos Anteriores',
    value: '03',
}, {
    label: 'Incluye Scuentas de cierre',
    value: '04',
}, {
    label: 'Calc. Asiento Aut. T.Cambio',
    value: '05',
}]);




//zonas
const zonas = ref([{
    title: 'Todas las zonas',
    value: 'todas',
    children: [{
        title: 'Lino SAC',
        value: 'zona-a',
    }, {
        title: 'Zona b',
        value: 'zona-b',
    }],
}]);
watch(() => form.valorSucursal, (newValue) => {
    console.log(newValue);
});

// unidades

const unidades = ref([{
    title: 'Todos las unidades',
    value: 'todas',
    children: [{
        title: 'Lino SAC',
        value: 'unidad-a',
    }, {
        title: 'Unidad b',
        value: 'unidad-b',
    }],
}]);
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