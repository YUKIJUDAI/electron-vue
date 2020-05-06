import { interval, Observable, never } from "rxjs";
import { take, filter } from "rxjs/operators";

// 监测网络
export const isOnline = function() {
    interval(10000)
        .pipe(filter(() => !navigator.onLine))
        .subscribe(() => {
            new window.Notification("无法连接到服务器，请检查网络");
        });
};

// 验证是否为空
export const isEmpty = function(str): boolean {
    return Object.prototype.toString.call(str) === "[object Null]" || Object.prototype.toString.call(str) === "[object Undefined]" || str === "";
};

// 随机数
export const rand = function(min = 1000, max = 9999): string {
    return Math.floor(Math.random() * (max - min)) + min + "";
};

// 获取验证码
export const getPhoneCode = function(type, phone, verify, _this) {
    _this.$fetch.post("/index/sendSms", { type, phone, verify_key: _this.key, verify }).then((res) => {
        if (0 === res.code) {
            _this.$message.success(res.msg);
            _this.phoneCodeFlag = true;
            interval(1000)
                .pipe(take(60))
                .subscribe((res) => {
                    let a = res + 1;
                    a === 60 ? (_this.phoneCodeFlag = false) : (_this.countdown = 60 - a);
                });
        } else {
            _this.$message.error(res.msg);
        }
    });
};

// 权重算法
export const weightFn = function(arr, sum): Array<string> {
    // arr总和
    var nums = arr.reduce((prev, curr, idx, arr) => +prev + +curr);
    // 根据权重得出的新数组
    var newArr = arr.map((item, i) => Math.floor((sum * item) / nums));
    // 所的权重
    var remainder = arr.map((item, i) => {
        return { remainder: item / nums, index: i };
    });
    // 舍去小数后和总数的差值
    var difference = sum - newArr.reduce((prev, curr, idx, arr) => +prev + +curr);
    // 权重大小排列
    remainder.sort((a, b) => (a.remainder < b.remainder ? 1 : -1));
    // 给新数组剩下的加值
    for (let index = 0; index < difference; index++) {
        newArr[remainder[index].index]++;
    }
    return newArr;
};

// 查看权限
export const hasAuthority = function(_vue): Observable<any> {
    var authority_level = _vue.$route.meta.authorityInfo.vip_level;
    var functions_time = _vue.$route.meta.authorityInfo.functions_time;
    var vip_level = _vue.$store.state.userInfo.vip_level;
    if (functions_time === 0) {
        var flag = authority_level.includes(vip_level);
        if (!flag) _vue.$message("请升级或开通vip获取此页面使用权限");
        return flag
            ? new Observable((observer) => {
                  observer.next(flag);
                  observer.complete();
              })
            : never();
    } else {
        // todo 接口获取剩余次数
    }
};

// 监测权限
export const monitoringAuthority = function(_vue, type, ...arg) {
    hasAuthority(_vue).subscribe((val) => {
        if (typeof val === "boolean") {
            typeof _vue[type] === "function" ? _vue[type](...arg) : (_vue[type] = arg[0]);
        } else if (typeof val === "number") {
            // todo 添加剩余次数情况回调
        }
    });
};
