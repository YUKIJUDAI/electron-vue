// 验证是否为空
export const isEmpty = function (str) {
    return Object.prototype.toString.call(str) === "[object Null]" || Object.prototype.toString.call(str) === "[object Undefined]" || str === "";
}

// 获取验证码
export const getPhoneCode = function (type, phone, _this) {
    http.post("/index/sendSms", { type, phone }).then(res => {
        if (0 === res.code) {
            _this.phoneCodeFlag = true;
            interval(1000).pipe(take(60)).subscribe((res) => {
                let a = (res + 1);
                a === 60 ? (_this.phoneCodeFlag = false) : _this.countdown = (60 - a);
            });
        }
    });
}