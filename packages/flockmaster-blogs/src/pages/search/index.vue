<template>
	<div
		class="search-container"
		:style="{
			height: windowHeight + 'px',
			...bgImg
		}">
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
	import { computed, nextTick, ref } from 'vue';
	import router from '@/router';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';

	const { common } = useStore();
	const { isDark } = storeToRefs(common);

	const windowHeight = ref(0);
	nextTick(() => {
		windowHeight.value = window.innerHeight - 61;
	});

	const searchText = ref('');

	// 跳转到搜索结果
	const gotoSearchResult = () => {
		router.push('/searchResult?query=' + searchText.value);
	};

	const bgImg = computed(() => {
		return {
			backgroundSize: 'cover',
			backgroundImage: `url(${
				new URL(
					isDark.value
						? '../../static/images/search_bg_dark.png'
						: '../../static/images/search_bg.png',
					import.meta.url
				).href
			})`
		};
	});
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
