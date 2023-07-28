<template>
	<div class="item-container">
		<div class="top">
			<img v-lazy="imgUrl(blog.blog_image)" alt="" />
		</div>
		<div class="bottom">
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
	</div>
</template>

<script setup lang="ts">
	import { GetBlogDetailResType } from '@/types';
	import { getTimeFormNow } from '@/utils/dayFormat';
	import { imgUrl } from '@/utils/common';

	interface PropsType {
		blog: GetBlogDetailResType;
	}

	defineProps<PropsType>();

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
		flex-direction: column;
		background-color: var(--theme-card-item-color);
		padding: 5px;
		gap: 10px;
		transition: 0.6s;
		.top {
			border-radius: 10px;
			overflow: hidden;
			width: 100%;
			height: 170px;
			img {
				width: 100%;
				height: 100%;
			}
		}

		.bottom {
			display: flex;
			flex-direction: column;
			gap: 8px;
			.top-info {
				font-size: 15px;

				color: $grayWhite;
			}
			.title {
				font-size: 18px;
				font-weight: 700;
			}
			.description {
				color: $gray;
				max-width: 320px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				margin-top: 8px;
				font-size: 16px;
			}
		}
	}

	.item-container:hover {
		cursor: pointer;
		transform: translate(-3px, -3px);
	}
</style>
