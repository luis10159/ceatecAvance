<template>
  <a-layout-footer style="text-align: center">
    Diseñado en ©2023 Creado por Ceatec Soft
  </a-layout-footer>
  <a-float-button-group trigger="hover" type="primary" :style="{ right: '50px' }">
        <template #icon>
            <CustomerServiceOutlined />
        </template>
        <a-float-button>
            <template #icon>
                <DollarOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <ReconciliationOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <UsergroupAddOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <FileAddOutlined />
            </template>
        </a-float-button>
        <a-float-button>
            <template #icon>
                <EditOutlined />
            </template>
        </a-float-button>
        <a-back-top />
    </a-float-button-group>
</template>
<script setup>
import { CustomerServiceOutlined, EditOutlined, FileAddOutlined, UsergroupAddOutlined, ReconciliationOutlined, DollarOutlined } from '@ant-design/icons-vue'; 

</script>