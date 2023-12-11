<template>
	<el-skeleton animated :loading="isLoading">
		<template #template>
			<div class="card">
				<div class="blogInfo">
					<div class="container">
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
				<div class="blogImg">
					<el-skeleton-item
						variant="image"
						:style="{
							width: 100 + '%',
							height: 170 + 'px',
							borderRadius: 8 + 'px'
						}" />
				</div>
			</div>
		</template>
		<template #default>
			<div class="card">
				<div class="blogImg">
					<img v-lazy="imgUrl(blog.blog_image)" alt="" />
					<!-- <img src="../../static/images/admin_bg.png" alt="" /> -->
				</div>
				<div class="blogInfo">
					<div class="top">
						<div class="title">{{ blog.title }}</div>
						<div class="author">
							@{{ blog.author }} -
							{{ getTimeFormNow(blog.createdAt) }}
						</div>
						<div class="description">
							{{ blog.content_html }}
						</div>
						<div class="tag">
							<el-tag
								v-for="item in blog.tags"
								:key="item.id"
								color="var(--theme-active-color)">
								{{ item.tag_name }}</el-tag
							>
						</div>
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
	@media screen and (max-width: 540px) {
		.title {
			font-size: 20px !important;
		}
		.author,
		.data-item {
			font-size: 15px !important;
		}

		.date {
			font-size: 14px !important;
		}

		.bottom {
			flex-direction: column;
		}
	}
	.card {
		gap: 15px;
		margin: 20px 10px 30px;
		border-radius: 15px;
		width: 100%;
		height: 250px;
		display: flex;
		justify-content: space-around;
		transition: 0.6s;

		.blogInfo {
			flex-basis: 60%;
			padding: 8px;
			height: 100%;
			box-sizing: border-box;
			width: 400px;
			display: flex;
			flex-direction: column;
			gap: 30px;
			height: 100%;

			.top {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					font-weight: 700;
					font-size: 25px;
				}

				.author {
					font-size: 16px;
					color: $gray;
				}

				.tag {
					margin-top: 15px;
					display: flex;
					gap: 5px;
				}

				.description {
					margin-top: 5px;
					font-size: 15px;
					color: rgb(126, 126, 126);
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}

			.bottom {
				padding: 4px 8px;
				background: linear-gradient(to right, rgb(210, 237, 248), #fff);
				border-radius: 8px;
				display: flex;
				justify-content: space-between;
				.data {
					display: flex;
					gap: 40px;
					.data-item {
						color: $gray;
						display: flex;
						align-items: center;
					}
				}
			}
		}

		.blogImg {
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}
	}

	.card:hover {
		cursor: pointer;
		// width: 95%;
		// height: 180px;
		// transform: translate(-5px, -5px);
	}
</style>
