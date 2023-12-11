<template>
	<div class="card">
		<div class="imgBox">
			<img :src="imgUrl(imgEnvironment) + blog.blog_image" alt="" />
		</div>
		<div class="content">
			<div class="details">
				<div class="name">{{ blog.title }}</div>
				<div class="description">{{ blog.author }}</div>
				<div class="data">
					<div class="data_item">
						<p class="num">{{ blog.blog_read }}</p>
						<p class="text">阅读</p>
					</div>
					<div class="data_item">
						<p class="num">{{ blog.blog_like }}</p>
						<p class="text">点赞</p>
					</div>
					<div class="data_item">
						<p class="num">{{ blog.blog_collect }}</p>
						<p class="text">收藏</p>
					</div>
				</div>
				<div class="tagList">
					<el-tag
						v-for="item in blog.tags"
						:key="item.id"
						type="default"
						color="#a4c4b5"
						>{{ item.tag_name }}</el-tag
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Blog } from '@/types';
	import { imgUrl } from '@/utils/common';
	import { imgEnvironment } from '@/constant/index';

	export interface PropType {
		blog: Blog;
	}

	defineProps<PropType>();
</script>

<style lang="scss" scoped>
	.card {
		position: relative;
		width: 250px;
		height: 200px;
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
		transition: 1s;

		.imgBox {
			position: absolute;
			width: 250px;
			height: 150px;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			background-color: #000;
			border-radius: 5px;
			box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
			overflow: hidden;
			transition: 1s;

			img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		.content {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			overflow: hidden;

			.details {
				padding: 0px 40px;
				text-align: center;
				width: 100%;
				transition: 1s;
				transform: translateY(65px);
				.name {
					font-weight: 900;
					font-size: 18px;
					transition: 1s;
				}

				.description {
					opacity: 0.5;
					font-size: 15px;
					transition: 1s;
				}

				.data {
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin: 10px 0;

					.data_item {
						.num {
							font-size: 14px;
							color: #555;
							font-weight: 600;
							line-height: 14px;
						}
						.text {
							font-size: 14px;
							font-weight: 400;
							opacity: 0.5;
						}
					}
				}

				.tagList {
					display: flex;
					justify-content: center;
					gap: 8px;

					button {
						padding: 10px 20px;
						border-radius: 10px;
						border: none;
						transition: 0.8s;
					}

					button:hover {
						cursor: pointer;
						padding: 10px 30px;
						color: $white;
						background: $buttonLinearColor;
					}

					.good {
						color: $themeColor;
						transition: 1s;
						font-weight: 500;
					}
					.collect {
						font-weight: 600;
						color: $themeColor;
						transition: 1s;
					}
				}
			}
		}
	}

	.card:hover {
		height: 300px;

		.imgBox {
			width: 120px;
			height: 120px;
		}

		.content {
			.details {
				transform: translateY(-30px);
				.name,
				.description {
					transform: translateY(-20px);
				}

				.data {
				}
			}
		}
	}
</style>
