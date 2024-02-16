<template>
	<div class="work-item">
		<div class="left">
			<zb-image :src="work.work_image" :style="{ height: 200 + 'px' }" />
		</div>
		<div class="right">
			<div class="title">{{ work.work_title }}</div>
			<div class="des">{{ work.work_des }}</div>
			<div class="link" @click="gotoWorkDetail(work.work_url)">
				<zb-svg-icon name="link" :size="20" color></zb-svg-icon>
				查看详情
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Work } from '@/types';

	interface PropType {
		work: Work;
	}

	defineProps<PropType>();

	const gotoWorkDetail = (url: string) => {
		window.open(url);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.work-item {
			flex-wrap: wrap;
			height: 100% !important;

			.left {
				width: 100% !important;
			}

			.des {
				margin: 5px 0 20px !important;
			}
		}
	}
	.work-item {
		position: relative;
		width: 100%;
		height: 200px;
		display: flex;
		gap: 20px;

		.left {
			width: 300px;
			height: 200px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 10px;
			// border-bottom: 1px solid #e8e8e8;
			border-bottom: 1px solid var(--theme-divider);

			.title {
				font-size: 28px;
				opacity: 0.8;
				transition: all 1s linear;
				font-weight: 700;
			}

			.des {
				font-size: 16px;
				font-family: sans-serif;
				color: #8b8b8b;
				height: 22px;
				line-height: 22px;
				word-break: break-all;
				transition: all 1s linear;
				margin: 5px 0 50px;
			}

			.link {
				display: flex;
				align-items: center;
				font-size: 16px;
				text-decoration: underline;
				margin-bottom: 10px;
			}

			.link:hover {
				cursor: pointer;
				color: var(--theme-active-color);
			}
		}

		.img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 20px;
			background-size: cover;
			background-repeat: no-repeat;
		}
	}
</style>
