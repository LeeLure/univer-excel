import 'normalize.css'
import './style.css'

/**  see  https://blog.csdn.net/u013737132/article/details/145464575  */
// import 'default-passive-events'

import { createApp } from 'vue'
import { setupStore } from './store'
import App from './App.vue'

(() => {
  const app = createApp(App)

  setupStore(app)

  app.mount('#app')
})()
