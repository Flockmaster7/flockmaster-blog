import { CommentParamsType, LeaveWordType } from '@/types';
import { HttpResponse, PageRequest } from '@/types/http';
import request from './index';

/**
 * 文章评论
 * @param data
 * @returns
 */
export const leaveWord = (data: CommentParamsType) => {
	return request<HttpResponse<string>>({
		url: `/leaveWord`,
		method: 'POST',
		data
	});
};

/**
 * 获取评论列表
 * @param id 文章id
 * @param pageNum 页码
 * @param pageSize 每一页的数量
 * @returns
 */
export const getLeaveWordList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<LeaveWordType>>>({
		url: `/getLeaveWordList/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};

/**
 * 获取子留言列表
 * @param id parent_id
 * @param pageNum 页码
 * @param pageSize 每一页的数量
 * @returns
 */
export const getChildLeaveWordList = (
	parent_id: number,
	pageNum: number,
	pageSize: number
) => {
	return request<HttpResponse<PageRequest<LeaveWordType>>>({
		url: `/getChildrenLeaveWordList/${parent_id}/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};
