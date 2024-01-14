<template>
	<div class="circleFriendItem-container">
		<div class="left">
			<img :src="imgUrl(cirFriend.user.user_image)" alt="" />
		</div>
		<div class="right">
			<div class="top">
				<div>
					<div class="name">{{ cirFriend.user.name }}</div>
					<ZbTime :time="cirFriend.createdAt"></ZbTime>
				</div>
				<img src="../../static/images/top.png" v-if="cirFriend.top" />
			</div>
			<div class="center">
				<div class="text">
					{{ cirFriend.content }}
				</div>
				<div class="img" v-if="images.length !== 0">
					<ImgList :urls="images"></ImgList>
				</div>
				<div class="video" v-if="videos.length !== 0">
					<VideoList :urls="videos"></VideoList>
				</div>
			</div>
			<Operator
				:isDianzan="userDianzanList.includes(cirFriend.id)"
				:dianzanCount="cirFriend.dianzanCount"
				:circleFriendId="cirFriend.id"
				@dianzan="dianzanCircleFriend"
				@cancelDianzan="cancelDianzanCircleFriend"></Operator>
		</div>
	</div>
</template>

<script setup lang="ts">
	import ImgList from './imgList.vue';
	import VideoList from './videoList.vue';
	import Operator from './operator.vue';
	import useStore from '@/store';
	import { imgUrl } from '@/utils/common';
	import { CircleFriend } from '@/types';
	import { ElMessage } from 'element-plus';
	import { storeToRefs } from 'pinia';
	import ZbTime from '@/components/common/zb-time.vue';

	interface PropsType {
		cirFriend: CircleFriend;
	}

	const props = defineProps<PropsType>();

	const { circleFriend } = useStore();

	const { userDianzanList } = storeToRefs(circleFriend);

	const videos = props.cirFriend.videos.map((item) => {
		return item.video_url;
	});

	const images = props.cirFriend.images.map((item) => {
		return item.image_url;
	});

	const dianzanCircleFriend = async (id: number) => {
		const flag = await circleFriend.dianzan(id);
		if (flag) {
			userDianzanList.value.push(id);
			ElMessage.success('感谢支持！');
		}
	};

	const cancelDianzanCircleFriend = async (id: number) => {
		const flag = await circleFriend.cancelDianzan(id);
		if (flag) {
			userDianzanList.value = userDianzanList.value.filter(
				(item) => item !== id
			);
		}
	};
</script>

<style lang="scss" scoped>
	.circleFriendItem-container {
		// width: 100%;
		display: flex;
		padding: 30px 0;
		gap: 15px;
		border-bottom: 1px solid var(--theme-divider);

		.left {
			width: 56px;
			height: 56px;
			box-sizing: border-box;
			flex-shrink: 0;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 6px;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			gap: 10px;
			width: 100%;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $gray;
				font-size: 15px;

				.name {
					height: 30px;
					line-height: 30px;
					font-size: 20px;
				}

				img {
					width: 50px;
				}
			}

			.center {
				display: flex;
				flex-direction: column;
				gap: 15px;
				font-size: 18px;
				margin: 20px 0;

				.img {
					max-width: 100%;
					display: flex;
					flex-wrap: wrap;

					img {
						max-width: 100%;
						max-height: 100%;
						object-fit: cover;
					}
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				border-radius: 6px;
				padding: 10px 20px;
				background: #faecfa;

				.dianzan {
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 2px;
					font-size: 14px;
					color: $gray;
				}

				.dianzan:hover {
					cursor: pointer;
				}
			}
		}
	}
</style>
