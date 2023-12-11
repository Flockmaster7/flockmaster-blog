import { HttpResponse, WebSiteInfoType } from '@/types/http';
import request from './index.ts';
import { BlogClassifiy, HotBlog, ModuleNum } from '@/types/index.js';

export const getDailyNum = () => {
	return request<HttpResponse<Partial<WebSiteInfoType>>>({
		url: `/data/dailyNum`,
		method: 'GET'
	});
};

export const getBlogClassifiy = () => {
	return request<HttpResponse<BlogClassifiy[]>>({
		url: `/data/blogClassifiy`,
		method: 'GET'
	});
};

export const getHotBlog = () => {
	return request<HttpResponse<HotBlog[]>>({
		url: `/data/hotBlog`,
		method: 'GET'
	});
};

export const getModuleNum = () => {
	return request<HttpResponse<ModuleNum>>({
		url: `/data/moduleNum`,
		method: 'GET'
	});
};
