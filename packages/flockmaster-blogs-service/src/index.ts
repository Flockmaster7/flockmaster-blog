// require('module-alias/register');
import app from './app/index';
import processEnv from './config/config.default';
// const { APP_PORT } = require('./config/config.default');

app.use(async (ctx, next) => {
	ctx.body = 'helloworld11';
	await next();
});

app.listen(processEnv.APP_PORT, () => {
	console.log(`服务已经启动, http://localhost:${processEnv.APP_PORT}`);
});
