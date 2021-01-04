<template>
  <div class="tool-bar">
    <div class="logo">
      <img src="@/assets/images/app-logo.png" alt="" />
    </div>
    <div class="tool-box">
      <div class="title">流程设计器</div>
      <div class="tool-items">
        <ul>
          <li v-for="tool in tools" :key="tool.name" :title="tool.name" @click="itemClick(tool)">
            <i :class="[tool.icon]"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/busMgr";
export default {
  name: "toolbar",
  data() {
    return {
      command: null,
      tools: [
        {
          name: "保存",
          action: "save",
          icon: "el-icon-eleme"
        },
        {
          name: "删除",
          action: "delete",
          icon: "el-icon-delete"
        },
        {
          name: "放大",
          action: "zoom-in",
          icon: "el-icon-zoom-in"
        },
        {
          name: "缩小",
          action: "zoom-out",
          icon: "el-icon-zoom-out"
        },
        {
          name: "还原",
          action: "zoom-reset",
          icon: "el-icon-aim"
        }
      ]
    };
  },
  created() {
    this.bindEvent();
  },
  methods: {
    itemClick(item) {
      this.command.execute(item.action, "hahaha ");
    },
    bindEvent() {
      eventBus.$get(this.$BUSID).$on("initial", command => {
        this.command = command;
      });
    }
  }
};
</script>

<style scoped lang="less">
.tool-bar {
  width: 100%;
  height: 100%;
  display: flex;
  .logo {
    width: 280px;
    height: 100%;
    background-color: #409eff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tool-box {
    width: calc(100% - 280px);
    height: 100%;
    .title {
      height: 17px;
    }
    .tool-items {
      height: 42px;
      ul {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 4px 10px;
        li {
          width: 32px;
          height: 32px;
          background-color: aquamarine;
          text-align: center;
          line-height: 32px;
          font-size: 18px;
          cursor: pointer;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
