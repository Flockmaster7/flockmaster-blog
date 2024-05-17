<template>
	<div class="card">
		<div class="blogImg">
			<zb-image
				:src="blog.blog_image"
				:style="{ height: (isMobile ? 160 : 250) + 'px' }" />
		</div>
		<div class="blogInfo" @click="gotoBlogDetail(blog.id)">
			<div class="top">
				<div class="title-box">
					<div class="title">{{ blog.title }}</div>
					<img
						v-if="blog.top"
						src="../../static/images/top.png"
						alt="" />
				</div>
				<div class="author">
					@{{ blog.author }} -
					{{ getTimeFormNow(blog.createdAt) }}
				</div>
				<div class="description">
					{{ blog.content_html }}
				</div>
				<div class="tag">
					<zb-tag
						v-for="item in blog.tags"
						:key="item.id"
						color="#5cbfef"
						size="small">
						{{ item.tag_name }}</zb-tag
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

<script setup lang="ts">
	import { Blog } from '@/types';
	import zbImage from '@/components/common/zb-image.vue';
	import { getTimeFormNow } from '@/utils/dayFormat';
	import { useRouter } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import useStore from '@/store';
	import zbTag from '@/components/common/zb-tag.vue';

	interface PropType {
		blog: Blog;
	}

	const router = useRouter();
	const { common } = useStore();
	const { isMobile } = storeToRefs(common);

	defineProps<PropType>();

	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.card {
			flex-wrap: wrap;
		}

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

		.blogInfo {
			width: 100% !important;
		}

		.blogImg {
			flex-basis: 100% !important;
		}

		.bottom {
			flex-direction: column;
		}
	}
	.card {
		padding: 30px 0 20px;
		gap: 15px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		transition: 0.6s;
		border-bottom: 1px solid var(--theme-divider);

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
				gap: 12px;

				.title-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.title {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-weight: 700;
						font-size: 25px;
					}

					img {
						width: 50px;
					}
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
				background: var(--theme-data-show);
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
			flex-basis: 40%;

			img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}
	}

	.card:hover {
		cursor: pointer;
		transform: translate(-5px, -5px);
	}
</style>
