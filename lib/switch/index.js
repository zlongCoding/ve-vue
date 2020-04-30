import tooltip from "./src/switch.vue"

tooltip.install = function (Vue) {
  Vue.component(tooltip.name, tooltip)
}

export default tooltip
