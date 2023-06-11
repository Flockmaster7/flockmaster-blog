<template>
	<div class="blog-item">
		<div class="blog-item-img">
			<img class="img" src="@/static/images/test_blog_img.png" alt="" />
		</div>
		<div class="blog-item-info">
			<div class="title">
				<div class="blog-item-title">{{ blog.title }}</div>
				<div class="blog-item-date">{{ blog.createdAt }}</div>
			</div>
			<!-- <div class="author">{{ blog.author }}</div> -->
			<div class="classify">
				<el-tag :color="blog.classify === '1' ? 'pink' : 'blue'">
					{{ blog.classify === '1' ? '前端' : '后端' }}
				</el-tag>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { GetBlogDetailResType } from '@/types';

	export interface PropType {
		blog: GetBlogDetailResType;
	}

	const props = defineProps<PropType>();

	const tagList = [
		{
			color: 'blue'
		},
		{
			color: 'red'
		},
		{
			color: 'pink'
		},
		{
			color: 'purple'
		}
	];
</script>

<style lang="scss" scoped>
	.blog-item {
		display: flex;
		position: relative;
		.blog-item-img {
			.img {
				width: 360px;
				height: 260px;
			}
		}

		.blog-item-info {
			margin: 20px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			justify-content: space-around;
			.title {
				display: flex;
				.blog-item-title {
					font-size: 25px;
					font-weight: 700;
				}

				.blog-item-date {
					font-size: 14px;
					color: #a8a4a4;
					position: absolute;
					right: 0;
				}
			}
			.author {
				font-size: 20px;
				font-weight: 700;
			}

			.classify {
				display: flex;
				color: #fff;
				.tag {
					margin-right: 5px;
				}
			}
		}
	}

	.blog-item:hover {
		cursor: pointer;
	}
</style>
