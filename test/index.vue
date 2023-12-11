<template>
	<div class="context">
		<div class="card">
			<div class="front">正面卡片</div>
			<div class="back">背面卡片</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.context {
		width: 300px;
		height: 450px;
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
	}
	.card {
		width: 300px;
		height: 450px;
		border-radius: 30px;
		cursor: pointer;
		background-color: #fff;
		box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
		transform-style: preserve-3d;

		.back {
			// transform-style: preserve-3d;s
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
			font-size: 20px;
			border-radius: 30px;
		}

		.back {
			transform: rotateY(180deg);
		}

		.front {
			background-color: #493035;
			width: 100%;
			height: 80%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.card:hover {
		animation: rotate 1.2s cubic-bezier(0.45, -0.19, 0.34, 1.51) forwards;
	}

	@keyframes rotate {
		0% {
			transform: rotateY(0);
		}

		100% {
			transform: rotateY(180deg);
		}
	}

	@keyframes rotate-reverse {
		0% {
			transform: rotateY(180deg);
		}

		100% {
			transform: rotateY(0);
		}
	}
</style>
