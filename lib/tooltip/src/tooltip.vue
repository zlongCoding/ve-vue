<template>
  <div class="ve-tooltip" ref="veTooltip">
    <div
      ref="contentWrapper"
      class="content-wrapper"
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
      default: true
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
      console.log(this.position)
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

<style>
.ve-tooltip {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  border-radius: 4px;
  position: absolute;
  padding: 0.5em 1em;
  max-width: 20em;
  word-wrap: break-word;
}
.content-wrapper::before,
.content-wrapper::after {
  content: "";
  width: 0;
  height: 0;
  border: 8px solid transparent;
  position: absolute;
}
.content-wrapper.ve-position-top {
  margin-top: -8px;
  transform: translateY(-100%);
}
.content-wrapper.ve-position-top::before,
.content-wrapper.ve-position-top::after {
  left: 50%;
  margin-left: -8px;
}
.content-wrapper.ve-position-top::before {
  border-bottom: none;
  top: 100%;
}
.content-wrapper.ve-position-top::after {
  border-bottom: none;
  top: calc(100% - 1px);
}
.content-wrapper.ve-position-top.ve-position-border::before {
  border-top-color: #aaa;
}
.content-wrapper.ve-position-top.ve-position-border::after {
  border-top-color: #fff;
}
.content-wrapper.ve-position-top.ve-position-no-border::before {
  border-top-color: #000;
}
.content-wrapper.ve-position-top.ve-position-no-border::after {
  border-top-color: #000;
}
.content-wrapper.ve-position-bottom {
  margin-top: 8px;
}
.content-wrapper.ve-position-bottom::before,
.content-wrapper.ve-position-bottom::after {
  left: 50%;
  margin-left: -8px;
}
.content-wrapper.ve-position-bottom::before {
  border-top: none;
  bottom: 100%;
}
.content-wrapper.ve-position-bottom::after {
  border-top: none;
  bottom: calc(100% - 1px);
}
.content-wrapper.ve-position-bottom.ve-position-border::before {
  border-bottom-color: #aaa;
}
.content-wrapper.ve-position-bottom.ve-position-border::after {
  border-bottom-color: #fff;
}
.content-wrapper.ve-position-bottom.ve-position-no-border::before {
  border-bottom-color: #000;
}
.content-wrapper.ve-position-bottom.ve-position-no-border::after {
  border-bottom-color: #000;
}
.content-wrapper.ve-position-left {
  transform: translateX(-100%);
  margin-left: -4px;
}
.content-wrapper.ve-position-left::before,
.content-wrapper.ve-position-left::after {
  top: 50%;
  transform: translateY(-50%);
}
.content-wrapper.ve-position-left::before {
  border-right: none;
  left: 100%;
}
.content-wrapper.ve-position-left::after {
  border-right: none;
  left: calc(100% - 1px);
}
.content-wrapper.ve-position-left.ve-position-border::before {
  border-left-color: #aaa;
}
.content-wrapper.ve-position-left.ve-position-border::after {
  border-left-color: #fff;
}
.content-wrapper.ve-position-left.ve-position-no-border::before {
  border-left-color: #000;
}
.content-wrapper.ve-position-left.ve-position-no-border::after {
  border-left-color: #000;
}
.content-wrapper.ve-position-right {
  margin-left: 14px;
}
.content-wrapper.ve-position-right::before,
.content-wrapper.ve-position-right::after {
  top: 50%;
  transform: translateY(-50%);
}
.content-wrapper.ve-position-right::before {
  border-left: none;
  right: 100%;
}
.content-wrapper.ve-position-right::after {
  border-left: none;
  right: calc(100% - 1px);
}
.content-wrapper.ve-position-right.ve-position-border::before {
  border-right-color: #aaa;
}
.content-wrapper.ve-position-right.ve-position-border::after {
  border-right-color: #fff;
}
.content-wrapper.ve-position-right.ve-position-no-border::before {
  border-right-color: #000;
}
.content-wrapper.ve-position-right.ve-position-no-border::after {
  border-right-color: #000;
}
.content-wrapper.ve-position-border {
  border: 1px solid #aaa;
  color: #000;
  background: #fff;
}
.content-wrapper.ve-position-no-border {
  border: 1px solid #000;
  color: #fff;
  background: #000;
}
</style>
