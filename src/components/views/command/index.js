/*
 * @Author: jason-xiewenqiang
 * @Email: xiewenqiang@xbrother.com
 * @Date: 2020-10-22 16:18:05
 * @LastEditors: jason-xiewenqiang
 * @LastEditTime: 2020-10-23 15:35:29
 * @Description: 处理器
 */

class Command {
	editor = null;
	undoList = [];
	redoList = [];
	constructor(editor) {
		this.editor = editor;
	}
	// 执行命令 总入口
	execute(action, params) {
		console.log("excute action", action);
		this[action](params);
	}
	save() {
		console.log("save", this.editor.graph.save());
	}
	// 放大
	zoomIn() {
		this.editor.graph.zoom(1.2);
	}
	resetZoom() {
		this.editor.graph.refresh();
	}
	// 缩小
	zoomout() {
		this.editor.graph.zoom(0.8);
	}
	// 添加节点
	add(params) {
		this.editor.add("node", params);
	}
	// 向前一步
	do() {}
	// 撤销一步
	undo() {}
	// 移除一项
	remove() {}
	// 更新一项
	update() {}
	// 复制一项
	copy() {}
	// 粘贴一项
	paste() {}
	// 添加锚点
	addAnchorPoint() {}
	// 移除锚点
	removeAnchorPoint() {}
	// 添加拐点
	addTurningPoint() {}
	// 移除拐点
	removeTurningPoint() {}
}
export default Command;
