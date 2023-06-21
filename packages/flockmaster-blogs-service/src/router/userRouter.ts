import Router from 'koa-router';
import UserController from '../controller/userController';
import {
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	verifyLogin,
	userIsExist,
	userIsExistById
} from '../middleware/userMiddleware';
import { auth, isAdmin } from '../middleware/auth';
import { validatorId, verifyUploadImg } from '../middleware/validator';

const router = new Router({ prefix: '/users' });

const userController = new UserController();

// 用户登录
router.post(
	'/login',
	loginOrRegisterFormValidator,
	verifyLogin,
	userController.login
);

// 用户注册
router.post(
	'/register',
	loginOrRegisterFormValidator,
	userVerify,
	cryptPassword,
	userController.register
);

// 修改密码
router.post(
	'/updatepwd',
	loginOrRegisterFormValidator,
	userIsExist,
	cryptPassword,
	userController.updatePassword
);

// 获取用户信息
router.get('/getUserInfo', auth, userController.getUserInfo);

// 更新用户信息
router.post('/updateUserInfo', auth, userController.updateUserInfo);

//上传用户头像
router.post(
	'/uploadAvatar',
	auth,
	verifyUploadImg,
	userController.uploadAvatar
);

// 删除用户
router.delete(
	'/delete/:id?',
	auth,
	isAdmin,
	validatorId,
	userIsExistById,
	userController.removeUser
);

module.exports = router;
