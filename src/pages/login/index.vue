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
			background-color: var(--theme-color);
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
			background-color: var(--theme-tool-color);
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

			.logo {
				max-width: 150px;
			}

			.header {
				margin-bottom: 1rem;
				font-size: 1.2rem;
				font-weight: 500;
				color: $gray;
				text-align: center;
			}

			.form {
				:deep(.el-input) {
					border-bottom: 2px solid #b2b3b2;
				}

				:deep(.el-input__wrapper) {
					border: 0;
					border-bottom: #a4c4b5;
					box-shadow: none;
				}

				.form-list {
					transition: 1s;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 10px;
					.forgot {
						font-size: 14px;
						color: #717775;
					}
				}
			}

			.create-account {
				display: flex;

				font-size: 14px;
				color: #717775;
				.create {
					color: var(--theme-active-color);
					margin-left: 10px;
					text-decoration: underline;
				}
				.create:hover {
					cursor: pointer;
				}
			}

			.bottom-button {
				margin-top: 20px;
				:deep(.el-button) {
					width: 130px;
					// background-color: #a4c4b5;
					border-radius: 15px;
					transition: 1s;
				}
				:deep(.el-button:hover) {
					color: #fff;
					width: 160px;
					background-color: var(--theme-color);
					border-radius: 15px;
				}
			}
		}

		&--logo {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			position: relative;
			.logo {
				position: absolute;
				width: 100px;
				height: 100px;
				border-radius: 50%;
				bottom: -15%;
			}
		}
	}

	.el-form {
		margin-left: 36px;
	}
</style>
