import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
	const isMobile = ref(false);
	const isLoading = ref(false);
	const isShowStickyBar = ref(false);
	return {
		isMobile,
		isLoading,
		isShowStickyBar
	};
});
