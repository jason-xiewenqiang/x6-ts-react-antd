/*
 * @Author: jason-xiewenqiang
 * @Email: xiewenqiang@xbrother.com
 * @Date: 2020-10-22 16:33:34
 * @LastEditors: jason-xiewenqiang
 * @LastEditTime: 2020-10-22 17:19:10
 * @Description: 编辑器
 */
import Command from "./index";
class Editor {
	constructor(graph, viewInstance) {
		this.graph = graph;
		viewInstance.$Bus.$emit("initial", new Command(this));
	}
	getGraph() {
		return this.graph;
	}
	add(type, item) {
		this.graph.add(type, item);
	}
	update(item, model) {
		this.graph.update(item, model);
	}
	remove(item) {
		const node = this.graph.findById(item.id);
		this.graph.remove(node);
	}
}
export default Editor;
