import { Context } from 'koa';
import WorkService from '../service/workService';
import ERROR from '../utils/Error';
import Result from '../utils/Result';

const workService = new WorkService();

class WorkController {
	// 添加作品
	async createWork(ctx: Context) {
		try {
			const { work_title, work_image, work_des, work_url } =
				ctx.request.body;
			const params = {
				work_title,
				work_image,
				work_des,
				work_url
			};
			const data = await workService.addWork(params);
			ctx.body = new Result(200, '添加作品成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.createWorkError, ctx, error);
		}
	}

	// 修改作品
	async updateWork(ctx: Context) {
		try {
			const { id, work_title, work_image, work_des, work_url } =
				ctx.request.body;
			let params = {};
			if (!id) return ctx.app.emit('error', ERROR.FormValidatorError, '');
			work_title && Object.assign(params, { work_title });
			work_image && Object.assign(params, { work_image });
			work_des && Object.assign(params, { work_des });
			work_url && Object.assign(params, { work_url });
			const res = await workService.modifyWork(id, params);
			if (res) {
				ctx.body = new Result(200, '修改作品成功', 'success');
			} else {
				ctx.body = new Result(30002, '修改作品失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.updateWorkError, ctx, error);
		}
	}

	// 获取作品详情
	async getWorkDetail(ctx: Context) {
		try {
			const { id } = ctx.params;
			const data = await workService.getDetail(id);
			ctx.body = new Result(200, '获取作品详情成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getWorkDetailError, ctx, error);
		}
	}

	// 获取作品列表
	async getWorkList(ctx: Context) {
		try {
			const { pageSize, pageNum } = ctx.params;
			const data = await workService.getList(pageNum * 1, pageSize * 1);
			ctx.body = new Result(200, '获取作品列表成功', data);
		} catch (error) {
			ctx.app.emit('error', ERROR.getWorkListError, ctx, error);
		}
	}

	// 删除作品
	async removeWork(ctx: Context) {
		try {
			const { id } = ctx.params;
			const res = await workService.deleteWork(id * 1);
			if (res) {
				ctx.body = new Result(200, '删除作品成功', 'success');
			} else {
				ctx.body = new Result(30007, '删除作品失败', 'fail');
			}
		} catch (error) {
			ctx.app.emit('error', ERROR.removeWorkError, ctx, error);
		}
	}
}

export default WorkController;
