import { Context } from 'koa';
import { errorReturnType } from '../types/error';
const errHandler = (err: errorReturnType, ctx: Context) => {
	let status = 500;
	switch (err.code) {
		case '10001':
			status = 400;
			break;
		case '10002':
			status = 409;
			break;
		default:
			status = 500;
			break;
	}
	ctx.body = err;
	ctx.status = status;
};
export default errHandler;
