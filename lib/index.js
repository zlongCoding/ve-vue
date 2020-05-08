
import tooltip from "./tooltip/src/tooltip.vue"
import spread from "./spread/src/spread.vue"
import button from "./button/src/button.vue"
import Switchs from "./switch/src/switch.vue"
import slider from "./slider/src/slider.vue"
import radio from "./radio/src/radio.vue"
import pagination from "./pagination/src/pagination.vue"
import checkbox from "./checkbox/src/checkbox.vue"
const components = [
  tooltip,
  spread,
  button,
  Switchs,
  slider,
  radio,
  pagination,
  checkbox
]

const veUi = {

}
veUi.install = (Vue) => {
  components.map((component) => {
    console.info("install----all----")
    Vue.component(component.name, component)
  })
}
export default veUi
