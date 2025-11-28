// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js' // Thay thế bằng đường dẫn đến file router của bạn

const app = createApp(App)

// PHẢI CÓ DÒNG NÀY
app.use(router) 

app.mount('#app')