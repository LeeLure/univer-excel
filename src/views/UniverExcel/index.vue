<template></template>

<script setup lang="ts">
import { setupUniver } from './setupUniver'
import { onMounted } from 'vue'

onMounted(() => {
  initUniver()
})

const initUniver = () => {
  const univerAPI = setupUniver()
  console.log('initUniver -> univerAPI', univerAPI)

  window.univerAPI = univerAPI

}
</script>
