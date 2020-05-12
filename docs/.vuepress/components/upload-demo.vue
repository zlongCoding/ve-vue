
<template>
  <SwitchCode :content="content">
    <ve-upload />
  </SwitchCode>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import Upload from "../../../lib/upload/src/upload";
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
    "ve-upload": Upload,
    SwitchCode: SwitchCode
  },
  data() {
    return {
      content: content
    };
  },
  methods: {

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
