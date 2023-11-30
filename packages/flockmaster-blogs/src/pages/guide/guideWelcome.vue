<template>
	<div class="guide-welcome-container">
		<zb-svg-icon name="logo" :size="120"></zb-svg-icon>
		<div class="center">
			<div class="center-top">NICE CHOICE：</div>
			<span class="center-bottom">欢迎来到我的博客</span>
		</div>
		<a class="start-read" @click="gotoHome">开始阅读 →</a>
		<div class="footer"></div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const gotoHome = () => {
		router.push('/home');
	};
</script>

<style lang="scss" scoped>
	.guide-welcome-container {
		display: flex;
		flex-direction: column;
		gap: 60px;
		padding: 60px 100px;

		.center {
			.center-top {
				color: rgb(88, 88, 87);
				font-size: 40px;
			}

			.center-bottom {
				font-size: 80px;
				color: #494646;
				font-weight: 800;
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
