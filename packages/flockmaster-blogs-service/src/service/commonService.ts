import redis from '../db/redis';
import Common from '../model/Common';
import { WebsiteType } from '../types';

class CommonService {
	// 增加网站访问量
	async addWebsiteVisit(userAgent: string): Promise<boolean> {
		const res = await redis.pfadd('website_visit', userAgent);
		if (res) {
			const num = await redis.get('website_visit_num');
			if (!num) {
				// redis没有
				const common = await Common.findByPk(1);
				if (common)
					redis.set(
						'website_visit_num',
						common?.dataValues.website_views + 1
					);
			} else {
				await redis.set('website_visit_num', num ? Number(num) + 1 : 1);
			}
		}
		return res > 0 ? true : false;
	}

	// 获取网站资讯
	async getWebsite(): Promise<WebsiteType> {
		// 先查询redis
		const num = await redis.get('website_visit_num');
		if (!num) {
			// redis没有
			const realNum = await Common.findOne({
				where: {
					id: 1
				}
			});
			return {
				website_visit: realNum?.dataValues.website_views!
			};
		}
		return {
			website_visit: num
		};
	}

	// 将访问量写入数据库
	async addVisitNum(num: number): Promise<boolean> {
		const common = new Common();
		common.setWebsiteViews(num);
		const res = await Common.update(common, {
			where: {
				id: 1
			}
		});
		return res[0] ? true : false;
	}
}

export default CommonService;
