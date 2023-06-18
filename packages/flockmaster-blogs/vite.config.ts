import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		ElementPlus({
			// options
		})
	],
	// 引入全局scss变量
	css: {
		preprocessorOptions: {
			// 全局样式引入
			scss: {
				additionalData: '@import "./src/static//css/_variable.scss";',
				javascriptEnabled: true
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		extensions: ['.ts', '.js', '.json']
	},
	server: {
		open: true, //启动项目自动弹出浏览器
		port: 4000, //启动端口
		proxy: {
			'/api': {
				target: 'http://localhost:7070', //实际请求地址
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
});
