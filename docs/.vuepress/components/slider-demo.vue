<template>
  <div>
    <SwitchCode :content="content">
      <div class="ve-slider-dome-1">
        <p>change事件 ---- value= {{value}}</p>
        <p>input事件 ---- value= {{inputValue}}</p>
      </div>
      <ve-slider :min="0" :max="100" @change="handlerChange" v-model="inputValue" />
    </SwitchCode>
    <SwitchCode :content="content1">
      <p>加入步长</p>
      <div class="ve-slider-dome-1">
        <p>change事件-step ---- value= {{stepvalue}}</p>
        <p>input事件-step ---- value= {{stepinputValue}}</p>
      </div>
      <ve-slider
        :min="0"
        :startValue="20"
        :max="100"
        :step="20"
        v-model="stepinputValue"
        @change="stephandlerChange"
      />
    </SwitchCode>
  </div>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import Slider from "../../../lib/slider/src/slider";
import SwitchCode from "./component/SwitchCode";
const content = `
 <ve-slider :min="0" :max="100" @change="handlerChange" v-model="inputValue"/>
<script>

export default {
    data(){
        return{
            value: 0,
            inputValue: 0
        }
    },
    methods: {
     handlerChange(val){
      this.value = val
    },
  }
}
<script>
`;
const content1 = `
<ve-slider :min="0" :max="100" :startValue="20" :step="20" @change="handlerChange" v-model="inputValue"/>

<script>

export default {
    data(){
        return{
            value: 0,
            inputValue: 0
        }
    },
    methods: {
     handlerChange(val){
      this.value = val
    },
  }
}
<script>
`;
export default {
  components: {
    // "hy-button": Button,
    "ve-slider": Slider,
    SwitchCode: SwitchCode
  },
  data() {
    return {
      content: content.trim(),
      content1: content1.trim(),
      value: 0,
      inputValue: 0,
      stepvalue: 0,
      stepinputValue: 0
    };
  },
  methods: {
    handlerChange(val) {
      this.value = val;
    },
    handlerInput(val) {
      this.inputValue = val;
    },
    stephandlerChange(val) {
      this.stepvalue = val;
    },
    stephandlerInput(val) {
      this.stepinputValue = val;
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
.ve-slider-dome-1 {
  margin-bottom: 10px;
}
</style>
