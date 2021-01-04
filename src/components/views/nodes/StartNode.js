// 开始节点
export default {
	getAnchorPoints() {
		return [
			[0, 0.25],
			[0, 0.5],
			[0, 0.75],
			[1, 0.5],
			[1, 0.75],
			[1, 0.75],
			[0.25, 0],
			[0.5, 0],
			[0.75, 0],
			[0.25, 1],
			[0.5, 1],
			[0.75, 1]
		];
	},
	label: "自定义节点",
	type: "modelRect",
	style: {
		fill: "lightblue",
		stroke: "#888",
		linewidth: 1,
		radius: 7
	}
};
