import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userStore = defineStore('user', () => {
	const count = ref(0);

	function increment() {
		count.value++;
	}

	return { count, increment };
});
