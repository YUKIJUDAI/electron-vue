const path = require("path");
const koa = require('koa');
const app = new koa();
const static = require('koa-static');

app.use(
    static(path.join(__dirname, "./static"))
);

app.listen(3000);