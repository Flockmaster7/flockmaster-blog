import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import processEnv from '../config/config.default';
import Error from '../utils/Error';
const auth = async (ctx: Context, next: Next) => {
	const { authorization = '' } = ctx.request.body;
	const token = authorization.replace('Bearer ', '');
	try {
		const user = jwt.verify(token, processEnv.JWT_SECRET as string);
		ctx.state.user = user;
		console.log(ctx.state.user);
	} catch (error: any) {
		switch (error.name) {
			case 'TokenExpiredError':
				console.error('token已过期', error);
				return ctx.app.emit('error', Error.tokenExpiredError, ctx);
			case 'JsonWebTokenError':
				console.error('无效的token', error);
				return ctx.app.emit('error', Error.invalidTokenError, ctx);
		}
		return;
	}
	await next();
};

export { auth };
