<template>
  <div>
    <div id="toolbar" :style="{ padding: '5px' }"></div>
    <div id="univer" :style="{ height: 'calc(100vh - 50px)', width: '100vw' }"></div>
  </div>
</template>

<script setup lang="ts">
import { setupUniver } from './setupUniver'
import { setupToolbar } from './setupToolbar'
import { onMounted } from 'vue'

onMounted(() => {
  initUniver()
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})

const initUniver = () => {
  const univerAPI = setupUniver('univer')

  // 将 univerAPI 挂载到全局 window 对象上
  window.univerAPI = univerAPI

  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 999)
  }).then(() => {
    setupToolbar()
  })
}
</script>
