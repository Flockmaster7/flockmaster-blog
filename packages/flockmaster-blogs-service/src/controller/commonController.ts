import { Context } from 'koa';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import CommonService from '../service/commonService';

const commonService = new CommonService();

class CommonController {
	// 增加网站访问量
	async addVisit(ctx: Context) {
		try {
			const userAgent = ctx.request.header['user-agent'];
			const res = await commonService.addWebsiteVisit(userAgent!);
			if (res)
				ctx.body = new Result(200, '增加网站访问量成功', 'success');
			else ctx.body = new Result(70001, '增加网站访问量失败', 'fail');
		} catch (error) {
			ctx.app.emit('error', ERROR.addVisitError, ctx, error);
		}
	}

	// 获取网站资讯
	async getWebsiteInfo(ctx: Context) {
		try {
			const res = await commonService.getWebsite();
			if (res) ctx.body = new Result(200, '获取网站资讯成功', res);
			else ctx.body = new Result(70002, '获取网站资讯失败', 'fail');
		} catch (error) {
			ctx.app.emit('error', ERROR.getWebsiteInfoError, ctx, error);
		}
	}
}

export default CommonController;
