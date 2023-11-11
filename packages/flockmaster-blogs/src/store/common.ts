import { addVisit } from './../http/common';
import { getWebsiteInfo } from '@/http/common';
import { WebSiteInfoType } from '@/types/http';
import cache from '@/utils/cache';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
	const isMobile = ref(false);
	const isLoading = ref(false);
	const isShowStickyBar = ref(false);
	const isDark = ref(false);
	const currentTheme = ref('default');
	const websiteInfo = ref<WebSiteInfoType>({
		website_visit: 0,
		website_visit_today: 0
	});

	const rightOpen = ref(false);
	const activeNav = ref(cache.getShortCache('activeNav') || '/home');

	// 持久化存储
	const changeActiveNav = (nav: string) => {
		cache.setShortCache('activeNav', nav);
		activeNav.value = nav;
	};

	// 增加网站访问量
	const addWebsiteVisit = async () => {
		await addVisit();
	};

	// 获取网站资讯
	const getWebsite = async () => {
		const { data: res } = await getWebsiteInfo();
		websiteInfo.value = res.data;
	};

	return {
		isDark,
		isMobile,
		isLoading,
		isShowStickyBar,
		currentTheme,
		rightOpen,
		activeNav,
		getWebsite,
		websiteInfo,
		addWebsiteVisit,
		changeActiveNav
	};
});
