import { HttpResponse, WebSiteInfoType } from '@/types/http';
import request from './index.ts';

/**
 * 添加网站访问量
 * @returns GetBlogDetailResType
 */
export const addVisit = () => {
	return request<HttpResponse<string>>({
		url: `/common/addVisit`,
		method: 'POST'
	});
};

/**
 * 获取网站资讯
 * @returns
 */
export const getWebsiteInfo = () => {
	return request<HttpResponse<WebSiteInfoType>>({
		url: `/common/getWebsiteInfo`,
		method: 'GET'
	});
};
