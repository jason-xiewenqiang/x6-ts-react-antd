export default {
	getEvents() {
		return {
			"node:click": "onClick",
			mouseover: "onMouseover",
			"edge:click": "onEdgeClick"
		};
	},
	onClick(event) {
		const self = this;
		const node = event.item;
		const graph = self.graph;
		const model = node.getModel();
		if (self.addingEdge && self.edge) {
			graph.updateItem(self.edge, {
				target: model.id
			});
			self.edge = null;
			self.addingEdge = false;
		} else {
			self.edge = graph.addItem("edge", {
				source: model.id,
				target: model.id
			});
			self.addingEdge = true;
		}
	},
	onMouseover(event) {
		const self = this;
		const point = { x: event.x, y: event.y };
		if (self.addingEdge && self.edge) {
			self.graph.updateItem(self.edge, {
				target: point
			});
			self.graph.paint();
		}
	},
	onEdgeClick(event) {
		const self = this;
		const currentEdge = event.item;
		if (self.addingEdge && self.edge === currentEdge) {
			self.graph.removeItem(self.edge);
			self.edge = null;
			self.addingEdge = false;
		}
	}
};
