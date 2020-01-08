var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
const aes = function (txt) {
    var key = "w28Cz694s63kBYk4";
    var io = "4kYBk36s496zC82w";

    var txt2 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(txt));

    var res = AES.decrypt(txt2, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(io),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return res.toString(CryptoJS.enc.Utf8);
}

export { aes }