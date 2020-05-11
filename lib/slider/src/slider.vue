<template>
  <div class="ve-slider" ref="veSlider">
    <div class="ve-slider-container  ve-slider-container-style"
    :aria-valuemin="min"
    :aria-valuemax="max">
      <div class="ve-slider-process ve-slider-process-style" :style="barStyle"/>
      <slider-button ref="btn1" v-model="firstValue"/>
    </div>
  </div>
</template>

<script>
import SliderButton from "./slider-button"
export default {
  name: "ve-slider",
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    changeValue: {
      type: Number,
      default: 0
    },
    change: {
      type: Function,
      default: () => 0
    },
    startValue: {
      type: Number,
      default: 0
    },
    input: {
      type: Function,
      default: () => 0
    }
  },
  data () {
    return {
      firstValue: this.startValue,
      sliderSize: 1
    }
  },
  watch: {
    firstValue (val) {
      this.$emit("change", val)
    },
    changeValue (val) {
      this.firstValue = val
      this.emitHandler()
    }
  },
  components: {
    SliderButton
  },
  computed: {
    precision () {
      let precisions = [this.min, this.max, this.step].map(item => {
        let decimal = ("" + item).split(".")[1]
        return decimal ? decimal.length : 0
      })
      return Math.max.apply(null, precisions)
    },
    barStyle () {
      return {
        width: this.barSize,
        left: this.barStart
      }
    },
    barSize () {
      return `${100 * (this.firstValue - this.min) / (this.max - this.min)}%`
    },

    barStart () {
      return "0%"
    }
  },
  mounted () {
    this.resetSize()
    window.addEventListener("resize", this.resetSize)
    this.emitHandler()
  },

  beforeDestroy () {
    window.removeEventListener("resize", this.resetSize)
  },
  destroyed () {},
  methods: {
    resetSize () {
      if (this.$refs.veSlider) {
        this.sliderSize = this.$refs.veSlider["clientWidth"]
      }
    },
    emitChangeSlider () {
      this.$emit("input", this.firstValue)
    },
    emitHandler () {
      this.$emit("input", this.firstValue)
      this.$emit("change", this.firstValue)
    }

  }
}
</script>

<style lang="scss">
$bg: #3498db;
.ve-slider {
  position: relative;
  box-sizing: content-box;
  user-select: none;
  display: block;
      width: auto;
    height: 4px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  &-container {
    position: relative;
    width: 100%;
    height: 100%;
    // 这里是修改slider滑块
    &-style {
      background-color: #ccc;
      border-radius: 15px;
    }
  }
  &-process {
    position: absolute;
    z-index: 1;
    height: 100%;
    transition: .2s;
    &-style {
      background-color: $bg;
      border-radius: 15px;
    }
  }
}
</style>
