import { Blog, Comment } from '@/types';
import { addVisit, getHotBlogs, getLatestComments } from './../http/common';
import { getWebsiteInfo } from '@/http/common';
import { WebSiteInfoType } from '@/types/http';
import cache from '@/utils/cache';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ACTIVENAV, DARK } from '@/constant';
import { HOME_URL } from '@/config';

export const useCommonStore = defineStore('common', () => {
	const mobileNavOpen = ref(false);
	const zhankai = ref(false);
	const commentOpen = ref(false);
	const isMobile = ref(false);
	const isLoading = ref(false);
	const searchOpen = ref(false);
	const isShowStickyBar = ref(false);
	const isDark = ref(cache.getCache(DARK) || false);
	const currentTheme = ref('default');
	const websiteInfo = ref<WebSiteInfoType>({
		website_visit: 0,
		website_visit_today: 0,
		website_blogs: 0,
		website_tags: 0,
		website_works: 0,
		website_leaveWords: 0
	});
	const hotBlogs = ref<Partial<Blog>[]>();
	const latestComments = ref<Comment[]>();

	const rightOpen = ref(false);
	const activeNav = ref(cache.getShortCache(ACTIVENAV) || HOME_URL);

	// 持久化存储
	const changeActiveNav = (nav: string) => {
		cache.setShortCache(ACTIVENAV, nav);
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

	const getHomeComments = async () => {
		const { data: res } = await getLatestComments();
		if (res.code === 200) {
			latestComments.value = res.data;
			return true;
		} else {
			return false;
		}
	};

	const getHomeBlogs = async () => {
		const { data: res } = await getHotBlogs();
		if (res.code === 200) {
			hotBlogs.value = res.data;
		}
	};

	return {
		searchOpen,
		zhankai,
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
		changeActiveNav,
		getHomeComments,
		getHomeBlogs,
		hotBlogs,
		latestComments,
		commentOpen,
		mobileNavOpen
	};
});
