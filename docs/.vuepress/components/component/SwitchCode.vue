<template>
  <div class="contentWrapper">
    <div class="componentsMessage">
     <slot></slot>
    </div>
     <!-- <ve-spread> -->
        <pre v-if="showCode"><code>{{content}}</code></pre>
      <!-- </ve-spread> -->
    <div class="dispalyCode" @click="showCode=!showCode">
      <div v-if="showCode">▲
      <span clas="showSpan">隐藏代码</span></div>
      <div v-else>▼
      <span clas="showSpan">显示代码</span></div>
    </div>
    
  </div>
</template>

<script>
import Spread from "../../../../lib/spread/src/spread";

export default {
  components: {
    "ve-spread": Spread
  },
  data() {
    return {
      showCode: false
    };
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./main.scss";
$bg-yellow: #409eff;
$bg-blue:#337480;
$border-radius:4px;
.HyperInput{
    margin: 4px;
}
.entrance-enter-active {
  animation: entrance-in .5s;
}
.entrance-leave-active {
  animation: entrance-in .5s reverse;
}
@keyframes entrance-in {
  0% {
    opacity: 0;
    transform: translateY(-20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.contentWrapper{
    &:hover{
        box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.2);
        .dispalyCode{
            background-color: #f9fafc;
            color: rgb(194, 194, 194);
            cursor: pointer;
        }
    }
    .componentsMessage{
        border:1px solid #ebebeb;
        padding: 20px 20px 20px;
        overflow: hidden;
    }
    .dispalyCode{
        margin-top: -1px;
        height: 30px;
        background-color: #fff;
        border:1px solid #ebebeb;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-bottom: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#ebebeb;
        font-size: 12px;
        > span{
            font-size: 12px;
            padding-left: 6px;
        }
    }
}
</style>
