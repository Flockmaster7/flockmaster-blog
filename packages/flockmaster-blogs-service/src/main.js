// const { APP_PORT } = require('./config/config.default')

const app = require('./app/index')

app.use((ctx, next) => {
    ctx.body = "helloworld11"
}) 

app.listen(8000, () => {
    console.log(`服务已经启动, http://localhost:8000`)
})