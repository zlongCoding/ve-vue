
<template>
  <div class="ve-calendar">
    <div class="ve-calendar-text" @click="showCalendar">{{nowDate}}</div>
    <div class="ve-calendar-wrapper" v-show="isShow">
      <section class="ve-calendar-container">
        <div class="ve-calendar-content">
          <ul>
            <li @click="PreMonth(myDate,false)">
              <div class="ve-calendar-title-left"></div>
            </li>
            <li class="ve-calendar-title-text">{{dateTop}}</li>
            <li @click="NextMonth(myDate,false)">
              <div class="ve-calendar-title-right"></div>
            </li>
          </ul>
          <div class="ve-calendar-days">
            <div class="ve-calendar-days_item" v-for="(tag, index)  in textTop" :key="index">
              <div class="ve-calendar-days-week">{{tag}}</div>
            </div>
          </div>
          <div class="ve-calendar-days">
            <div
              class="ve-calendar-days_item"
              v-for="(item,index) in list"
              @click="clickDay(item,index)"
              :key="index"
            >
              <div
                class="ve-calendar_item_date"
                :class="[
            {ve_calendar_other_date:item.otherMonth!=='nowMonth'},
            {ve_calendar_hide_date:item.dayHide},
            {ve_calendar_today:item.isToday},
            {ve_disable_click: item.limit},
            {ve_calendar_chooseDay:item.chooseDay}]"
              >{{item.id}}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import timeUtil from "./utils"
import { MONTH_SHORTHAND, WEEK_ARRAY } from "./date"
export default {
  name: "ve-calendar",
  data () {
    return {
      myDate: [],
      list: [],
      dateTop: "",
      isShow: false,
      nowDate: this.targetDay
    }
  },
  props: {
    textTop: {
      type: Array,
      default: () => WEEK_ARRAY
    },
    // 当是true的时候 是周日开始
    sundayStart: {
      type: Boolean,
      default: () => true
    },
    targetDay: {
      type: String,
      default: timeUtil.dateFormat(new Date())
    },
    state: {
      type: Boolean,
      default: true
    },
    startDay: {
      type: String,
      default: ""
    }
  },
  created () {
    this.intStart()
    this.myDate = new Date()
  },
  mounted () {
    this.getList(this.myDate)
    document.addEventListener("click", this.listener)
  },
  destroyed () {
    document.removeEventListener("click", this.listener)
  },
  watch: {
    targetDay (val) {
      this.myDate = new Date(val)
      this.getList(this.myDate)
    }
  },
  methods: {
    intStart () {
      timeUtil.sundayStart = this.sundayStart
    },

    clickDay: function (item, index) {
      if (item.limit) {
        return
      }
      if (new Date(this.startDay).getTime() > item.times) {
        return
      }
      if (item.otherMonth === "nowMonth" && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth"
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      const preDate = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth")
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, preDate, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      const nextDate = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth")

      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, nextDate, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },

    getList: function (date, chooseDay, isChosedDay = true) {
      this.dateTop = `${
        MONTH_SHORTHAND[date.getMonth() + 1]
      } ${date.getFullYear()}`
      let arr = timeUtil.getMonthList(this.myDate)
      let limit = new Date(this.startDay).getTime()
      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        let k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        if (k.times < limit) {
          k.limit = true
        }

        if (k.isToday) {
          this.$emit("isToday", nowTime)
        }
        if (chooseDay && chooseDay === nowTime) {
          this.$emit("choseDay", nowTime)
          // console.log(nowTime)
          this.nowDate = nowTime
          k.chooseDay = true
        } else if (this.targetDay === nowTime && !chooseDay) {
          k.chooseDay = true
        }
      }
      this.list = arr
    },
    showCalendar () {
      if (this.state) {
        this.isShow = true
      }
    },
    listener (e) {
      if (!this.$el.contains(e.target)) {
        this.isShow = false
      }
    }
  }
}
</script>

<style lang="scss">
$other-days-color: #bfbfbf;
@mixin activeDay() {
  background: #999;
  color: #fff;
}
.ve-calendar {
  width: 230px;
  position: relative;
  &-text {
    font-size: 14px;
    color: #777777;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 8px;
    height: 36px;
    width: 100%;
    line-height: 34px;
    padding-left: 12px;
    cursor: pointer;
  }
  .ve-calendar-wrapper {
    position: absolute;
    width: 280px;
    padding: 20px 10px 12px 10px;
    transform: translateX(-50%);
    left: 50%;
    z-index: 20;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    border-radius: 12px;
    overflow: hidden;
    background: #ffffff;
  }
}
.ve-calendar-container {
  max-width: 410px;
  margin: auto;
  .ve-calendar-content {
    width: 100%;
    overflow: hidden;
    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      margin-bottom: 10px;
      li {
        cursor: pointer;
        display: flex;
        color: #fff;
        font-size: 18px;
        flex: 1;
        justify-content: center;
        align-items: center;
      }
      .ve-calendar-title-left {
        width: 10px;
        height: 10px;
        border-top: 2px solid #777777;
        border-left: 2px solid #777777;
        transform: rotate(-45deg);
      }

      .ve-calendar-title-right {
        width: 10px;
        height: 10px;
        border-top: 2px solid #777777;
        border-right: 2px solid #777777;
        transform: rotate(45deg);
      }
      .ve-calendar-title-text {
        cursor: auto;
        flex: 2.5;
        font-size: 18px;
        color: #777;
      }
    }
  }
}

.ve-calendar-days {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  &:first-child .ve-calendar-days_item_tag,
  &:first-child .ve-calendar-days_item {
    color: #ddd;
    font-size: 16px;
  }
  .ve-calendar-days_item,
  .ve-calendar-days_item_tag {
    font-size: 15px;
    width: 40px;
    text-align: center;
    color: #777777;
    position: relative;
  }
  .ve-calendar-days_item {
    height: 40px;
    cursor: pointer;
    z-index: 1;
  }
}

.ve-calendar-days-week {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ve-calendar_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    @include activeDay;
  }
}

.ve-calendar-days_item {
  .ve_calendar_other_date {
    color: $other-days-color;
  }
  .ve_calendar_hide_date {
    color: $other-days-color;
  }
  .ve_calendar_chooseDay {
    @include activeDay;
  }
  .ve_disable_click{
    cursor: not-allowed
  }
}
</style>
