import type { FUniver } from '@univerjs/presets'

import {
  setupClearStyles,
  setupCommandsListenerSwitch,
  setupCreateSheet,
  setupEditSwitch,
  setupGetA1CellData,
  setupGetSheetData,
  setupGetValue,
  setupGetWorkbookData,
  setupRedo,
  setupScrollToBottom,
  setupScrollToCell,
  setupScrollToTop,
  setupSetBackground,
  setupSetSelection,
  setupSetValue,
  setupSetValues,
  setWorkbookEditablePermission,
  setWorkbookViewPermission,
  setupUndo,
  setupUniverGo,
  setupVersion,
  setupSetWorkbookData
} from './api'

export function setupToolbar() {
  const $toolbar = document.getElementById('toolbar')!
  console.log('setupToolbar -> $toolbar', $toolbar)

  setupSetValue()
  setupSetValues()
  setWorkbookEditablePermission()
  setWorkbookViewPermission()
  // setupGetValue( univerAPI)
  // setupGetA1CellData( univerAPI)

  // setupGetWorkbookData( univerAPI)
  // setupGetSheetData( univerAPI)
  // setupCreateSheet( univerAPI)

  // setupScrollToCell( univerAPI)
  // setupScrollToTop( univerAPI)
  // setupScrollToBottom( univerAPI)

  // setupSetBackground($toolbar, univerAPI)

  // setupCommandsListenerSwitch($toolbar, univerAPI)
  // setupEditSwitch($toolbar, univerAPI)

  // setupUndo($toolbar, univerAPI)
  // setupRedo($toolbar, univerAPI)

  // setupSetSelection($toolbar, univerAPI)
  // setupClearStyles($toolbar, univerAPI)

  // setupVersion($toolbar)
  // setupUniverGo($toolbar)

  // setupSetWorkbookData($toolbar, univerAPI)
}
