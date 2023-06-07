import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';
import UserService from '../service/userService';
import Result from '../utils/Result';
import ERROR from '../utils/Error';
import processEnv from '../config/config.default';
import User from '../model/User';

const userService = new UserService();

class UserController {
	async login(ctx: Context) {
		try {
			const { user_name } = ctx.request.body;
			const { password, ...res } = (await userService.getUserInfo({
				user_name
			})) as User;
			ctx.body = new Result(200, '用户登录成功', {
				token: jwt.sign(res, processEnv.JWT_SECRET as string, {
					expiresIn: '1d'
				})
			});
		} catch (error) {
			console.error('用户登录失败', error);
			ctx.app.emit('error', ERROR.userLoginError, ctx);
		}
	}

	async register(ctx: Context) {
		try {
			const { user_name, password: pwd } = ctx.request.body;
			const { password, ...res } = await userService.createUser(
				user_name,
				pwd
			);
			let data = res;
			ctx.body = new Result(200, '用户注册成功', data);
		} catch (error) {
			console.error(error);
			ctx.app.emit('error', ERROR.userRegisterError, ctx);
		}
	}

	async updatePassword(ctx: Context) {
		try {
			const { password } = ctx.request.body;
			const id = ctx.state.userInfo.id;
			const res = await userService.updateUser({ id, password });
			if (res) {
				ctx.body = new Result(200, '修改密码成功', 'success');
			} else {
				ctx.body = new Result(200, '修改密码失败', 'fail');
			}
		} catch (error) {
			console.error('修改密码失败', error);
			ctx.app.emit('error', ERROR.userChangePasswordError, ctx);
		}
	}
}

export default UserController;
