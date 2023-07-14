<template>
	<div class="searchArea-container">
		<div class="search-input">
			<el-input v-model="params.querySearch" clearable>
				<template #append>
					<button class="search-button" @click="search">搜索</button>
				</template>
			</el-input>
		</div>
		<div class="search-filter">
			<div
				class="filter"
				v-for="(item, index) in filters"
				:key="item.id"
				:class="{ active: item.id === activeFilter }"
				@click="changeFilter(item.id)">
				{{ item.text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useBlogStore } from '@/store/blog';
	import { useCommonStore } from '@/store/common';
	import { minDelay, validatorNotEmpty } from '@/utils/common';
	import { Search } from '@element-plus/icons-vue';
	import { ElMessage } from 'element-plus';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';

	interface ParamsType {
		querySearch: string;
		orderByRead: boolean;
	}

	const emit = defineEmits<{
		(event: 'getSearchBlog', data?: ParamsType): void;
	}>();

	const blogStore = useBlogStore();

	const commonStore = useCommonStore();
	const { isLoading } = storeToRefs(commonStore);

	const route = useRoute();
	const query = route.query.query as string;
	const activeFilter = ref(1);

	const params = ref<ParamsType>({
		querySearch: query,
		orderByRead: false
	});

	onMounted(() => {
		search();
	});

	// 获取文章
	const getBlog = async (data?: ParamsType) => {
		isLoading.value = true;
		if (data) {
			emit('getSearchBlog', data);
			// await blogStore.getBlogList(1, 9, data);
		} else {
			emit('getSearchBlog');
			// await blogStore.getBlogList(1, 9);
		}
		return Promise.resolve(true);
	};

	// 搜索
	const search = async () => {
		if (validatorNotEmpty(params.value.querySearch)) {
			ElMessage.warning('不能为空');
			return;
		}
		await minDelay<boolean>(getBlog(params.value), 500);
		isLoading.value = false;
	};

	const filters = [
		{
			id: 1,
			text: '最新优先'
		},
		{
			id: 2,
			text: '最热优先'
		}
	];

	// 切换filter
	const changeFilter = async (id: number) => {
		activeFilter.value = id;
		params.value.orderByRead = activeFilter.value === 2 ? true : false;
		await search();
		isLoading.value = false;
	};
</script>

<style lang="scss" scoped>
	// el-input

	:deep(.el-input-group__append, .el-input-group__prepend) {
		padding: 0;
		background-color: #fff;
	}
	.searchArea-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 50px 10px 0;
		gap: 30px;

		.search-button {
			border: none;
			background-color: var(--theme-color);
			color: $white;
			padding: 10px 25px;
			border-radius: 3px;
		}

		.search-button:hover {
			cursor: pointer;
		}

		.search-filter {
			display: flex;
			gap: 15px;
			align-self: flex-start;
			padding: 15px;
			.filter {
				color: $gray;
				border-right: 1px solid $grayWhite;
				padding-right: 15px;
				font-size: 15px;
			}

			.filter:last-child {
				border-right: none;
				padding-right: 15px;
			}

			.filter:hover {
				cursor: pointer;
				color: var(--theme-active-color);
			}

			.active {
				color: var(--theme-active-color) !important;
			}
		}
	}
</style>
