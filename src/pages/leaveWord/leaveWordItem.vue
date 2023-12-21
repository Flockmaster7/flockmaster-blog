<template>
	<div class="leaveWord-item-container">
		<div class="avatar">
			<img :src="imgUrl(item.user.user_image)" alt="" />
		</div>
		<div class="box">
			<div class="info">
				<div class="topInfo">
					<div class="infoBox">
						<div class="user-name">
							{{ item.user.name }}
						</div>
						<div class="time">
							{{ getTimeFormNow(item.createdAt) }}
						</div>
					</div>
					<div
						:class="{ operator: true, active: isDianzan }"
						@click="onDianzan">
						<zb-svg-icon
							name="like"
							:color="
								isDianzan ? 'var(--theme-active-color)' : ''
							"></zb-svg-icon>
						{{ dianzanCount }}
					</div>
				</div>
				<div class="content">
					{{ item.content }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getTimeFormNow } from '@/utils/dayFormat';
	import { imgUrl } from '@/utils/common';
	import { LeaveWord } from '@/types';
	import useStore from '@/store';
	import { computed, ref } from 'vue';
	import cache from '@/utils/cache';
	import { ElMessage } from 'element-plus';
	import { storeToRefs } from 'pinia';

	interface propsType {
		item: LeaveWord;
		type: 'blog' | 'leaveWord';
	}

	const props = defineProps<propsType>();

	const { leaveWord } = useStore();
	const { dianzanList } = storeToRefs(leaveWord);

	const isDianzan = computed(() => {
		return dianzanList.value.includes(props.item.id);
	});

	const dianzanCount = ref(props.item.dianzan);

	const onDianzan = () => {
		if (isDianzan.value) {
			leaveWord.cancelDianzanLeaveWord(props.item.id);
			dianzanList.value = dianzanList.value.filter(
				(item) => item !== props.item.id
			);
			cache.setCache('DIANZAN_LEAVEWORD', dianzanList.value);
			dianzanCount.value--;
		} else {
			leaveWord.dianzanLeaveWord(props.item.id);
			dianzanList.value.push(props.item.id);
			cache.setCache('DIANZAN_LEAVEWORD', dianzanList.value || []);
			ElMessage.success('点赞成功');
			dianzanCount.value++;
		}
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.top {
			.title {
				font-size: 18px !important;
			}
			.text-input {
				gap: 12px !important;
				.avatar {
					width: 50px !important;
					height: 50px !important;
				}
			}
			.comfirm {
				:deep(.el-button) {
					width: 80px !important;
				}
			}
		}

		.list {
			.title {
				font-size: 20px !important;
			}

			.comment {
				gap: 10px !important;
				.avatar {
					width: 35px !important;
					height: 35px !important;
				}

				.info {
					.name {
						font-size: 16px !important;
					}

					.time {
						font-size: 14px !important;
					}

					.reply,
					.content {
						font-size: 15px !important;
					}
				}
			}
		}
	}

	:deep(.el-button) {
		width: 100px;
		// background-color: #a4c4b5;
		border-radius: 6px;
		transition: 1s;
	}
	:deep(.el-button:hover) {
		color: #fff;
		width: 110px;
		background-color: var(--theme-color);
	}

	.leaveWord-item-container {
		margin: 15px 0;
		display: flex;
		gap: 20px;
		margin-bottom: 25px;
		justify-content: space-between;
		width: 100%;

		.avatar {
			width: 45px;
			height: 45px;
			// border-radius: 50%;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.box {
			flex-basis: 95%;
			.info {
				display: flex;
				flex-direction: column;
				gap: 20px;
				.topInfo {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					.infoBox {
						display: flex;
						flex-direction: column;
						gap: 10px;
						.user-name {
							font-size: 18px;
							color: #414141;
						}
						.time {
							color: $grayWhite;
							font-size: 15px;
						}
					}

					.operator {
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 4px;
					}

					.operator:hover {
						cursor: pointer;
					}

					.active {
						color: var(--theme-active-color);
					}
				}

				.content {
					word-break: break-all;
					font-size: 16px;
					line-height: 40px;
				}
			}
		}
	}
</style>
