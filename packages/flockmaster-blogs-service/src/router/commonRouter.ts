import Router from 'koa-router';
import CommonController from '../controller/commonController';

const router = new Router({ prefix: '/api/common' });

const commonController = new CommonController();

// 增加网站访问量
router.post('/addVisit', commonController.addVisit);

// 获取网站资讯
router.get('/getWebsiteInfo', commonController.getWebsiteInfo);

module.exports = router;
