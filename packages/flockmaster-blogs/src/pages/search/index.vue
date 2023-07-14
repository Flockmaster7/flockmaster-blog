<template>
	<div class="search-container" :style="{ height: windowHeight + 'px' }">
		<div class="title">搜索</div>
		<div class="input">
			<el-input
				v-model="searchText"
				placeholder="搜索"
				class="input-with-select">
			</el-input>
		</div>
		<div class="button">
			<el-button @click="gotoSearchResult">search</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { nextTick, ref } from 'vue';
	import router from '@/router';

	const windowHeight = ref(0);
	nextTick(() => {
		windowHeight.value = window.innerHeight - 61;
	});

	const searchText = ref('');

	// 跳转到搜索结果
	const gotoSearchResult = () => {
		router.push('/searchResult?query=' + searchText.value);
	};
</script>

<style lang="scss" scoped>
	// el-input输入框
	:deep(.el-input) {
		overflow: hidden;
		border-radius: 18px !important;
		.el-input__inner {
			padding: 20px 30px !important;
		}

		.el-input-group__append,
		.el-input-group__prepend {
			padding: 0 10px !important;
		}

		.el-input__wrapper {
			padding: 0;
		}
	}

	.search-container {
		display: flex;
		align-content: center;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		width: 100%;
		gap: 20px;
		background-image: linear-gradient(
			186deg,
			#434950,
			#626663,
			#838577,
			#a4a58b
		);
		// background-image: linear-gradient(
		// 	25deg,
		// 	#f84b00,
		// 	#dd8754,
		// 	#adb296,
		// 	#00d9db
		// );
		.title {
			font-size: 40px;
			font-weight: 700;
		}

		.input {
			margin-top: 30px;
		}

		.button {
			:deep(.el-button) {
				width: 100px;
				color: $black;
				border-radius: 15px;
				transition: 1s;
			}
			:deep(.el-button:hover) {
				color: #fff;
				width: 120px;
				background-color: var(--theme-color);
				border-radius: 15px;
			}
		}
	}
</style>
