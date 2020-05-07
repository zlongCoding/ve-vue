<template>
  <SwitchCode :content="content">
    <h3>tooltip hover</h3>
    <ve-tooltip position="top">
      <template slot="content">tooltip</template>
      <button>上边</button>
    </ve-tooltip>
    <ve-tooltip position="bottom">
      <template slot="content">tooltip</template>
      <button>下边</button>
    </ve-tooltip>
    <ve-tooltip position="left">
      <template slot="content">tooltip</template>
      <button>左边</button>
    </ve-tooltip>
    <ve-tooltip position="right">
      <template slot="content">tooltip</template>
      <button>右边</button>
    </ve-tooltip>
    <hr style="margin:20px 0" />
    <h3>tooltip click</h3>
    <ve-tooltip position="top" trigger="click">
      <template slot="content">tooltip</template>
      <button>上边</button>
    </ve-tooltip>
    <ve-tooltip position="bottom" trigger="click">
      <template slot="content">tooltip</template>
      <button>下边</button>
    </ve-tooltip>
    <ve-tooltip position="left" trigger="click">
      <template slot="content">tooltip</template>
      <button>左边</button>
    </ve-tooltip>
    <ve-tooltip position="right" trigger="click">
      <template slot="content" slot-scope="{close}">
        tooltip
        <button @click="close">关闭</button>
      </template>
      <button>右边</button>
    </ve-tooltip>
  </SwitchCode>
</template>

<script>
const content = `
<ve-tooltip position="top">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>
<ve-tooltip position="bottom">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>
<ve-tooltip position="left">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>
<ve-tooltip position="right">
    <template slot="content" slot-scope="{close}">
        tooltip
        <button @click="close">关闭</button>
    </template>
    <button>tooltip</button>
</ve-tooltip>
<hr style="margin:10px 0 10px">
<ve-tooltip position="top" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>
<ve-tooltip position="bottom" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>
<ve-tooltip position="left" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>
<ve-tooltip position="right" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>`;
import tooltip from "../../../lib/tooltip/src/tooltip.vue";

// import Button from "../../../src/packages/button/button.vue";
import SwitchCode from "./component/SwitchCode";
export default {
  name: "tooltip",
  components: {
    "ve-tooltip": tooltip,
    // "button": Button,
    SwitchCode: SwitchCode
  },
  data() {
    return {
      seletedTab: "tab1",
      content: content.trim(),
      showCode: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
