import Router from 'koa-router';
import WorkController from '../controller/workController';
import { auth } from '../middleware/auth';
import { validatorId, validatorPage } from '../middleware/workMiddleware';

const router = new Router({ prefix: '/work' });

const workController = new WorkController();

router.post('/create', auth, workController.createWork);

router.post('/update', auth, validatorId, workController.updateWork);

router.get('/getDetail/:id?', validatorId, workController.getWorkDetail);

router.get(
	'/getList/:pageNum?/:pageSize?',
	validatorPage,
	workController.getWorkList
);

router.delete('/delete/:id?', auth, validatorId, workController.removeWork);

module.exports = router;
