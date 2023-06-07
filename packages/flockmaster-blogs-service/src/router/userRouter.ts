import Router from 'koa-router';
import UserController from '../controller/userController';
import {
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	verifyLogin,
	userIsExist
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

router.post(
	'/updatepwd',
	loginOrRegisterFormValidator,
	userIsExist,
	cryptPassword,
	userController.updatePassword
);

module.exports = router;
