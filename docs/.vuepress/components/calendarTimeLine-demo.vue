<template>
  <div>
    <SwitchCode :content="content">
       <ve-calendar-timeline />
    </SwitchCode>
  </div>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import Calendar from "../../../lib/calendarTimeLine/src/calendar";
import Button from "../../../lib/button/src/button";
import SwitchCode from "./component/SwitchCode";

const content = `
import CalendarTimeLine from "ve-vue/lib/calendarTimeLine"
Vue.use(CalendarTimeLine)
<ve-calendar-timeline />
<script>

export default {
    
}
<script>
`;

export default {
  components: {
    "ve-button": Button,
    "ve-calendar-timeline": Calendar,
    SwitchCode: SwitchCode
  },
  mounted() {},
  data() {
    return {
      content: content.trim(),
      value: 1,
      value5: 1,
      value6: 6,
      value1: 1,
      value2: 1,
      tag: true
    };
  },
  watch: {
    value(val) {
      //这里处理请求
      console.log(val);
      this.tag = false;
      setTimeout(() => {
        this.tag = true;
      }, 1000);
    }
  },
  methods: {}
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
.ve-pagination-dome-1 {
  margin-bottom: 10px;
}
.ve-pagination-dome-2 {
  margin-bottom: 15px;
}
</style>
