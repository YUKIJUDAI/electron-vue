import { getGlobal } from "@/util/electronFun";
// var config = require(getGlobal("__static") + "\\config.json");


const uploadUrl = "http://127.0.0.1:3000/public";
const baseUrl = "http://bsearch.lethink.net";
const heisouBaseUrl = "http://mars-hesso.lethink.net";
const qnUrl = "http://file.bsearch.lethink.net/";
const wsUrl = "ws://47.99.101.142:2046/";
const proxyid = 1;
const version_num = "0.6.2";

export { uploadUrl, baseUrl, heisouBaseUrl, qnUrl, wsUrl, proxyid, version_num };
