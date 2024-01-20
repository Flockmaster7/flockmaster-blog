import { DIANZAN_LEAVEWORD } from '@/constant';
import {
	cancelDianzan,
	dianzan,
	getChildLeaveWordList,
	getLeaveWordList,
	leaveWord
} from '@/http/leaveWord';
import { CommentParamsType, LeaveWord } from '@/types';
import cache from '@/utils/cache';
import { minDelay } from '@/utils/common';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLeaveWordStore = defineStore('leaveWord', () => {
	const leaveWordList = ref<LeaveWord[]>([]);
	const leaveWordTotal = ref<number>(0);

	const dianzanList = ref<number[]>(cache.getCache(DIANZAN_LEAVEWORD) || []);

	// 留言
	const addLeaveWord = async (data: CommentParamsType) => {
		await leaveWord(data);
	};

	// 获取留言列表
	const getLeaveWord = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getLeaveWordList(pageNum, pageSize);
		if (res.code === 200) {
			leaveWordList.value =
				Number(pageNum) === 1
					? res.data.rows
					: [...leaveWordList.value, ...res.data.rows];
			leaveWordTotal.value = res.data.total;
			return true;
		} else {
			return false;
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

	const dianzanLeaveWord = async (id: number) => {
		const { data: res } = await dianzan(id);
		return res.code === 200 ? true : false;
	};

	const cancelDianzanLeaveWord = async (id: number) => {
		const { data: res } = await cancelDianzan(id);
		return res.code === 200 ? true : false;
	};

	return {
		dianzanList,
		dianzanLeaveWord,
		cancelDianzanLeaveWord,
		leaveWordList,
		leaveWordTotal,
		addLeaveWord,
		getLeaveWord,
		getChildrenLeaveWord
	};
});
