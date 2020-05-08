import Spread from "./src/spread.vue"

Spread.install = function (Vue) {
  Vue.component(Spread.name, Spread)
}

export default Spread
