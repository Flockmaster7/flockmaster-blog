<template>
	<div class="skeleton">
		<div class="card" v-for="item in 9" :key="item">
			<div class="blogImg">
				<el-skeleton-item
					variant="image"
					:style="{
						width: 100 + '%',
						height: 250 + 'px',
						borderRadius: 8 + 'px'
					}" />
			</div>
			<div class="blogInfo">
				<div class="container">
					<div class="top">
						<el-skeleton-item
							variant="text"
							:style="{ width: 400 + 'px' }" />
						<el-skeleton-item
							variant="text"
							:style="{ width: 200 + 'px' }" />
						<el-skeleton-item
							variant="text"
							:style="{ width: 400 + 'px' }" />
					</div>
					<div class="main">
						<div class="author">
							<el-skeleton-item
								variant="text"
								:style="{ width: 300 + 'px' }" />
						</div>
					</div>
					<div class="bottom">
						<el-skeleton-item variant="text" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.card {
			flex-wrap: wrap;
			width: 100vw !important;
			overflow: hidden !important;
		}
	}

	.skeleton {
		display: flex;
		flex-wrap: wrap;
	}

	.card {
		padding: 30px 0 20px;
		gap: 15px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		transition: 0.6s;
		border-bottom: 1px solid var(--theme-divider);

		.blogInfo {
			flex-basis: 60%;
			padding: 8px;
			height: 100%;
			box-sizing: border-box;
			width: 400px;
			display: flex;
			flex-direction: column;
			gap: 30px;
			height: 100%;

			.top {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				gap: 15px;
				margin-bottom: 40px;
			}

			.bottom {
				margin-top: 30px;
			}
		}

		.blogImg {
			width: 100%;
			height: 100%;
		}
	}
</style>
