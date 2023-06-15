<template>
    <a-button type="primary" @click="showModal">Consultar Sunat</a-button>
    <a-modal ok-text="Actualizar" cancel-text="Cancelar" v-model:open="open" width="700px" title="Nuevo RUC" @ok="handleOk">
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16" align="middle" class="color margen-abajo">
                <a-col :span="12">
                    <a-form-item label="RUC" name="ruc">
                        <a-input v-model:value="form.ruc" placeholder="Ingrese el ruc" />
                    </a-form-item>
                    <a-form-item label="Código Captcha" name="CodCapt">
                        <a-input v-model:value="form.CodCapt" placeholder="Ingrese el código del captcha" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-button type="primary" block :icon="h(GlobalOutlined)">Consultar Sunat</a-button>
                </a-col>
                <a-col :span="6">
                    <a-button type="primary" block :icon="h(GlobalOutlined)">Captcha</a-button>
                </a-col>
            </a-row>
            <a-row :gutter="16" align="bottom" class="color">
                
                <a-col :span="12">
                    <a-form-item label="Razón social" name="razonSoc">
                        <a-input v-model:value="form.razonSoc" placeholder="Ingrese la razón social" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Nombre comercial" name="NomComer">
                        <a-input v-model:value="form.NomComer" placeholder="Ingrese el nombre comercial" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Estado" name="estado">
                        <a-input v-model:value="form.estado" placeholder="Ingrese estado" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="Condición" name="condicion">
                        <a-input v-model:value="form.condicion" placeholder="Ingrese la razón social" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="Dirección" name="direccion">
                        <a-input v-model:value="form.direccion" placeholder="Ingrese la direccion" />
                    </a-form-item>
                </a-col>
                <a-col :span="16">
                    <a-form-item label="Teléfono" name="telefono">
                        <a-input v-model:value="form.telefono" placeholder="Ingrese el teléfono" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Tipo" name="tipo">
                        <a-input v-model:value="form.tipo" placeholder="Ingrese tipo" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Sis. Emisión Comprobante" name="SisEmCom">
                        <a-input v-model:value="form.SisEmCom" placeholder="Ingrese Sis. Emisión Comprobante" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="F. Inscripción" name="FecInscri">
                        <a-input v-model:value="form.FecInscri" placeholder="Ingrese F. Inscripción" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="F. Inicio Act." name="FeIniAct">
                        <a-input v-model:value="form.razonSoc" placeholder="Ingrese la F. Inicio Act." />
                    </a-form-item>
                </a-col>
            </a-row>
            
        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { GlobalOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';


const open = ref(false);

const showModal = () => {
    open.value = true;
};

const handleOk = (e) => {
    console.log(e);
    open.value = false;
};


//datos modal
const form = reactive({
    ruc: null,

    CodCapt: null,
    NomComer: null,
    razonSoc: null,
    estado: null,
    condicion: null,
    repreLegal: null,
    direccion: null,
    telefono: null,
    tipo: null,
    SisEmCom: null,
    FecInscri: null,
    FeIniAct: null,

});

const rules = {
    ruc: [{
        required: true,
        message: 'Ingrese el ruc',
    }],
    CodCapt: [{
        required: true,
        message: 'Ingrese el tipo de doc.',
    }],
    NomComer: [{
        required: true,
        message: 'ingrese el nombre comercial',
    }],
    razonSoc: [{
        required: true,
        message: 'Ingrese la razón social',
    }],
    estado: [{
        required: true,
        message: 'Escriba el estado',
    }],
    condicion: [{
        required: true,
        message: 'Escriba la condición',
    }],
    telefono: [{
        required: true,
        message: 'Escriba el teléfono',
    }],
    direccion: [{
        required: true,
        message: 'Ingrese la dirección',
    }],
    tipo: [{
        required: true,
        message: 'Ingrese el representante legal',
    }],
    SisEmCom: [{
        required: true,
        message: 'Escriba el teléfono',
    }],
    FecInscri: [{
        required: true,
        message: 'Escriba el cobrador',
    }],
    FeIniAct: [{
        required: true,
        message: 'Escriba un correo valido',
        type: 'email',
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