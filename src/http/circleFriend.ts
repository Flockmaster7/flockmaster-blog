import { HttpResponse, PageRequest } from '@/types/http';
import request from './index.ts';
import {
	CircleFriend,
	CircleFriendComment,
	CircleFriendCommentForm,
	CircleFriendForm
} from '@/types/index.js';

export const getCircleFriendList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<CircleFriend>>>({
		url: `/circleFriend/getList/${pageNum}/${pageSize}`,
		method: 'post'
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

export const commentCircleFriend = (comment: CircleFriendForm) => {
	return request<HttpResponse<string>>({
		url: `/circleFriend/comment/add`,
		method: 'post',
		data: comment
	});
};

export const getCommentListByCircleFriendId = (
	data: CircleFriendCommentForm
) => {
	return request<HttpResponse<PageRequest<CircleFriendComment>>>({
		url: `/circleFriend/comment/getListByCirFriId`,
		method: 'post',
		data
	});
};
