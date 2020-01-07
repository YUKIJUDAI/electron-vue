const path = require("path");
const koa = require('koa');
const app = new koa();
const static = require('koa-static');

app.use(
    static(path.join(__dirname, "./static"))
);

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

app.listen(3000);