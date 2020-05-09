const path = require("path");
const koa = require('koa');
const static = require('koa-static');

const app = new koa();

app.use(
    static(path.join(__dirname, "./static"))
);

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

app.listen(3000);