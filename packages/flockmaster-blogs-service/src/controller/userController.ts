import { Context } from 'koa';
import UserService from '../service/userService';
import Result from '../utils/Result';
import ERROR from '../utils/Error';

const userService = new UserService();

class UserController {
	async login(ctx: Context) {
		ctx.body = '登录';
	}

	async register(ctx: Context) {
		const { user_name, password } = ctx.request.body;
		try {
			const res = await userService.createUser(user_name, password);
			let data = res;
			delete data.password;
			ctx.body = new Result(200, '用户注册成功', data);
		} catch (error) {
			console.error(error);
			ctx.app.emit('error', ERROR.userRegisterError, ctx);
		}
	}
}

export default UserController;
