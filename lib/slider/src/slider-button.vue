<template>
  <div
    class="ve-slider-button-wrapper"
    @touchstart.stop="dragDown"
    @mousedown.stop="dragDown"
     :style="wrapperStyle"
    ref="sliderButton"
  >
    <div class="ve-slider-button"></div>
  </div>
</template>

<script>
export default {
  name: "ve-slider-button",
  props: {
    dragStart: {
      type: Function,
      default: () => null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentX: null,
      newPosition: null,
      startPositio: 0,
      startX: 0,
      startPosition: 0

    }
  },
  computed: {
    max () {
      return this.$parent.max
    },
    currentPosition () {
      return `${(this.value - this.min) / (this.max - this.min) * 100}%`
    },
    min () {
      return this.$parent.min
    },
    step () {
      return this.$parent.step
    },
    precision () {
      return this.$parent.precision
    },
    wrapperStyle () {
      return { left: this.currentPosition }
    }
  },
  mounted () {
  },
  destroyed () {},
  methods: {
    onDragging (event) {
      if (this.disabled) return
      // this.isClick = false
      // this.displayTooltip()
      // this.$parent.resetSize()
      let diff = 0
      if (event.type === "touchmove") {
        event.clientY = event.touches[0].clientY
        event.clientX = event.touches[0].clientX
      }

      this.currentX = event.clientX

      diff = (this.currentX - this.startX) / this.$parent.sliderSize * 100
      this.newPosition = this.startPosition + diff
      // console.log(this.startX, "start-------", this.currentX, "=====onDragging", diff)
      this.setPosition(this.newPosition)
      // this.$emit("dragStart", e)
    },
    dragDown (event) {
      this.onDragStart(event)
      window.addEventListener("mousemove", this.onDragging)
      window.addEventListener("touchmove", this.onDragging)
      window.addEventListener("mouseup", this.onDragEnd)
      window.addEventListener("touchend", this.onDragEnd)
      window.addEventListener("contextmenu", this.onDragEnd)
    },
    onDragEnd () {
      setTimeout(() => {
        this.setPosition(this.newPosition)
        this.$parent.emitChangeSlider()
      }, 0)
      window.removeEventListener("mousemove", this.onDragging)
      window.removeEventListener("touchmove", this.onDragging)
      window.removeEventListener("mouseup", this.onDragEnd)
      window.removeEventListener("touchend", this.onDragEnd)
      window.removeEventListener("contextmenu", this.onDragEnd)
    },
    onDragStart (event) {
      // this.dragging = true
      // this.isClick = true
      if (event.type === "touchstart") {
        event.clientY = event.touches[0].clientY
        event.clientX = event.touches[0].clientX
      }
      this.startX = event.clientX
      this.startPosition = parseFloat(this.currentPosition)
      this.newPosition = this.startPosition
    },
    setPosition (positions) {
      if (positions === null) return
      if (positions < 0) {
        positions = 0
      } else if (positions > 100) {
        positions = 100
      }
      const lengthPerStep = 100 / ((this.max - this.min) / this.step)
      const steps = Math.round(positions / lengthPerStep)
      let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min
      // debugger
      value = parseFloat(value.toFixed(this.precision))
      this.$emit("input", value)
      // this.$nextTick(() => {
      //   this.displayTooltip()
      //   this.$refs.tooltip && this.$refs.tooltip.updatePopper()
      // })
      if (!this.dragging && this.value !== this.oldValue) {
        this.oldValue = this.value
      }
    }
  }
}
</script>

<style lang="scss">
.ve-slider-button-wrapper {
  position: absolute;
  transition: .1s;
  z-index: 5;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  top: 50%;
  .ve-slider-button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
  }
}
</style>
