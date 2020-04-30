import button from "./src/button.vue"

button.install = function (Vue) {
  Vue.component(button.name, button)
}

export default button
