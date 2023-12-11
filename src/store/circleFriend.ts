import {
	cancelDianzanCircleFriend,
	dianzanCircleFriend,
	getCircleFriendList,
	getUserDianzanList
} from '@/http/circleFriend';
import { CircleFriend } from '@/types/index.js';
import { isLogin } from '@/utils/login';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCircleFriendStore = defineStore('circleFriend', () => {
	const circleFriendList = ref<CircleFriend[]>([]);
	const userDianzanList = ref<number[]>([]);

	const getList = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getCircleFriendList(pageNum, pageSize);
		if (res.code === 200) {
			circleFriendList.value = res.data.rows;
		}
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

	return {
		circleFriendList,
		getList,
		dianzan,
		cancelDianzan,
		getUserDianzan,
		userDianzanList
	};
});
