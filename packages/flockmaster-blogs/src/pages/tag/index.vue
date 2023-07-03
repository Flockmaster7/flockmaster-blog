<template>
	<div class="container">
		<div class="tag">
			<el-collapse v-model="activeTag" @change="handleTagCollapseChange">
				<el-collapse-item name="1">
					<template #title>
						<el-icon class="head-icon"><Guide /></el-icon>
						<text class="head-text"> 标签 </text>
					</template>
					<div class="tag-List">
						<el-check-tag
							v-for="(item, index) in tagList"
							:key="item.id"
							:checked="tagChecked.includes(item.id)"
							color="skyblue"
							@change="(status: boolean) => onChangeTag(status, item.id)"
							>{{ item.tag_name }}</el-check-tag
						>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div v-for="(item, index) in blogList" :key="item.id">
			<div @click="gotoBlogDetail(item.id)" class="item">
				<zbBlogItemRectangle :blog="item"></zbBlogItemRectangle>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useTagStore } from '@/store/tag';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import zbBlogItemRectangle from '@/components/item/zb-blogItem-rectangle.vue';

	const router = useRouter();

	const blogStore = useBlogStore();
	const { blogList } = storeToRefs(blogStore);

	// 标签
	const tgStore = useTagStore();
	const { tagList } = storeToRefs(tgStore);
	const activeTag = ref(['1']);
	const handleTagCollapseChange = (val: string[]) => {
		console.log(val);
	};

	tgStore.getTgLIst(1, 999);
	// 标签选中
	const { getBlogListParams } = storeToRefs(blogStore);
	const tagChecked = ref<number[]>([]);
	const onChangeTag = async (status: boolean, id: number) => {
		if (status) tagChecked.value.push(id);
		else {
			let index = tagChecked.value.indexOf(id);
			if (index !== -1) tagChecked.value.splice(index, 1);
		}
		//获取标签对应的文章列表
		getBlogListParams.value = {
			tags: tagChecked.value
		};
		blogStore.getBlogList(1, 9, getBlogListParams.value);
	};

	// 文章
	onMounted(async () => {
		await getBlog();
	});
	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};
	const getBlog = async () => {
		await blogStore.getBlogList(1, 9);
	};
</script>

<style lang="scss" scoped>
	.container {
		margin: 15px;
		background-color: $white;
		padding: 20px;
		display: flex;
		// justify-content: space-between;
		flex-direction: column;
		align-items: center;
		width: 828px;
		min-height: 500px;
		gap: 20px;

		.tag {
			width: 90%;
			height: 200px;
			// overflow: hidden;
			.head-icon {
				font-size: 25px;
				margin-right: 5px;
			}
			// 右侧卡片标题文字
			.head-text {
				font-size: 20px;
				font-weight: 700;
			}
			.tag-List {
				overflow-y: scroll;
				width: 100%;
				height: 200px;
				display: flex;
				flex-wrap: wrap;
				padding: 0 20px;
				gap: 20px;
				.el-check-tag.is-checked {
					background-color: $themeColor;
					color: $white;
				}
			}
		}
	}
</style>
