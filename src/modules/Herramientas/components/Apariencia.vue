<template>
    <a-form layout="vertical" class="row-btn">
        <a-row justify="center">
            <a-col :span="10">
                <a-form-item label="Opciones de apariencia" name="opciones">
                    <a-select v-model:value="opciones" mode="multiple" style="width: 100%"
                        placeholder="Seleccione las opciones" max-tag-count="responsive" :options="options"></a-select>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>

    <!-- imagen -->
    <a-row justify="center">
        <a-col>
            <p>Previsualización</p>
            <div class="clearfix">
                <a-upload v-model:file-list="fileList" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card" @preview="handlePreview">
                    <div v-if="fileList.length < 1">
                        <PlusOutlined />
                        <div style="margin-top: 8px">Subir imagen</div>
                    </div>
                </a-upload>
                <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </div>
        </a-col>
    </a-row>
</template>

<script setup>
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue';
// opciones
const opciones = ref([])
const options = ref([]);
for (let i = 1; i < 5; i++) {
    const value = i.toString(10) + i;
    options.value.push({
        label: `Opción: ${value}`,
        value,
    });
}

// imagen pariencia

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([{
    uid: '-1',
    name: 'imagen',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
}]);
const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
</script>

<style lang="scss" scoped></style>