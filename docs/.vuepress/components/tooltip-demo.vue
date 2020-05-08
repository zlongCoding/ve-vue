<template>
  <SwitchCode :content="content">
    <h3>tooltip hover</h3>
    <ve-tooltip position="top">
      <template slot="content">tooltip</template>
      <ve-button>上边</ve-button>
    </ve-tooltip>
    <ve-tooltip position="bottom">
      <template slot="content">tooltip</template>
      <ve-button>下边</ve-button>
    </ve-tooltip>
    <ve-tooltip position="left">
      <template slot="content">tooltip</template>
      <ve-button>左边</ve-button>
    </ve-tooltip>
    <ve-tooltip position="right">
      <template slot="content">tooltip</template>
      <ve-button>右边</ve-button>
    </ve-tooltip>
    <p>effect</p>
     <ve-tooltip effect position="top">
      <template slot="content">tooltip</template>
      <ve-button>上边</ve-button>
    </ve-tooltip>
    <ve-tooltip effect position="bottom">
      <template slot="content">tooltip</template>
      <ve-button>下边</ve-button>
    </ve-tooltip>

    
    <hr style="margin:20px 0" />
    <h3>tooltip click</h3>
    <ve-tooltip position="top" trigger="click">
      <template slot="content">tooltip</template>
      <ve-button>上边</ve-button>
    </ve-tooltip>
    <ve-tooltip position="bottom" trigger="click">
      <template slot="content">tooltip</template>
      <ve-button>下边</ve-button>
    </ve-tooltip>
    <ve-tooltip position="left" trigger="click">
      <template slot="content">tooltip</template>
      <ve-button>左边</ve-button>
    </ve-tooltip>
    <ve-tooltip position="right" trigger="click">
      <template slot="content" slot-scope="{close}">
        tooltip
        <ve-button @click="close">关闭</ve-button>
      </template>
      <ve-button>右边</ve-button>
    </ve-tooltip>
  </SwitchCode>
</template>

<script>
const content = `
import Tooltip from "ve-vue/lib/tooltip"
Vue.use(Tooltip)

<ve-tooltip position="top">
    <template slot="content">
        tooltip
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>
<ve-tooltip position="bottom">
    <template slot="content">
        tooltip
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>
<ve-tooltip position="left">
    <template slot="content">
        tooltip
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>
<ve-tooltip position="right">
    <template slot="content" slot-scope="{close}">
        tooltip
        <ve-button @click="close">关闭</ve-button>
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>
<hr style="margin:10px 0 10px">
<ve-tooltip position="top" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>
<ve-tooltip position="bottom" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>
<ve-tooltip position="left" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>
<ve-tooltip position="right" trigger="hover">
    <template slot="content">
        tooltip
    </template>
    <ve-button>tooltip</ve-button>
</ve-tooltip>

`;
import tooltip from "../../../lib/tooltip/src/tooltip.vue";
import Button from "../../../lib/button/src/button";
// import Button from "../../../src/packages/button/button.vue";
import SwitchCode from "./component/SwitchCode";
export default {
  name: "tooltip",
  components: {
    "ve-tooltip": tooltip,
    "ve-button": Button,
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
