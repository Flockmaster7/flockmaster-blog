<template>
	<div class="tag-container">
		<p class="title">博客标签</p>
		<div class="desc">目前共有{{ tagTotal }}个标签</div>
		<div class="tag-List" v-if="tagList.length !== 0">
			<el-tag
				v-for="item in tagList"
				:key="item.id"
				:color="tagPropMap[Number(item.tag_classify)].color"
				:size="tagPropMap[Number(item.tag_classify)].size"
				class="tag-item"
				@click="gotoTagDetail(item)"
				>{{ item.tag_name }}</el-tag
			>
		</div>
		<zb-empty v-else>空空如也</zb-empty>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useRouter } from 'vue-router';

	import useIsMobile from '@/hooks/useIsMobile';
	import { useCommonStore } from '@/store/common';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import { Tag } from '@/types';
	import useStore from '@/store';
	import { tagPropMap } from '@/config/tag';

	const router = useRouter();

	// 获取设备
	useIsMobile();
	const commonStore = useCommonStore();
	const { isMobile } = storeToRefs(commonStore);

	// 标签
	const { tag } = useStore();
	const { tagList, tagTotal } = storeToRefs(tag);

	tag.getTgLIst(1, 999);

	const gotoTagDetail = (tag: Tag) => {
		router.push('/tagDetail?id=' + tag.id + '&tagName=' + tag.tag_name);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.tag-container {
			padding: 20px 0 !important;
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
			max-height: 200px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			padding: 0 20px;
			gap: 10px;

			.tag-item:hover {
				cursor: pointer;
			}
		}
	}
</style>
