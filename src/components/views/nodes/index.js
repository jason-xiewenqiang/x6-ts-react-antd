import G6 from "@antv/g6";
import StartNode from "./StartNode";
import UserNode from "./UserNode";

const customNodes = {
	startNode: StartNode,
	userNode: UserNode
};

export default () => {
	for (let key in customNodes) {
		customNodes[key].type
			? G6.registerNode(key, customNodes[key], customNodes[key].type)
			: G6.registerNode(key, customNodes[key]);
	}
};
