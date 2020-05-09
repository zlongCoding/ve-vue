
<template>
  <SwitchCode :content="content">
     <ve-calendar  />
  </SwitchCode>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import Calendar from "../../../lib/calendar/src/calendar";
import SwitchCode from "./component/SwitchCode";
const content = `
import Switch from "ve-vue/lib/switch"
Vue.use(Tooltip)
    <div class="switch-status">
      <ve-switch inactiveText="开" activeText="关"  @change="hanlderChange">
    </ve-switch>
    </div>
      
    <div class="result">状态： {{text}}</div>
    <ve-switch :width="80" :styleType="false" inactiveText="开" activeText="关" />


export default {
    data(){
        return{
            text: '开'
        }
    },
    methods: {
    hanlderChange(val){
       this.text = val ? '关' : '开'
    }
  }
}
<script>
`;
export default {
  components: {
    // "hy-button": Button,
    "ve-calendar": Calendar,
    SwitchCode: SwitchCode
  },
  data() {
    return {
      content: content.trim(),
      showCode: false,
      text: "开",
      startTime: '',
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
