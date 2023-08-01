import schedule from 'node-schedule';
import redis from '../db/redis';
import CommonService from '../service/commonService';

const commonService = new CommonService();

export const websiteVisit = () => {
	schedule.scheduleJob('59 23 1 * *', async () => {
		console.log('定时任务执行');
		const count = await redis.pfcount('website_visit');
		await redis.del('website_visit');
		await redis.del('website_visit_num');
		const res = await commonService.addVisitNum(count);
		return res;
	});
};
