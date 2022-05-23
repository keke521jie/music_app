import { createApp } from 'vue'
import App from './App.vue'
import getVant from './plugins'
// 引入路由
import router from './router'
// 引入store
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
getVant(app)
app.mount('#app')