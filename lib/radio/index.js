import radio from "./src/radio"

radio.install = function (Vue) {
  Vue.component(radio.name, radio)
}

export default radio
