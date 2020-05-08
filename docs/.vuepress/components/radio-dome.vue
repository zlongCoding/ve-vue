
<template>
  <SwitchCode :content="content">
    <p>
      <strong>Value:</strong>
      {{ radioValue }}
    </p>
    <ve-radio name="radio-1" checked value="yes" v-model="radioValue">yes</ve-radio>
    <div></div>
    <ve-radio name="radio-1" value="no" v-model="radioValue" >
      <span>no</span>
    </ve-radio>
  </SwitchCode>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import Radio from "../../../lib/radio/src/radio";
import SwitchCode from "./component/SwitchCode";
const content = `
import Radio from "ve-vue/lib/radio"
Vue.use(Radio)
     <p>
      <strong>Value:</strong>
      {{ radioValue }}
    </p>
    <ve-radio name="radio-1" checked value="yes" v-model="radioValue">yes</ve-radio>
    <div></div>
    <ve-radio name="radio-1" value="no" v-model="radioValue">
      <span>no</span>
    </ve-radio>


export default {
    
    data(){
        return{
           radioValue: ''
        }
    },
 
}
<script>
`;
export default {
  components: {
    // "hy-button": Button,
    "ve-radio": Radio,
    SwitchCode: SwitchCode
  },
  data() {
    return {
      content: content.trim(),
      showCode: false,
      text: "开",
      radioValue: true
    };
  },
  methods: {
    hanlderChange(val) {
      this.text = val ? "关" : "开";
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
