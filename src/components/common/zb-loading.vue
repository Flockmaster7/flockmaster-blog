<template>
	<div class="loading-container" :style="{ height: height + 'px' }">
		<!-- 加载中... -->
		<div
			class="spinner"
			:style="{ height: size + 'px', width: size + 'px' }">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface PropsType {
		height: number;
		size: number;
	}

	withDefaults(defineProps<PropsType>(), {
		height: 500,
		size: 30
	});
</script>

<style lang="scss" scoped>
	.loading-container {
		width: 100%;
		height: 500px;
		display: flex;
		justify-content: center;
		align-items: center;

		.spinner {
			width: 30px;
			height: 30px;
			position: relative;
			margin: 100px auto;
		}

		.double-bounce1,
		.double-bounce2 {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background-color: #5cbfef;
			opacity: 0.6;
			position: absolute;
			top: 0;
			left: 0;
			-webkit-animation: sk-bounce 2s infinite ease-in-out;
			animation: sk-bounce 2s infinite ease-in-out;
		}

		.double-bounce2 {
			-webkit-animation-delay: -1s;
			animation-delay: -1s;
		}

		@-webkit-keyframes sk-bounce {
			0%,
			100% {
				-webkit-transform: scale(0);
			}
			50% {
				-webkit-transform: scale(1);
			}
		}

		@keyframes sk-bounce {
			0%,
			100% {
				transform: scale(0);
				-webkit-transform: scale(0);
			}
			50% {
				transform: scale(1);
				-webkit-transform: scale(1);
			}
		}
	}
</style>
