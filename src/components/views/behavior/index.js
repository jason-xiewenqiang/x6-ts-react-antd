import G6 from "@antv/g6";
import hoverNode from "./hover-node";
import addEdge from "./add-edge";

const behaviorMap = {
	"hover-node": hoverNode,
	"add-edge": addEdge
};

// 注册 行为
export default () => {
	for (let key in behaviorMap) {
		G6.registerBehavior(key, behaviorMap[key]);
	}
};
