<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item label="数据源" name="dataSource">
      <a-radio-group v-model:value="formState.dataSource">
        <a-radio value="local">本地 JSON 数据</a-radio>
        <a-radio value="api">网络接口数据</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="请求地址" name="url">
      <a-input v-model:value="formState.url" placeholder="请输入请求地址" />
    </a-form-item>
    <a-form-item label="请求方式" name="method">
      <a-select v-model:value="formState.method">
        <a-select-option value="GET">GET</a-select-option>
        <a-select-option value="POST">POST</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="请求参数" name="payload" tooltip="示例: key1=1,key2=2">
      <a-input v-model:value="formState.payload" placeholder="请输入请求参数" />
    </a-form-item>
    <a-form-item label="起始行号" name="startRow">
      <a-input v-model:value="formState.startRow" :min="0"  />
    </a-form-item>
    <a-form-item label="起始列号" name="startCol">
      <a-input v-model:value="formState.startCol" :min="0"  />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { FormState } from './type'

const formRef = ref<FormInstance>()


const formState = reactive<FormState>({
  dataSource: 'local',
  url: '',
  method: 'GET',
  payload: '',
  startRow: '0',
  startCol: '0',
})

const rules = {
  payload: [{ required: false, message: '请输入请求参数' }],
  startRow: [{ required: true, message: '请输入起始行号' }],
  startCol: [{ required: true, message: '请输入起始列号' }],
  url: [{ required: true, message: '请输入请求地址' }],
  method: [{ required: true, message: '请选择请求方式' }],
}

defineExpose({
  formRef,
  formState,
  validate: () => formRef.value?.validate(),
})
</script>
