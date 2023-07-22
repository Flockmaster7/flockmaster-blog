import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
	const isMobile = ref(false);
	const isLoading = ref(false);
	const isShowStickyBar = ref(false);
	const isDark = ref(false);
	const currentTheme = ref('default');
	const previewId = ref('myPreview');
	const rightOpen = ref(false);

	return {
		isDark,
		isMobile,
		isLoading,
		isShowStickyBar,
		currentTheme,
		previewId,
		rightOpen
	};
});
