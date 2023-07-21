<template>
	<div class="card">
		<div class="blogInfo">
			<div class="container">
				<div class="top">
					<div class="title">{{ blog.title }}</div>
				</div>
				<div class="main">
					<div class="author">作者：{{ blog.author }}</div>
				</div>
				<div class="bottom">
					<div class="data">
						<div class="data-item">
							<zb-svg-icon
								name="yanjing"
								color="#717775"></zb-svg-icon
							>{{ blog.blog_read }}
						</div>
						<div class="data-item">
							<zb-svg-icon
								name="dianzan"
								color="#717775"></zb-svg-icon
							>{{ blog.blog_like }}
						</div>
						<div class="data-item">
							<zb-svg-icon
								name="shoucang"
								color="#717775"></zb-svg-icon
							>{{ blog.blog_collect }}
						</div>
					</div>
					<div class="date">发布于：{{ blog.createdAt }}</div>
				</div>
			</div>
		</div>
		<div class="blogImg">
			<img :src="imgUrl(blog.blog_image)" alt="" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { GetBlogDetailResType } from '@/types';
	import { imgUrl } from '@/utils/common';

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
		width: 640px;
		height: 150px;
		display: flex;
		justify-content: space-around;
		transition: 0.6s;

		.blogInfo {
			flex-basis: 60%;
			padding: 8px;
			height: 100%;
			.container {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 140px;

				.top {
					display: flex;
					justify-content: space-between;

					.title {
						font-weight: 700;
						font-size: 25px;
					}
				}

				.main {
					.author {
						font-size: 17px;
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
							display: flex;
							align-items: center;
							color: $gray;
						}
					}
					.date {
						display: flex;
						align-items: center;
						color: $gray;
					}
				}
			}
		}

		.blogImg {
			flex-basis: 40%;
			width: 200px;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 100%;
				height: 140px;
				border-radius: 8px;
			}
		}
	}

	.card:hover {
		cursor: pointer;
		transform: translate(-4px, -4px);
	}
</style>
