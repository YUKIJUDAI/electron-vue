import store from "@/store";
import router from "@/router/index";
import { Message } from "element-ui";

export default function(event) {
    // todo 权限判定
    if (false) {
        if (document.getElementsByClassName("el-message").length <= 0) {
            Message("开通或升级会员可使用此页面功能");
        }
        event.setAttribute("disabled", true);
    }
}
