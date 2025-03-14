import { createUniver, LocaleType } from '@univerjs/presets'
import { UniverSheetsAdvancedWorkerPreset } from '@univerjs/presets/preset-sheets-advanced/worker'
import { UniverSheetsCoreWorkerPreset } from '@univerjs/presets/preset-sheets-core/worker'

createUniver({
  locale: LocaleType.ZH_CN,
  locales: {
    [LocaleType.ZH_CN]: {},
  },
  presets: [
    UniverSheetsCoreWorkerPreset(),
    UniverSheetsAdvancedWorkerPreset({
      // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/license
      // eslint-disable-next-line node/prefer-global/process
      license: import.meta.env.VITE_APP_UNIVER_LICENSE,
    }),
  ],
})
