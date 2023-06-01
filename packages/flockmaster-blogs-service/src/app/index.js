const path = require('path')
// Koa业务
const Koa = require('koa')
const { koaBody } = require('koa-body');
const app = new Koa()
// const parameter = require('koa-parameter')
// const koaStatic = require('koa-static')

// const router = require('../router/index')
const {errHandler} = require('./errHandler')
// const { koaSwagger } = require('koa2-swagger-ui')
// const swagger = require('../config/swagger')

// require("babel-register");

// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         uploadDir: path.resolve(__dirname, '../upload'),
//         keepExtensions:true
//     }
// }))
// // 可以通过路径访问静态资源
// app.use(koaStatic(path.resolve(__dirname, '../upload')))
// // app.use(parameter(app))
// parameter(app)

// swagger配置
// app.use(swagger.routes(), swagger.allowedMethods())
// app.use(koaSwagger({
//     routePrefix: '/swagger', // host at /swagger instead of default /docs
//     swaggerOptions: {
//       url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
//     },
// }))

// app.use(router.routes())
// app.use(router.allowedMethods())

app.on("error", errHandler)

module.exports = app