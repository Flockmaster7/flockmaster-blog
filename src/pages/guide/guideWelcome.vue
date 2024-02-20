<template>
	<div class="guide-welcome-container">
		<zb-svg-icon name="logo" :size="120"></zb-svg-icon>
		<div class="center">
			<div class="center-top">NICE CHOICE：</div>
			<span class="center-bottom">欢迎来到我的博客</span>
		</div>
		<div class="start-read" @click="gotoHome">开始阅读 →</div>
		<div class="footer"></div>
	</div>
</template>

<script setup lang="ts">
	import { HOME_URL } from '@/config';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const gotoHome = () => {
		router.replace(HOME_URL);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.center-top {
			font-size: 24px !important;
		}

		.center-bottom {
			font-size: 35px !important;
		}
	}

	.guide-welcome-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 80px;
		padding: 0 80px;

		.center {
			filter: contrast(5);

			.center-top {
				color: rgb(88, 88, 87);
				font-size: 40px;
				margin-bottom: 3px;
			}

			.center-bottom {
				font-size: 70px;
				color: var(--theme-text-1);
				font-weight: 600;
				animation: showup 1.5s forwards;
			}

			@keyframes showup {
				from {
					letter-spacing: -70px;
					filter: blur(10px);
				}

				to {
					letter-spacing: 8px;
					filter: blur(0);
				}
			}
		}

		.start-read {
			font-size: 25px;
			text-decoration: underline;
			color: rgb(88, 88, 87);
		}

		.start-read:hover {
			cursor: pointer;
			color: var(--theme-nav-active-color);
		}
	}
</style>
