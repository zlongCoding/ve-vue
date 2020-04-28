import Vue from "vue"
import App from "./App.vue"

// // 统一加载
// import VeVue from 've-vue'
// console.log(VeVue)
// Vue.use(VeVue);

// 只加载component2
import { component2, tooltip } from "../lib/index"
Vue.use(component2)
Vue.use(tooltip)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")
