import { createUniver, defaultTheme, LocaleType, merge, UniverInstanceType, IAuthzIoService, IUndoRedoService, IImageIoService } from '@univerjs/presets'
import { UniverSheetsConditionalFormattingPreset } from '@univerjs/presets/preset-sheets-conditional-formatting'
import sheetsConditionalFormattingZhCN from '@univerjs/presets/preset-sheets-conditional-formatting/locales/zh-CN'
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core'
import sheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN'
import { UniverSheetsDataValidationPreset } from '@univerjs/presets/preset-sheets-data-validation'
import sheetsDataValidationZhCN from '@univerjs/presets/preset-sheets-data-validation/locales/zh-CN'
// import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing'
// import sheetsDrawingZhCN from '@univerjs/presets/preset-sheets-drawing/locales/zh-CN'
import { UniverSheetsFilterPreset } from '@univerjs/presets/preset-sheets-filter'
import sheetsFilterZhCN from '@univerjs/presets/preset-sheets-filter/locales/zh-CN'
import { UniverSheetsHyperLinkPreset } from '@univerjs/presets/preset-sheets-hyper-link'
import sheetsHyperLinkZhCN from '@univerjs/presets/preset-sheets-hyper-link/locales/zh-CN'

// 协同编辑
import { UniverSheetsCollaborationPreset } from '@univerjs/presets/preset-sheets-collaboration';
import UniverPresetSheetsCollaborationZhCN from '@univerjs/presets/preset-sheets-collaboration/locales/zh-CN';

// 导入导出
import { UniverSheetsAdvancedPreset } from '@univerjs/presets/preset-sheets-advanced';
import UniverPresetSheetsAdvancedZhCN from '@univerjs/presets/preset-sheets-advanced/locales/zh-CN';
import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing'
import UniverPresetSheetsDrawingZhCN from '@univerjs/presets/preset-sheets-drawing/locales/zh-CN'

import type { FUniver } from '@univerjs/presets'


import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'

// 协同编辑
import '@univerjs/presets/lib/styles/preset-sheets-collaboration.css'

/**
 * @param domId - dom id or dom element
 * @returns - Univer instance
 */
export function setupUniver(domId?: string | HTMLElement): FUniver {

  const collaboration = true

  const { univerAPI } = createUniver({
    override: [
      [IAuthzIoService, null],
      [IUndoRedoService, null]
    ],
    locale: LocaleType.ZH_CN,
    locales: {
      [LocaleType.ZH_CN]: merge(
        {},
        sheetsCoreZhCN,
        sheetsConditionalFormattingZhCN,
        sheetsDataValidationZhCN,
        // sheetsDrawingZhCN,
        sheetsFilterZhCN,
        sheetsHyperLinkZhCN,

        UniverPresetSheetsCollaborationZhCN,
        UniverPresetSheetsDrawingZhCN,
        UniverPresetSheetsAdvancedZhCN,
      ),
    },
    theme: defaultTheme,
    collaboration,
    presets: [
      UniverSheetsCorePreset({
        container: domId,
        header: true
      }),
      UniverSheetsAdvancedPreset({
        useWorker: false,
        universerEndpoint: import.meta.env.VITE_APP_UNIVER_ENDPOINT,
        license: import.meta.env.VITE_APP_UNIVER_LICENSE,
      }),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsDataValidationPreset(),
      ...(collaboration ? [UniverSheetsCollaborationPreset()] : []),
      UniverSheetsDrawingPreset({ collaboration }),
      UniverSheetsFilterPreset(),

      UniverSheetsHyperLinkPreset(),

    ],
  })

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

  // univerAPI.createWorkbook({})


  return univerAPI
}