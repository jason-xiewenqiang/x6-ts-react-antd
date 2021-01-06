<template>
  <div id="editor" ref="editor"></div>
</template>

<script>
import G6 from "@antv/g6";
import { throttle } from "lodash";
import Editor from "../../command/eidtor";
import initBehavior from "../../behavior";
import initCustomNode from "../../nodes";
export default {
  name: "edit-container",
  mounted() {
    this.$nextTick(() => {
      // 注册 行为
      initBehavior();
      // 注册 自定义节点
      initCustomNode();
      // 构建 graph
      this.init();
    });
  },
  methods: {
    init() {
      const data = {
        nodes: [
          {
            id: "node1",
            x: 200,
            y: 200,
            label: "开始节点",
            type: "modelRect",
            style: {
              fill: "lightblue",
              stroke: "#888",
              linewidth: 1,
              radius: 7
            },
            anchorPoints: [
              [0.5, 0],
              [0, 0.5],
              [0.5, 1],
              [1, 0.5]
            ]
          },
          {
            id: "node2",
            x: 200,
            y: 400,
            label: "分支",
            type: "diamond",
            style: {
              fill: "lightblue",
              stroke: "#888",
              linewidth: 1,
              radius: 7
            },
            anchorPoints: [
              [0.5, 0],
              [0, 0.5],
              [0.5, 1],
              [1, 0.5]
            ],
            inPoints: [[0.5, 0]]
          },
          {
            id: "node3",
            x: 200,
            y: 600,
            label: "结束节点",
            type: "modelRect",
            style: {
              fill: "lightblue",
              stroke: "#888",
              linewidth: 1,
              radius: 7
            },
            anchorPoints: [
              [0.5, 0],
              [0, 0.5],
              [0.5, 1],
              [1, 0.5]
            ]
          }
        ],
        edges: [
          {
            source: "node1",
            target: "node2",
            label: "我是连线2",
            type: "line"
          },
          {
            source: "node2",
            target: "node3",
            label: "我是连线1",
            type: "line"
          }
        ]
      };
      const grid = new G6.Grid();
      const menu = new G6.Menu({
        offsetX: 6,
        offsetY: 10,
        itemTypes: ["node"],
        getContent(e) {
          const outDiv = document.createElement("div");
          outDiv.style.width = "180px";
          outDiv.innerHTML = `
            <ul>
              <li>测试1</li>
              <li>测试2</li>
              <li>测试3</li>
              <li>测试4</li>
              <li>测试5</li>
            </ul>
          `;
          return outDiv;
        },
        handleMenuClick(target, item) {
          console.log("menu click", target, item);
        }
      });
      const tooltip = new G6.Tooltip({
        offsetX: 300,
        offsetY: 6,
        getContent(e) {
          const outDiv = document.createElement("div");
          outDiv.style.width = "180px";
          outDiv.innerHTML = `
            <h4> 自定义tooltip </h4>
            <ul>
              <li> Label: ${e.item.getModel().label} </li>
            </ul>
          `;
          return outDiv;
        },
        itemTypes: ["node"]
      });
      const graph = new G6.Graph({
        container: "editor",
        width: this.$refs.editor.getBoundingClientRect().width,
        height: this.$refs.editor.getBoundingClientRect().height,
        modes: {
          default: ["drag-canvas", "zoom-canvas", "hover-node", "create-edge", "drag-node", "click-select"]
        },
        defaultEdge: {
          style: {
            stroke: "#000",
            lineWidth: 2,
            endArrow: true
          }
        },
        plugins: [grid, menu]
      });
      graph.on("aftercreateedge", e => {
        const edges = graph.save().edges;
        G6.Util.processParallelEdges(edges);
        graph.getEdges().forEach((edge, i) => {
          graph.updateItem(edge, edges[i]);
        });
      });
      graph.on("node:mouseup", e => {
        console.log("node", e.target);
        this.$BUS.$emit("select-node", e.target);
      });
      graph.on("edge:click", e => {
        console.log(e.target);
      });
      graph.render();
      // graph.setMode("default");
      new Editor(graph, this);
    }
  }
};
</script>

<style scoped lang="less">
#editor {
  margin: 0 320px 0 280px;
  height: 100%;
  width: calc(100% - 600px);
}
</style>
