<template>
  <SwitchCode :content="content">
    <p>时间选择</p>
    <ve-calendar />
    <p>区间选择</p>
    <ve-calendar dateRange />

    <p>限制最少选择的时间是当前时间</p>
    <ve-calendar dateRange limitBool />
    <p>限制最少选择的时间是昨天</p>
    <ve-calendar dateRange limitBool :limitDay="new Date(yesterday).getTime()" />
  </SwitchCode>
</template>

<script>
// import Button from "../../../src/packages/button/button.vue";
import Calendar from "../../../lib/calendar/src/calendar";
import SwitchCode from "./component/SwitchCode";
// import Calendar from "./component/calendar";
const content = `
import Switch from "ve-vue/lib/switch"
Vue.use(Calendar)
<p>时间选择</p>
<ve-calendar  />
<p>区间选择</p>
<ve-calendar  dateRange/>
     
<p>限制最少选择的时间是当前时间</p>
<ve-calendar  dateRange limitBool />
<p>限制最少选择的时间是昨天</p>
<ve-calendar  dateRange limitBool :limitDay="new Date(yesterday).getTime()"/>
function getYesterday() {
  var day = new Date();
  day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
  return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
}
export default {
    data(){
        return{
            yesterday: getYesterday()
        }
    },
    methods: {
   
  }
}
<script>
`;
function getYesterday() {
  var day = new Date();
  day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
  return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
}
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
      startTime: "",
      yesterday: getYesterday()
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
