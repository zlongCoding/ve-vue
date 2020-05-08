<template>
  <div>
    <SwitchCode :content="content5">
      <ve-pagination
        :page-count="15"
        v-model="value5"
      />
    </SwitchCode>
    <SwitchCode :content="content6">
      <ve-pagination
        :page-count="15"
        :beside-pages="2"
        v-model="value6"
      />
    </SwitchCode>
    <SwitchCode :content="content">
      <p>
        <strong>Value:</strong>
        {{ value }}
      </p>
      <ve-pagination
        :throttleTag="tag"
        :page-count="20"
        :range-page="4"
        :beside-pages="2"
        v-model="value"
      />
    </SwitchCode>
    <SwitchCode :content="content1">
      <p>
        <strong>Value:</strong>
        {{ value1 }}
      </p>
      <ve-pagination
        :page-count="10"
        :range-page="3"
        :beside-pages="2"
        :hide-prev-next="true"
        v-model="value1"
      />
    </SwitchCode>
    <SwitchCode :content="content2">
      <p>
        <strong>Value:</strong>
        {{ value2 }}
      </p>
      <ve-pagination
        :page-count="10"
        :range-page="3"
        :beside-pages="2"
        v-model="value2"
        :first-last-button="true"
      />
    </SwitchCode>
  </div>
</template>


<script>
// import Button from "../../../src/packages/button/button.vue";
import pagination from "../../../lib/pagination/src/pagination";
import Button from "../../../lib/button/src/button";
import SwitchCode from "./component/SwitchCode";

const content = `
import Pagination from "ve-vue/lib/pagination"
Vue.use(Pagination)
<ve-pagination :throttleTag="tag" :page-count="20" :range-page="4" :beside-pages="1" v-model="value" />
<script>

export default {
    data(){
        return{
           value: 1,
           tag: true
        }
    },
    watch: {
      value(val){
      //这里处理请求
        console.log(val)
        this.tag = false
        setTimeout(() => {
          this.tag = true
        }, 1000);
      }
    },
  }
}
<script>
`;
const content1 = `
import Pagination from "ve-vue/lib/pagination"
Vue.use(Pagination)
<ve-pagination :hide-prev-next="true" :page-count="10" :range-page="3" :beside-pages="2" v-model="value" />
<script>

export default {
    data(){
        return{
           value: 1,
        }
    },
  }
}
<script>
`;
const content2 = `
import Pagination from "ve-vue/lib/pagination"
Vue.use(Pagination)
<ve-pagination :first-last-button="true" :page-count="10" :range-page="3" :beside-pages="2" v-model="value" />
<script>

export default {
    data(){
        return{
           value: 1,
        }
    },
  }
}
<script>
`;
const content6 = `
import Pagination from "ve-vue/lib/pagination"
Vue.use(Pagination)
<ve-pagination  :page-count="15"  :beside-pages="2" v-model="value" />
<script>

export default {
    data(){
        return{
           value: 1,
        }
    },
  }
}
<script>
`;
const content5 = `
import Pagination from "ve-vue/lib/pagination"
Vue.use(Pagination)
<ve-pagination  :page-count="15" v-model="value" />
<script>

export default {
    data(){
        return{
           value: 1,
        }
    },
  }
}
<script>
`;
export default {
  components: {
    "ve-button": Button,
    "ve-pagination": pagination,
    SwitchCode: SwitchCode
  },
  mounted() {},
  data() {
    return {
      content: content.trim(),
      content1: content1.trim(),
      content2: content2.trim(),
      content6:  content6.trim(),
      content5: content5.trim(),
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
