<template>
  <a-form :model="form" layout="vertical" class="row-btn">
    <a-row justify="space-around">
      <a-col :span="5">
        <a-form-item label="Porcentaje IGV" name="porcIGV">
          <a-input-number class="ancho" v-model:value="porcentajes.porcIGV" :min="0" :max="100"
            :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
        </a-form-item>
      </a-col>

      <a-col :span="5">
        <a-form-item label="Porcentaje ISC" name="porcISC">
          <a-input-number class="ancho" v-model:value="porcentajes.porcISC" :min="0" :max="100"
            :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
        </a-form-item>
      </a-col>

      <a-col :span="5">
        <a-form-item label="Porcentaje Retención IGV" name="porcRIGV">
          <a-input-number class="ancho" v-model:value="porcentajes.porcISC" :min="0" :max="100"
            :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col :span="5">
        <a-form-item label="Porcentaje Retención 4ta" name="porcR4ta">
          <a-input-number class="ancho" v-model:value="porcentajes.porcISC" :min="0" :max="100"
            :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" />
        </a-form-item>
      </a-col>

      <a-col :span="5">
        <a-form-item label="Valor minimo para Retención 4ta" name="ValorMinR4ta">
          <a-input-number class="ancho" v-model:value="porcentajes.ValorMinR4ta"
            placeholder="Ingrese Cta. destino Ventas" />
        </a-form-item>
      </a-col>

      <a-col :span="5">
        <a-form-item label="Remuneración minima vital" name="remuMinVi">
          <a-input-number class="ancho" v-model:value="porcentajes.remuMinVi" placeholder="Ingrese Cta. destino Ventas" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row justify="space-around">
      <a-col :span="5">
        <a-form-item label="Valor de la UIT (S/)" name="valorUIT">
          <a-input-number class="ancho" v-model:value="porcentajes.valorUIT" placeholder="Ingrese Cta. destino Ventas" />
        </a-form-item>
      </a-col>

      <a-col :span="5">
        <a-form-item label="Longitud de las series de los documentos" name="LongSerDoc">
          <a-input-number class="ancho" v-model:value="porcentajes.LongSerDoc"
            placeholder="Ingrese Cta. destino Ventas" />
        </a-form-item>
      </a-col>

      <a-col :span="5">
        <a-form-item label="Longitud de los números de documentos" name="LongNumDoc">
          <a-input-number class="ancho" v-model:value="porcentajes.LongNumDoc"
            placeholder="Ingrese Cta. destino Ventas" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row justify="center" align="middle">
      <a-col :span="4">
        <a-form-item label="Docuemntos en serie" name="DocSerie">
          <a-input-number class="ancho" v-model:value="porcentajes.DocSerie" placeholder="Ingrese Cta. destino Ventas" />
        </a-form-item>
      </a-col>
      <a-col :span="1">

        <a-button class="derecha" type="primary" @click="showModal"><template #icon>
            <DropboxOutlined />
          </template></a-button>

      </a-col>
    </a-row>
    <a-row justify="center" align="middle">
      <a-col :span="4">
        <a-form-item label="Cuentas con IGV" name="DocSerie">
          <a-input-number class="ancho" v-model:value="porcentajes.cuentasIGV"
            placeholder="Seleccione las cuentas con IGV" />
        </a-form-item>
      </a-col>
      <a-col :span="1">

        <a-button class="derecha" type="primary" @click="showModal2"><template #icon>
            <DropboxOutlined />
          </template></a-button>

      </a-col>
    </a-row>
    <a-row justify="center" class="margen-arriba">
      <a-col :span="24">
        <a-divider>CUENTAS INCLUIDAS PARA EL CIERRE CONTABLE</a-divider>
      </a-col>

      <a-col :span="5">
        <a-form-item>
          <a-checkbox v-model:checked="checked" v-if="checked == true">Habilitado</a-checkbox>
          <a-checkbox v-model:checked="checked" v-else>Deshabilitado</a-checkbox>

        </a-form-item>
      </a-col>
    </a-row>
    <a-row justify="center" class="margen-arriba2">
      <a-col :span="5">
        <a-form-item name="cuentasCierre">
          <a-input class="ancho" v-model:value="porcentajes.cuentasCierre" placeholder="entrada" />

        </a-form-item>
      </a-col>
    </a-row>
    <a-row justify="center">

      <a-col :span="5">
        <a-form-item label="Nro. Dig. Cierre" name="cuentasCierre">
          <a-input v-model:value="porcentajes.cuentasCierre" placeholder="entrada2" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row justify="center">
      <a-col :span="5">
        <a-form-item name="cuentasCierre">
          <a-checkbox v-model:checked="checked">Inc Reparo en Cierre</a-checkbox>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <a-button type="primary" @click="pruebaP">Datos en consola</a-button>

  <!-- modal -->

  <a-modal v-model:open="open" title="Asistente de selección" @ok="handleOk" width="720px" ok-text="Aceptar"
    cancel-text="Cancelar">

    <a-row class="margen-title">
      <a-col :span="24">
        <div>
          <div style="margin-bottom: 16px">
            <a-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
              Reiniciar
            </a-button>
            <span style="margin-left: 8px">
              <template v-if="hasSelected">
                {{ `Seleccionado ${state.selectedRowKeys.length} items` }}
              </template>
            </span>
          </div>
          <a-table :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
            :columns="columns" :data-source="data" :pagination="{ pageSize: 5 }" :scroll="{ x: 1000 }" />
        </div>
      </a-col>
    </a-row>

  </a-modal>

  <!-- modal2 -->

  <a-modal v-model:open="open2" title="Asistente de selección" @ok="handleOk2" width="720px" ok-text="Aceptar"
    cancel-text="Cancelar">

    <a-row class="margen-title">
      <a-col :span="24">
        <div>
          <div style="margin-bottom: 16px">
            <a-button type="primary" :disabled="!hasSelected2" :loading="state2.loading" @click="start2">
              Reiniciar
            </a-button>
            <span style="margin-left: 8px">
              <template v-if="hasSelected2">
                {{ `Seleccionado ${state2.selectedRowKeys.length} items` }}
              </template>
            </span>
          </div>
          <a-table :row-selection="{ selectedRowKeys: state2.selectedRowKeys, onChange: onSelectChange2 }"
            :columns="columns2" :data-source="data2" :pagination="{ pageSize: 5 }" :scroll="{ x: 1000 }" />
        </div>
      </a-col>
    </a-row>

  </a-modal>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { DropboxOutlined } from '@ant-design/icons-vue';


// ---------------------Porcentajes

const porcentajes = reactive({
  porcIGV: undefined,
  porcISC: undefined,
  porcRIGV: undefined,
  porcR4ta: undefined,
  ValorMinR4ta: undefined,
  remuMinVi: undefined,
  valorUIT: undefined,
  LongSerDoc: undefined,

  LongNumDoc: undefined,
  DocSerie: undefined,
  cuentasIGV: undefined,
  cuentasCierre: undefined,
  valorUIT: undefined,
  LongSerDoc: undefined,
});


// pruebas- porcentajes

const pruebaP = () => {
  console.log(porcentajes)
}


//-----------------------------Modal

const open = ref(false);
const open2 = ref(false);

const showModal = () => {
  open.value = true;
};
const showModal2 = () => {
  open2.value = true;
};

const handleOk = (e) => {
  console.log(e);
  open.value = false;
};
const handleOk2 = (e) => {
  console.log(e);
  open2.value = false;
};
//-----------------------tabla modal

const columns = [{
  title: 'Codigo',
  dataIndex: 'codigo',
}, {
  title: 'Descripción',
  dataIndex: 'descripcion',
}, {
  title: 'Columna A',
  dataIndex: 'columnaA',
}];
const data = [];
for (let i = 0; i < 11; i++) {
  data.push({
    key: i,
    codigo: `0${i}`,
    descripcion: 'Descripción ....',
    columnaA: `Columna de la fila ${i}`,
  });
}
const state = reactive({
  selectedRowKeys: [],
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = () => {
  state.loading = true;
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange = selectedRowKeys => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
//-----------------------tabla modal2

const columns2 = [{
  title: 'Codigo',
  dataIndex: 'codigo',
}, {
  title: 'Descripción',
  dataIndex: 'descripcion',
}, {
  title: 'Columna A',
  dataIndex: 'columnaA',
}];
const data2 = [];
for (let i = 0; i < 11; i++) {
  data2.push({
    key: i,
    codigo: `0${i}`,
    descripcion: 'Descripción2 ....',
    columnaA: `Columna n de la fila ${i}`,
  });
}
const state2 = reactive({
  selectedRowKeys: [],
  loading: false,
});
const hasSelected2 = computed(() => state2.selectedRowKeys.length > 0);
const start2 = () => {
  state2.loading = true;
  setTimeout(() => {
    state2.loading = false;
    state2.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange2 = selectedRowKeys => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state2.selectedRowKeys = selectedRowKeys;
};

// check
const checked = ref(false);

// selección multiple


</script>

<style lang="scss" scoped>
.ancho {
  width: 100%;
}

.derecha {
  margin-left: 50%;
}



.margen-arriba {
  margin-top: 40px;
}

.margen-arriba2 {
  margin-top: 0;
}
</style>