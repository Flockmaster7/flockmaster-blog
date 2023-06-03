import Router from 'koa-router';
import UserController from '../controller/userController';

const router = new Router({ prefix: '/users' });

const userController = new UserController();

router.post('/login', userController.login);

router.post('/register', userController.register);

module.exports = router;
