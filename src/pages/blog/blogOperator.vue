<template>
	<div class="tool-container">
		<div class="tool-list">
			<div
				:class="{ 'tool-item': true, active: blogStatus[item.type] }"
				v-for="(item, index) in config"
				:key="index"
				@click="handleClick(item.type)">
				<zb-svg-icon
					:name="item.icon"
					size="25"
					:color="
						blogStatus[item.type] ? 'var(--theme-active-show)' : ''
					"></zb-svg-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { ElMessage } from 'element-plus';

	interface propsType {
		id: string;
	}

	interface emitType {
		(e: 'toComment'): void;
	}

	const toolConfig = [
		{
			type: 'like',
			text: '点赞',
			icon: 'dianzan'
		},
		{
			type: 'collect',
			text: '收藏',
			icon: 'shoucang'
		}
	];

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
		}
	};

	const blogStore = useBlogStore();
	const { blogStatus } = storeToRefs(blogStore);

	// 点赞
	const likeBlog = async () => {
		if (!blogStatus.value.like) {
			const flag = await blogStore.blogLike();
			if (flag) ElMessage.success('感谢支持！');
		} else {
			await blogStore.blogUnlike();
		}
		blogStore.getBlogDetail(Number(props.id));
	};

	// 收藏
	const collectBlog = async () => {
		if (!blogStatus.value.collect) {
			const flag = await blogStore.blogCollect();
			if (flag) ElMessage.success('感谢支持！');
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
		background: var(--theme-operator-color);
		.tool-list {
			display: flex;
			align-items: center;
			gap: 15px;
			.tool-item {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				width: 40px;
				height: 40px;
				border-radius: 10px;
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
		opacity: 0.7;
		background: var(--theme-data-show) !important;
	}
</style>
