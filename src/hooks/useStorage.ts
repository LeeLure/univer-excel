
const storagePrefix = import.meta.env.VITE_APP_STORAGE_PREFIX

/**
 * @description 二次封装本地存储和会话存储的 hooks
 * @example
 * const { local, session } = useStorage();
 * local.set('key', 'value'); // 本地存储
 * session.set('key', 'value'); // 会话存储
 */
export const useStorage = () => {
  return {
    local: {
      has: (key: string) => {
        return Object.prototype.hasOwnProperty.call(localStorage, `${storagePrefix}${key}`);
      },
      get: (key: string) => {
        return localStorage.getItem(`${storagePrefix}${key}`);
      },
      set: (key: string, value: string) => {
        localStorage.setItem(`${storagePrefix}${key}`, value);
      },
      remove: (key: string) => {
        localStorage.removeItem(`${storagePrefix}${key}`);
      },
      clear: () => {
        localStorage.clear();
      },
      getItem: (key: string) => {
        return localStorage.getItem(`${storagePrefix}${key}`);
      },
      setItem: (key: string, value: string) => {
        localStorage.setItem(`${storagePrefix}${key}`, value);
      },
    },
    session: {
      has: (key: string) => {
        return Object.prototype.hasOwnProperty.call(sessionStorage, `${storagePrefix}${key}`);
      },
      get: (key: string) => {
        return sessionStorage.getItem(`${storagePrefix}${key}`);
      },
      set: (key: string, value: string) => {
        sessionStorage.setItem(`${storagePrefix}${key}`, value);
      },
      remove: (key: string) => {
        sessionStorage.removeItem(`${storagePrefix}${key}`);
      },
      clear: () => {
        sessionStorage.clear();
      },
      getItem: (key: string) => {
        return sessionStorage.getItem(`${storagePrefix}${key}`);
      },
      setItem: (key: string, value: string) => {
        sessionStorage.setItem(`${storagePrefix}${key}`, value);
      },
    },
  }
}