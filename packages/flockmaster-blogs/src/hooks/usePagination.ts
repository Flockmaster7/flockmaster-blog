import { GetBlogListForm } from '@/types';
import { ref } from 'vue';

// 分页器
export default function (
	wrapper: GetBlogListForm,
	getList: (pageNum: number, pageSize: number, arg: GetBlogListForm) => any
) {
	const pageNum = ref(1);
	const pageSize = ref(9);

	const handleSizeChange = (val: number) => {
		pageSize.value = val;
		getList(pageNum.value, pageSize.value, wrapper);
	};
	const handleCurrentChange = (val: number) => {
		pageNum.value = val;
		getList(pageNum.value, pageSize.value, wrapper);
	};

	return {
		pageNum,
		pageSize,
		handleSizeChange,
		handleCurrentChange
	};
}
