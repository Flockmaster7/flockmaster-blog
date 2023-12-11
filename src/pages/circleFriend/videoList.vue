<template>
	<div class="videoList-container">
		<video :src="urls[0]" controls loop>
			<source :src="urls[0]" type="video/mp4" />
		</video>
	</div>
</template>

<script lang="ts" setup>
	interface PropsType {
		urls: string[];
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	.videoList-container {
		max-width: 100%;

		video {
			border-radius: 8px;
		}
	}
</style>
