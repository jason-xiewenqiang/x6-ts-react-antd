import uuid from "@/utils/uuid";
let startPoint = null;
let startItem = null;
let endPoint = {};
let activeItem = null;
let curInPoint = null;
export default {
	getEvents() {
		return {
			mousemove: "onMousemove",
			mouseup: "onMouseup",
			"node:mouseover": "onMouseover",
			"node:mouseleave": "onMouseleave"
		};
	},
	onMousemove(event) {},
	onMouseup(event) {},
	onMouseover(event) {},
	onMouseleave(event) {}
};
