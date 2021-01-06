import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import utils from "../utils";

const Jsonp = require("jsonp");

// 配置 host
const HOST = process.NODE_ENV === "production" ? location.protocol + "your address" : ""; // code review error

// 设置header参数 可以使用封装的 cookie 包处理
export const headers = {};

// 配置错误信息map
const RequestErrorMessage = {
	403: "请求资源不可用",
	500: "Ops，服务器处理时发生了意外",
	400: "服务器不理解客户端的请求，未做任何处理",
	404: "所请求的资源不存在，或不可用",
	503: "服务器无法处理请求，网站维护状态"
};

// 处理错误函数
export const errorHandler = error => {
	Message({
		type: "error",
		message: `${error.msg || RequestErrorMessage[error.code]}`
	});
};

// 配置axios参数
export const ax = axios.create({
	baseURL: HOST,
	timeout: 300000,
	responseType: "json",
	headers: headers,
	transformRequest: [
		data => {
			if (data instanceof FormData) {
				return data;
			}
			return qs.stringify(data);
		}
	],
	paramsSerializer(params) {
		return qs.stringify(utils.filterUndefinedParams(params));
	}
});

// 发送json
export function postJson(url, data, dataType, silent) {
	return axios.post(url, data, { responseType: dataType }).then(res => {
		return preHandle(res, silent);
	});
}

// GET
export function get(url, data, dataType, silent) {
	return ax.get(url, { params: data, responseType: dataType }).then(res => {
		return preHandle(res, silent);
	});
}

// POST
export function post(url, data, dataType, silent) {
	return ax.post(url, data, { responseType: dataType }).then(res => {
		return preHandle(res, silent);
	});
}

// DELETE
export function Delete(url, data, dataType, silent) {
	return ax.delete(url, { responseType: dataType, params: data }).then(res => {
		return preHandle(res, silent);
	});
}

// PUT
export function put(url, data, dataType, silent) {
	return ax.put(url, data, { responseType: dataType }).then(res => {
		return preHandle(res, silent);
	});
}

// JSONP
export function jsonp(url, data, dataType, silent) {
	return new Promise((resolve, reject) => {
		const keys = Object.keys(data);
		const values = Object.values(data);
		const param = [];
		for (let i = 0; i < keys.length; i++) {
			const str = keys[i] + "=" + values[i];
			param.push(str);
		}
		Jsonp(`${url}?${param.join("&")}`, null, error => {
			if (error) {
				// eslint-disable-next-line
				reject("");
			} else {
				resolve(data);
			}
		});
	});
}

// 处理返回参数  这里要根据具体业务进行判断 code review Error
function preHandle(response, silent) {
	if (response) {
		if (response.status === 200) {
			if (response.status === 401) {
				Message({
					type: "error",
					message: `登录超时，请重新登录！`
				});
				utils.cookie.removeCookie();
				setTimeout(() => {
					const local = window.location;
					local.href = local.protocol + local.host + "/#/login";
				}, 1500);
			} else {
				return response.data;
			}
		} else {
			errorHandler({ code: response.status });
		}
	} else {
		errorHandler({ msg: "服务端未响应，请联系管理员。" });
	}
}

// 导出
export default {
	ax: `${ax}`,
	get: `${get}`,
	post: `${post}`,
	put: `${put}`,
	jsonp: `${jsonp}`,
	Delete: `${Delete}`,
	errorHandler: `${errorHandler}`
};
