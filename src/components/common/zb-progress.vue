<template>
	<div
		class="progress-container"
		:style="{
			height: progressHeight + 'px',
			backgroundColor: bgColor,
			width: progressWidth + 'px'
		}">
		<div
			class="progress-inline"
			:style="{
				height: progressDepth + '%',
				backgroundColor: proColor
			}">
			<span
				:style="{
					fontSize: 10 + 'px',
					color: '#ffffff'
				}"
				>{{ progressDepth >= 80 ? text : '' }}</span
			>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface PropsType {
		progressHeight?: number;
		progressWidth?: number;
		progressDepth?: number;
		bgColor?: string;
		proColor?: string;
		text?: string;
	}

	const props = withDefaults(defineProps<PropsType>(), {
		progressHeight: 150,
		progressDepth: 0,
		proColor: 'var(--theme-tool-active-color)',
		text: ''
	});
</script>

<style lang="scss" scoped>
	.progress-container {
		width: 40px;
		height: 150px;
		background: var(--card-reset-bg);
		border-radius: 10px;
		position: relative;

		.progress-inline {
			transition: 0.3s ease-in-out;
			position: absolute;
			opacity: 0.7;
			width: 100%;
			border-radius: 10px 10px;
			bottom: 0;
			height: 0%;
			background-color: var(--theme-tool-active-color);
		}
	}
</style>
