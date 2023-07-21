<template>
	<div class="tool-container">
		<div class="tool-list">
			<div
				:class="{ 'tool-item': true, active: blogStatus[item.type] }"
				v-for="(item, index) in config"
				:key="index"
				@click="handleClick(item.type)">
				<zb-svg-icon :name="item.icon" size="25"></zb-svg-icon>
			</div>
		</div>
		<!-- <div
			:class="{ 'tool-item': true, active: blogStatus.like }"
			@click="likeBlog"></div>
		<div
			:class="{ 'tool-item': true, active: blogStatus.collect }"
			@click="collectBlog">
			收藏
		</div> -->
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { toolConfig } from '@/config/blogTool.ts';

	interface propsType {
		id: string;
	}

	interface emitType {
		(e: 'toComment'): void;
	}

	const props = defineProps<propsType>();
	const emit = defineEmits<emitType>();

	const config = ref(toolConfig);

	const handleClick = (type: string) => {
		switch (type) {
			case 'like':
				likeBlog();
				break;
			case 'collect':
				collectBlog();
				break;
			case 'remark':
				emit('toComment');
				break;
		}
	};

	const blogStore = useBlogStore();
	const { blogDeatil, blogStatus } = storeToRefs(blogStore);

	// 点赞
	const likeBlog = async () => {
		if (!blogStatus.value.like) {
			await blogStore.blogLike();
		} else {
			await blogStore.blogUnlike();
		}
		blogStore.getBlogDetail(Number(props.id));
	};

	// 收藏
	const collectBlog = async () => {
		if (!blogStatus.value.collect) {
			await blogStore.blogCollect();
		} else {
			await blogStore.blogUncollect();
		}
		await blogStore.getBlogDetail(Number(props.id));
	};
</script>

<style lang="scss" scoped>
	.tool-container {
		border-radius: 10px;
		padding: 15px 10px;
		background-color: var(--theme-tool-color);
		position: fixed;
		top: 200px;
		.tool-list {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			gap: 20px;
			.tool-item {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				background-color: var(--theme-tool-item-color);
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
				transform: translate(-5px, -5px);
				-webkit-box-shadow: 10px 10px 99px 6px rgb(129, 227, 198);
				-moz-box-shadow: 10px 10px 99px 6px rgb(134, 235, 192);
				box-shadow: 10px 10px 99px 6px rgb(98, 243, 187);
				cursor: pointer;
			}
		}
	}

	.active {
		background-color: var(--theme-tool-active-color) !important;
	}
</style>
