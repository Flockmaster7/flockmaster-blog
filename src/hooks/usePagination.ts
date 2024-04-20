import { BlogListForm } from '@/types';
import { onMounted, ref } from 'vue';

// 分页器
export default function (
	getList: (
		pageNum: number,
		pageSize: number,
		arg: Partial<BlogListForm>
	) => Promise<void>
) {
	const pageNum = ref(1);
	const pageSize = ref(9);
	const isLoading = ref(false);
	const getBlogListParams = ref<Partial<BlogListForm>>({});

	const delayGetList = async () => {
		if (typeof getList !== 'function') return Promise.reject(false);
		isLoading.value = true;
		await getList(pageNum.value, pageSize.value, getBlogListParams.value);
		window.scrollTo({
			top: 0
		});
		isLoading.value = false;
		return Promise.resolve(true);
	};

	const handleSizeChange = async (val: number) => {
		pageSize.value = val;
		await delayGetList();
		isLoading.value = false;
	};

	const handleCurrentChange = async (val: number) => {
		pageNum.value = val;
		await delayGetList();
		isLoading.value = false;
	};

	onMounted(async () => {
		await delayGetList();
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
