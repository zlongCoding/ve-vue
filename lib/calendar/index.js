import calendar from "./src/calendar.vue"

calendar.install = function (Vue) {
  Vue.component(calendar.name, calendar)
}

export default calendar
