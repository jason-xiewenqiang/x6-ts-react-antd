<template>
  <div class="item-panel">
    <el-collapse v-model="activeCollapse">
      <el-collapse-item name="1">
        <template slot="title">
          流程节点
        </template>
        <ul class="drag-nodes">
          <li
            class="drag-node"
            v-for="item in items"
            :key="item.id"
            draggable
            @dragstart="handleDragstart"
            @dragend="handleDragEnd($event, item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import items from "../../config/node.conf";
import eventBus from "@/utils/busMgr";
import uuid from "@/utils/uuid";
export default {
  name: "item-panel",
  created() {
    this.bindEvent();
  },
  data() {
    return {
      command: null,
      items: items,
      offsetX: 0,
      offsetY: 0,
      activeCollapse: "1"
    };
  },
  methods: {
    handleDragstart(e) {
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
    },
    handleDragEnd(e, item) {
      let data = {};
      Object.assign(data, item);
      data.offsetX = this.offsetX;
      data.offsetY = this.offsetY;
      if (this.command) {
        const graph = this.command.editor.graph;
        const xy = graph.getPointByClient(e.x, e.y);
        data.x = xy.x;
        data.y = xy.y;
        data.id = uuid();
        this.command.execute("add", data);
      }
    },
    bindEvent() {
      eventBus.$get(this.$BUSID).$on("initial", c => {
        this.command = c;
      });
    }
  }
};
</script>

<style scoped lang="less">
.item-panel {
  width: 280px;
  height: 100%;
  background-color: #f7f9fb;
  position: absolute;
  left: 0;
  top: 0;
  border-right: 1px solid #ccc;
  .drag-nodes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 20px;
    .drag-node {
      width: 100px;
      height: 30px;
      box-sizing: border-box;
      border: 1px solid #dd44dd;
      text-align: center;
      line-height: 30px;
      color: #333;
      margin-bottom: 10px;
      cursor: move;
    }
  }
}
</style>
