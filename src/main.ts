//main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import "amfe-flexible";
import bus from './libs/bus'

// import '@/permission'

import { Vue } from 'vue-class-component';
// import 'vant/lib/index.css';
const app = createApp(App)
app.config.globalProperties.$bus = bus;
// app.config.globalProperties.$toast = Toast;

import {Input,Checkbox} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'; 
app.use(Input).use(Checkbox)

app
.use(router)
app.mount('#app')