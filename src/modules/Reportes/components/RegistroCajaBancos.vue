<template>
    

        <a-button type="primary" @click="showModal">Registro Caja y Bancos</a-button>
        <a-modal ok-text="Actualizar" cancel-text="Cancelar" v-model:open="open" width="700px"
            title="Registro de movimientos: Caja y Bancos Egreso" @ok="handleOk">
            <a-form :model="form" :rules="rules" layout="vertical">
                <a-config-provider :component-size="componentSize">
                <a-row :gutter="16" justify="center" class="margen-abajo">
                    <a-col :span="12">
                        <a-form-item label="Cta. Contable" name="ctaCont">
                            <a-select placeholder="Seleccione la cuenta contable" v-model:value="form.ctaCont" show-search
                                :options="ctaCont" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                                @change="handleChange"></a-select>
                        </a-form-item>

                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Tipo de operación" name="TipOper">
                            <a-select ref="select" v-model:value="form.TipOper" :options="optTipOper" @focus="focusTipo"
                                @change="handleChangeTipo" placeholder="Seleccione el tipo de operación"></a-select>
                        </a-form-item>
                    </a-col>

                </a-row>

                <a-row :gutter="16" align="bottom" class="color">
                    <a-col :span="9">
                        <a-checkbox v-model:checked="form.checProvee"></a-checkbox>
                        <a-form-item label="Proveedor" name="proveedor">
                            <a-select placeholder="Seleccione el proveedor" v-model:value="form.proveedor" show-search
                                :options="proveedor" :filter-option="filterOptionPro" @focus="handleFocusPro"
                                @blur="handleBlurPro" @change="handleChangePro"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="Tipo de doc." name="tipDoc">
                            <a-select placeholder="Seleccione el tipo de doc." v-model:value="form.tipDoc" show-search
                                :options="tipDoc" :filter-option="filterOptionTipDoc" @focus="handleFocusTipDoc"
                                @blur="handleBlurTipDoc" @change="handleChangeTipDoc"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item label="Nro Doc" name="NumDoc">
                            <a-input v-model:value="form.NumDoc" placeholder="Ingrese el número de doc." />
                        </a-form-item>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="Documento N°" name="tipDoc">
                            <a-select v-model:value="form.tipDoc" show-search :options="tipDoc"
                                :filter-option="filterOptionTipDoc" @focus="handleFocusTipDoc" @blur="handleBlurTipDoc"
                                @change="handleChangeTipDoc" disabled="true"></a-select>
                        </a-form-item>

                    </a-col>
                    <a-col :span="9">
                        <a-form-item>
                            <a-input disabled="" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="15">
                        <a-form-item label="Detalle" name="detalle">
                            <a-input v-model:value="form.detalle" placeholder="Ingrese el detalle" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="9">
                        <a-checkbox v-model:checked="form.checFecVen"><a-typography-text strong>Sin fecha
                                Vencto</a-typography-text></a-checkbox>
                        <a-form-item label="Fecha Emisión / Vencto" name="fecha">
                            <a-range-picker v-model:value="form['fecha']"
                                :placeholder="['Fecha emisión', 'Fecha vencto']" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Cta. Banco" name="ctaBanco">
                            <a-input v-model:value="form.ctaBanco" placeholder="Ingrese  la cta. banco" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-item>
                            <a-checkbox v-model:checked="form.checReparo"><a-typography-text
                                    strong>Reparo</a-typography-text></a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="C. Costo" name="CCosto">
                            <a-input v-model:value="form.CCosto" placeholder="Ingrese la C.Costo" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Flujo Efec." name="FlujEfec">
                            <a-input v-model:value="form.FlujEfec" placeholder="Ingrese flujo Efec." />
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Tipo de cambio" name="TipCamb">
                            <a-input-number v-model:value="form.TipCamb" placeholder="Ingrese el tipo de cambio">
                                <template #addonBefore>
                                    <a-select v-model:value="form.moneda" style="width: 60px">
                                        <a-select-option value="USD">$</a-select-option>
                                        <a-select-option value="EUR">€</a-select-option>
                                        <a-select-option value="GBP">£</a-select-option>
                                        <a-select-option value="CNY">¥</a-select-option>
                                        <a-select-option value="PER">S/</a-select-option>
                                    </a-select>
                                </template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="Debe" name="debe">
                            <a-input v-model:value="form.debe" placeholder="Ingrese el debe" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="7">
                        <a-form-item label="Haber" name="haber">
                            <a-input v-model:value="form.haber" placeholder="Ingrese el haber" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-item>
                            <a-checkbox v-model:checked="form.checReparo"><a-typography-text strong>Retención
                                    IGV</a-typography-text></a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :span="9">
                        <a-checkbox v-model:checked="form.checafectIGV"></a-checkbox>
                        <a-form-item label="Afecto IGV(18%)" name="afectIGV">
                            <a-input v-model:value="form.haber" placeholder="Ingrese" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row justify="center" class="ancho">
                    <a-col>
                        <a-button block :icon="h(EditOutlined)">Varios documentos</a-button>
                    </a-col>

                </a-row>
            </a-config-provider>
            </a-form>
        </a-modal>

</template>

<script setup>
import { ref, reactive, h } from 'vue'
import { PrinterOutlined, PlusOutlined, MinusOutlined, ArrowLeftOutlined, EditOutlined } from '@ant-design/icons-vue';
const componentSize = ref('middle');

const value1 = ref();

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
    ctaCont: null,
    proveedor: null,
    checProvee: false,
    tipDoc: null,
    NumDoc: null,
    detalle: null,
    fecha: null,
    checFecVen: false,
    ctaBanco: null,
    CCosto: null,
    FlujEfec: null,
    TipCamb: null,
    moneda: "PER",
    debe: null,
    haber: null,
    TipOper: null,
    checReparo: null,
    afectIGV: null,
    checafectIGV: false,
});

const rules = {
    ctaCont: [{
        required: true,
        message: 'Ingrese la ctaCont',
    }],
    proveedor: [{
        required: true,
        message: 'Ingrese el proveedor',
    }],
    tipDoc: [{
        required: true,
        message: 'Escriba el tipo de doc',
    }],
    NumDoc: [{
        required: true,
        message: 'Escriba el número de doc.',
    }],
    detalle: [{
        required: true,
        message: 'Escriba el detalle',
    }],
    fecha: [{
        required: true,
        message: 'Ingrese el rango de fechas',
    }],
    ctaBanco: [{
        required: true,
        message: 'Escriba ela cta. Banco',
    }],
    CCosto: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    FlujEfec: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    TipCamb: [{
        required: true,
        message: 'Escriba el tipo de cambio',
    }],
    debe: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    haber: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    TipOper: [{
        required: true,
        message: 'Seleccione el tipo de operación',
    }],

}



//select ctaCont
const ctaCont = ref([{
    value: '6211',
    label: 'Cta. contable a',
}, {
    value: '43111',
    label: 'Cta. contable b',
}, {
    value: '7312',
    label: 'Cta. contable c',
}, {
    value: '6361',
    label: 'Cta. contable d',
}]);

const handleChange = value => {
    console.log(`Seleccionado ${form.ctaCont}`);
};
const handleBlur = () => {
    console.log('blur');
};
const handleFocus = () => {
    console.log('focus');
};
const filterOption = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};


//select proveedor
const proveedor = ref([{
    value: '6211',
    label: 'Proveedor a',
}, {
    value: '43111',
    label: 'Proveedor b',
}, {
    value: '7312',
    label: 'Proveedor c',
}, {
    value: '6361',
    label: 'Proveedor d',
}]);

const handleChangePro = value => {
    console.log(`Seleccionado ${form.proveedor}`);
};
const handleBlurPro = () => {
    console.log('blur');
};
const handleFocusPro = () => {
    console.log('focus');
};
const filterOptionPro = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};


//select tipo de doc.
const tipDoc = ref([{
    value: '00',
    label: 'Tipo de doc. a',
}, {
    value: '01',
    label: 'Tipo de doc. b',
}, {
    value: '02',
    label: 'Tipo de doc. c',
}, {
    value: '03',
    label: 'Tipo de doc. d',
}]);

const handleChangeTipDoc = value => {
    console.log(`Seleccionado ${form.tipDoc}`);
};
const handleBlurTipDoc = () => {
    console.log('blur');
};
const handleFocusTipDoc = () => {
    console.log('focus');
};
const filterOptionTipDoc = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};



// Select tipo

const optTipOper = ref([{
    value: '001',
    label: 'Depósito en cuenta',
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

const focusTipo = () => {
    console.log('focus');
};
const handleChangeTipo = value => {
    console.log(`Seleccionado ${value}`);
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

.margen-abajo {
    margin-bottom: 30px;
}
</style>