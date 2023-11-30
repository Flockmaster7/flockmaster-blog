<template>
	<div class="latestComments-container">
		<zbCard title="Find Me">
			<div class="info-link">
				<div class="info-link-item" @click="gotoSite('bilibili')">
					<img class="icon" src="@/static/images/bilibili.png" />
				</div>
				<div class="info-link-item" @click="gotoSite('github')">
					<img class="icon" src="@/static/images/github.png" />
				</div>
				<div class="info-link-item" @click="gotoSite('gitee')">
					<img class="icon" src="@/static/images/gitee.png" />
				</div>
			</div>
		</zbCard>
	</div>
</template>

<script setup lang="ts">
	import zbCard from '@/components/common/zb-card.vue';

	const gotoSite = (type: string) => {
		switch (type) {
			case 'bilibili':
				//原标签页
				// window.location.href =
				// 	'https://space.bilibili.com/398201002?spm_id_from=333.1007.0.0';
				// 新便签页
				window.open(
					'https://space.bilibili.com/398201002?spm_id_from=333.1007.0.0'
				);
				break;
			case 'github':
				// window.location.href = 'https://github.com/Davi-Li';
				window.open('https://github.com/Davi-Li');
				break;
			case 'gitee':
				// window.location.href = 'https://gitee.com/Flockmaster_Li';
				window.open('https://gitee.com/Flockmaster_Li');
				break;
			default:
				break;
		}
	};
</script>

<style lang="scss" scoped>
	.latestComments-container {
		border-top: 1px solid #dbd8d8;

		.info-link {
			display: flex;
			align-items: center;
			gap: 20px;
			padding-bottom: 20px;
			.info-link-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 5px;
				.icon {
					width: 30px;
					height: 30px;
					border-radius: 50%;
				}

				.text {
					font-size: 15px;
				}
			}

			.info-link-item:hover {
				cursor: pointer;
			}
		}
	}
</style>
