import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/store/store';
import router from './router/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/static/css/default.scss';
import '@/static/css/media.scss';
// 引入主题
import '@/static/theme/theme.css';
import '@/static/theme/element.css';
// 引入element暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css';

//svg图标
import 'virtual:svg-icons-register';
import zbSvgIconVue from './components/common/zb-svg-icon.vue';

const app = createApp(App);
app.use(pinia);
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

//全局注册组件
app.component(zbSvgIconVue.name, zbSvgIconVue);

app.mount('#app');
