import Router from 'koa-router';
import UserController from '../controller/userController';
import {
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	verifyLogin
} from '../middleware/userMiddleware';

const router = new Router({ prefix: '/users' });

const userController = new UserController();

router.post(
	'/login',
	loginOrRegisterFormValidator,
	verifyLogin,
	userController.login
);

router.post(
	'/register',
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	userController.register
);

module.exports = router;
