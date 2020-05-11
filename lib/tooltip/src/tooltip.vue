<template>
  <div class="ve-tooltip" ref="veTooltip">
    <div
      ref="contentWrapper"
      class="ve-tooltip-content-wrapper"
      v-if="visible"
      :class="[{ [`ve-position-${this.position}`]: true }, styleEffect]"
    >
      <slot name="content" :close="close"></slot>
    </div>
    <span ref="triggerWrapper" style="display:inline-block">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "ve-tooltip",
  props: {
    position: {
      type: String,
      default: "top",
      validator (value) {
        return ["top", "bottom", "left", "right"].indexOf(value) >= 0
      }
    },
    trigger: {
      type: String,
      default: "hover",
      validator (value) {
        return ["click", "hover"].indexOf(value) >= 0
      }
    },
    effect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    styleEffect () {
      return this.effect ? "ve-position-border" : "ve-position-no-border"
    }
  },
  mounted () {
    if (this.trigger === "click") {
      this.$refs.veTooltip.addEventListener("click", e => {
        this.showtooltip(e)
      })
    } else {
      this.$refs.veTooltip.addEventListener("mouseenter", () => {
        this.open()
      })
      this.$refs.veTooltip.addEventListener("mouseleave", () => {
        this.close()
      })
    }
  },
  destroyed () {
    if (!this.$refs.veTooltip) return
    if (this.trigger === "click") {
      this.$refs.veTooltip.removeEventListener("click", e => {
        this.showtooltip(e)
      })
    } else {
      this.$refs.veTooltip.removeEventListener("mouseenter", () => {
        this.open()
      })
      this.$refs.veTooltip.removeEventListener("mouseleave", () => {
        this.close()
      })
    }
  },
  methods: {
    positionContent () {
      const { contentWrapper, triggerWrapper } = this.$refs
      document.body.appendChild(contentWrapper)
      let { width, height, left, top } = triggerWrapper.getBoundingClientRect()
      // eslint-disable-next-line standard/object-curly-even-spacing
      let {
        height: contentHeight,
        width: contentWidth
      } = contentWrapper.getBoundingClientRect()
      let positions = {
        top: {
          top: top + window.scrollY,
          left: left + (width - contentWidth) / 2
        },
        bottom: {
          top: top + height + window.scrollY,
          left: left + (width - contentWidth) / 2
        },
        left: {
          top: top + window.scrollY + (height - contentHeight) / 2,
          left: left - 5
        },
        right: {
          top: top + window.scrollY + (height - contentHeight) / 2,
          left: left + width
        }
      }
      contentWrapper.style.top = positions[this.position].top + "px"
      contentWrapper.style.left = positions[this.position].left + "px"
    },
    eventHandler (e) {
      if (
        this.$refs.veTooltip &&
        (this.$refs.veTooltip === e.target ||
          this.$refs.veTooltip.contains(e.target))
      ) {
        return
      }
      if (
        this.$refs.contentWrapper &&
        (this.$refs.contentWrapper === e.target ||
          this.$refs.contentWrapper.contains(e.target))
      ) {
        return
      }
      this.close()
    },
    close () {
      this.visible = false
      document.removeEventListener("click", this.eventHandler)
    },
    open () {
      this.visible = true
      this.$nextTick(() => {
        this.positionContent()
        document.addEventListener("click", this.eventHandler)
      })
    },
    showtooltip (event) {
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          this.close()
        } else {
          this.open()
        }
      }
    }
  }
}
</script>

<style lang="scss" >
$border-color: #3498db;
$no-border-color: #000;
.ve-tooltip {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.ve-tooltip-content-wrapper {
  border-radius: 4px;
  position: absolute;
  padding: 0.5em 1em;
  max-width: 20em;
  word-wrap: break-word;
  &::before,
  &::after {
    content: "";
    width: 0;
    height: 0;
    border: 8px solid transparent;
    position: absolute;
  }
  &.ve-position-top {
    margin-top: -8px;
    transform: translateY(-100%);
    &::before,
    &::after {
      left: 50%;
      margin-left: -8px;
    }
    &::before {
      border-bottom: none;
      top: 100%;
    }
    &::after {
      border-bottom: none;
      top: calc(100% - 1px);
    }
    &.ve-position-border {
      &::before {
        border-top-color: $border-color;
      }
      &::after {
        border-top-color: #fff;
      }
    }
    &.ve-position-no-border {
      &::before {
        border-top-color: $border-color;
      }
      &::after {
        border-top-color: $border-color;
      }
    }
    &.ve-position-border {
      &::before {
        border-top-color: $border-color;
      }
      &::after {
        border-top-color: #fff;
      }
    }
    &.ve-position-no-border {
      &::before {
        border-top-color:$no-border-color;
      }
      &::after {
        border-top-color:$no-border-color;
      }
    }
  }
  &.ve-position-bottom {
    margin-top: 8px;
    &::before,
    &::after {
      left: 50%;
      margin-left: -8px;
    }
    &::before {
      border-top: none;
      bottom: 100%;
    }
    &::after {
      border-top: none;
      bottom: calc(100% - 1px);
    }
    &.ve-position-border {
      &::before {
        border-bottom-color: $border-color;
      }
      &::after {
        border-bottom-color: #fff;
      }
    }
    &.ve-position-no-border {
      &::before {
        border-bottom-color:$no-border-color;
      }
      &::after {
        border-bottom-color:$no-border-color;
      }
    }
  }

  &.ve-position-left {
    transform: translateX(-100%);
    margin-left: -4px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-right: none;
      left: 100%;
    }
    &::after {
      border-right: none;
      left: calc(100% - 1px);
    }
    &.ve-position-border {
      &::before {
        border-left-color: $border-color;
      }
      &::after {
        border-left-color: #fff;
      }
    }
    &.ve-position-no-border {
      &::before {
        border-left-color:$no-border-color;
      }
      &::after {
        border-left-color:$no-border-color;
      }
    }
  }
  &.ve-position-right {
    margin-left: 14px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-left: none;
      right: 100%;
    }
    &::after {
      border-left: none;
      right: calc(100% - 1px);
    }
    &.ve-position-border {
      &::before {
        border-right-color: $border-color;
      }
      &::after {
        border-right-color: #fff;
      }
    }
    &.ve-position-no-border {
      &::before {
        border-right-color:$no-border-color;
      }
      &::after {
        border-right-color:$no-border-color;
      }
    }
  }
}

.ve-tooltip-content-wrapper.ve-position-border {
  border: 1px solid $border-color;
  color: #000;
  background: #fff;
}
.ve-tooltip-content-wrapper.ve-position-no-border {
  border: 1px solid $no-border-color;
  color: #fff;
  background: $no-border-color;
}
</style>
