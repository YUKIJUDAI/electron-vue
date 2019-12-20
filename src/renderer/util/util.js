import { interval } from "rxjs";
import { take, filter } from "rxjs/operators";

// 监测网络
export const isOnline = function () {
    interval(10000).pipe(filter(() => !navigator.onLine)).subscribe(() => {
        new window.Notification("无法连接到服务器，请检查网络");
    });
}

// 验证是否为空
export const isEmpty = function (str) {
    return Object.prototype.toString.call(str) === "[object Null]" || Object.prototype.toString.call(str) === "[object Undefined]" || str === "";
}

// 获取验证码
export const getPhoneCode = function (type, phone, _this) {
    _this.$http.post("/index/sendSms", { type, phone }).then(res => {
        if (0 === res.code) {
            _this.$message.success(res.msg);
            _this.phoneCodeFlag = true;
            interval(1000).pipe(take(60)).subscribe((res) => {
                let a = (res + 1);
                a === 60 ? (_this.phoneCodeFlag = false) : _this.countdown = (60 - a);
            });
        } else {
            _this.$message.error(res.msg);
        }
    });
}

// 权重算法
export const weightFn = function (arr, sum) {
    // arr总和
    var nums = arr.reduce((prev, curr, idx, arr) => +prev + +curr);
    // 根据权重得出的新数组
    var newArr = arr.map((item, i) => Math.floor(sum * item / nums));
    // 所的权重
    var remainder = arr.map((item, i) => { return { remainder: item / nums, index: i } });
    // 舍去小数后和总数的差值
    var difference = sum - newArr.reduce((prev, curr, idx, arr) => +prev + +curr);
    // 权重大小排列
    remainder.sort((a, b) => a.remainder < b.remainder ? 1 : -1);
    // 给新数组剩下的加值
    for (let index = 0; index < difference; index++) {
        newArr[remainder[index].index]++;
    }
    return newArr;
}