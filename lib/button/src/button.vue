<template>
  <button
    class="ve-button"
    @click="handleClick"
  >
    <!-- <i class="el-icon-loading" v-if="loading"></i> -->
    <!-- <i :class="icon" v-if="icon && !loading"></i> -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: "ve-button",

  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },

  props: {
    type: {
      type: String,
      default: "default"
    },
    size: String,
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    click: {
      type: Function,
      default: () => null
    }
  },

  computed: {
    _elFormItemSize () {
      return (this.elFormItem || {}).elFormItemSize
    },
    buttonSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled () {
      return this.disabled || (this.elForm || {}).disabled
    }
  },

  methods: {
    handleClick (evt) {
      this.$emit("click", evt)
    }
  }
}
</script>
<style>
 .ve-button{
       display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
 }
</style>
