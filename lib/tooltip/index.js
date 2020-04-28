import tooltip from "./src/tooltip.vue"

tooltip.install = function (Vue) {
  Vue.component(tooltip.name, tooltip)
}

export default tooltip
