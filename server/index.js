const path = require("path");
const koa = require('koa');
const IO = require('koa-socket-2');
const static = require('koa-static');

const app = new koa();
const io = new IO();

app.use(
    static(path.join(__dirname, "./static"))
);

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

io.attach(app);

io.off("/my-app").on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
        console.log('客户端发送的内容：', data);
        socket.emit('getMsg', '我是返回的消息... ...');
    })

    setTimeout(() => {
        socket.emit('getMsg', '我是初始化3s后的返回消息... ...')
    }, 3000)
})


app.listen(3000);