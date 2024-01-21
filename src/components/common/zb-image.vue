<template>
	<el-image
		:style="style"
		:src="imgUrl(src)"
		:preview-src-list="[imgUrl(src)]"
		:zoom-rate="1.2"
		:max-scale="7"
		:min-scale="0.2"
		fit="cover">
		<template #error>
			<div class="image-slot">
				<el-icon><icon-picture /></el-icon>
				404
			</div>
		</template>
	</el-image>
</template>

<script setup lang="ts">
	import { imgUrl } from '@/utils/common';
	import { Picture as IconPicture } from '@element-plus/icons-vue';

	interface PropsType {
		style?: any;
		src: string;
	}

	defineProps<PropsType>();
</script>

<style lang="scss" scoped>
	.el-image {
		width: 100%;
	}

	:deep(.el-image__inner) {
		border-radius: 6px;
	}
	.image-slot {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: #1d1f34;
		color: var(--el-text-color-secondary);
		gap: 10px;
		border-radius: 6px;
	}

	.image-slot .el-icon {
		font-size: 30px;
	}
</style>
