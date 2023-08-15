<template>
	<el-skeleton animated :loading="isLoading">
		<template #template>
			<div class="card">
				<div class="blog">
					<div class="blogImg">
						<el-skeleton-item
							variant="image"
							:style="{ width: 100 + '%', height: 170 + 'px' }" />
					</div>
					<div class="blogInfo">
						<div class="top">
							<div class="title">
								<el-skeleton-item
									variant="text"
									:style="{ width: 200 + 'px' }" />
							</div>
						</div>
						<div class="main">
							<div class="author">
								<el-skeleton-item
									variant="text"
									:style="{ width: 200 + 'px' }" />
							</div>
						</div>
						<div class="bottom">
							<el-skeleton-item variant="text" />
						</div>
					</div>
				</div>
			</div>
		</template>
		<template #default>
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
						</div>
					</div>
				</div>
			</div>
		</template>
	</el-skeleton>
</template>

<script setup lang="ts">
	import { Blog } from '@/types';
	import { imgUrl } from '@/utils/common';
	import { getTimeFormNow } from '@/utils/dayFormat';

	interface PropType {
		blog: Blog;
		isLoading: boolean;
	}

	defineProps<PropType>();
</script>

<style lang="scss" scoped>
	.card {
		padding: 8px;
		border-radius: 15px;
		background-color: var(--theme-card-item-color);
		width: 90%;
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
							display: flex;
							align-items: center;
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
