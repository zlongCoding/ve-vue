<template>
  <ul :class="['ve-pagination', throttleTag ? '' : 've-pagination-disabled']">
    <li v-if="firstLastButton" :class="[firstSelected() ? disabledClass : '']">
      <a
        @click="selectFirst()"
        @keyup.enter="selectFirst()"
        :tabindex="firstSelected() ? -1 : 0"
        v-html="firstButtonText"
      ></a>
    </li>

    <li
      v-if="!(firstSelected() && hidePrevNext)"
      :class="[firstSelected() ? disabledClass : '']"
    >
      <a
        @click="prevPage()"
        @keyup.enter="prevPage()"
        :tabindex="firstSelected() ? -1 : 0"
        v-html="prevText"
      ></a>
    </li>

    <li
      v-for="(page, index) in pages"
      :key="index"
      :class="[page.selected ? activeClass : '', page.disabled ? disabledClass : '']"
    >
      <a v-if="page.breakView" tabindex="0">
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>
      <a v-else-if="page.disabled" tabindex="0">{{ page.content }}</a>
      <a
        v-else
        @click="handlerSelected(page.index + 1)"
        @keyup.enter="handlerSelected(page.index + 1)"
        tabindex="0"
      >{{ page.content }}</a>
    </li>

    <li
      v-if="!(lastSelected() && hidePrevNext)"
      :class="[lastSelected() ? disabledClass : '']"
    >
      <a
        @click="nextPage()"
        @keyup.enter="nextPage()"
        :tabindex="lastSelected() ? -1 : 0"
        v-html="nextText"
      ></a>
    </li>

    <li v-if="firstLastButton" :class="[lastSelected() ? disabledClass : '']">
      <a
        @click="selectLast()"
        @keyup.enter="selectLast()"
        :tabindex="lastSelected() ? -1 : 0"
        v-html="lastButtonText"
      ></a>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      innerValue: 1,
      disabledClass: "disabled",
      activeClass: "active"
    }
  },
  props: {
    value: {
      type: Number,
      default: 1,
      validator: function (val) {
        return val > 0 && val % 1 === 0
      }
    },
    pageCount: {
      type: Number,
      required: true,
      default: 1,
      validator: function (val) {
        return val > 0 && val % 1 === 0
      }
    },
    forcePage: {
      type: Number
    },
    rangePages: {
      type: Number,
      default: 3
    },
    besidePages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: "上一页"
    },
    nextText: {
      type: String,
      default: "下一页"
    },
    breakViewText: {
      type: String,
      default: "…"
    },

    noLiSurround: {
      type: Boolean,
      default: true
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    throttleTag: {
      type: Boolean,
      default: true
    },
    firstButtonText: {
      type: String,
      default: "首页"
    },
    lastButtonText: {
      type: String,
      default: "最后一页"
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  beforeUpdate () {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  computed: {
    selected: {
      get: function () {
        return this.value || this.innerValue
      },
      set: function (newValue) {
        this.innerValue = newValue
      }
    },
    pages: function () {
      let items = {}
      if (this.pageCount <= this.rangePages) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1
          }
          items[index] = page
        }
      } else {
        const halfrangePages = Math.floor(this.rangePages / 2)

        let setPages = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1
          }

          items[index] = page
        }

        let setReView = index => {
          let breakView = {
            disabled: true,
            breakView: true
          }

          items[index] = breakView
        }

        for (let i = 0; i < this.besidePages; i++) {
          setPages(i)
        }

        let lower = 0
        if (this.selected - halfrangePages > 0) {
          lower = this.selected - 1 - halfrangePages
        }

        let higher = lower + this.rangePages - 1
        if (higher >= this.pageCount) {
          higher = this.pageCount - 1
          lower = higher - this.rangePages + 1
        }

        for (let i = lower; i <= higher && i <= this.pageCount - 1; i++) {
          setPages(i)
        }

        if (lower > this.besidePages) {
          setReView(lower - 1)
        }

        if (higher + 1 < this.pageCount - this.besidePages) {
          setReView(higher + 1)
        }

        for (
          let i = this.pageCount - 1;
          i >= this.pageCount - this.besidePages;
          i--
        ) {
          setPages(i)
        }
      }
      return items
    }
  },
  methods: {
    handlerSelected (selected) {
      if (this.throttleTag) {
        if (this.selected === selected) return
        this.innerValue = selected
        this.$emit("input", selected)
      }
    },
    prevPage () {
      if (this.selected > 1) {
        this.handlerSelected(this.selected - 1)
      }
    },
    nextPage () {
      if (this.selected < this.pageCount) {
        this.handlerSelected(this.selected + 1)
      }
    },
    firstSelected () {
      return this.selected === 1
    },
    lastSelected () {
      return this.selected === this.pageCount || this.pageCount === 0
    },
    selectFirst () {
      if (this.selected > 1) {
        this.handlerSelected(1)
      }
    },
    selectLast () {
      if (this.selected < this.pageCount) {
        this.handlerSelected(this.pageCount)
      }
    }
  }
}
</script>

<style lang="scss" >
.ve-pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
  li {
    display: inline;
    a {
      position: relative;
      float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #337ab7;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd;
      cursor: pointer;
      outline: none;
      user-select: none;
    }
    &:first-child > a {
      margin-left: 0;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      &:hover,
      &:focus {
        z-index: 3;
        color: #23527c;
        background-color: #eee;
        border-color: #ddd;
      }
    }
    &:last-child > a {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  .active > a,
  .active > a:hover,
  .active > a:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .disabled > a,
  .disabled > a:hover,
  .disabled > a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
  &.ve-pagination-disabled {
    a,
    a:hover,
    a:focus {
      // color: #777;
      cursor: not-allowed;
      opacity: 0.7;
      // background-color: #fff;
      // border-color: #ddd;
    }
  }
}
</style>
