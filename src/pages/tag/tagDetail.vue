<template>
	<div class="tagDetail-container">
		<el-timeline>
			<el-timeline-item :timestamp="tagName + '标签'" placement="top">
				<!-- <span class="name">{{ tagName }}</span>
				<span class="title">标签</span> -->
				<div style="margin-bottom: 60px"></div>
			</el-timeline-item>
			<el-timeline-item
				placement="top"
				:timestamp="item.year"
				v-for="(item, index) in blogArr"
				class="timeline-item"
				size="large"
				:key="index">
				<div
					v-for="blog in item.children"
					:key="blog.id"
					@click="gotoBlogDetail(blog.id)"
					class="blog-item">
					<el-tag color="#5cbfef" size="large">{{
						blog.date
					}}</el-tag>
					<div class="info-item">
						<zb-svg-icon name="tag" :size="28"></zb-svg-icon>
						<span>{{ blog.title }}</span>
					</div>
				</div>
				<div style="margin-bottom: 60px"></div>
			</el-timeline-item>
		</el-timeline>
		<ZbEmpty v-if="blogArr.length === 0"></ZbEmpty>
	</div>
</template>

<script setup lang="ts">
	import ZbEmpty from '@/components/common/zb-empty.vue';
	import useStore from '@/store';
	import { Blog } from '@/types';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

	const route = useRoute();
	const router = useRouter();
	const { blog } = useStore();
	const { blogList } = storeToRefs(blog);

	const { id, tagName } = route.query;

	const blogArr = ref<GroupArr[]>([]);

	interface GroupArr {
		year: string;
		children: Partial<Blog>[];
	}

	const getBlogs = async () => {
		await blog.getBlogListByTag([Number(id)], 1, 999);
		blogArr.value = makeGroup(blogList.value);
	};

	const makeGroup = (arr: Partial<Blog>[]) => {
		const groupArr: GroupArr[] = [
			{
				year: arr[0].year ? arr[0].year : '',
				children: []
			}
		];
		arr.forEach((item) => {
			if (groupArr[groupArr.length - 1].year === item.year) {
				groupArr[groupArr.length - 1].children.push(item);
			} else {
				groupArr.push({
					year: item.year!,
					children: [item]
				});
			}
		});
		return groupArr;
	};

	onMounted(() => {
		getBlogs();
	});

	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
	};
</script>

<style lang="scss" scoped>
	:deep(.el-timeline-item__timestamp) {
		font-family: 'Courier New', Courier, monospace;
		font-size: 24px;
		color: $gray;
		font-weight: 500;
		margin-right: 6px;
	}

	.tagDetail-container {
		padding: 80px 120px;

		.name {
			font-family: 'Courier New', Courier, monospace;
			font-size: 24px;
			color: $gray;
			font-weight: 500;
			margin-right: 6px;
		}

		.title {
			font-weight: 600;
			font-size: 20px;
			color: #b3b4af;
		}

		.blog-item {
			display: flex;
			align-items: center;
			gap: 20px;
			margin: 30px 0;

			.info-item {
				display: flex;
				align-items: center;
				gap: 6px;
				font-size: 20px;
				font-family: 'Courier New', Courier, monospace;
				border-bottom: 1px solid rgb(182, 178, 178);
			}
		}

		.blog-item:hover {
			cursor: pointer;
		}
	}
</style>
