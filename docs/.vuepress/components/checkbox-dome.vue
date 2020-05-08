<template>
  <SwitchCode :content="content">
    <p>
      <strong>Value:</strong>
      {{ checkboxStatus ? "yes" : "no" }}
    </p>
    <ve-checkbox :checked="checkboxStatus" v-model="checkboxStatus">
      <span class="checkox-slot">面对疾风吧</span>
    </ve-checkbox>
  </SwitchCode>
</template>

<script>
import checkbox from "../../../lib/checkbox/src/checkbox";
import SwitchCode from "./component/SwitchCode";
const content = `
import Checkbox from "ve-vue/lib/checkbox"
Vue.use(Checkbox)
 <p>
      <strong>Value:</strong>
      {{ checkboxStatus ? 'yes' : 'no' }}
    </p>
      <ve-checkbox :checked="checkboxStatus" v-model="checkboxStatus">
        <span class="checkox-slot">面对疾风吧</span>
      </ve-checkbox>
<script>

export default {
    data(){
        return{
             checkboxStatus: true,
        }
    }
}
<script>
`;
export default {
  components: {
    // "hy-button": Button,
    "ve-checkbox": checkbox,
    SwitchCode: SwitchCode
  },
  data() {
    return {
      show: false,
      content: content.trim(),
      showCode: false,
      checkboxStatus: true
    };
  }
};
</script>

<style lang="scss">
$bg-yellow: #409eff;
.checkbox-bg {
  margin: 10px auto;
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: $bg-yellow;
}
.checkox-slot {
  display: inline-block;
  margin-left: 10px;
}
</style>
