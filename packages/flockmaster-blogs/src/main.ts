import { addVisit } from './http/common';
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
// 图片懒加载
import lazyPlugin from 'vue3-lazy';
// 动画
import 'animate.css';
// 引入tailwind
import '@/static/css/tailwind.css';

const app = createApp(App);
lazyPlugin.install(app, {
	loading: new URL('@/static/images/loading.png', import.meta.url).href,
	error: new URL('@/static/images/error.png', import.meta.url).href
});
app.use(pinia);
app.use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

//全局注册组件
app.component(zbSvgIconVue.name, zbSvgIconVue);

app.mount('#app');
