<template>
  <a-row justify="center" class="login">
    <a-col :xs="15" :sm="13" :md="11" :lg="9" :xl="7">
      <!-- Formulario de inicio de sesión -->
      <a-form :model="formState" name="normal_login" class="login-form" :label-col="{ xs: 9, sm: 8, md: 7, lg: 6, xl: 5 }"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <!-- Incono avatar en la parte superior -->
        <a-row justify="center" class="avatar">
          <a-avatar :size="{ xs: 75, sm: 80, md: 85, lg: 90, xl: 95, xxl: 100 }">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
        </a-row>
        <a-row justify="center" class="avatar">
          <h2>Identificación del usuario</h2>
        </a-row>
        <!-- Items del formuario -->
        <a-form-item label="Email" name="email" :rules="[
          { type: 'email', required: true, message: 'No es un correo electrónico válido' },
        ]">
          <a-input v-model:value="formState.email" placeholder="Ingrese su email">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <!-- Usuario -->
        <!-- 
        <a-form-item label="Usuario" name="username" :rules="[
            { type: 'email', required: true, message: 'Por favor, ingresa tu usuario!' },
          ]">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item> -->
        <a-form-item label="Contraseña" name="password" :rules="[
          { required: true, message: 'Por favor, ingresa tu contraseña!' },
        ]">
          <a-input-password v-model:value="formState.password" placeholder="Ingrese su contraseña">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item label="Plataforma" name="platform">
          <a-select placeholder="Seleccione la plataforma" v-model:value="formState.platform">
            <a-select-option value="plataformaa">Plataforma a</a-select-option>
            <a-select-option value="plataformab">Plataforma b</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Año" name="age">
          <a-select placeholder="Seleccione el año" v-model:value="formState.age">
            <a-select-option value="2022">2022</a-select-option>
            <a-select-option value="2023">2023</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Recuérdame</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Olvidé mi contraseña</a>
        </a-form-item>
        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button borde-redondo">
            Iniciar
          </a-button>
        </a-form-item>
        <a-alert v-if="visible" message="Datos no válidos, ingrese nuevamente" type="error" closable
          :after-close="handleClose" show-icon>
          <template #icon>
            <SmileOutlined />
          </template>
        </a-alert>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import router from '@/router'
//Manejador de estados - con pinia
import { useIndexStore } from '@/store/index'
const store = useIndexStore()
if (store.token == true) {
  router.push({ name: 'dashboard' })
}
// Importar funciones de vue
import { reactive, computed, ref } from "vue";
// Importar iconos de ant design vue
import { UserOutlined, MailOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons-vue";
// variables sincronizadas con las entradas
const formState = reactive({
  email: "",
  password: "",
  platform: null,
  age: null,
  remember: false,
});
// Alerta de ingreso de datos no válidos
const visible = ref(false);
const handleClose = () => {
  visible.value = false;
};
// mensaje de envio exitoso en consola
const onFinish = (values) => {
  if (store.formLogin.email == values.email && store.formLogin.password == values.password) {
    console.log("Success:", values);
    store.token = true;
    router.push({ name: 'dashboard' })
  } else {
    visible.value = true;
  }
};
// mensaje de éxito en consola
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// bloqueo del botón iniciar
const disabled = computed(() => {
  return !(
    formState.email &&
    formState.password &&
    formState.platform &&
    formState.age
  );
});
</script>
<style lang="scss" scoped>
.login {
  padding-top: 7%;
  height: 100vh;
}

.login-form {
  padding: 18px;
  border-radius: 10px;
  background-color: #fcfdff98;
  box-shadow: 14px 14px 12px #f0f0f063;
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}

.avatar {
  margin-bottom: 30px;
}
</style>
