<template>
  <SwitchCode :content="content">
      <hy-button @click="show = !show">Click Me</hy-button>
      <hy-spread>
        <div class="spread-bg" v-if="show"></div>
      </hy-spread>
  </SwitchCode>
</template>


<script>
import Button from "../../../src/packages/button/button.vue";
import Spread from "../../../src/packages/spread/spread";
import SwitchCode from './component/SwitchCode'
const content = `
<hy-button @click="show = !show">Click Me</hy-button>
<hy-spread>
    <div class="spread-bg" v-if="show"></div>
</hy-spread>
<script>
import {Spread,Button} from ve-vue

xport default {
    components:{
        'hy-button':Button,
        'hy-spread':Spread
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
.spread-bg{
    margin: 10px auto;
    width: 100%;
    height: 100px;
    border-radius: 4px;
    background-color: $bg-yellow;
}
</style>`
export default {
  components: {
    "hy-button": Button,
    "hy-spread": Spread,
    'SwitchCode':SwitchCode
  },
  data() {
    return {
      show: false,
      content: content.trim(),
      showCode: false
    };
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
</style>
