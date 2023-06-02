import path from 'path';
// Koa业务
import Koa from 'koa';
import { koaBody } from 'koa-body';
// import parameter from 'koa-parameter';
// import koaStatic from 'koa-static';
import errHandler from './errHandler';
import router from '../router/index';

const parameter = require('koa-parameter');
const koaStatic = require('koa-static');
const logger = require('koa-logger');

const app = new Koa();

// const { koaSwagger } = require('koa2-swagger-ui')
// const swagger = require('../config/swagger')

// require("babel-register");

// 日志
app.use(logger());

app.use(
	koaBody({
		multipart: true,
		formidable: {
			uploadDir: path.resolve(__dirname, '../upload'),
			keepExtensions: true
		}
	})
);
// 可以通过路径访问静态资源
app.use(koaStatic(path.resolve(__dirname, '../upload')));
// app.use(parameter(app))
parameter(app);

// swagger配置
// app.use(swagger.routes(), swagger.allowedMethods())
// app.use(koaSwagger({
//     routePrefix: '/swagger', // host at /swagger instead of default /docs
//     swaggerOptions: {
//       url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
//     },
// }))

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', errHandler);

export default app;
