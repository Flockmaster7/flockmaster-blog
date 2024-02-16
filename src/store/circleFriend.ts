import {
	cancelDianzanCircleFriend,
	commentCircleFriend,
	dianzanCircleFriend,
	getCircleFriendList,
	getCommentListByCircleFriendId,
	getUserDianzanList
} from '@/http/circleFriend';
import {
	CircleFriend,
	CircleFriendCommentForm,
	CircleFriendForm
} from '@/types/index.js';
import { isLogin } from '@/utils/login';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCircleFriendStore = defineStore('circleFriend', () => {
	const circleFriendList = ref<CircleFriend[]>([]);
	const circleFriendTotal = ref(0);
	const userDianzanList = ref<number[]>([]);

	const getList = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getCircleFriendList(pageNum, pageSize);
		if (res.code === 200) {
			if (pageNum === 1) {
				circleFriendList.value = res.data.rows;
			} else {
				circleFriendList.value.push(...res.data.rows);
			}
			circleFriendTotal.value = res.data.total;
			return true;
		}
		return false;
	};

	const getUserDianzan = async () => {
		if (isLogin()) {
			const { data: res } = await getUserDianzanList();
			if (res.code === 200) {
				userDianzanList.value = res.data;
			}
		}
	};

	const dianzan = async (id: number) => {
		const { data: res } = await dianzanCircleFriend(id);
		if (res.code === 200) {
			return true;
		}
		return false;
	};

	const cancelDianzan = async (id: number) => {
		const { data: res } = await cancelDianzanCircleFriend(id);
		if (res.code === 200) {
			return true;
		}
		return false;
	};

	const comment = async (data: CircleFriendForm) => {
		const { data: res } = await commentCircleFriend(data);
		return res.code === 200 ? true : false;
	};

	const getCommentListById = async (data: CircleFriendCommentForm) => {
		const { data: res } = await getCommentListByCircleFriendId(data);
		if (res.code === 200) {
			const targetIndex = circleFriendList.value.findIndex(
				(item) => item.id === data.circleFriendId
			);
			circleFriendList.value[targetIndex].comments = res.data.rows;
			circleFriendList.value[targetIndex].commentCount = res.data.total;
			return true;
		} else {
			return false;
		}
	};

	return {
		circleFriendList,
		circleFriendTotal,
		getList,
		dianzan,
		comment,
		cancelDianzan,
		getUserDianzan,
		userDianzanList,
		getCommentListById
	};
});
