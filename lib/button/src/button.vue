<template>
  <button
    class="ve-button"
    :type="type"
    :autofocus="autofocus"
    :disabled="disabled"
    @click="handleClick"
    :class="[
      {'ve-button-circle': circle}
    ]"
  >
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "ve-button",

  props: {
    click: {
      type: Function,
      default: () => null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "button"
    }
  },

  computed: {},

  methods: {
    handleClick (e) {
      this.$emit("click", e)
    }
  }
}
</script>
<style lang="scss" >
$bg: #3498db;
.ve-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #2c3e50;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.2s;
  user-select: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    background-color: $bg;
    border-color: $bg;
    color: #fff;
    &:disabled,
    &:disabled:hover {
      cursor: not-allowed;
      background-color: #fff;
      border-color: #cecece;
      color: #ccc;
    }
  }
}

.ve-button-circle {
  border-radius: 20px;
}
</style>
