import { getLeaveWordList, leaveWord } from '@/http/leaveWord';
import { CommentParamsType, LeaveWordType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLeaveWordStore = defineStore('leaveWord', () => {
	const leaveWordList = ref<LeaveWordType[]>([]);
	const leaveWordTotal = ref<number>(0);

	// 留言
	const addLeaveWord = async (data: CommentParamsType) => {
		const res = await leaveWord(data);
	};

	// 获取留言列表
	const getLeaveWord = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getLeaveWordList(pageNum, pageSize);
		if (res.code === 200) {
			leaveWordList.value = res.data.rows;
			leaveWordTotal.value = res.data.total;
		}
	};

	return {
		leaveWordList,
		leaveWordTotal,
		addLeaveWord,
		getLeaveWord
	};
});
