// require('module-alias/register');
import app from './app/index';
import processEnv from './config/config.default';

app.listen(processEnv.APP_PORT, () => {
	console.log(`服务已经启动, http://localhost:${processEnv.APP_PORT}`);
});
