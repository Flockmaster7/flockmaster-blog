import { HttpResponse, PageRequest } from '@/types/http';
import request from './index.ts';
import { CircleFriend } from '@/types/index.js';

export const getCircleFriendList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<CircleFriend>>>({
		url: `/circleFriend/getList/${pageNum}/${pageSize}`,
		method: 'get'
	});
};

export const getUserDianzanList = () => {
	return request<HttpResponse<number[]>>({
		url: `/circleFriend/getUserDianzanIdList`,
		method: 'get'
	});
};

export const dianzanCircleFriend = (id: number) => {
	return request<HttpResponse<string>>({
		url: `/circleFriend/dianzan/${id}`,
		method: 'post'
	});
};

export const cancelDianzanCircleFriend = (id: number) => {
	return request<HttpResponse<string>>({
		url: `/circleFriend/cancelDianzan/${id}`,
		method: 'post'
	});
};
