import { ref } from 'vue';

type Fn = () => Promise<any>;

export default function useSkeleton(fn: Fn) {
	const isLoading = ref(false);

	const getData = async () => {
		isLoading.value = true;
		await fn();
		isLoading.value = false;
	};

	getData();

	return {
		isLoading
	};
}
