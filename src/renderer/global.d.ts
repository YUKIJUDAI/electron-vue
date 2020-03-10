import { ElMessage } from "element-ui/types/message";
import { ElMessageBoxShortcutMethod } from "element-ui/types/message-box";
import Vue from "vue";

declare module "*.vue" {
    export default Vue;
}

declare module "vue/types/vue" {
    interface Vue {
        $fetch: any;
        $message: ElMessage;
        $echarts: any;
        $confirm: ElMessageBoxShortcutMethod;
    }
}
