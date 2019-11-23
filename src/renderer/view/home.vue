<template>
    <div>
        <button id="button">打开生意参谋</button>
    </div>
</template>

<script>
const { ipcRenderer } = require("electron");
const { isOnline } = require("@/util/online");
const { fromEvent } = require("rxjs");
const { factory } = require("@/util/factory");

export default {
    mounted() {
        // 判断在线离线状态
        isOnline();

        //点击生意参谋打开新页面
        fromEvent(document.getElementById("button"), 'click').subscribe(() => {
            ipcRenderer.send("open-sycm");
        });

        // 获取更新
        ipcRenderer.send("checkForUpdate");
        // 输出更新信息
        ipcRenderer.on("message", (event, text) => {
            console.log(text);
        });
        // 更新
        ipcRenderer.on("isUpdateNow", () => {
            ipcRenderer.send("isUpdateNow");
        });
        // 获取xhr信息后处理
        ipcRenderer.on('send-xhr-data', (event, type, data) => {
            if (factory.obj[type]) {
                typeof factory.obj[type].callback === "function" && factory.obj[type].callback(data);
            }
        });
    }
}
</script>

<style scoped>
</style>