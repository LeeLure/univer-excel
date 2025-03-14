
export const useUniverStore = defineStore('univer', () => {
  const enabledList = reactive({
    /** 是否启用编辑 */
    enabledEdit: true,
    /** 是否启用查看 */
    enabledView: true,
  })
  /** 获取是否启用编辑 */
  const getEnabledEdit = () => enabledList.enabledEdit
  /** 获取是否启用查看 */
  const getEnabledView = () => enabledList.enabledView

  /** 设置是否启用编辑 */
  const setEnabledEdit = (value: boolean) => { enabledList.enabledEdit = value }
  /** 设置是否启用查看 */
  const setEnabledView = (value: boolean) => { enabledList.enabledView = value }

  /** 切换是否启用编辑 */
  const toggleEnabledEdit = () => { enabledList.enabledEdit = !enabledList.enabledEdit }
  /** 切换是否启用查看 */
  const toggleEnabledView = () => { enabledList.enabledView = !enabledList.enabledView }

  /** 重置所有启用状态 */
  const resetEnabledList = () => {
    enabledList.enabledEdit = true
    enabledList.enabledView = true
  }

  return {
    enabledList,
    getEnabledEdit,
    setEnabledEdit,
    toggleEnabledEdit,
    resetEnabledList,
    getEnabledView,
    setEnabledView,
    toggleEnabledView
  }
},
  { persist: true }
)