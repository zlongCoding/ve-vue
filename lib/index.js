import tooltip from "./tooltip"
import spread from "./spread"
const components = [tooltip, spread]

function install (Vue) {
  components.map(component => {
    console.info("install----all----")
    Vue.component(component.name, component)
  })
}
export {
  install,
  tooltip,
  spread

}
export default {
  install,
  tooltip,
  spread
}
