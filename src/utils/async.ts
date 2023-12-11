// 使用 defineAsyncComponent 定义异步组件
import { defineAsyncComponent } from 'vue';

const AsyncComponent = (url: string) => {
	const Component = defineAsyncComponent(() => import(url));
	return Component;
};

export default AsyncComponent;
