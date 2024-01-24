<template>
	<div class="login-container">
		<div class="login-container--leftBox">
			<img src="@/static/images/login_bg.png" alt="Flockmaster" />
			<h2>Flockmaster Blog</h2>
			<p>欢迎来到我的个人博客</p>
		</div>
		<div class="login-container--rightBox">
			<zb-svg-icon
				name="close"
				@click="onClose"
				class="icon"></zb-svg-icon>
			<Login redirect></Login>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Login from '@/newLayout/rightAside/login.vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const onClose = () => {
		router.go(-1);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.login-container {
			&--leftBox {
				display: none !important;
			}
			&--rightBox {
				flex-basis: 100% !important;
			}
		}
	}
	.login-container {
		display: flex;
		min-height: 100vh;

		&--leftBox {
			flex-basis: 50%;
			padding: 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			background-color: var(--theme-box-show-2);
			opacity: 0.8;

			img {
				width: 100%;
				max-width: 400px;
			}

			h2 {
				font-size: 1.75rem;
				font-weight: 500;
			}

			p {
				max-width: 500px;
				font-size: 1.2rem;
				text-align: center;
			}
		}

		&--rightBox {
			background-color: var(--theme-box-show-2);
			flex-basis: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 30px;
			position: relative;

			.icon {
				position: absolute;
				top: 20px;
				right: 40px;
			}

			.icon:hover {
				cursor: pointer;
			}
		}
	}
</style>
