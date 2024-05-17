<template>
	<div class="tag-container">
		<el-skeleton animated :loading="isLoading">
			<template #template>
				<TagSkeleton></TagSkeleton>
			</template>
			<template #default>
				<p class="title">博客标签</p>
				<div class="desc">目前共有{{ tagTotal }}个标签</div>
				<div class="tag-List" v-if="tagList.length !== 0">
					<zb-tag
						v-for="item in tagList"
						:key="item.id"
						:color="tagPropMap[Number(item.tag_classify)].color"
						:size="tagPropMap[Number(item.tag_classify)].size"
						class="tag-item"
						@click="gotoTagDetail(item)"
						>{{ item.tag_name }}</zb-tag
					>
				</div>
				<zb-empty v-if="tagList.length === 0 && !isLoading"
					>空空如也</zb-empty
				>
			</template>
		</el-skeleton>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useRouter } from 'vue-router';
	import zbTag from '@/components/common/zb-tag.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import TagSkeleton from './tagSkeleton.vue';
	import { Tag } from '@/types';
	import useStore from '@/store';
	import { tagPropMap } from '@/config/tag';
	import { ref } from 'vue';

	const router = useRouter();

	// 标签
	const { tag } = useStore();
	const { tagList, tagTotal } = storeToRefs(tag);

	const isLoading = ref(false);
	const getTag = async () => {
		isLoading.value = true;
		await tag.getTgLIst(1, 999);
		isLoading.value = false;
	};
	getTag();

	const gotoTagDetail = (tag: Tag) => {
		router.push('/tagDetail?id=' + tag.id + '&tagName=' + tag.tag_name);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.tag-container {
			min-height: calc(100vh - 275px);
			padding: 20px 12px !important;
		}
		.tag {
			padding: 0 10px 0 !important;
		}
	}
	.tag-container {
		box-sizing: border-box;
		padding: 50px 100px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			color: $gray;
			font-size: 24px;
		}

		.desc {
			color: $gray;
			font-size: 17px;
			margin: 40px 0 50px;
		}

		.tag-List {
			width: 100%;
			// max-height: 200px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 10px;

			.tag-item:hover {
				cursor: pointer;
			}
		}
	}
</style>
