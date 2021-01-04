import uuid from "@/utils/uuid";
export default [
	{
		name: "开始",
		key: "start.node",
		id: uuid(),
		x: 200,
		y: 200,
		size: 50,
		label: "开始",
		type: "circle",
		style: {
			fill: "lightblue",
			stroke: "green",
			linewidth: 1,
			radius: 7
		},
		inPoints: [[0, 0.5]],
		outPoints: [[1, 0.5]]
	},
	{
		name: "结束",
		key: "end.node",
		id: uuid(),
		size: 50,
		label: "结束",
		type: "circle",
		style: {
			fill: "lightblue",
			stroke: "#888",
			linewidth: 1,
			radius: 7
		},
		inPoints: [[0, 0.5]],
		outPoints: [[1, 0.5]]
	},
	{
		name: "用户任务",
		key: "user.node",
		id: uuid(),
		x: 200,
		y: 200,
		label: "用户任务",
		type: "modelRect",
		style: {
			fill: "lightblue",
			stroke: "#888",
			linewidth: 1,
			radius: 7
		},
		width: 100,
		height: 100,
		inPoints: [[0, 0.5]],
		outPoints: [[1, 0.5]]
	},
	{
		name: "分支",
		key: "condition.node",
		id: uuid(),
		x: 200,
		y: 200,
		width: 100,
		height: 100,
		label: "分支",
		type: "diamond",
		style: {
			fill: "lightblue",
			stroke: "#888",
			linewidth: 1,
			radius: 7
		},
		inPoints: [[0, 0.5]],
		outPoints: [[1, 0.5]]
	},
	{
		label: "自定义节点",
		key: "custom.node",
		shape: "startNode",
		id: uuid(),
		inPoints: [[0, 0.5]],
		outPoints: [[1, 0.5]]
	},
	{
		label: "任务节点",
		key: "user.node",
		shape: "userNode",
		id: uuid(),
		image: require("../../assets/images/bg.jpg"),
		inPoints: [[0, 0.5]],
		outPoints: [[1, 0.5]]
	}
];
