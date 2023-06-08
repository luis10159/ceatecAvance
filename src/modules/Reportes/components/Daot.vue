<template>
    <a-button type="primary" @click="showModalPro">DAOT</a-button>

    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="openPro" width="500px" title="DAOT" @ok="handleOkPro">
        <a-form :model="form" :rules="roles" layout="vertical">

            <a-row :gutter="16" class="ancho margen-abajo" justify="center">
                <a-col :span="24">
                    <a-typography-text strong>Parámeteros</a-typography-text>
                </a-col>
                <a-col :span="12">

                    <a-form-item label="Nro. UIT" name="nroUIt">
                        <a-input v-model:value="form.nroUIt" placeholder="Ingrese el Nro. UIT" />
                    </a-form-item>

                </a-col>
                <a-col :span="12">
                    <a-form-item label="Año" name="ano">
                        <a-date-picker v-model:value="form.ano" picker="year" placeholder="Ingrese año" class="ancho" />
                    </a-form-item>
                </a-col>
                <a-divider />
                <a-col :span="12">
                    <a-radio-group v-model:value="form.checkA">
                        <a-radio :value="1">Resumido</a-radio>
                        <a-radio :value="2">Detallado</a-radio>
                    </a-radio-group>
                </a-col>
                <a-divider />
                <a-col :span="11">
                    <a-radio-group v-model:value="form.checkB">
                        <a-radio :value="1">Compras</a-radio>
                        <a-radio :value="2">ventas</a-radio>
                    </a-radio-group>
                </a-col>
                <a-divider />

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
    ano: null,
    digitos: 2,
    checkA: null,
    checkB: null,
    nroUIt: null,
});

const roles = {
    ano: [{
        required: true,
        message: 'Ingrese el año',
    }],
    nroUIT: [{
        required: true,
        message: 'Ingrese el Nro de UIT',
    }]
}




//sucursales
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
watch(() => form.valorSucursal, (newValue) => {
    console.log(newValue);
});

// departamentos

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