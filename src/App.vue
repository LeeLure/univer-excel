<script setup lang="ts">
import UniverExcel from '@/views/UniverExcel/index.vue'

const themeConfig = computed(() => {
  return {
    token: {
      colorPrimary: '#00b96b',
    },
  }
})
</script>

<template>
  <AConfigProvider :theme="themeConfig">
    <AApp>
      <UniverExcel />
    </AApp>
  </AConfigProvider>
</template>
