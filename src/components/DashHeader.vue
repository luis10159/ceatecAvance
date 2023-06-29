<template>
  <a-layout-header style="padding: 0" class="barra">
    <!-- buscador -->
    <a-row align="middle" justify="space-between">
      <a-col :span="4">
        <a-select class="ancho" placeholder="Seleccione una empresa" v-model:value="value" show-search :options="options"
          :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
      </a-col>
      <a-col :span="15">
        <a-menu theme="dark" v-model:selectedKeys="current" mode="horizontal" :items="items" @click="handleClick"
          subMenuOpenDelay="0.4" />
      </a-col>
      <a-col :span="5">
        <a-row justify="center" align="middle">
          <a-col :span="15" class="derecha">
            <a-switch checked-children="Oscuro" un-checked-children="Claro" class="color arriba" />
          </a-col>
          <!-- Menú de opciones del usuario -->
          <a-col :span="9" class="derecha-avatar">
            <a-dropdown>

              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="1">
                    <EditOutlined />
                    Editar perfil
                  </a-menu-item>
                  <a-menu-item key="2">
                    <DownCircleOutlined />
                    Ajustes
                  </a-menu-item>
                  <a-menu-item key="3">
                    <LogoutOutlined />
                    Salir
                  </a-menu-item>
                </a-menu>
              </template>
              <a-avatar class="color puntero">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-layout-header>
  <!-- Componenetes modales -->
  <ParametrosAux></ParametrosAux>
  <MantenimientoBancos></MantenimientoBancos>
  <BuscarDocumento></BuscarDocumento>
  <InconsisComprobantes></InconsisComprobantes>
  <LibroDiario></LibroDiario>
  <BalanceComprobacion></BalanceComprobacion>

</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
// Funcion para abrir modales
const handleClick = e => {
  console.log('click', e);
  if (e.key == 'config:246') {
    console.log('Hola');
    store.cambiarParamAux();
  } else if (e.key == 'config:60') {
    store.cambiarMantBancos();
  } else if (e.key == 'config:31') {
    router.push('/plan-contable')
  } else if (e.key == 'config:240') {
    store.cambiarMantBancos();
  } else if (e.key == 'config:2') {
    store.cambiarInconCompr();
  } else if (e.key == 'config:164') {
    store.cambiarLibDiario();
  } else if (e.key == 'config:169') {
    store.cambiarBalanComp();
  }
};
// Importar iconos de ant design vue
import {
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  DownCircleOutlined
} from "@ant-design/icons-vue";
// Importar componentes de vue
import { h, ref, defineAsyncComponent } from "vue";
// Importar componentes modales
const ParametrosAux = defineAsyncComponent(() => import('@/modules/Reportes/components/ParametrosAux.vue'));
const MantenimientoBancos = defineAsyncComponent(() => import('@/modules/Reportes/components/MantenimientoBancos.vue'));
const BuscarDocumento = defineAsyncComponent(() => import('@/modules/Reportes/components/BuscarDocumento.vue'));
const InconsisComprobantes = defineAsyncComponent(() => import('@/modules/Reportes/components/InconsisComprobantes.vue'));
const LibroDiario = defineAsyncComponent(() => import('@/modules/Reportes/components/LibroDiario.vue'));
const BalanceComprobacion = defineAsyncComponent(() => import('@/modules/Reportes/components/BalanceComprobacion.vue'));


const value = ref(null);
//Empresas - opciones
const options = ref([{
  value: 'empresaa',
  label: 'Empresa A',
}, {
  value: 'empresab',
  label: 'Empresa B',
}, {
  value: 'empresac',
  label: 'Empresa C',
}]);
// Imprimir en diferentes estados del input
const handleChange = value => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log('blur');
};
const handleFocus = () => {
  console.log('focus');
};
// Buscador
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//Desplegar el menú de usuario
const handleMenuClick = e => {
  console.log('click', e);
};
//Menu general
const current = ref(['']);
const items = ref([{
  key: 'movimiento',
  icon: () => h(DownCircleOutlined),
  label: 'Movimiento',
  title: 'Movimiento',
  children: [{
    label: 'Ingreso de movimientos',
    key: 'config:1',
  }, {
    label: 'Inconsistencia de comprobantes',
    key: 'config:2',
  }, {
    label: 'Salir',
    key: 'config:30',
  }],
}, {
  key: 'tabla',
  icon: () => h(DownCircleOutlined),
  label: 'Tabla',
  title: 'Tabla',
  children: [{
    label: 'Plan contable',
    key: 'config:31',
  }, {
    label: 'Grupos Contables',
    key: 'config:32',
  }, {

    label: 'Departamento Empresarial',
    key: 'config:33',
  }, {
    label: 'Centro de Costos',
    key: 'config:34',
  }, {
    key: 'config:40',
    label: 'Entidades',
    children: [{
      label: 'Opción 41',
      key: 'config:41',
    }, {
      label: 'Opción 42',
      key: 'config:42',
    }],
  }, {
    key: 'config:50',
    label: 'Tabla General',
    children: [{
      label: 'Opción 51',
      key: 'config:51',
    }, {
      label: 'Opción 52',
      key: 'config:53',
    }],
  }, {
    label: 'Mantenimiento de Bancos',
    key: 'config:60',
  }],
}, {
  key: 'reportes-contables',
  icon: () => h(DownCircleOutlined),
  label: 'Reportes Contables',
  title: 'Reportes Contables',
  children: [{
    type: 'group',
    label: 'Grupo 1',
    children: [{
      label: 'Opción 61',
      key: 'config:61',
    }, {
      label: 'Opción 62',
      key: 'config:62',
    }],
  }, {
    type: 'group',
    label: 'Grupo 2',
    children: [{
      label: 'Opción 73',
      key: 'config:13',
    }, {
      label: 'Opción 74',
      key: 'config:84',
    }],
  }],
}, {
  key: 'reportes-financieros',
  icon: () => h(DownCircleOutlined),
  label: 'Reportes Financieros',
  title: 'Reportes Financieros',
  children: [{
    label: 'Opción 91',
    key: 'config:91',
  }, {
    label: 'Opción 92',
    key: 'config:92',
  }, {

    label: 'Opción 103',
    key: 'config:103',
  }, {
    label: 'Opción 114',
    key: 'config:114',
  }],
}, {
  key: 'reportes-gerenciales',
  icon: () => h(DownCircleOutlined),
  label: 'Reportes Gerenciales',
  title: 'Reportes Gerenciales',
  children: [{
    label: 'Opción 121',
    key: 'config:121',
  }, {
    label: 'Opción 122',
    key: 'config:122',
  }, {

    label: 'Opción 133',
    key: 'config:133',
  }, {
    label: 'Opción 144',
    key: 'config:144',
  }],
}, {
  key: 'sunat',
  icon: () => h(DownCircleOutlined),
  label: 'SUNAT',
  title: 'SUNAT',
  children: [{
    label: 'DAOT',
    key: 'config:151',
  }, {
    key: 'config:152',
    label: 'Libros Cajas y Bancos',
    children: [{
      label: 'Opción 153',
      key: 'config:153',
    }, {
      label: 'Opción 156',
      key: 'config:156',
    }],
  }, {
    key: 'config:157',
    label: 'Registros Contables',
    children: [{
      label: 'Opción 158',
      key: 'config:158',
    }, {
      label: 'Opción 163',
      key: 'config:163',
    }],
  }, {
    label: 'Libro Diario',
    key: 'config:164',
  }, {
    label: 'Libro Diario Simplificado',
    key: 'config:165',
  }, {
    label: 'Libro mayor',
    key: 'config:166',
  }, {
    key: 'config:167',
    label: 'Estados Financieros',
    children: [{
      label: 'Balance General',
      key: 'config:168',
    }, {
      label: 'Balance de comprobación',
      key: 'config:169',
    }, {
      label: 'Estado Flujo Efectivo',
      key: 'config:170',
    }, {
      label: 'Estado de Cambio en el Patrimonio Neto',
      key: 'config:171',
    }, {
      label: 'Estado Resultados Integrales',
      key: 'config:172',
    }],
  }, {
    label: 'Libro Inventario y Balance',
    key: 'config:173',
  }, {
    key: 'config:174',
    label: 'Detalle del Inventario Balance',
    children: [{
      label: 'Opción 175',
      key: 'config:175',
    }, {
      label: 'Opción 180',
      key: 'config:180',
    }],
  }, {
    label: 'Libro de Retenciones',
    key: 'config:181',
  }, {
    label: 'Libro Renta 4ta Categoria',
    key: 'config:182',
  }, {
    key: 'config:183',
    label: 'Formatos Adicionales',
    children: [{
      label: 'Opción 184',
      key: 'config:184',
    }, {
      label: 'Opción 190',
      key: 'config:190',
    }],
  }],
}, {
  key: 'activo-fijo',
  icon: () => h(DownCircleOutlined),
  label: 'Activo Fijo',
  title: 'Activo Fijo',
  children: [{
    label: 'Opción 191',
    key: 'config:191',
  }, {
    label: 'Opción 192',
    key: 'config:192',
  }, {

    label: 'Opción 193',
    key: 'config:193',
  }, {
    label: 'Opción 201',
    key: 'config:201',
  }],
}, {
  key: 'otros-reportes',
  icon: () => h(DownCircleOutlined),
  label: 'Otros Reportes',
  title: 'Otros Reportes',
  children: [{
    key: 'config:211',
    label: 'Proveedor',
    children: [{
      label: 'Compra',
      key: 'config:212',
    }, {
      label: 'Venta',
      key: 'config:213',
    }, {
      label: 'Estado de Cuenta Corriente',
      key: 'config:213',
    }, {
      label: 'Situación / Estado de Documento',
      key: 'config:213',
    }],
  }, {
    label: 'Tipos de documento',
    key: 'config:220',
  }, {
    label: 'Plan contable',
    key: 'config:221',
  }, {

    label: 'Grupos Contables',
    key: 'config:221',
  }, {
    label: 'Listado Reparo Tributario',
    key: 'config:231',
  }, {
    label: 'Ubicar Doc. Registrado',
    key: 'config:240',
  }],
}, {
  key: 'herramientas',
  icon: () => h(DownCircleOutlined),
  label: 'Herramientas',
  title: 'Herramientas',
  children: [{
    label: 'Apertura mes Proceso',
    key: 'config:241',
  }, {
    label: 'Cerrar mes Proceso',
    key: 'config:242',
  }, {
    label: 'Reabrir mes Proceso',
    key: 'config:243',
  }, {
    label: 'Reindexar Movimientos',
    key: 'config:244',
  }, {
    label: 'Parámetros',
    key: 'config:245',
  }, {
    label: 'Parámetros Auxiliares',
    key: 'config:246',
  }, {
    label: 'Consultas y Sugerencias',
    key: 'config:247',
  }, {
    label: 'Año Proceso',
    key: 'config:248',
  }, {
    label: 'Seguridad',
    key: 'config:249',
    children: [{
      label: 'Opción 151',
      key: 'config:151',
    }, {
      label: 'Opción 152',
      key: 'config:152',
    }],
  }, {
    label: 'Asientos de Cierre',
    key: 'config:260',
  }, {
    label: 'Asientos de Apertura',
    key: 'config:261',
  }, {
    label: 'Importar Compras/Ventas',
    key: 'config:262',
  }, {
    label: 'Copia de Seguridad',
    key: 'config:263',
  }, {
    label: 'Reordenar Base de Datos',
    key: 'config:264',
  }],
}]);
</script>

<style lang="scss" scoped>
// * {
//   border: 1px solid red;
// }
.color {
  background: rgb(76, 84, 129);
}

.arriba {
  margin-top: 6px;
}

.ancho {
  width: 90%;

}

.derecha-avatar {
  text-align: end;
  padding-right: 15px;
}

.derecha {
  text-align: end;
}

.puntero {
  cursor: pointer;
}
</style>