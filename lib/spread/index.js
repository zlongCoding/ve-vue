import spread from "./src/spread.vue"

spread.install = function (Vue) {
  Vue.component(spread.name, spread)
}

export default spread
