<template>
	<div class="item-container">
		<div class="left">
			<div class="top-info">
				{{ blog.author + ' & ' + getTimeFormNow(blog.createdAt) }}
			</div>
			<div class="title">
				{{ blog.title }}
			</div>
			<div class="description">
				{{ replaceContent(blog.content_text) }}
			</div>
			<div class="tool"></div>
		</div>
		<div class="right">
			<img :src="imgUrl(blog.blog_image)" alt="" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useBlogStore } from '@/store/blog';
	import { GetBlogDetailResType } from '@/types';
	import { getTimeFormNow } from '@/utils/dayFormat';
	import { imgUrl } from '@/utils/common';

	interface PropsType {
		blog: GetBlogDetailResType;
	}

	const props = defineProps<PropsType>();

	const blogStore = useBlogStore();

	const replaceContent = (text: string) => {
		return text.replace(/#/g, '');
	};
</script>

<style lang="scss" scoped>
	.item-container {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--theme-card-item-color);
		padding: 20px 15px;
		gap: 10px;
		transition: 0.6s;

		.left {
			flex-basis: 60%;
			display: flex;
			flex-direction: column;
			gap: 8px;
			.top-info {
				font-size: 16px;

				color: $grayWhite;
			}
			.title {
				font-size: 24px;
				font-weight: 700;
			}
			.description {
				color: $gray;
				width: 500px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				margin-top: 10px;
			}
		}

		.right {
			flex-basis: 40%;
			border-radius: 10px;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.item-container:hover {
		cursor: pointer;
		transform: translate(-3px, -3px);
	}
</style>
