<template>
	<div class="blogInfo-container">
		<div class="top">
			<div class="title">{{ blogDeatil.title }}</div>
			<div class="createdAt">{{ blogDeatil.createdAt }} 发布</div>
		</div>
		<div class="bottom">
			<div class="author">作者：{{ blogDeatil.author }}</div>
			<div class="data">
				<div class="data-item">
					<span class="text">阅读：{{ blogDeatil.blog_read }}</span>
				</div>
				<div class="data-item">
					<span class="text">点赞：{{ blogDeatil.blog_like }}</span>
				</div>
				<div class="data-item">
					<span class="text">
						收藏：{{ blogDeatil.blog_collect }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Blog } from '@/types';

	interface PropsType {
		blogDeatil: Blog;
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	.blogInfo-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 25px;
		padding: 16px 32px 32px;
		.top {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 10px;
			.title {
				font-size: 35px;
				font-weight: 700;
			}

			.createdAt {
				font-size: 16px;
				color: $gray;
			}
		}

		.bottom {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 20px;
			.author {
				font-size: 18px;
				font-weight: 500;
			}

			.data {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 15px;

				&-item {
					.text {
						font-size: 13px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						margin-left: 5px;
						color: $grayWhite;
					}
				}
			}
		}
	}
</style>
