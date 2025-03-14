declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // 可以为 `import App from './App.vue'` 提供类型
  const component: DefineComponent<{}, {}, any>
  export default component
}

export { }