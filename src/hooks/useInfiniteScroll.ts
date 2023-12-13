import { onMounted, ref } from 'vue';

type Fn = (page: number) => Promise<boolean>;

export default function useInfiniteScroll(fn: Fn) {
	const pageNum = ref(1);
	const isLoading = ref(false);

	const loadMore = async () => {
		isLoading.value = true;
		const isSuccess = await fn(pageNum.value);
		// const isSuccess = await album.getAlbumList(pageNum.value, 12);
		if (isSuccess) {
			isLoading.value = false;
			pageNum.value += 1;
			console.log(pageNum.value);
		}
	};

	onMounted(() => {
		loadMore();
	});

	return {
		pageNum,
		isLoading,
		loadMore
	};
}
