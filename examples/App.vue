<template>
  <div id="app">
    <ve-tooltip position="top" trigger="click">
    <template slot="content">
        tooltip
    </template>
    <button>tooltip</button>
</ve-tooltip>
  </div>
</template>

<script>
// import { tooltip } from "ve-vue"
export default {
  name: "app",
  components: {
    // tooltip
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
