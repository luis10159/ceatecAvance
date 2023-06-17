<template>
  <a-layout-header style="padding: 0" class="barra">
    <!-- buscador -->
    <a-row align="middle" justify="space-between">
      <a-col :span="4">
        <a-select class="ancho" placeholder="Seleccione una empresa" v-model:value="value" show-search :options="options"
          :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
      </a-col>
      <a-col :span="15">
        <a-menu theme="dark" v-model:selectedKeys="current" mode="horizontal" :items="items" />
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
              <a-avatar class="color">
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
</template>
<script setup>
// Importar iconos de ant design vue
import {
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  DownCircleOutlined

} from "@ant-design/icons-vue";
// Importar componentes de vue
import { h, ref } from "vue";
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
    label: 'Opción 1',
    key: 'config:1',
  }, {
    label: 'Opción 2',
    key: 'config:2',
  }, {

    label: 'Opción 3',
    key: 'config:3',
  }, {
    label: 'Opción 4',
    key: 'config:4',
  }],
}, {
  key: 'tabla',
  icon: () => h(DownCircleOutlined),
  label: 'Tabla',
  title: 'Tabla',
  children: [{
    label: 'Opción 31',
    key: 'config:31',
  }, {
    label: 'Opción 32',
    key: 'config:32',
  }, {

    label: 'Opción 33',
    key: 'config:43',
  }, {
    label: 'Opción 34',
    key: 'config:54',
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
    key: 'config:159',
    label: 'Libros Cajas y Bancos',
    children: [{
      label: 'Opción 152',
      key: 'config:152',
    }, {
      label: 'Opción 153',
      key: 'config:153',
    }],
  }, {
    key: 'config:160',
    label: 'Registros Contables',
    children: [{
      label: 'Opción 161',
      key: 'config:161',
    }, {
      label: 'Opción 171',
      key: 'config:171',
    }],
  }, {
    label: 'Libro Diario',
    key: 'config:172',
  }, {
    label: 'Libro Diario Simplificado',
    key: 'config:173',
  }, {
    label: 'Libro mayor',
    key: 'config:174',
  }, {
    key: 'config:170',
    label: 'Estados Financieros',
    children: [{
      label: 'Opción 175',
      key: 'config:176',
    }, {
      label: 'Opción 176',
      key: 'config:176',
    }],
  }, {
    label: 'Libro Inventario y Balance',
    key: 'config:174',
  }, {
    key: 'config:169',
    label: 'Detalle del Inventario Balance',
    children: [{
      label: 'Opción 165',
      key: 'config:165',
    }, {
      label: 'Opción 166',
      key: 'config:166',
    }],
  }, {
    label: 'Libro de Retenciones',
    key: 'config:178',
  }, {
    label: 'Libro Renta 4ta Categoria',
    key: 'config:178',
  }, {
    key: 'config:179',
    label: 'Formatos Adicionales',
    children: [{
      label: 'Opción 155',
      key: 'config:155',
    }, {
      label: 'Opción 156',
      key: 'config:156',
    }],
  }],
}, {
  key: 'activo-fijo',
  icon: () => h(DownCircleOutlined),
  label: 'Activo Fijo',
  title: 'Activo Fijo',
  children: [{
    label: 'Opción 181',
    key: 'config:181',
  }, {
    label: 'Opción 182',
    key: 'config:182',
  }, {

    label: 'Opción 191',
    key: 'config:191',
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
    label: 'Opción 211',
    key: 'config:211',
  }, {
    label: 'Opción 212',
    key: 'config:213',
  }, {

    label: 'Opción 221',
    key: 'config:221',
  }, {
    label: 'Opción 231',
    key: 'config:231',
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
  width: 100%;
  margin-right: 10px;
}

.derecha-avatar {
  text-align: end;
  padding-right: 15px;
}

.derecha {
  text-align: end;
}
</style>