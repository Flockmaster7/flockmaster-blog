import { ElMessage } from 'element-plus';
import {
	getBlogClassifiy,
	getDailyNum,
	getHotBlog,
	getModuleNum
} from './../http/data';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DataScreen } from '@/types';

export const useDataStore = defineStore('data', () => {
	const dataVisualize = ref<DataScreen>({
		website_visit_today: 0,
		blogData: [
			{
				value: 0,
				name: '综合',
				percentage: '0%'
			},
			{
				value: 0,
				name: '前端',
				percentage: '0%'
			},
			{
				value: 0,
				name: '后端',
				percentage: '0%'
			},
			{
				value: 0,
				name: '面试',
				percentage: '0%'
			},
			{
				value: 0,
				name: '日记',
				percentage: '0%'
			}
		],
		hotBlog: [],
		moduleNum: [
			{
				value: 100,
				name: '文章',
				percentage: '40%'
			},
			{
				value: 10,
				name: '标签',
				percentage: '10%'
			},
			{
				value: 20,
				name: '作品',
				percentage: '20%'
			},
			{
				value: 30,
				name: '相册',
				percentage: '30%'
			},
			{
				value: 30,
				name: '留言',
				percentage: '30%'
			}
		]
	});

	const getDaily = async (): Promise<boolean> => {
		const { data: res } = await getDailyNum();
		if (res.code === 200) {
			dataVisualize.value.website_visit_today =
				res.data.website_visit_today!;
			return Promise.resolve(true);
		} else {
			return Promise.reject('init error');
		}
	};

	const getBlogData = async (): Promise<boolean> => {
		const { data: res } = await getBlogClassifiy();
		if (res.code === 200) {
			const total = res.data.reduce(
				(sum, item) => sum + item.articleCount,
				0
			);
			res.data.forEach((item, index) => {
				dataVisualize.value.blogData[index].value = item.articleCount;
				dataVisualize.value.blogData[index].percentage =
					((item.articleCount / total) * 100).toFixed(2) + '%';
			});
			return Promise.resolve(true);
		} else {
			return Promise.reject('init error');
		}
	};

	const getHot = async (): Promise<boolean> => {
		const { data: res } = await getHotBlog();
		if (res.code === 200) {
			dataVisualize.value.hotBlog = res.data;
			return Promise.resolve(true);
		} else {
			return Promise.reject('init error');
		}
	};

	const getModule = async (): Promise<boolean> => {
		const { data: res } = await getModuleNum();
		if (res.code === 200) {
			let total = 0;
			Object.keys(res.data).forEach((item) => {
				total += res.data[item];
			});
			Object.keys(res.data).forEach((item, index) => {
				dataVisualize.value.moduleNum[index].value = res.data[item];
				dataVisualize.value.moduleNum[index].percentage =
					((res.data[item] / total) * 100).toFixed(2) + '%';
			});
			return Promise.resolve(true);
		} else {
			return Promise.reject('init error');
		}
	};

	const initData = async () => {
		try {
			await Promise.all([
				getDaily(),
				getBlogData(),
				getHot(),
				getModule()
			]);
		} catch (error: any) {
			ElMessage({
				type: 'error',
				message: '获取数据失败，请刷新重试'
			});
		}
	};

	return {
		dataVisualize,
		initData
	};
});
