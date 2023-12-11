<template>
	<div class="work-item">
		<div class="left">
			<img :src="imgUrl(work.work_image)" alt="" />
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
	import { imgUrl } from '@/utils/common';
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
			height: 180px !important;
		}
	}
	.work-item {
		position: relative;
		width: 100%;
		height: 200px;
		// background-color: var(--theme-color);
		display: flex;
		gap: 20px;

		.left {
			width: 300px;
			height: 200px;
			border-radius: 10px;
			background-size: cover;
			background-repeat: no-repeat;

			img {
				width: 100%;
				height: 100%;
				border-radius: 10px;
				background-size: cover;
				background-repeat: no-repeat;
			}
		}

		.right {
			width: calc(100% - 300px);
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 5px;
			padding-top: 10px;
			padding-left: 20px;
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
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri,
					'Trebuchet MS', sans-serif;
				color: #8b8b8b;
				transition: all 1s linear;
				margin: 5px 0 60px;
			}

			.link {
				display: flex;
				align-items: center;
				font-size: 16px;
				text-decoration: underline;
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
