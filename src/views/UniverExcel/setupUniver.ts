// 核心功能
import '@univerjs/presets/lib/styles/preset-sheets-core.css'
// 协同编辑
import '@univerjs/presets/lib/styles/preset-sheets-collaboration.css'
// 筛选
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
// 数据验证
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
// 条件格式
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
// 超链接
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'
// 打印
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-advanced.css'
// 评论/批注
import '@univerjs/presets/lib/styles/preset-sheets-thread-comment.css'
// 查找替换
import '@univerjs/presets/lib/styles/preset-sheets-find-replace.css'
// 排序
import '@univerjs/presets/lib/styles/preset-sheets-sort.css'
// 导入样式文件
import '@univerjs-pro/exchange-client/lib/index.css';
import '@univerjs-pro/exchange-client/facade';
// 历史
import '@univerjs-pro/edit-history-viewer/lib/index.css';

import { createUniver, defaultTheme, LocaleType, merge, UniverInstanceType, LogLevel, IAuthzIoService, IUndoRedoService, type IWorkbookData, type FUniver } from '@univerjs/presets'

// 核心功能
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN'

// 协同编辑
import { UniverSheetsCollaborationPreset } from '@univerjs/presets/preset-sheets-collaboration';
import UniverPresetSheetsCollaborationZhCN from '@univerjs/presets/preset-sheets-collaboration/locales/zh-CN';
// 条件格式
import { UniverSheetsConditionalFormattingPreset } from '@univerjs/presets/preset-sheets-conditional-formatting'
import UniverPresetSheetsConditionalFormattingZhCN from '@univerjs/presets/preset-sheets-conditional-formatting/locales/zh-CN'
// 数据验证
import { UniverSheetsDataValidationPreset } from '@univerjs/presets/preset-sheets-data-validation'
import UniverPresetSheetsDataValidationZhCN from '@univerjs/presets/preset-sheets-data-validation/locales/zh-CN'
// 筛选
import { UniverSheetsFilterPreset } from '@univerjs/presets/preset-sheets-filter'
import UniverPresetSheetsFilterZhCN from '@univerjs/presets/preset-sheets-filter/locales/zh-CN'
// 超链接
import { UniverSheetsHyperLinkPreset } from '@univerjs/presets/preset-sheets-hyper-link'
import UniverPresetSheetsHyperLinkZhCN from '@univerjs/presets/preset-sheets-hyper-link/locales/zh-CN'
// 查找替换
import { UniverSheetsFindReplacePreset } from '@univerjs/presets/preset-sheets-find-replace'
import UniverPresetSheetsFindReplaceZhCN from '@univerjs/presets/preset-sheets-find-replace/locales/zh-CN'
// 排序
import { UniverSheetsSortPreset } from '@univerjs/presets/preset-sheets-sort'
import UniverPresetSheetsSortZhCN from '@univerjs/presets/preset-sheets-sort/locales/zh-CN'
// 评论/批注
import { UniverSheetsThreadCommentPreset } from '@univerjs/presets/preset-sheets-thread-comment'
import UniverPresetSheetsThreadCommentZhCN from '@univerjs/presets/preset-sheets-thread-comment/locales/zh-CN'
// 禅编辑器
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import sheetsZenEditorZhCN from '@univerjs/sheets-zen-editor/locale/zh-CN'
// 十字高亮
import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
import UniverSheetsCrosshairHighlightZhCN from '@univerjs/sheets-crosshair-highlight/locale/zh-CN'
// 打印
import { UniverSheetsAdvancedPreset } from '@univerjs/presets/preset-sheets-advanced'
import UniverPresetSheetsAdvancedZhCN from '@univerjs/presets/preset-sheets-advanced/locales/zh-CN';
import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing'
import UniverPresetSheetsDrawingZhCN from '@univerjs/presets/preset-sheets-drawing/locales/zh-CN'
// 历史记录
// import { UniverEditHistoryLoaderPlugin } from '@univerjs-pro/edit-history-loader';
import UniverPresetSheetsEditHistoryViewerZhCN from '@univerjs-pro/edit-history-viewer/locale/zh-CN';

// import workerURL from './worker.ts?worker&url'

import type { CreateUniverOptions } from './type'

import { UniverSheetsCustomMenuPlugin, setupUniverDebugPlugin } from './plugins'

/**
 * 是否开启协同编辑，默认开启，可通过环境变量 VITE_APP_UNIVER_COLLABORATION 控制
 * @returns boolean
 */
function enabledCollaboration() {
  return import.meta.env.VITE_APP_UNIVER_COLLABORATION === 'true' ? true : undefined
}

/**
 * 创建 Univer 配置
 * @param enabled - 是否开启协同编辑
 * @param domId - dom id 
 * @returns Univer 配置
 */
function createUniverConfig(enabled: true | undefined, domId?: string): CreateUniverOptions {
  domId = domId || 'app'
  const collaboration = enabled
  const universerEndpoint = import.meta.env.VITE_APP_UNIVER_ENDPOINT

  return {
    override: [
      [IAuthzIoService, null],
      [IUndoRedoService, null],
    ],
    logLevel: LogLevel.VERBOSE,
    locale: LocaleType.ZH_CN,
    locales: {
      [LocaleType.ZH_CN]: merge(
        {},
        UniverPresetSheetsCoreZhCN,
        UniverPresetSheetsConditionalFormattingZhCN,
        UniverPresetSheetsDataValidationZhCN,
        UniverPresetSheetsAdvancedZhCN,
        UniverPresetSheetsFilterZhCN,
        UniverPresetSheetsHyperLinkZhCN,
        UniverPresetSheetsDrawingZhCN,
        UniverPresetSheetsCollaborationZhCN,
        UniverPresetSheetsFindReplaceZhCN,
        UniverPresetSheetsSortZhCN,
        UniverPresetSheetsThreadCommentZhCN,
        sheetsZenEditorZhCN,
        UniverSheetsCrosshairHighlightZhCN,
        UniverPresetSheetsEditHistoryViewerZhCN
      ),
    },
    theme: defaultTheme,
    collaboration,
    presets: [
      UniverSheetsCorePreset({
        container: domId,
        header: true,
        footer: true,
        /** 如果需要使用 worker，请将 UniverSheetsAdvancedPreset 的 useWorker 设置为 true */
        // workerURL: new Worker(new URL(workerURL, import.meta.url), {
        //   type: 'module',
        // }),
      }),
      UniverSheetsDrawingPreset({
        collaboration,
      }),
      UniverSheetsAdvancedPreset({
        useWorker: false,
        // if univer page is not in the same domain as the server, you need to set the following parameters
        universerEndpoint,
        // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/license
        // eslint-disable-next-line node/prefer-global/process
        license: import.meta.env.VITE_APP_UNIVER_LICENSE
      }),
      UniverSheetsCollaborationPreset({
        universerEndpoint,
        univerContainerId: domId,
      }),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsDataValidationPreset(),
      UniverSheetsFindReplacePreset(),
      UniverSheetsSortPreset(),
      UniverSheetsFilterPreset(),
      UniverSheetsThreadCommentPreset({ collaboration }),
      UniverSheetsHyperLinkPreset(),
    ],
    plugins: [
      UniverSheetsCustomMenuPlugin,  // 直接使用插件类，不要包装成数组
      // UniverEditHistoryLoaderPlugin,
      UniverSheetsZenEditorPlugin,
      UniverSheetsCrosshairHighlightPlugin,
    ]
  }
}

/**
 * 创建协同编辑表格
 * 1. 如果 URL 中包含 unit 参数，则自动加载数据
 * 2. 否则，创建一个新的表格
 * 3. 跳转到协同编辑页面
 */
function createCollaborationSheet() {
  const url = new URL(window.location.href);
  const unit = url.searchParams.get('unit');

  if (unit) {
    // 如果 URL 中包含 unit 参数，则自动加载数据
  } else {
    // 创建一个新的表格
    fetch(`/universer-api/snapshot/${UniverInstanceType.UNIVER_SHEET}/unit/-/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: UniverInstanceType.UNIVER_SHEET, // instance type
        name: 'New Sheet By Univer', // sheet name
        creator: 'user',  // creator name
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('create unit failed');
      }

      return response.json();
    }).then((data) => {
      if (!data.unitID) {
        throw new Error('create unit failed');
      }

      url.searchParams.set('unit', data.unitID);
      url.searchParams.set('type', String(UniverInstanceType.UNIVER_SHEET));
      window.location.href = url.toString();
    }).catch((error) => {
      console.error(error);
    })
  }
}

export function setupUniver(domId?: string): FUniver {
  const { univer, univerAPI } = createUniver(createUniverConfig(enabledCollaboration(), domId))

  if (enabledCollaboration()) {
    // Promise.resolve().then(() => createCollaborationSheet())
    createCollaborationSheet()
  }

  setupUniverDebugPlugin(univer)

  return univerAPI
}