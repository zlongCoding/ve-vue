<template>
  <SwitchCode :content="content">
    <ve-button @click="show = !show">Click Me</ve-button>
    <ve-spread>
      <div class="spread-bg" v-if="show"></div>
    </ve-spread>
  </SwitchCode>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import Button from "../../../lib/button/src/button";
import Spread from "../../../lib/spread/src/spread";
import SwitchCode from "./component/SwitchCode";
const content = `
<ve-button @click="show = !show">Click Me</ve-button>
<ve-spread>
    <div class="spread-bg" v-if="show"></div>
</ve-spread>
<script>

export default {
  
    data(){
        return{
            show:false
        }
    }
}
<script>
`;
export default {
  components: {
    "ve-button": Button,
    "ve-spread": Spread,
    SwitchCode: SwitchCode
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
$bg-yellow: #3498db;
.spread-bg {
  margin: 10px auto;
  width: 100%;
  height: 100px;
  border-radius: 4px;
  background-color: $bg-yellow;
}
</style>
