<template>
    <a-button type="primary" @click="showModal">Registro planillas B</a-button>
    <a-modal ok-text="Guardar" cancel-text="Cancelar" v-model:open="open" width="700px"
        title="Registro de movimientos: Planillas B" @ok="handleOk">
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16" justify="space-between" class="margen-abajo">
                <a-col :span="12">
                    <a-form-item label="Empleado" name="empleado">
                        <a-select placeholder="Seleccione el empleado" v-model:value="form.empleado" show-search
                            :options="empleado" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                            @change="handleChange"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="C. Costo" name="CCosto">
                        <a-input v-model:value="form.CCosto" placeholder="Ingrese la C.Costo" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="16" align="bottom" class="color">
                <a-col :span="4">
                    <a-checkbox v-model:checked="form.checkDoc">Documento</a-checkbox>
                    <a-form-item name="documento">
                        <a-select placeholder="Seleccione el documento" v-model:value="form.documento" show-search
                            :options="documento" :filter-option="filterOptionDoc" @focus="handleFocusDoc"
                            @blur="handleBlurDoc" @change="handleChangeDoc"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item name="tipDoc">
                        <a-input v-model:value="form.NumDoc" placeholder="Ingrese el N documento" />
                    </a-form-item>
                </a-col>
                <a-col :span="14">
                    <a-form-item label="Detalle" name="detalle">
                        <a-input v-model:value="form.detalle" placeholder="Ingrese el detalle" />
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-checkbox v-model:checked="form.checFecVen"><a-typography-text strong>Sin fecha
                            Vencto</a-typography-text></a-checkbox>
                    <a-form-item label="Fecha Emisión / Vencto" name="fecha">
                        <a-range-picker v-model:value="form['fecha']" :placeholder="['Fecha emisión', 'Fecha vencto']" />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
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
                <a-col :span="7">
                    <a-form-item label="Sueldo y salarios" name="sueldo">
                        <a-input-number class="ancho" v-model:value="form.sueldo" placeholder="Ingrese el sueldo" />
                    </a-form-item>
                </a-col>
                <a-row :gutter="16" align="middle" class="padding">
                    <a-col :span="6">
                        <a-form-item label="Asig. Familiar" name="asigFamil">
                            <a-input-number class="ancho" v-model:value="form.asigFamil"
                                placeholder="Ingrese la Asig. Familiar" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkAsigFaA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkAsigFaB">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item label="Sis. Privado Pensiones" name="SisPriPen">
                            <a-select ref="select" v-model:value="form.SisPriPen" :options="optSisPriPen" @focus="focusTipo"
                                @change="handleChangeTipo" placeholder="Seleccione Sis. Privado Pensiones"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding">
                    <a-col :span="6">
                        <a-form-item label="Bonificaciones" name="bonificaciones">
                            <a-input-number class="ancho" v-model:value="form.bonificaciones"
                                placeholder="Ingrese la bonificación" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkBonifiA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkBonifiB">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item label="Monto SPP" name="MontoSPP">
                            <a-input-number class="ancho" v-model:value="form.MontoSPP"
                                placeholder="Ingrese el monto SPP" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Riesgo de caja" name="riesCaja">
                            <a-input-number class="ancho" v-model:value="form.riesCaja"
                                placeholder="Ingrese por riesgo de caja" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkRiesCaA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkRiesCab">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-row :gutter="16" align="middle" justify="end">
                            <a-col :span="8">
                                <a-checkbox v-model:checked="form.checkDoc">SCTR</a-checkbox>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="SCTR" class="margen-arriba">
                                    <a-input-number class="ancho" v-model:value="form.SCTR" placeholder="Ingrese el SCTR" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Vacaciones" name="vacaciones">
                            <a-input-number class="ancho" v-model:value="form.vacaciones"
                                placeholder="Ingrese por vacaciones" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkVacacA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkVacacB">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item>
                            <a-input-number class="ancho" style="visibility: hidden;" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Horas Extras" name="horasExt">
                            <a-input-number class="ancho" v-model:value="form.horasExt"
                                placeholder="Ingrese las horas extras" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkHorExtA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkHorExtA">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item label="Total Remuneración" name="ToRemun">
                            <a-input-number class="ancho" v-model:value="form.ToRemun" placeholder="Ingrese el total" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Escolaridad" name="escolaridad">
                            <a-input-number class="ancho" v-model:value="form.escolaridad"
                                placeholder="Ingrese la escolaridad" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkEscolA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkEscolA">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item label="CTS" name="cts">
                            <a-input-number class="ancho" v-model:value="form.cts" placeholder="Ingrese el CTS" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Otras remunera." name="otrasRemu">
                            <a-input-number class="ancho" v-model:value="form.otrasRemu"
                                placeholder="Ingrese otras remuneraciones" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkOtrasRemuA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkOtrasRemuB">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-row :gutter="16" align="middle" justify="end">
                            <a-col :span="12">
                                <a-form-item label="Renta 5ta Cat" class="margen-arriba">
                                    <a-checkbox v-model:checked="form.checkRenta5ta"></a-checkbox>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="renta5ta" class="margen-arriba">
                                    <a-input-number class="ancho" v-model:value="form.renta5ta"
                                        placeholder="Ingrese la renta 5ta Cat." />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Gratificación" name="gratificacion">
                            <a-input-number class="ancho" v-model:value="form.gratificacion"
                                placeholder="Ingrese la gratificación" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkGratA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkGratB">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-row :gutter="16" align="middle" justify="end">
                            <a-col :span="12">
                                <a-form-item label="Reg. Prestaciones Salud (ESSALUD)" class="margen-arriba">
                                    <a-checkbox v-model:checked="form.checkRegPres"></a-checkbox>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item name="RegPrestSal" class="margen-arriba">
                                    <a-input-number class="ancho" v-model:value="form.RegPrestSal"
                                        placeholder="Ingrese el SCTR" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Otros" name="otros">
                            <a-input-number class="ancho" v-model:value="form.otros" placeholder="Ingrese otros" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.otrosA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.otrosB">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-form-item>
                            <a-input-number class="ancho" style="visibility: hidden;" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" align="middle" class="padding" v-show="mostrar">
                    <a-col :span="6">
                        <a-form-item label="Total de ingreso" name="totalIngreso">
                            <a-input-number class="ancho" v-model:value="form.totalIngreso"
                                placeholder="Ingrese el toal de ingreso" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkTotIngA">Inc. SPP</a-checkbox>
                    </a-col>
                    <a-col :span="5">
                        <a-checkbox v-model:checked="form.checkTotIngB">Inc. Essalud</a-checkbox>
                    </a-col>
                    <a-col :span="9">
                        <a-checkbox style="visibility: hidden;">Cancelar</a-checkbox>

                    </a-col>
                </a-row>
                <a-row justify="center" class="ancho color" v-show="mostrar">
                    <a-col :span="4">
                        <a-checkbox v-model:checked="form.checkCancelar">
                            <a-typography-text strong>Cancelar</a-typography-text>
                        </a-checkbox>
                    </a-col>
                </a-row>
            </a-row>

            <a-row justify="center">
                <a-col>
                    <a-button type="dashed" class="ancho" @click="mostrarFilas">
                        <PlusOutlined />
                        Mostar/Ocultar filas restantes
                    </a-button>
                </a-col>
            </a-row>

        </a-form>
    </a-modal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue';

// mostar filas
const mostrar = ref(false);
const mostrarFilas = () => {
    if (mostrar.value == false) {
        mostrar.value = true
    } else {
        mostrar.value = false
    }

}


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
    empleado: null,
    documento: null,
    checkDoc: false,
    tipDoc: null,
    NumDoc: null,
    sueldo: null,
    fecha: null,
    checFecVen: false,
    detalle: null,
    CCosto: null,
    asigFamil: null,
    TipCamb: null,
    moneda: "PER",
    bonificaciones: null,
    riesCaja: null,
    SisPriPen: null,
    MontoSPP: null,
    SCTR: null,
    ToRemun: null,
    cts: null,
    vacaciones: null,
    horasExt: null,
    escolaridad: null,
    otrasRemu: null,
    renta5ta: null,
    gratificacion: null,
    RegPrestSal: null,
    otros: null,
    totalIngreso: null,
    checkAsigFaA: false,
    checkAsigFaB: false,
    checkBonifiA: false,
    checkBonifiB: false,
    checkRiesCaA: false,
    checkRiesCab: false,
    checkVacacA: false,
    checkVacacB: false,
    checkHorExtA: false,
    checkHorExtB: false,
    checkEscolA: false,
    checkEscolB: false,
    checkOtrasRemuA: false,
    checkOtrasRemuB: false,
    checkRenta5ta: false,
    checkGratA: false,
    checkGratB: false,
    checkRegPres: false,
    otrosA: false,
    otrosB: false,
    checkTotIngA: false,
    checkTotIngB: false,
    checkCancelar: false,
});

const rules = {
    empleado: [{
        required: true,
        message: 'Ingrese el empleado',
    }],
    documento: [{
        required: true,
        message: 'Ingrese el documento',
    }],
    tipDoc: [{
        required: true,
        message: 'Escriba el tipo de doc',
    }],
    NumDoc: [{
        required: true,
        message: 'Escriba el número de doc.',
    }],
    sueldo: [{
        required: true,
        message: 'Escriba el sueldo y salarios',
    }],
    fecha: [{
        required: true,
        message: 'Ingrese el rango de fechas',
    }],
    detalle: [{
        required: true,
        message: 'Escriba el detalle',
    }],
    CCosto: [{
        required: true,
        message: 'Escriba la C. Costo',
        type: 'email',
    }],
    asigFamil: [{
        required: true,
        message: 'Escriba la Asig. Familiar',
        type: 'email',
    }],
    TipCamb: [{
        required: true,
        message: 'Escriba el tipo de cambio',
    }],
    bonificaciones: [{
        required: true,
        message: 'Ingrese la bonificacióm',

    }],
    riesCaja: [{
        required: true,
        message: 'ingrese riesgo de caja',
    }],
    SisPriPen: [{
        required: true,
        message: 'Seleccione el sis. privado de pensiones',
    }],
    MontoSPP: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    ToRemun: [{
        required: true,
        message: 'Ingrese un valor válido',
    }],
    cts: [{
        required: true,
        message: 'Escriba el CTS',
    }],
    haber: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    haber: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],
    haber: [{
        required: true,
        message: 'Escriba la C. Costo',
    }],

}



//select empleado
const empleado = ref([{
    value: '6211',
    label: 'Empleado a',
}, {
    value: '43111',
    label: 'Empleado b',
}, {
    value: '8888',
    label: 'Empleado c',
}, {
    value: '6361',
    label: 'Empleado d',
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


//select documento
const documento = ref([{
    value: '6211',
    label: 'Documento a',
}, {
    value: '43111',
    label: 'Documento b',
}, {
    value: '7312',
    label: 'Documento c',
}, {
    value: '6361',
    label: 'Documento d',
}]);

const handleChangeDoc = value => {
    console.log(`Seleccionado ${form.proveedor}`);
};
const handleBlurDoc = () => {
    console.log('blur');
};
const handleFocusDoc = () => {
    console.log('focus');
};
const filterOptionDoc = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};

// Select tipo

const optSisPriPen = ref([{
    value: '001',
    label: 'ONP - 13.00 %',
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

.margen-arriba {
    margin-top: 25px;
}

.padding {
    padding: 0 8px;
}
</style>