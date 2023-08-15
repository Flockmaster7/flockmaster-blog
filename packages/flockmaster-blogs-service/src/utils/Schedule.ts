import schedule from 'node-schedule';
import redis from '../db/redis';
import CommonService from '../service/commonService';

const commonService = new CommonService();

export const websiteVisit = () => {
	schedule.scheduleJob('59 23 * * *', async () => {
		console.log('定时任务执行');
		const count = await redis.get('website_visit_num');
		await redis.del('website_visit');
		const res = await commonService.addVisitNum(Number(count));
		return res;
	});
};
