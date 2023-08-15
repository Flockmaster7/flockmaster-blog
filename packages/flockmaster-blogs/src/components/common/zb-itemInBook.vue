<template>
	<!-- <div class="blog-item">
		<div class="blog-item-img">
			<img class="img" src="@/static/images/test_blog_img.png" alt="" />
		</div>
		<div class="blog-item-info">
			<div class="title">
				<div class="blog-item-title">{{ blog.title }}</div>
				<div class="blog-item-date">{{ blog.createdAt }}</div>
			</div>
			<div class="author">{{ blog.author }}</div>
			<div class="classify">
				<el-tag :color="blog.classify === '1' ? 'pink' : 'blue'">
					{{ blog.classify === '1' ? '前端' : '后端' }}
				</el-tag>
			</div>
		</div>
	</div> -->

	<div class="card">
		<div class="imgBox">
			<img src="@/static/images/test_blog_img.png" alt="" />
		</div>
		<div class="detail">
			<p class="title">{{ blog.title }}</p>
			<p class="author">{{ blog.author }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Blog } from '@/types';

	export interface PropType {
		blog: Blog;
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

	.card {
		width: 300px;
		height: 400px;
		background-color: #fff;
		transform-style: preserve-3d;
		transform: perspective(2000px);
		box-shadow: inset 300px 0 50px rgba(0, 0, 0, 0.5),
			0 20px 100px rgba(0, 0, 0, 0.5);
		transition: 1s;

		.imgBox {
			width: 100%;
			height: 100%;
			position: relative;
			transform-origin: left;
			transition: 1s cubic-bezier(0.16, 1.44, 0.83, 0.67);
			img {
				width: 100%;
				height: 100%;
			}
		}

		.detail {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			box-sizing: border-box;
			padding: 20px;
			z-index: -1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			.title {
				font-weight: 600;
				font-size: 30px;
				margin-bottom: 20px;
			}

			.author {
				color: #9b9393;
			}
		}
	}

	.card:hover {
		cursor: pointer;
		transform: perspective(2000px) rotate(-10deg);
		box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5),
			0 10px 100px rgba(0, 0, 0, 0.5);

		.imgBox:hover {
			transform: rotateY(-135deg);
		}
	}

	.card:before {
		content: '';
		position: absolute;
		top: -5px;
		left: 0;
		width: 100%;
		height: 5px;
		background-color: #475d02;
		transform-origin: bottom;
		transform: skewX(-45deg);
	}

	.card:after {
		content: '';
		position: absolute;
		top: 0;
		right: -5px;
		width: 5px;
		height: 100%;
		background-color: #638000;
		transform-origin: left;
		transform: skewY(-45deg);
	}
</style>
