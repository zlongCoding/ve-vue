<template>
  <div
    class="ve-switch"
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
    role="switch"
  >
    <input :checked="checked" type="checkbox" class="ve-switch-input" :disabled="switchDisabled" />
    <span
      v-if="styleType && inactiveText"
      class="ve-switch-label ve-switch-label-left"
      :class="{'is-checked-active': !checked }"
    >
      <span @click.prevent="changeSwitchValue(false)">{{inactiveText}}</span>
    </span>
    <span
      class="ve-switch-custom"
      :style="{width: `${width}px`}"
      @click.prevent="changeSwitchValue(!checked)"
    ></span>
    <span v-if="!styleType" @click.prevent="changeSwitchValue(!checked)">
      <span
        class="ve-switch-label-inline"
        :class="[checked ? 've-switch-label-inline-left': 've-switch-label-inline-right' ]"
      >test</span>
    </span>
    <span
      v-if="styleType && activeText"
      class="ve-switch-label ve-switch-label-rigth"
      :class="{'is-checked-active': checked }"
    >
      <span @click.prevent="changeSwitchValue(true)">{{activeText}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "ve-switch",
  props: {
    width: {
      type: Number,
      default: 50
    },
    styleType: {
      type: Boolean,
      default: true
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    change: {
      type: Function,
      default: () => null
    },
    activeText: {
      type: String,
      default: ""
    },
    inactiveText: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      switchDisabled: false,
      checked: this.isChecked
    }
  },
  mounted () {},
  destroyed () {},
  methods: {
    changeSwitchValue (val) {
      if (this.checked === val) return
      this.checked = val
      this.$emit("change", val)
    }
  }
}
</script>

<style lang="scss">
.ve-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  .ve-switch-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .ve-switch-label {
    transition: 0.4s;
    height: 20px;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    vertical-align: middle;
    color: #303133;
    * {
      line-height: 1;
      display: inline-block;
      user-select: none;
    }
  }
}
.ve-switch-label-left {
  margin-right: 10px;
}
.ve-switch-label-rigth {
  margin-left: 10px;
}
.ve-switch-custom {
  margin: 0;
  display: inline-block;
  position: relative;
  /* width: 40px; */
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  vertical-align: middle;
}
.ve-switch-custom:after {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  transition: all 0.3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}

.ve-switch.is-checked .ve-switch-custom {
  border-color: #409eff;
  background-color: #409eff;
}
.ve-switch.is-checked .ve-switch-custom:after {
  left: 100%;
  margin-left: -17px;
}
.is-checked-active {
  color: #409eff;
}

/* 第二种样式 */
.ve-switch-label-inline {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  user-select: none;
  font-size: 12px;
  cursor: pointer;

  height: 20px;
  position: absolute;
  top: 0;
  font-weight: 600;
  color: #fff;
}
.ve-switch-label-inline-right {
  right: 8px;
}
.ve-switch-label-inline-left {
  left: 8px;
}
</style>
