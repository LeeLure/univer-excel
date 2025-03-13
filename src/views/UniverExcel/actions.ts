import { Modal, message } from 'ant-design-vue';
import Dialog from './dialog.vue';  // 请确保路径正确
import { createVNode, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue'
import type { FWorksheet, FRange } from '@univerjs/presets/lib/types/preset-sheets-core/index.js';
import type { FormState } from './type'

/** 
 * @description 将 payload 字符串转换为对象
 * @param payload 字符串
 * @returns 对象
 * @example
 * const result =  transformPayloadToObject('key1=1,key2=2')
 * console.log(result) // { key1: '1', key2: '2' }
 */
const transformPayloadToObject = (payload: string): Record<string, string> => {
  if (!payload) return {};

  return payload.split(',').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

const handleApiRequest = (formState: FormState) => {
  // formState.payload 的格式为 'key1=1,key2=2'
  const payload = transformPayloadToObject(formState.payload);

  if (formState.method === 'POST') {
    // 如果是 POST 请求，则需要将 formState.payload 的格式化为 FormData 格式
    return new Promise((resolve, reject) => {
      fetch(formState.url, {
        method: formState.method, // 请求方法
        body: new URLSearchParams(payload).toString() // 请求体
      })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => {
          console.error('请求失败：', error);
          reject(error)
        })
    })
  }

  return new Promise((resolve, reject) => {
    // 如果是 GET 请求，则需要将 formState.payload 的格式化为 URLSearchParams 格式
    const url = `${formState.url}?${new URLSearchParams(payload).toString()}`;
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => {
        console.error('请求失败：', error);
        reject(error)
      })
  });
}

const transformToValues = (data: any[]): any[][] => {
  if (!data.length) return [];

  // 将对象的值转换为数组
  return data.map(item => Object.values(item));
}

/** 获取当前活跃的 sheet */
const getActiveSheet = (): FWorksheet => {
  const activeWorkbook = window.univerAPI.getActiveWorkbook()
  if (!activeWorkbook)
    throw new Error('activeWorkbook is not defined')
  const activeSheet = activeWorkbook.getActiveSheet()
  if (!activeSheet)
    throw new Error('activeSheet is not defined')

  return activeSheet
}

/** 本地数据源请求 */
const handleLocalRequest = (formState: FormState) => {
  return new Promise(resolve => setTimeout(resolve, 3000));
}

export function openDialog() {
  const dialogRef = ref<FormInstance & { formState: FormState }>();

  Modal.confirm({
    title: '新增数据源',
    width: 500,
    okText: '确认',
    cancelText: '取消',
    content: () => createVNode(Dialog, {
      ref: dialogRef
    }),
    async onOk() {

      return new Promise(async (resolve, reject) => {
        try {
          // 验证表单
          await dialogRef.value?.validate();

          await new Promise(resolve => setTimeout(resolve, 500));
          // 获取表单数据
          const formData = dialogRef.value!.formState

          // 根据表单项数据进行请求
          const result = formData?.dataSource === 'local' ? handleLocalRequest(formData) : await handleApiRequest(formData)

          const activeSheet = getActiveSheet()

          const range = activeSheet.getRange(Number(formData.startRow), Number(formData.startCol), (result as (string)[]).length, Object.keys((result as (string)[])[0]).length)

          if (!range)
            throw new Error('range is not defined')

          range.setValues(transformToValues(result as (string)[]))
          resolve(true)
        } catch (error) {
          console.log('error', error)
          const err = (error as { errorFields?: { errors: string[] }[] }).errorFields?.map(item => item.errors).join(';') || '未知错误'
          message.error(err)
          reject(error)
        }
      })

    },
    onCancel() {
      // 取消操作
    },
  });
}