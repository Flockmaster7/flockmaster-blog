import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/static/css/default.scss';

// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-javascript';
// 选择使用主题
VMdPreview.use(githubTheme, {
	Prism
});

const app = createApp(App);
const pinia = createPinia();

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

// 引入v-md-editor预览组件
app.use(VMdPreview);

app.use(router);
app.use(pinia);
app.mount('#app');
