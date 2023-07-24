import {
	getChildLeaveWordList,
	getLeaveWordList,
	leaveWord
} from '@/http/leaveWord';
import { CommentParamsType, LeaveWordType } from '@/types';
import { minDelay } from '@/utils/common';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLeaveWordStore = defineStore('leaveWord', () => {
	const leaveWordList = ref<LeaveWordType[]>([]);
	const leaveWordTotal = ref<number>(0);

	// 留言
	const addLeaveWord = async (data: CommentParamsType) => {
		await leaveWord(data);
	};

	// 获取留言列表
	const getLeaveWord = async (pageNum: number, pageSize: number) => {
		const { data: res } = await minDelay(
			getLeaveWordList(pageNum, pageSize),
			500
		);
		if (res.code === 200) {
			leaveWordList.value =
				Number(pageNum) === 1
					? res.data.rows
					: [...leaveWordList.value, ...res.data.rows];
			leaveWordTotal.value = res.data.total;
			if (res.data.count! <= pageSize * pageNum) {
				return false;
			} else {
				return true;
			}
		}
	};

	// 获取子留言列表
	const getChildrenLeaveWord = async (
		parent_id: number,
		pageNum: number,
		pageSize: number
	) => {
		const { data: res } = await minDelay(
			getChildLeaveWordList(parent_id, pageNum, pageSize),
			500
		);
		if (res.code === 200) {
			leaveWordList.value.forEach((item) => {
				if (item.id === parent_id) {
					item.children = [...item.children, ...res.data.rows];
				}
			});
			leaveWordTotal.value += res.data.total;
			if (res.data.total <= pageSize * pageNum) {
				return false;
			} else {
				return true;
			}
		}
	};

	return {
		leaveWordList,
		leaveWordTotal,
		addLeaveWord,
		getLeaveWord,
		getChildrenLeaveWord
	};
});
