<template>
    <!-- Modal actualización de movimientos -->
    <a-modal v-model:open="store.movimientos" width="1000px" title="Registro de Movimientos - Registro de Ventas" ok-text="Guardar"
        cancel-text="Cancelar" @ok="handleOk">
        <!-- Formulario -->
        <a-form :model="form" :rules="rules" layout="vertical">
            <a-row :gutter="16" justify="space-between">
                <a-col :span="10">
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-item label="Cuenta contable" name="ctaConta">
                                <a-select placeholder="Seleccione una cuenta contable" v-model:value="form.ctaConta"
                                    show-search :options="optCuentaCont" :filter-option="filterOption" @focus="handleFocus"
                                    @blur="handleBlur" @change="handleChange"></a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="Cta. Abono" name="ctaAbono">
                                <a-select placeholder="Seleccione una cuenta contable" v-model:value="form.ctaAbono"
                                    show-search :options="optCuentaAbo" :filter-option="filterOptionAbon"
                                    @focus="handleFocusAbon" @blur="handleBlurAbon" @change="handleChangeAbon"></a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="9">
                    <a-checkbox v-model:checked="form.aduana" class="margen-check">Aduana</a-checkbox>
                    <a-row :gutter="16" class="color">
                        <a-col :span="24">
                            <a-form-item label="Sede" name="sede">
                                <a-select ref="select" v-model:value="form.sede" :options="optSede" @focus="focusSede"
                                    @change="handleChangeSede" placeholder="Seleccione la sede"></a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Fecha" name="fecha">
                                <a-date-picker class="ancho" v-model:value="form.fecha" placeholder="seleccione la fecha" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Hora" name="hora">
                                <a-time-picker class="ancho" placeholder="Seleccione la hora" v-model:value="form.hora" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="5">
                    <a-form-item label="Proveedor" name="proveedor">
                        <a-select placeholder="Seleccione una cuenta contable" v-model:value="form.proveedor" show-search
                            :options="optCuentaPro" :filter-option="filterOptionPro" @focus="handleFocusPro"
                            @blur="handleBlurPro" @change="handleChangePro" @click="store.cambiarMantCliProv()"></a-select>
                        <!-- Verificar click -->
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="Tipo de Doc N°" name="tipoDoc">
                        <a-select placeholder="Seleccione una cuenta contable" v-model:value="form.tipoDoc" show-search
                            :options="optTipoDoc" :filter-option="filterOptionDoc" @focus="handleFocusDoc"
                            @blur="handleBlurDoc" @change="handleChangeDoc"></a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="Serie" name="serie">
                        <a-input v-model:value="form.serie" placeholder="Ingrese la serie" />
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item label="N°" name="numero">
                        <a-input v-model:value="form.numero" placeholder="Ingrese el número" />
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="Fecha de emisión" name="fechaEmision">
                        <a-date-picker class="ancho" placeholder="Seleccione la fecha de emisión"
                            v-model:value="form.fechaEmision" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16" justify="end">
                <a-col :span="5">
                    <a-form-item label="Doc. Cancelación N°" name="docCancel">
                        <a-input v-model:value="form.docCancel" placeholder="Ingrese el N° del Doc. Cancelación" />
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="Serie" name="serieC">
                        <a-input v-model:value="form.serieC" placeholder="Ingrese la serie" />
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item label="N°" name="numeroC">
                        <a-input v-model:value="form.numeroC" placeholder="Ingrese el número" />
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="Fecha de vencimiento" name="fechaVenci">
                        <a-date-picker class="ancho" placeholder="Seleccione la fecha de vencimiento"
                            v-model:value="form.fechaVenci" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="19">
                    <a-row :gutter="16" align="bottom">
                        <a-col :span="18">
                            <a-form-item label="Glosario" name="glosario">
                                <a-input v-model:value="form.glosario" placeholder="Ingrese el glosario" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-checkbox v-model:checked="form.reparo" class="check">Reparo</a-checkbox>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="C. Costos" name="cCostos">
                                <a-input v-model:value="form.cCostos" placeholder="Ingrese los costos" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Flujo Efec." name="flujoE">
                                <a-input v-model:value="form.flujoE" placeholder="Ingrese el fujo efectivo" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Moneda" name="moneda">
                                <a-select ref="select" v-model:value="form.moneda" :options="optMone" @focus="focusMone"
                                    @change="handleChangeMone" placeholder="Seleccione la moneda"></a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Tipo de cambio" name="tipoCambio">
                                <a-input v-model:value="form.cCostos" placeholder="Ingrese el tipo de cambio" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="Tipo de operación" name="optOpe">
                                <a-select ref="select" v-model:value="form.tipoOpe" :options="optOpe" @focus="focusOpe"
                                    @change="handleChangeOpe" placeholder="Seleccione el tipo de operación"></a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Debe" name="debe">
                                <a-input v-model:value="form.debe" placeholder="Ingrese el debe" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Haber" name="haber">
                                <a-input v-model:value="form.haber" placeholder="Ingrese el haber" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox v-model:checked="form.detraccionCheck" class="margen-check">Detracción</a-checkbox>
                            <a-row :gutter="16" class="color">
                                <a-col :span="24">
                                    <a-form-item label="Detracción" name="detraccion">
                                        <a-select ref="select" v-model:value="form.detraccion" :options="optDet"
                                            @focus="focusDet" @change="handleChangeDet"
                                            placeholder="Seleccione la sede"></a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="7">
                                    <a-form-item label="Hora" name="horaDetr">
                                        <a-time-picker class="ancho" placeholder="Seleccione la hora"
                                            v-model:value="form.horaDetr" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="7">
                                    <a-form-item label="N°" name="numeroDetr">
                                        <a-input v-model:value="form.numeroDetr" placeholder="Ingrese el número" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="10">
                                    <a-form-item label="Fecha" name="fechaDetr">
                                        <a-date-picker class="ancho" v-model:value="form.fechaDetr"
                                            placeholder="seleccione la fecha" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :span="12">
                            <a-checkbox v-model:checked="form.percepcionCheck" class="margen-check">Percepción</a-checkbox>
                            <a-row :gutter="16" class="color">
                                <a-col :span="24">
                                    <a-form-item label="Percepción" name="percepcion">
                                        <a-select ref="select" v-model:value="form.percepcion" :options="optPer"
                                            @focus="focusPer" @change="handleChangePer"
                                            placeholder="Seleccione la sede"></a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="7">
                                    <a-form-item label="Hora" name="horaPer">
                                        <a-time-picker class="ancho" placeholder="Seleccione la hora"
                                            v-model:value="form.horaPer" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="7">
                                    <a-form-item label="N°" name="numeroPer">
                                        <a-input v-model:value="form.numeroPer" placeholder="Ingrese el número" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="10">
                                    <a-form-item label="Fecha" name="fechaPer">
                                        <a-date-picker class="ancho" v-model:value="form.fechaPer"
                                            placeholder="seleccione la fecha" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :span="6">
                            <a-checkbox v-model:checked="form.ctaICBPERaCheck" class="margen-check">Cta. ICBPER</a-checkbox>
                            <a-form-item name="ctaICBPERa">
                                <a-input v-model:value="form.ctaICBPERa" placeholder="Ingrese Cta. ICBPER" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Cuenta ICBPER" name="ctaICBPERb">
                                <a-input v-model:value="form.ctaICBPERb" placeholder="Ingrese la cuenta ICBPER" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-checkbox v-model:checked="form.ctaICBPERbCheck" class="margen-check">Cta. Auxiliar
                                Ajuste</a-checkbox>
                            <a-form-item name="ctaAuxAjus">
                                <a-input v-model:value="form.ctaAuxAjus" placeholder="Ingrese la cuenta auxiliar ajuste" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="Cuenta ajuste" name="ctaAjus">
                                <a-input v-model:value="form.ctaAjus" placeholder="Ingrese la cuenta ajuste" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="5">
                    <a-row class="margen-check">Impuestos</a-row>
                    <a-row :gutter="16" align="bottom" class="color">
                        <a-col :span="24">
                            <a-checkbox v-model:checked="form.costeoIGVCheck" class="margen-check">Costeo IGV</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                            <a-checkbox v-model:checked="form.afectoIGVCheck" class="margen-check">Afecto IGV
                                (19%)</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="IGV" name="IGV">
                                <a-input v-model:value="form.IGV" placeholder="Ingrese el IGV" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-checkbox v-model:checked="form.retIGVCheck" class="margen-check">Retención IGV
                                (%)</a-checkbox>
                            <a-form-item name="retIGV">
                                <a-input v-model:value="form.retIGV" placeholder="Ingrese la retención IGV (%)" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="=" name="igual">
                                <a-input v-model:value="form.igual" placeholder="=" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-checkbox v-model:checked="form.ret4taCheck" class="margen-check">Ret 4ta (15%)</a-checkbox>
                            <a-form-item name="ret4ta">
                                <a-input v-model:value="form.ret4ta" placeholder="=" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-checkbox v-model:checked="form.iscCheck" class="margen-check">ISC (5%)</a-checkbox>
                            <a-form-item name="isc">
                                <a-input v-model:value="form.isc" placeholder="Ingrese el ISC" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
    <MantClienteProv></MantClienteProv>
</template>

<script setup>
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Importar funciones de vue
import { ref, reactive, defineAsyncComponent } from 'vue'
// Importar componentes de ant desing vue
// Importar componentes
const MantClienteProv = defineAsyncComponent(() => import('@/modules/Reportes/components/MantClienteProv.vue'));
// Función que se ejecuta al apretar aceptar en actualización de movimientos
const handleOk = () => {
    console.log(form);
    store.movimientos = false;
};
// Objeto reactivo que va a capturar los campos en el formulario
const form = reactive({
    ctaConta: null,
    sede: null,
    ctaAbono: null,
    serie: null,
    serieC: null,
    proveedor: null,
    tipoDoc: null,
    numero: null,
    numeroC: null,
    aduana: false,
    fecha: null,
    hora: null,
    fechaEmision: null,
    fechaVenci: null,
    docCancel: null,
    glosario: null,
    reparo: false,
    cCostos: null,
    flujoE: null,
    tipoCambio: null,
    tipoOpe: null,
    debe: null,
    haber: null,
    detraccion: null,
    horaDetr: null,
    numeroDetr: null,
    fechaDetr: null,
    percepcion: null,
    numeroPer: null,
    fechaPer: null,
    horaPer: null,
    ctaICBPERa: null,
    ctaICBPERb: null,
    ctaAuxAjus: null,
    ctaAjus: null,
    IGV: null,
    retIGV: null,
    ret4ta: null,
    isc: null,
    igual: null,
    detraccionCheck: false,
    percepcionCheck: false,
    ctaICBPERaCheck: false,
    ctaICBPERbCheck: false,
    costeoIGVCheck: false,
    afectoIGVCheck: false,
    retIGVCheck: false,
    ret4taCheck: false,
    iscCheck: false,

});
// Detalle de los campos, mensaje al ingresar un dato no válido 
// y si es un campo requerido o no
const rules = {
    ctaConta: [{
        required: true,
        message: 'Ingrese la cuenta contable',
    }],
    sede: [{
        required: true,
        message: 'Ingresa la sede',
    }],
    ctaAbono: [{
        required: true,
        message: 'Ingrese la Cta. Abono',
    }],
    serie: [{
        required: true,
        message: 'Ingrese la serie',
    }],
    serieC: [{
        required: true,
        message: 'Ingrese la serie',
    }],
    proveedor: [{
        required: true,
        message: 'Ingrese el proveedor',
    }],
    tipoDoc: [{
        required: true,
        message: 'Ingrese el tipo de documento',
    }],
    numero: [{
        required: true,
        message: 'Ingrese el número',
    }],
    numeroC: [{
        required: true,
        message: 'Ingrese el número',
    }],
    fecha: [{
        required: true,
        message: 'seleccione una fecha',
        type: 'object',
    }],
    hora: [{
        required: true,
        message: 'Seleccione la hora',
        type: 'object',
    }],
    fechaEmision: [{
        required: true,
        message: 'Seleccione la fecha de emisión',
        type: 'object',
    }],
    fechaVenci: [{
        required: true,
        message: 'Seleccione la fecha de vencimiento',
        type: 'object',
    }],
    docCancel: [{
        required: true,
        message: 'Ingrese el N° del Doc. Cancelación',
    }],
    glosario: [{
        required: true,
        message: 'Ingrese el glosario',
    }],
    reparo: [{
        required: true,
        message: 'Ingrese el reparo',
    }],
    cCostos: [{
        required: true,
        message: 'Ingrese el N° del Doc. Cancelación',
    }],
    flujoE: [{
        required: true,
        message: 'Ingrese el flujo efectivo',
    }],
    moneda: [{
        required: true,
        message: 'Ingrese la modena',
    }],
    percepcion: [{
        required: true,
        message: 'Ingrese la percepción',
    }],
    tipoOpe: [{
        required: true,
        message: 'Ingrese el tipo de operación',
    }],
    debe: [{
        required: true,
        message: 'Ingrese el debe',
    }],
    haber: [{
        required: true,
        message: 'Ingrese el haber',
    }],
    detraccion: [{
        required: true,
        message: 'Ingrese la detracción',
    }],
    horaDetr: [{
        required: true,
        message: 'Ingrese la hora',
        type: 'object',
    }],
    numeroDetr: [{
        required: true,
        message: 'Ingrese el número',
    }],
    fechaDetr: [{
        required: true,
        message: 'Ingrese la fecha',
        type: 'object',
    }],
    percepcion: [{
        required: true,
        message: 'Ingrese la percepción',
    }],
    horaPer: [{
        required: true,
        message: 'Ingrese la hora',
        type: 'object',
    }],
    numeroPer: [{
        required: true,
        message: 'Ingrese el número',
    }],
    fechaPer: [{
        required: true,
        message: 'Ingrese la fecha',
        type: 'object',
    }],
    ctaICBPERa: [{
        required: true,
        message: 'Ingrese Cta. ICBPER',
    }],
    ctaICBPERb: [{
        required: true,
        message: 'Ingrese la cuenta ICBPER',
    }],
    ctaAuxAjus: [{
        required: true,
        message: 'Ingrese la cuenta auxiliar',
    }],
    ctaAjus: [{
        required: true,
        message: 'Ingrese la cuenta ajuste',
    }],
    IGV: [{
        required: true,
        message: 'Ingrese el IGV',
    }],
    retIGV: [{
        required: true,
        message: 'Ingrese la retención IGV (19%)',
    }],
    ret4ta: [{
        required: true,
        message: 'Ingrese la Ret 4ta (15%)',
    }],
    isc: [{
        required: true,
        message: 'Ingrese el ISC (5%)',
    }],
    igual: [{
        required: true,
        message: 'Ingrese el ISC (5%)',
    }]
};
//------ select - cuenta contable
// Objeto con los datos que se mostrarán en el select
const optCuentaCont = ref([{
    value: '6311',
    label: 'Transporte',
}, {
    value: '43111',
    label: 'De carga',
}, {
    value: '6312',
    label: 'Correos',
}, {
    value: '6361',
    label: 'Energia electrica',
}]);
// Función que imprime valor cada que es cambiado
const handleChange = value => {
    console.log(`Seleccionado ${form.ctaConta}`);
};
// Función que imprime un valor cuando está en blur
const handleBlur = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocus = () => {
    console.log('focus');
};
// Búsqueda
const filterOption = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
//--------- select - cuenta abono
// Objeto con los datos que se mostrarán en el select
const optCuentaPro = ref([{
    value: '25667891237',
    label: 'Promotora Oriantal S.A.C',
}, {
    value: '29666891237',
    label: 'Shilcayo Grifo S.R.L',
}, {
    value: '21667891237',
    label: 'Empresa de Transporte Picota S.A.C',
}, {
    value: '24967891237',
    label: 'Petro Perú S.A.C',
}]);
// Funión que imprime un valor cada que es cambiado
const handleChangePro = value => {
    console.log(`Seleccionado ${form.ctaConta}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurPro = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusPro = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionPro = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
//--------- select - cuenta abono
// Objeto con los datos que se mostrarán en el select
const optCuentaAbo = ref([{
    value: '4212',
    label: 'Emitidas',
}, {
    value: '4213',
    label: 'Emitidas 2',
}, {
    value: '4413',
    label: 'Emitidas 3',
}, {
    value: '4030',
    label: 'Emitidas 4',
}]);
// Función que imprime los valores cada que es cambiado
const handleChangeAbon = value => {
    console.log(`Seleccionado ${form.ctaConta}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurAbon = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusAbon = () => {
    console.log('focus');
};
// Función que realiza la búsqueda
const filterOptionAbon = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};

// --------- Select - Tipo de docuemnto
// Objeto con los datos que se mostrarán en el select
const optTipoDoc = ref([{
    value: '01',
    label: 'FAC',
}, {
    value: '02',
    label: 'FAC 2',
}, {
    value: '03',
    label: 'FAC 3',
}]);
// Función que imprime valor cada que es cambiado
const handleChangeDoc = value => {
    console.log(`Seleccionado ${form.ctaConta}`);
};
// Función que imprime un valor cuando está en blur
const handleBlurDoc = () => {
    console.log('blur');
};
// Función que imprime un valor cuando está en Focus
const handleFocusDoc = () => {
    console.log('focus');
};
// Búsqueda
const filterOptionDoc = (input, option) => {
    const inputValue = input.toLowerCase();
    return option.value.toLowerCase().indexOf(inputValue) >= 0 || option.label.toLowerCase().indexOf(inputValue) >= 0;
};
// --------- select - sede
// Objeto con los datos que se mostrarán en el select
const optSede = ref([{
    value: '001',
    label: 'Tumbes',
}, {
    value: '002',
    label: 'Tumbes A',
}, {
    value: '003',
    label: 'Tumbes B',
}, {
    value: '004',
    label: 'Tumbes C',
}]);
// Función que imprime un valor cuando está en Focus
const focusSede = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangeSede = value => {
    console.log(`Seleccionado ${value}`);
};
//--------- select - Moneda
// Objeto con los datos que se mostrarán en el select
const optMone = ref([{
    value: '001',
    label: 'Euro',
}, {
    value: '002',
    label: 'Soles',
}, {
    value: '003',
    label: 'Moneda A',
}, {
    value: '004',
    label: 'Moneda B',
}]);
// Función que imprime un valor cuando está en Focus
const focusMone = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangeMone = value => {
    console.log(`Seleccionado ${value}`);
};
//----------- select - Tipo de operación
// Objeto con los datos que se mostrarán en el select
const optOpe = ref([{
    value: '001',
    label: 'Operación A',
}, {
    value: '002',
    label: 'Operación B',
}, {
    value: '003',
    label: 'Operación C',
}, {
    value: '004',
    label: 'Operación D',
}]);
// Función que imprime un valor cuando está en Focus
const focusOpe = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangeOpe = value => {
    console.log(`Seleccionado ${value}`);
};
//---------- select - detracción
// Objeto con los datos que se mostrarán en el select
const optDet = ref([{
    value: '001',
    label: 'Sede A',
}, {
    value: '002',
    label: 'Sede B',
}, {
    value: '003',
    label: 'Sede C',
}, {
    value: '004',
    label: 'Sede D',
}]);
// Función que imprime un valor cuando está en Focus
const focusDet = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangeDet = value => {
    console.log(`Seleccionado ${value}`);
};
//---------- select - percepción
// Objeto con los datos que se mostrarán en el select
const optPer = ref([{
    value: '001',
    label: 'Sede A',
}, {
    value: '002',
    label: 'Sede B',
}, {
    value: '003',
    label: 'Sede C',
}, {
    value: '004',
    label: 'Sede D',
}]);
// Función que imprime un valor cuando está en Focus
const focusPer = () => {
    console.log('focus');
};
// Función que imprime valor cada que es cambiado
const handleChangePer = value => {
    console.log(`Seleccionado ${value}`);
};
</script>

<style lang="scss" scoped>
.ancho {
    width: 100%;
}

.color {
    border: 2px solid rgba(0, 89, 255, 0.080);
    background-color: rgba(5, 170, 247, 0.024);
    border-radius: 10px
}

.margen-check {
    margin-bottom: 10px;
    font-weight: bold;
}

.check {
    margin-bottom: 30px;
    font-weight: bold;
}
</style>