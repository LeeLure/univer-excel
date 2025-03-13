
/**
 * @description 获取当前活跃的工作簿和工作表
 */
export function useActiveWorkbookAndSheet() {

  const activeWorkbook = window.univerAPI.getActiveWorkbook()
  if (!activeWorkbook)
    throw new Error('activeWorkbook is not defined')
  const activeSheet = activeWorkbook.getActiveSheet()
  if (!activeSheet)
    throw new Error('activeSheet is not defined')

  return { activeWorkbook, activeSheet }
}
