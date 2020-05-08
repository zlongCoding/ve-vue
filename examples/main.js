import Vue from "vue"
import App from "./App.vue"

// // 统一加载
import Tooltip from "ve-vue/lib/Tooltip"
// console.log(VeVue)
Vue.use(Tooltip)

// 只加载component2

// Vue.use(component2)
// Vue.use(tooltip)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")
