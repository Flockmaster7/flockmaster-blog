import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 根据当前工作目录中的 `mode` 加载 .env 文件
	// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
	const env = loadEnv(mode, process.cwd(), '');
	// 开发环境配置
	if (command === 'serve') {
		return {
			base: './',
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
				}),
				//svg图标
				createSvgIconsPlugin({
					iconDirs: [path.resolve(process.cwd(), 'src/icons')]
				}),
				// eslint
				eslintPlugin({
					include: [
						'src/**/*.ts',
						'src/**/*.vue',
						'src/*.ts',
						'src/*.vue'
					]
				})
			],
			// 引入全局scss变量
			css: {
				devSourcemap: true, //开发模式时启用
				preprocessorOptions: {
					// 全局样式引入
					scss: {
						additionalData:
							'@import "./src/static/css/_variable.scss";',
						javascriptEnabled: true
					}
				}
			},
			resolve: {
				alias: {
					'~': path.resolve(__dirname, './'),
					'@': path.resolve(__dirname, 'src')
				},
				// 导入时想要省略的扩展名列表
				extensions: ['.ts', '.js', '.json', '.vue']
			},
			build: {
				sourcemap: false
			},
			server: {
				host: true,
				open: true, //启动项目自动弹出浏览器
				port: 4000, //启动端口
				proxy: {
					'/api': {
						target: env.VITE_BASEURL,
						changeOrigin: true,
						rewrite: (path) => path.replace(/^\/api/, '')
					}
				}
			}
		};
	} else {
		// 生产环境配置
		return {
			base: './',
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
				}),
				//svg图标
				createSvgIconsPlugin({
					iconDirs: [path.resolve(process.cwd(), 'src/icons')]
				}),
				visualizer({ open: true })
			],
			// 引入全局scss变量
			css: {
				devSourcemap: true, //开发模式时启用
				preprocessorOptions: {
					// 全局样式引入
					scss: {
						additionalData:
							'@import "./src/static/css/_variable.scss";',
						javascriptEnabled: true
					}
				}
			},
			resolve: {
				alias: {
					'~': path.resolve(__dirname, './'),
					'@': path.resolve(__dirname, 'src')
				},
				// 导入时想要省略的扩展名列表
				extensions: ['.ts', '.js', '.json', '.vue']
			},
			build: {
				sourcemap: false,
				rollupOptions: {
					output: {
						chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
						entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
						assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
						manualChunks(id) {
							// 将 node_modules 中的代码单独打包成一个 JS 文件
							if (id.includes('node_modules')) {
								return 'vendor';
							}
						}
					}
				},
				minify: 'terser',
				terserOptions: {
					compress: {
						drop_console: true,
						drop_debugger: true // 去除报错
					}
				}
			}
		};
	}
});
