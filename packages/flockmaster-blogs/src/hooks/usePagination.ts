import { GetBlogListForm } from '@/types';
import { minDelay } from '@/utils/common';
import { onMounted, ref } from 'vue';

// 分页器
export default function (
	getList: (pageNum: number, pageSize: number, arg: GetBlogListForm) => any
) {
	const pageNum = ref(1);
	const pageSize = ref(9);
	const isLoading = ref(false);
	const getBlogListParams = ref<GetBlogListForm>({});

	const delay = 500;

	const delayGetList = () => {
		if (typeof getList !== 'function') return Promise.reject(false);
		isLoading.value = true;
		getList(pageNum.value, pageSize.value, getBlogListParams.value);
		window.scrollTo({
			top: 0
		});
		return Promise.resolve(true);
	};

	const handleSizeChange = async (val: number) => {
		pageSize.value = val;
		await minDelay<boolean>(delayGetList(), delay);
		isLoading.value = false;
	};

	const handleCurrentChange = async (val: number) => {
		pageNum.value = val;
		await minDelay<boolean>(delayGetList(), delay);
		isLoading.value = false;
	};

	onMounted(async () => {
		await minDelay<boolean>(delayGetList(), delay);
		isLoading.value = false;
	});

	return {
		getBlogListParams,
		isLoading,
		pageNum,
		pageSize,
		handleSizeChange,
		handleCurrentChange
	};
}
