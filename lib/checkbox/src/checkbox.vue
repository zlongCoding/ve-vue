<template>
  <div class="ve-checkout">
    <input
      type="checkbox"
      :id="id"
      :disabled="disabled"
      :required="required"
      @change="onChange"
      :checked="state"
    />
    <label :for="id" class="ve-checkout-label">
      <slot name="ve-checkout-box">
        <span class="ve-checkout-box">
          <svg class="ve-checkout-box-tick" viewBox="0 0 16 16">
            <path fill="none" d="M1.7,7.8l3.8,3.4l9-8.8" />
          </svg>
        </span>
      </slot>
      <slot></slot>
    </label>
  </div>
</template>
<script>
export default {
  model: {
    prop: "modelValue",
    event: "input"
  },
  data () {
    return {
      state: this.checked
    }
  },

  props: {
    id: {
      type: String,
      default: function () {
        // 这里使用vue中自带的id
        return "checkbox-id-" + this._uid
      }
    },
    checked: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange (e) {
      console.log(e.target.checked)
      this.$emit("input", e.target.checked)
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
$bg: #3498db;
.ve-checkout {
  * {
    user-select: none;
    cursor: pointer;
  }
  > input {
    opacity: 0;
    position: absolute;
    + label {
      display: flex;
      align-items: center;
    }
    + label > .ve-checkout-box {
      display: inline-block;
      border: 1px solid #000;
      border-radius: 14%;
      margin: 0;
      padding: 0;
      width: 1em;
      height: 1em;
      background: #fff;
      overflow: hidden;
      vertical-align: -5%;
      position: relative;

      .ve-checkout-box-tick {
        width: 90%;
        height: 90%;
        position: absolute;
        // top: 1px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -45%);

        path {
          opacity: 0;
          transition: all 0.2s;
          stroke: #000;
          stroke-width: 2.3px;
          stroke-dashoffset: 20;
          stroke-dasharray: 20;
          transition: stroke-dashoffset 0.15s ease-in;
        }
      }
    }
    &:checked + label > .ve-checkout-box > .ve-checkout-box-tick > path {
      opacity: 1;
      stroke-dashoffset: 0;
    }
    &:disabled + label {
      opacity: 0.7;
    }
  }
}
//这里是checkBox自定义样式的写法
.ve-checkout {
  input + label > .ve-checkout-box {
    border-color: $bg;
    background: $bg;
    .ve-checkout-box-tick {
      path {
        stroke: #fff;
      }
    }
  }
}
</style>
