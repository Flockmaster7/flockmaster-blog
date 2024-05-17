<template>
	<zb-svg-icon
		class="icon"
		:size="18"
		name="search"
		@click="openSearch"></zb-svg-icon>

	<el-popover
		placement="bottom"
		:offset="5"
		:width="searchWidth"
		:visible="popVisible">
		<template #reference>
			<div
				v-if="searchOpen"
				class="animate__animated animate__fadeInRight">
				<el-input
					ref="searchInputRef"
					v-model="searchQuery"
					@input="search"
					@blur="() => (popVisible = false)"
					:style="{ width: searchWidth + 'px' }"
					clearable></el-input>
			</div>
		</template>
		<div class="search-result">
			<div
				class="search-item"
				v-for="item in searchList"
				:key="item.id"
				@click="gotoBlogDetail(item.id)">
				{{ item.title }}
			</div>
		</div>
		<zb-empty v-if="searchList.length === 0" :height="200" />
	</el-popover>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { debounce } from 'lodash-es';
	import { storeToRefs } from 'pinia';
	import { ref, onMounted, computed } from 'vue';
	import { useRouter } from 'vue-router';

	const { common, blog } = useStore();
	const { searchOpen, isMobile } = storeToRefs(common);
	const { searchList } = storeToRefs(blog);
	const popVisible = ref(false);

	const router = useRouter();
	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
		clear();
	};

	const searchWidth = computed(() => {
		return isMobile.value ? 100 : 300;
	});

	const openSearch = () => {
		searchOpen.value = !searchOpen.value;
	};

	const searchQuery = ref('');
	const searchInputRef = ref<HTMLInputElement | null>(null);

	const search = debounce(() => {
		popVisible.value = true;
		blog.search(searchQuery.value);
	}, 500);

	const clear = () => {
		searchList.value = [];
		searchOpen.value = false;
	};

	onMounted(() => {
		console.log(searchInputRef.value);
		searchInputRef.value?.focus();
	});
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.search-item {
			font-size: 14px;
			height: 16px !important;
			line-height: 16px !important;
			padding: 4px !important;
		}
	}

	.icon:hover {
		cursor: pointer;
	}

	:deep(.el-input__wrapper) {
		border-radius: 30px;
	}

	.search-result {
		overflow: auto;
		max-height: 200px;
		.search-item {
			height: 20px;
			line-height: 20px;
			padding: 8px 16px;
			border-radius: 6px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

			&:hover {
				cursor: pointer;
				background: var(--theme-data-show);
			}
		}
	}
</style>
