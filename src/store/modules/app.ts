
import type { AppConfig } from '../types'

export const useAppStore = defineStore('app', () => {
  /** 应用配置 */
  const appConfig = reactive<AppConfig>({
    colorPrimary: '#00b96b'
  })

  /** 获取主题色 */
  const getColorPrimary = () => appConfig.colorPrimary

  /** 设置主题色 */
  const setColorPrimary = (color: string) => { appConfig.colorPrimary = color }

  /** 重置主题色 */
  const resetColorPrimary = () => { appConfig.colorPrimary = '#00b96b' }

  return {
    appConfig,
    getColorPrimary,
    setColorPrimary,
    resetColorPrimary
  }
},
  { persist: true }
)