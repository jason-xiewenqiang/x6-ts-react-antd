/**
 * 此文件为事件车的分发中心
 * 提供两个方法，$get,$off
 * 尽量仅在基础组件中使用
 */

import Vue from "vue";

// 事件车存储，key为事件车的唯一标识，value为事件车
const BUSES = {};

/**
 * 获取事件车实例
 * @param {*} key 事件车的唯一标识符
 */
function getInstance(key) {
	let type = getObjectType(key);

	if (type !== "string") {
		return new Error("Param Key Must Be String");
	}

	let instance = BUSES[key];
	if (!instance) {
		instance = new Vue();
		BUSES[key] = instance;
	}

	return instance;
}

/**
 * 获取数据类型
 *
 * @param {Object} object
 */
export function getObjectType(obj) {
	return obj === null ? "null" : obj instanceof Array ? "array" : typeof obj !== "object" ? typeof obj : "object";
}

/**
 * 销毁实例
 * @param {*} key 事件车的唯一标识符
 */
function destroyedInstance(key) {
	let type = getObjectType(key);

	if (type !== "string") {
		return new Error("Param Key Must Be String");
	}

	let instance = BUSES[key];
	if (instance) {
		instance.$off();
		BUSES[key] = null;
	}

	return true;
}

export default {
	$get: getInstance,
	$off: destroyedInstance
};
