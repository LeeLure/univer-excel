<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item label="数据源" name="dataSource">
      <a-radio-group v-model:value="formState.dataSource">
        <a-radio value="local">本地 JSON 数据</a-radio>
        <a-radio value="api">网络接口数据</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item
      label="本地数据"
      name="fileData"
      v-if="!isApi"
      tooltip="请上传本地 JSON 数据"
    >
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        action="#"
        accept=".json"
        :customRequest="handleCustomRequest"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">将需要上传的文件拖曳到此处，或点击上传</p>
        <p class="ant-upload-hint">支持单个文件，格式为 JSON</p>
      </a-upload-dragger>
    </a-form-item>

    <a-form-item label="请求地址" name="url" v-if="isApi">
      <a-input v-model:value="formState.url" placeholder="请输入请求地址" />
    </a-form-item>
    <a-form-item label="请求方式" name="method" v-if="isApi">
      <a-select v-model:value="formState.method">
        <a-select-option value="GET">GET</a-select-option>
        <a-select-option value="POST">POST</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="请求参数"
      name="payload"
      tooltip="示例: key1=1,key2=2"
      v-if="isApi"
    >
      <a-input v-model:value="formState.payload" placeholder="请输入请求参数" />
    </a-form-item>
    <a-form-item label="起始行号" name="startRow" tooltip="数据开始填充的行号">
      <a-input v-model:value="formState.startRow" :min="0" />
    </a-form-item>
    <a-form-item label="起始列号" name="startCol" tooltip="数据开始填充的列号">
      <a-input v-model:value="formState.startCol" :min="0" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import type { FormInstance, UploadChangeParam, UploadFile } from 'ant-design-vue'
import type { FormState } from './type'

const { message } = useFeedback()

const formRef = ref<FormInstance>()
const fileList = ref<UploadFile[]>([])

const formState = reactive<FormState>({
  dataSource: 'local',
  fileData: '',
  url: '',
  method: 'GET',
  payload: '',
  startRow: '0',
  startCol: '0',
})

const rules = {
  dataSource: [{ required: true, message: '请选择数据源' }],
  fileData: [{ required: true, message: '请上传 JSON 格式的文件' }],
  payload: [{ required: false, message: '请输入请求参数' }],
  startRow: [{ required: true, message: '请输入起始行号' }],
  startCol: [{ required: true, message: '请输入起始列号' }],
  url: [{ required: true, message: '请输入请求地址' }],
  method: [{ required: true, message: '请选择请求方式' }],
}

const handleCustomRequest = (option: any) => {
  const { file, onProgress, onSuccess, onError } = option
  const reader = new FileReader()

  // 读取文件进度
  reader.onprogress = (e) => {
    if (e.lengthComputable) {
      onProgress({ percent: (e.loaded / e.total) * 100 })
    }
  }

  // 读取成功处理
  reader.onload = (e) => {
    try {
      // 将文件内容存储到表单数据
      formState.fileData = e.target?.result as string
      // 更新文件列表显示
      fileList.value = [
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: URL.createObjectURL(file),
        },
      ]
      onSuccess()
    } catch (err) {
      onError(err)
      message.error('文件解析失败')
    }
  }

  // 错误处理
  reader.onerror = () => {
    onError(new Error('文件读取失败'))
    message.error('文件读取失败')
  }

  // 开始读取文件
  if (file instanceof Blob) {
    reader.readAsText(file)
  } else {
    onError(new Error('无效的文件类型'))
  }
}

const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status

  switch (status) {
    case 'done':
      message.success(`'${info.file.name}' 文件上传成功.`)
      break
    case 'error':
      message.error(`'${info.file.name}' 文件上传失败.`)
      break
    default:
      break
  }
}

const isApi = computed(() => formState.dataSource === 'api')

defineExpose({
  formRef,
  formState,
  validate: () => formRef.value?.validate(),
})
</script>
