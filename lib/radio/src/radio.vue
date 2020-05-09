
<template>
  <div class="ve-radio">
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :required="required"
      :disabled="disabled"
      @change="onChange"
      :checked="state"
    />
    <label :for="id">
      <slot name="input-box">
        <span class="input-box">
          <span class="input-box-circle"></span>
        </span>
      </slot>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "ve-radio",
  model: {
    prop: "modelValue",
    event: "input"
  },

  props: {
    id: {
      type: String,
      default: function () {
        return "radio-id-" + this._uid
      }
    },
    name: {
      type: String,
      default: null
    },
    value: {
      default: ""
    },
    modelValue: {
      default: undefined
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
    },
    model: {}
  },

  computed: {
    state () {
      if (this.modelValue === undefined) {
        return this.checked
      }

      return this.modelValue === this.value
    }
  },

  methods: {
    onChange () {
      this.toggle()
    },

    toggle () {
      this.$emit("input", this.state ? "" : this.value)
    }
  },

  watch: {
    checked (newValue) {
      if (newValue !== this.state) {
        this.toggle()
      }
    }
  },

  mounted () {
    if (this.checked && !this.state) {
      this.toggle()
    }
  }
}
</script>
<style lang="scss">
$bg: #3498db;
.ve-radio {
  display: inline-block;
  > input {
    opacity: 0;
    position: absolute;

    &:checked + label > .input-box > .input-box-circle {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    &:disabled + label {
      opacity: 0.7;
    }
  }
  label{
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
    label > .input-box {
      display: inline-block;
      border: 1px solid $bg;
      border-radius: 50%;
      margin: 0;
      padding: 0;
      width: 1em;
      height: 1em;
      background: #fff;
      overflow: hidden;
      position: relative;
      margin-right: 10px;
      // vertical-align: middle;
      > .input-box-circle {
        position: absolute;
        display: block;
        // margin: 50%;
        left: 50%;
        top: 50%;
        height: 10px;
        width: 10px;
        transform: translate(-50%, -50%) scale(0);
        background: $bg;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.2s;
      }
    }

}
</style>
