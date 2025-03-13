import type { FUniver } from '@univerjs/presets'
import { ScrollToCellCommand } from '@univerjs/presets/preset-sheets-core'
import { Button, type ButtonProps } from 'ant-design-vue'
import { createVNode, render, watch, ref } from 'vue'  // 添加 watch 和 ref
import { useActiveWorkbookAndSheet } from './useActiveWorkbookAndSheet'

interface BaseButtonHandlerOption {
  buttonInnerHTML: string
  buttonAttr?: ButtonProps
  handler?: () => Promise<void> | void
}

/** 基础按钮处理函数 */
const baseButtonHandler = (option: BaseButtonHandlerOption) => {
  const { buttonInnerHTML, buttonAttr, handler } = option
  const $toolbar = document.getElementById('toolbar')!
  const buttonText = ref(buttonInnerHTML)

  const $buttonContainer = document.createElement('div')
  $buttonContainer.style.display = 'inline-block'
  $buttonContainer.style.marginRight = '10px'
  $toolbar.appendChild($buttonContainer)

  // 创建更新按钮的函数
  const updateButton = () => {
    render(createVNode(Button, {
      ...buttonAttr,
      innerHTML: buttonText.value,
      onClick: async () => {
        await handler?.()
      }
    }), $buttonContainer)
  }

  // 初始渲染
  updateButton()

  return {
    buttonText,
    $buttonContainer,
    updateButton  // 返回更新函数
  }
}

/** 设置工作簿可编辑权限 */
export async function setWorkbookEditablePermission() {
  const univerStore = useUniverStore()
  const { enabledList } = storeToRefs(univerStore)

  const { buttonText, updateButton } = baseButtonHandler({
    buttonInnerHTML: enabledList.value.enabledEdit ? '禁用编辑' : '启用编辑',
    handler: async () => {
      univerStore.toggleEnabledEdit()
      const { activeWorkbook } = useActiveWorkbookAndSheet()
      const unitId = activeWorkbook.getId()
      const permission = activeWorkbook.getPermission()
      const workbookEditablePermission = permission.permissionPointsDefinition.WorkbookEditablePermission
      permission.setWorkbookPermissionPoint(unitId, workbookEditablePermission, enabledList.value.enabledEdit)
    }
  })


  // 监听状态变化并更新按钮
  watch(() => enabledList.value.enabledEdit, (newValue) => {
    buttonText.value = newValue ? '禁用编辑' : '启用编辑'
    updateButton()  // 手动触发按钮更新
  }, { immediate: true })
}

/** 设置工作簿可查看权限 */
export function setWorkbookViewPermission() {
  baseButtonHandler({
    buttonInnerHTML: '是否可查看',
    handler: async () => {
      const univerStore = useUniverStore()

      univerStore.toggleEnabledView()

      const { activeWorkbook } = useActiveWorkbookAndSheet()

      const unitId = activeWorkbook.getId(); // 获取工作簿 ID
      const permission = activeWorkbook.getPermission(); // 获取权限模块

      const workbookViewPermission = permission.permissionPointsDefinition.WorkbookViewPermission
      // unitId 是工作簿的 id, WorkbookViewPermission 是权限点位, false 表示该权限不可使用
      permission.setWorkbookPermissionPoint(unitId, workbookViewPermission, univerStore.enabledList.enabledView)
    }
  })
}

export function setupSetValue() {

  baseButtonHandler({
    buttonInnerHTML: '设置A1值',
    handler: () => {
      const { activeSheet } = useActiveWorkbookAndSheet()

      const value = 'Hello, World!'
      // const { activeSheet } = getActiveWorkbookAndSheet()
      const range = activeSheet.getRange(0, 0)
      if (!range)
        throw new Error('range is not defined')

      /** @see https://univer.ai/typedoc/@univerjs/facade/classes/FRange#setValue */
      range.setValue(value)
    },
  })
}

export function setupSetValues() {

  baseButtonHandler({
    buttonInnerHTML: '设置A1:B2值',
    handler: () => {
      const { activeSheet } = useActiveWorkbookAndSheet()

      const values = [
        ['Hello', 'World!'],
        ['Hello', 'Univer!'],
      ]

      // const { activeSheet } = getActiveWorkbookAndSheet()

      const range = activeSheet.getRange(0, 0, values.length, values[0]!.length)
      if (!range)
        throw new Error('range is not defined')

      /**
       * @see https://univer.ai/typedoc/@univerjs/facade/classes/FRange#setValues
       */
      range.setValues(values)
    }
  })

}

export function setupGetValue($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get A1 value'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const values = [
      ['Hello', 'World!'],
      ['Hello', 'Univer!'],
      ['Hello', 'Sheets!'],
    ]

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    const range = activeSheet.getRange(0, 0, values.length, values[0]!.length)
    if (!range)
      throw new Error('range is not defined')

    /**
     * @see https://univer.ai/typedoc/@univerjs/facade/classes/FRange#getValue
     */
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(range.getValue(), null, 2))
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(range.getValue(), null, 2))

    // WORKBOOK_DATA = activeWorkbook.save()
  })
}

export function setupGetA1CellData($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get A1 CellData'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    const range = activeSheet.getRange(0, 0, 1, 1)
    if (!range)
      throw new Error('range is not defined')

    /**
     * @see https://univer.ai/typedoc/@univerjs/facade/classes/FRange#getValue
     */
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(range.getCellData(), null, 2))
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(range.getCellData(), null, 2))
  })
}

export function setupValues($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get A1:B2 values'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const values = [
      ['Hello', 'World!'],
      ['Hello', 'Univer!'],
      ['Hello', 'Sheets!'],
    ]

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    const range = activeSheet.getRange(0, 0, values.length, values[0]!.length)
    if (!range)
      throw new Error('range is not defined')

    // TODO: add facade API
    const data: (string | undefined)[][] = []
    range.forEach((row, col, cell) => {
      data[row] = data[row] || []
      data[row][col] = cell.v?.toString()
    })

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data, null, 2))
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data, null, 2))
  })
}

export function setupGetWorkbookData($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get workbook data'
  $button.dataset.command = 'get-workbook-data'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(activeWorkbook.save(), null, 2))
    // eslint-disable-next-line no-console

    console.log('setupGetWorkbookData', JSON.stringify(activeWorkbook.save(), null, 2))
  })
}

export function setupGetSheetData($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'get Sheet1 data'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    const snapshot = activeWorkbook.save()
    const sheet1 = Object.values(snapshot.sheets).find((sheet) => {
      return sheet.name === 'Sheet1'
    })

    if (!sheet1)
      throw new Error('sheet1 is not defined')

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(sheet1, null, 2))
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(sheet1, null, 2))
  })
}

export function setupCreateSheet($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'create Sheet2'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    const sheet = activeWorkbook.create('Sheet2', 10, 10)

    if (!sheet)
      throw new Error('sheet is not defined')

    // eslint-disable-next-line no-alert
    alert('Sheet created')
  })
}

export function setupScrollToCell($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to B100'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    univerAPI.executeCommand(ScrollToCellCommand.id, {
      range: {
        startColumn: 1,
        startRow: 99,
        endColumn: 1,
        endRow: 99,
      },
    })
  })
}

export function setupScrollToTop($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to top'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    univerAPI.executeCommand(ScrollToCellCommand.id, {
      range: {
        startColumn: 0,
        startRow: 0,
        endColumn: 0,
        endRow: 0,
      },
    })
  })
}

export function setupScrollToBottom($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'scroll to bottom'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { rowCount } = activeSheet._worksheet.getSnapshot()
    univerAPI.executeCommand(ScrollToCellCommand.id, {
      range: {
        startColumn: 0,
        startRow: rowCount - 1,
        endColumn: 0,
        endRow: rowCount - 1,
      },
    })
  })
}

export function setupSetBackground($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'set A1 background'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    const range = activeSheet.getRange(0, 0, 1, 1)
    range?.setBackgroundColor('red')
  })
}

export function setupCommandsListenerSwitch($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'start listening commands'
  $toolbar.appendChild($button)
  const el = $button
  let listener: any = null

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    if (listener) {
      listener.dispose()
      listener = null
      el.innerHTML = 'start listening commands'
      return
    }

    listener = univerAPI.onCommandExecuted((command) => {
      // eslint-disable-next-line no-console
      console.log(command)
    })
    el.innerHTML = 'stop listening commands'

    // eslint-disable-next-line no-alert
    alert('Press "Ctrl + Shift + I" to open the console and do some actions in the Univer Sheets, you will see the commands in the console.')
  })
}

export function setupEditSwitch($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'disable edit'
  $toolbar.appendChild($button)
  const el = $button
  let canEdit: boolean = true

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    canEdit = !canEdit
    activeWorkbook.setEditable(canEdit)

    el.innerHTML = canEdit ? 'disable edit' : 'enable edit'
  })
}

export function setupUndo($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'undo'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    univerAPI.undo()
  })
}

export function setupRedo($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'redo'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    univerAPI.redo()
  })
}

export function setupSetSelection($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'select A1'
  $toolbar.appendChild($button)

  $button.addEventListener('click', () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')
    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    activeSheet.setActiveRange(activeSheet.getRange(0, 0))
  })
}

export function setupClearStyles($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'clear A1 styles'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')
    const activeSheet = activeWorkbook.getActiveSheet()
    if (!activeSheet)
      throw new Error('activeSheet is not defined')

    await activeSheet.setActiveRange(activeSheet.getRange(0, 0))

    univerAPI.executeCommand('sheet.command.clear-selection-format')
  })
}

export function setupVersion($toolbar: HTMLElement) {
  const $button = document.createElement('a')
  // eslint-disable-next-line node/prefer-global/process
  $button.textContent = `version: ${process.env.UNIVER_VERSION}`
  $button.href = 'https://github.com/dream-num/univer'
  $button.target = '_blank'
  $toolbar.appendChild($button)
}

export function setupUniverGo($toolbar: HTMLElement) {
  const $button = document.createElement('a')
  $button.textContent = 'Univer Go'
  $button.title = 'Build Your Own Spreadsheet — Seamlessly Integrate with AI Agents, Databases, and Applications'
  $button.href = 'https://go.univer.ai?from=univer-sheet-start-kit'
  $button.target = '_blank'
  $toolbar.appendChild($button)
}

export function setupSetWorkbookData($toolbar: HTMLElement, univerAPI: FUniver) {
  const $button = document.createElement('a')
  $button.textContent = 'load workbook data'
  $button.dataset.command = 'load-workbook-data'
  $toolbar.appendChild($button)

  $button.addEventListener('click', async () => {
    if (!univerAPI)
      throw new Error('univerAPI is not defined')

    const activeWorkbook = univerAPI.getActiveWorkbook()
    if (!activeWorkbook)
      throw new Error('activeWorkbook is not defined')

    univerAPI.getActiveWorkbook()?.endEditingAsync(true);

    console.log('WORKBOOK_DATA', activeWorkbook.save())

    univerAPI.createWorkbook({ ...activeWorkbook.save(), id: 'new-workbook-' + Math.random().toString(36).substring(1, 9) })


  })
}

