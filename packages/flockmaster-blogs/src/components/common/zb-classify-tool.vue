<template>
	<div class="tool-container">
		<div class="tool-list">
			<div
				:class="{ 'tool-item': true, active: activeItem === item.id }"
				v-for="(item, index) in allClassify"
				:key="index"
				@click="handleClick(item)">
				{{ item.text }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { allClassify } from '@/config/classify.ts';
	import { ClassifyType } from '@/types';

	interface emitType {
		(e: 'getBlogList', id: string, text?: string): void;
	}

	const emit = defineEmits<emitType>();

	const activeItem = ref('0');

	const handleClick = (item: ClassifyType) => {
		activeItem.value = item.id;
		emit('getBlogList', item.id, item.text);
	};
</script>

<style lang="scss" scoped>
	.tool-container {
		border-radius: 10px;
		padding: 8px 5px;
		background: var(--card-reset-bg);
		// background-color: var(--theme-tool-color);
		position: fixed;
		top: 75px;
		.tool-list {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			gap: 5px;
			.tool-item {
				position: relative;
				width: 90px;
				height: 50px;
				border-radius: 8px;
				// background-color: var(--theme-tool-item-color);
				line-height: 50px;
				text-align: center;
				font-size: 12px;
				transition: 0.6s;

				.subscript {
					position: absolute;
					right: -5px;
					top: 0;
					border-radius: 50%;
					width: 16px;
					height: 16px;
					background-color: $grayWhite;
					font-size: 1px;
					color: $white;
				}
			}

			.tool-item:hover {
				transform: translate(-3px, -3px);
				-webkit-box-shadow: 10px 10px 99px 6px rgb(129, 227, 198);
				-moz-box-shadow: 10px 10px 99px 6px rgb(134, 235, 192);
				box-shadow: 10px 10px 99px 6px rgb(98, 243, 187);
				cursor: pointer;
			}
		}
	}

	.active {
		// color: $white;
		background-color: var(--theme-tool-active-color) !important;
	}
</style>
