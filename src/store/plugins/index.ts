import { type Pinia } from 'pinia'
import { createPersistedState, type PluginOptions, type Serializer } from 'pinia-plugin-persistedstate';

/** pinia 持久化插件的自定义序列化和反序列化配置 */
export function customSerializer(): Serializer {
  return {
    deserialize: (value) => {
      return JSON.parse(value);
    },
    serialize: (value) => {
      return JSON.stringify(value);
    },
  };
}

/** 创建 pinia 持久化插件的配置，根据环境变量 VITE_APP_STORAGE_TYPE 选择 local 或 session 存储 */
export function createPersistedStateOptions(): PluginOptions {
  const storage = useStorage()
  const storageType = import.meta.env.VITE_APP_STORAGE_TYPE as string as 'local' | 'session'

  return {
    storage: storage[storageType],
    key: (id: string) => `_${id}_store`,
    serializer: customSerializer(),
  };
}

/** 注册 pinia 持久化插件 */
export const setupPiniaPlugin = (pinia: Pinia) => {
  pinia.use(createPersistedState(createPersistedStateOptions()))
}