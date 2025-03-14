import { createPinia } from 'pinia'
import { setupPiniaPlugin } from './plugins'
import type { App } from "vue";

export function setupStore(app: App) {
  const pinia = createPinia()

  setupPiniaPlugin(pinia)

  app.use(pinia)
}

export * from './modules'