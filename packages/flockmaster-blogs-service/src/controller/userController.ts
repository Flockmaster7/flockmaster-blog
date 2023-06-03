import { Context } from 'koa';
import UserService from '../service/userService';

const userService = new UserService();

class UserController {
	async login(ctx: Context) {
		ctx.body = '登录';
	}

	async register(ctx: Context) {
		const { user_name, password } = ctx.request.body;
		try {
			const res = await userService.createUser(user_name, password);
			ctx.body = {
				code: 0,
				message: '用户注册成功',
				result: {
					id: res.id,
					user_name: res.user_name
				}
			};
		} catch (error) {
			console.error(error);
			// ctx.app.emit('error', userRegisterError, ctx);
		}
	}
}

export default UserController;
