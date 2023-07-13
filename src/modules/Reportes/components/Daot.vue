<template>
    <!-- Modal DAOT -->
    <a-modal ok-text="Aceptar" cancel-text="Cancelar" v-model:open="store.daot" width="500px" title="DAOT" @ok="handleOkPro">
        <!-- Formulario -->
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
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { reactive } from 'vue'
// Función que se ejecuta al apretar aceptar en cuentas por cobrar
const handleOkPro = (e) => {
    console.log(e);
    store.daot = false;
};
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    ano: null,
    digitos: 2,
    checkA: null,
    checkB: null,
    nroUIt: null,
});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
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
</script>

<style lang="scss" scoped>
.ancho {
    width: 100%;
}

.margen-abajo {
    margin-bottom: 20px;
}
</style>