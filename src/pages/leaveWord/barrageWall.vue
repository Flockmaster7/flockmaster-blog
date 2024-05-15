<template>
	<div class="barrageWall-container">
		<div class="track" v-for="item in allLeaveWord" :key="item.id">
			<div
				class="child"
				:style="{
					color: item.user?.id === userInfo.id ? 'red' : 'white',
					transform: `translate(
						${positionMap[Math.floor(Math.random() * 5)]}px
					)`,
					animation: `scrollTo linear ${
						rateMap[Math.floor(Math.random() * 5)]
					}s infinite`,
					top: `${Math.floor(Math.random() * 360)}px`,
					outline:
						item.user?.id === userInfo.id ? '1px solid red' : 'none'
				}">
				{{ item.content }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getLeaveWordList } from '@/http/leaveWord';
	import useStore from '@/store';
	import { LeaveWord } from '@/types';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const { user } = useStore();
	const { userInfo } = storeToRefs(user);

	// const colorMap = ['blue', 'red', 'orange', 'yellow', 'green', 'white'];
	const positionMap = [1400, 1500, 1600, 1700, 1800];
	const rateMap = [5, 6, 7, 8, 9];
	const allLeaveWord = ref<LeaveWord[]>([]);

	const getLeaveWord = async () => {
		const { data: res } = await getLeaveWordList(1, 999);
		if (res.code === 200) {
			allLeaveWord.value = res.data.rows;
		}
	};

	getLeaveWord();
</script>

<style lang="scss" coped>
	.barrageWall-container {
		width: 100%;
		height: 400px;
		background: rgba(0, 0, 0, 0.1);
		margin: 0 auto;
		overflow: hidden;
		background-size: cover;
		border-radius: 6px;
		position: relative;

		.track {
			height: 40px;
			line-height: 40px;
			margin-bottom: 5px;

			.child {
				position: absolute;
				line-height: 20px;
				margin-bottom: 10px;
				font-size: 18px;
				text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
				animation: scrollTo linear 4s infinite;
			}
		}
	}

	@keyframes scrollTo {
		to {
			transform: translateX(-100px);
		}
	}
</style>
