import { GetUserInfoResType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userStore = defineStore('user', () => {
	const userInfo = ref<GetUserInfoResType>();
	const type = ref<string>('read');

	return { userInfo, type };
});
