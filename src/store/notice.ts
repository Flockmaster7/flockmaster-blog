import { getNoReadNum, getNotice, updateNotice } from '@/http/notice';
import { Notice } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNoticeStore = defineStore('notice', () => {
	const noticeList = ref<Notice[]>([]);
	const noticeTotal = ref<number>(0);
	const noReadNum = ref(0);

	const getNoticeList = async (
		pageNum: number,
		pageSize: number,
		wrapper?: Partial<Notice>
	) => {
		const { data: res } = await getNotice(pageNum, pageSize, wrapper);
		if (res.code === 200) {
			if (pageNum === 1) {
				noticeList.value = res.data.rows;
			} else {
				noticeList.value.push(...res.data.rows);
			}
			noticeTotal.value = res.data.total;
			return true;
		}
		return false;
	};

	const readNotice = async (notice: Partial<Notice>) => {
		const { data: res } = await updateNotice(notice);
		return res.code === 200;
	};

	const getNoRead = async (userId: number) => {
		const { data: res } = await getNoReadNum(userId);
		if (res.code === 200) noReadNum.value = res.data;
		return res.code === 200;
	};

	return {
		noticeList,
		noticeTotal,
		noReadNum,
		getNoticeList,
		readNotice,
		getNoRead
	};
});
