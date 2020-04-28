import component1 from "./component1"
import component2 from "./component2"
import tooltip from "./tooltip"
import spread from "./spread"
const components = [component1, component2, tooltip, spread]

function install (Vue) {
  components.map(component => {
    console.info("install----all----")
    Vue.component(component.name, component)
  })
}
export {
  install,
  component1,
  tooltip,
  spread,
  component2
}
export default {
  install,
  tooltip,
  spread,
  component1,
  component2
}
