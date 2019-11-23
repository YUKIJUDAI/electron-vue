const { interval } = require("rxjs");
const { filter } = require("rxjs/operators");

// 网络检测
exports.isOnline = function () {
    interval(10000).pipe(filter(() => !navigator.onLine)).subscribe(() => {
        new window.Notification("无法连接到服务器，请检查网络");
    });
}