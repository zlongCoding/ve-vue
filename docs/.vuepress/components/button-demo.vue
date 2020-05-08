
<template>
  <SwitchCode :content="content">
    <ve-button id="fawf" @click="clickBtn">德玛西亚</ve-button>
    <ve-button :disabled="true">面对疾风吧</ve-button>
    <ve-button :circle="true" @click="clickBtn">恕瑞玛，你的皇帝回来了</ve-button>
    <div>{{num}}</div>
  </SwitchCode>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import Button from "../../../lib/button/src/button";
import SwitchCode from "./component/SwitchCode";
const content = `
import Button from "ve-vue/lib/button"
Vue.use(Button)
   <ve-button  @click="clickBtn">德玛西亚</ve-button>
     <ve-button :disabled="true">面对疾风吧</ve-button>
     <ve-button :circle="true" @click="clickBtn">来啊互相伤害</ve-button>
     <div>{{num}}</div>


export default {
}
<script>
`;
export default {
  components: {
    // "hy-button": Button,
    "ve-button": Button,
    SwitchCode: SwitchCode
  },
  data() {
    return {
      content: content.trim(),
      showCode: false,
      num: 1
    };
  },
  methods: {
    hanlderChange(val) {
      this.text = val ? "关" : "开";
    },
    clickBtn() {
      this.num += 1;
    }
  }
};
</script>

<style lang="scss" scoped>
$bg-yellow: #409eff;
.spread-bg {
  margin: 10px auto;
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: $bg-yellow;
}
.switch-status {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.switch-status .result {
  margin-left: 40px;
}
</style>
