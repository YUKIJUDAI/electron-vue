import { interval } from "rxjs";
import { filter } from "rxjs/operators";

// 网络检测
export default function () {
    interval(10000).pipe(filter(() => !navigator.onLine)).subscribe(() => {
        new window.Notification("无法连接到服务器，请检查网络");
    });
}