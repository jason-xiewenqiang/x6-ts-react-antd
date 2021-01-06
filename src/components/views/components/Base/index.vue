<template>
  <div class="home">
    <div class="home-header">
      <Toolbar />
    </div>
    <div style="height: 60px;"></div>
    <div class="home-body">
      <ItemPanel />
      <EditContainer />
      <PropertyPanel />
    </div>
  </div>
</template>
<script>
import Toolbar from "../Toolbar/index";
import ItemPanel from "../ItemPanel/index";
import EditContainer from "../Container/index.vue";
import PropertyPanel from "../PropertyPanel/index.vue";
export default {
  name: "Home",
  components: { EditContainer, Toolbar, PropertyPanel, ItemPanel }
};
</script>
<style scoped lang="less">
.home {
  height: 100%;
  position: relative;
  .home-header {
    height: 60px;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
    z-index: 3;
    box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
    position: absolute;
  }
  .home-body {
    position: relative;
    height: calc(100% - 60px);
  }
}
</style>
