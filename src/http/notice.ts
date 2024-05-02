import { Notice, NoticeParams } from '@/types';
import { HttpResponse, PageRequest } from '@/types/http';
import request from './index.ts';

/**
 * 添加通知
 * userId、messageId
 */
export const addNotice = (data: NoticeParams) => {
	return request<HttpResponse<string>>({
		url: `/notice/create`,
		method: 'POST',
		data
	});
};

export const getNotice = (
	pageNum: number,
	pageSize: number,
	wrapper?: Partial<Notice>
) => {
	return request<HttpResponse<PageRequest<Notice>>>({
		url: `/notice/getList/${pageNum}/${pageSize}`,
		method: 'POST',
		data: {
			wrapper
		}
	});
};

export const updateNotice = (data: Partial<Notice>) => {
	return request<HttpResponse<string>>({
		url: `/notice/update`,
		method: 'POST',
		data
	});
};

export const getNoReadNum = (userId: number) => {
	return request<HttpResponse<number>>({
		url: `/notice/noReadNum`,
		method: 'POST',
		data: {
			userId
		}
	});
};
