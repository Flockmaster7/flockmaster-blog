<template>
	<div class="card">
		<div class="blog">
			<div class="blogImg">
				<img v-lazy="imgUrl(blog.blog_image)" alt="" />
			</div>
			<div class="blogInfo">
				<div class="top">
					<div class="title">{{ blog.title }}</div>
				</div>
				<div class="main">
					<div class="author">作者：{{ blog.author }}</div>
				</div>
				<div class="bottom">
					<div class="date">
						发布于：{{ getTimeFormNow(blog.createdAt) }}
					</div>
					<div class="data">
						<div class="data-item">读:{{ blog.blog_read }}</div>
						<div class="data-item">赞:{{ blog.blog_like }}</div>
						<div class="data-item">藏:{{ blog.blog_collect }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { GetBlogDetailResType } from '@/types';
	import { imgUrl } from '@/utils/common';
	import { getTimeFormNow } from '@/utils/dayFormat';

	interface PropType {
		blog: GetBlogDetailResType;
	}

	defineProps<PropType>();
</script>

<style lang="scss" scoped>
	.card {
		padding: 8px;
		border-radius: 15px;
		background-color: var(--theme-card-item-color);
		// height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		transition: 0.6s;

		.blog {
			.blogImg {
				width: 100%;
				height: 170px;
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 100%;
					height: 100%;
					border-radius: 8px;
				}
			}
			.blogInfo {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 120px;

				.top {
					display: flex;
					justify-content: space-between;

					.title {
						font-weight: 700;
						font-size: 20px;
					}
				}

				.main {
					.author {
						font-size: 16px;
						color: $gray;
					}
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					.data {
						display: flex;
						gap: 0.4rem;
						.data-item {
							font-size: 15px;
							color: $gray;
						}
					}
					.date {
						display: flex;
						align-items: center;
						color: $gray;
						font-size: 14px;
					}
				}
			}
		}
	}

	.card:hover {
		cursor: pointer;
		width: 95%;
		height: 180px;
		// transform: translate(-3px, -3px);
	}
</style>
