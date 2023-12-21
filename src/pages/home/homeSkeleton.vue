<template>
	<div class="skeleton">
		<div class="card" v-for="item in 3" :key="item">
			<div class="blogInfo">
				<div class="container">
					<div class="top">
						<div class="title">
							<el-skeleton-item
								variant="text"
								:style="{ width: 200 + 'px' }" />
						</div>
					</div>
					<div class="main">
						<div class="author">
							<el-skeleton-item
								variant="text"
								:style="{ width: 200 + 'px' }" />
						</div>
					</div>
					<div class="bottom">
						<el-skeleton-item variant="text" />
					</div>
				</div>
			</div>
			<div class="blogImg">
				<el-skeleton-item
					variant="image"
					:style="{
						width: 100 + '%',
						height: 170 + 'px',
						borderRadius: 8 + 'px'
					}" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.skeleton {
		display: flex;
		flex-wrap: wrap;
	}

	.card {
		padding: 30px 0 20px;
		gap: 15px;
		width: 100%;
		height: 250px;
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
				gap: 12px;

				.title {
					font-weight: 700;
					font-size: 25px;
				}

				.author {
					font-size: 16px;
					color: $gray;
				}

				.tag {
					margin-top: 15px;
					display: flex;
					gap: 5px;
				}

				.description {
					margin-top: 5px;
					font-size: 15px;
					color: rgb(126, 126, 126);
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}

			.bottom {
				padding: 4px 8px;
				background: var(--theme-data-show);
				border-radius: 8px;
				display: flex;
				justify-content: space-between;
				.data {
					display: flex;
					gap: 40px;
					.data-item {
						color: $gray;
						display: flex;
						align-items: center;
					}
				}
			}
		}

		.blogImg {
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}
	}
</style>
