<template>
  <SwitchCode :content="content">
      <ve-checkbox name="food[]" value="pizza"  checked>
        <span class="checkox-slot">面对疾风吧</span>
      </ve-checkbox>
  </SwitchCode>
</template>


<script>
import checkbox from "../../../lib/checkbox/src/checkbox";
import SwitchCode from './component/SwitchCode'
const content = `
<hy-button @click="show = !show">Click Me</hy-button>
<hy-checkbox>
    <div class="checkbox-bg" v-if="show"></div>
</hy-checkbox>
<script>
import {checkbox,Button} from ve-vue

xport default {
    components:{
        'hy-button':Button,
        've-checkbox':checkbox
    },
    data(){
        return{
            show:false
        }
    }
}
<script>
<style lang="scss" scoped>
$bg-yellow:#409eff;
.checkbox-bg{
    margin: 10px auto;
    width: 100%;
    height: 100px;
    border-radius: 4px;
    background-color: $bg-yellow;
}
</style>`
export default {
  components: {
    // "hy-button": Button,
    "ve-checkbox": checkbox,
    'SwitchCode':SwitchCode
  },
  data() {
    return {
      show: false,
      content: content.trim(),
      showCode: false,
      checkboxValue: [],
    };
  }
};
</script>

<style lang="scss" scoped>
$bg-yellow: #409eff;
.checkbox-bg {
  margin: 10px auto;
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: $bg-yellow;
}
.checkox-slot{
  display: inline-block;
  margin-left: 10px;
}
</style>
