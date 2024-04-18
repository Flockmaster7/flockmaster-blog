<template>
	<div class="album-skeleton">
		<div class="album-item" v-for="item in 6" :key="item">
			<el-skeleton-item
				variant="image"
				:style="{
					width: 100 + '%',
					height: 200 + 'px',
					borderRadius: 6 + 'px'
				}" />
			<el-skeleton-item
				variant="text"
				:style="{
					width: 200 + 'px',
					height: 25 + 'px'
				}" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.album-container {
			min-height: calc(100vh - 275px);
			margin: 20px 0 !important;
			.album-skeleton {
				grid-template-columns: repeat(2, 160px) !important;
				grid-column-gap: 16px !important;
			}
		}
	}

	.album-skeleton {
		display: grid;
		grid-template-columns: repeat(2, 330px);
		grid-column-gap: 40px;
		grid-row-gap: 20px;
	}

	.album-item {
		width: 100%;
		height: 200px;
		background-color: var(--theme-card-bg-color);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;

		.img {
			width: 100%;
			height: 100%;
			border-radius: 6px;
			background-size: cover;
			background-repeat: no-repeat;
		}

		.title {
			font-size: 24px;
			font-weight: 700;
		}
	}

	.album-item:hover {
		cursor: pointer;
		.title {
			top: 30%;
			opacity: 1;
		}

		.des {
			left: 50%;
			opacity: 1;
		}

		.img {
			filter: brightness(0.7);
		}
	}
</style>
