<template>
	<div class="logo" @click="gotoHome">
		<div class="logo--text">Flockmaster</div>
		<div class="logo--logo">blogs</div>
	</div>
</template>

<script lang="ts" setup>
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const gotoHome = () => {
		router.push('/home');
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.logo {
			&--text {
				font-size: 18px !important;
			}
			&--logo {
				font-size: 8px !important;
			}
		}
	}

	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin-right: 30px;
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
		&--text {
			font-size: 24px;
			font-weight: 700;
		}

		&--logo {
			position: relative;
			left: 5px;
			bottom: 5px;
		}
	}

	.logo:hover {
		cursor: pointer;
	}
</style>
