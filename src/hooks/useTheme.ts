import useStore from '@/store';
import { minDelay } from '@/utils/common';
import { ElLoading } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

export default function () {
	const { common } = useStore();
	const { isDark, currentTheme } = storeToRefs(common);

	// 现在主题
	const theme = ref('default');

	// 切换黑夜白天
	const changeDark = () => {
		const htmlElement = document.documentElement;
		if (isDark.value) {
			removeAllTheme();
			isDark.value = false;
		} else {
			removeAllTheme();
			htmlElement.classList.add('dark');
			isDark.value = true;
		}
	};

	// 切换主题
	const changeActiveTheme = (activeTheme: string) => {
		isDark.value = false;
		const htmlElement = document.documentElement;
		// 先移除现有的theme
		removeAllTheme();
		// 添加 class
		htmlElement.classList.add(activeTheme);
		theme.value = activeTheme;
		currentTheme.value = activeTheme;
		return Promise.resolve(true);
	};

	// 移除所有主题
	const removeAllTheme = () => {
		const htmlElement = document.documentElement;
		htmlElement.classList.value = '';
		theme.value = '';
	};

	// 延迟切换
	const delayChangeTheme = async (theme: string) => {
		const loadingInstance = ElLoading.service({
			lock: true,
			text: '切换主题中'
			// background: 'var(--theme-color)'
		});
		await minDelay(changeActiveTheme(theme), 500);
		loadingInstance.close();
	};

	// 是否为晚上
	const nowIsDark = () => {
		const date = new Date();
		const hour = date.getHours();
		if (hour >= 18 || hour <= 6) {
			changeDark();
		}
	};

	onMounted(() => {
		if (currentTheme.value !== 'default') {
			changeActiveTheme(currentTheme.value);
		} else {
			nowIsDark();
		}
	});

	return {
		theme,
		changeActiveTheme,
		removeAllTheme,
		changeDark,
		delayChangeTheme
	};
}
