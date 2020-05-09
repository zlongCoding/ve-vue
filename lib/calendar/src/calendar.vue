
<template>
  <div class="ve-calendar">
    <div class="ve-calendar-text" @click="showCalendar">
      {{!dateRange ? `${formateDate(startDate )}` : (`${ formateDate(startDate)} ${formateDate(endDate)}`)}}
    </div>
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
          <div class="ve-calendar-week">
            <div class="ve-calendar-days-week" v-for="(tag, index)  in textTop" :key="index">{{tag}}</div>
          </div>
          <div class="ve-calendar-days">
            <div
              class="ve-calendar-days_item"
              v-for="(item,index) in list"
              @click="handlerDays(item,index)"
              :key="index"
              :class="[
               {ve_calendar_interval_start: item.startBool && rangeStatus},
               {ve_calendar_interval_end: item.doneBool && rangeStatus},
               {ve_calendar_interval_middle: item.intervalBool},
            ]"
            >
              <div class="ve-calendar-range"></div>

              <div
                class="ve-calendar_item_date"
                :class="[
            {ve_calendar_other_date:item.otherMonth!=='nowMonth'},
            {ve_calendar_hide_date:item.dayHide},
            {ve_calendar_today:item.isToday},
            {ve_disable_click: item.limit},
            {ve_calendar_chooseDay:item.chooseDay || item.startBool || item.doneBool}]"
              >{{item.date}}</div>
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
      startDate: timeUtil.getLimitTime(this.startDay),
      endDate: timeUtil.getLimitTime(this.endDay),
      rangeStatus: false,
      textTop: WEEK_ARRAY
    }
  },
  props: {
    // 当是true的时候 是周日开始
    sundayStart: {
      type: Boolean,
      default: () => true
    },
    startDay: {
      type: Number,
      default: new Date().getTime()
    },
    endDay: {
      type: Number,
      default: new Date().getTime() + 1000 * 24 * 60 * 60
      // default: 0
    },
    limitBool: {
      type: Boolean,
      default: false
    },
    limitDay: {
      type: Number,
      default: timeUtil.getLimitTime(new Date())
    },
    dateRange: {
      type: Boolean,
      default: false
    },
    changeMonth: {
      type: Function,
      default: () => null
    },
    changeDays: {
      type: Function,
      default: () => null
    }
  },
  created () {
    this.intStart()
    this.myDate = new Date(
      `${new Date().getFullYear()}/${new Date().getMonth() +
        1}/${new Date().getDate()}`
    )
  },
  mounted () {
    this.getList(this.myDate)
    this.rangeStatus = true
    document.addEventListener("click", this.listener)
  },
  destroyed () {
    document.removeEventListener("click", this.listener)
  },
  filters: {
    // formateDate (timer) {
    //   let date = new Date(timer)
    //   return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    // }
  },
  watch: {
    startDay (val) {
      // TODO: 这里可以写当目标值改变时候的事件
      // this.myDate = new Date(val)
      // this.getList(this.myDate)
    }
  },
  methods: {
    intStart () {
      timeUtil.sundayStart = this.sundayStart
    },
    formateDate (timer) {
      if (timer) {
        let date = new Date(timer)
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      } else {
        return ""
      }
    },

    handlerDays: function (item, index) {
      if (item.limit) {
        return
      }

      if (item.otherMonth === "nowMonth" && !item.dayHide) {
        this.getList(this.myDate, item.times)
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth"
          ? this.PreMonth(item.times)
          : this.NextMonth(item.times)
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth")
      this.$emit("changeMonth", date)
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth")

      this.$emit("changeMonth", date)
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },

    getList: function (dateTime, chooseDays, isChosedDay = true) {
      const date = timeUtil.getDateObj(dateTime)
      this.dateTop = `${
        MONTH_SHORTHAND[date.getMonth() + 1]
      } ${date.getFullYear()}`
      let arr = timeUtil.getMonthList(this.myDate)
      // 这里控制每次区间选择的时候重置
      if (this.dateRange && chooseDays) {
        if (this.rangeStatus) {
          this.startDate = chooseDays
          this.endDate = 0
          this.rangeStatus = false
          this.$emit("changeDays", {
            startTime: this.startDate,
            endTime: this.endDate
          })
        } else {
          if (chooseDays < this.startDate) {
            this.endDate = this.startDate
            this.startDate = chooseDays
          } else {
            this.endDate = chooseDays
          }
          this.$emit("changeDays", {
            startTime: this.startDate,
            endTime: this.endDate
          })

          this.rangeStatus = true
        }
      }
      for (let i = 0; i < arr.length; i++) {
        let k = arr[i]
        k.chooseDay = false
        k.intervalBool = false
        k.doneBool = false
        k.startBool = false

        const nowTime = k.times
        if (k.times < this.limitDay && this.limitBool) {
          k.limit = true
        }
        // 这里分为两个情况，this.dateRange true 是区间选择， false是单次选中
        if (this.dateRange) {
          if (nowTime > this.startDate && nowTime < this.endDate) {
            k.intervalBool = true
          } else if (nowTime === this.endDate) {
            k.doneBool = true
          } else if (nowTime === this.startDate) {
            k.startBool = true
          }
        } else {
          if (chooseDays === nowTime) {
            this.$emit("changeDays", {
              targetTime: nowTime
            })
            this.startDate = nowTime
            k.chooseDay = true
          } else if (this.startDate === nowTime && !chooseDays) {
            k.chooseDay = true
          }
        }
      }
      this.list = arr
    },
    showCalendar () {
      this.isShow = true
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
$client: 35px;
$container-width: 35px * 7 + 20;
@mixin activeDay() {
  background: #3498db;
  color: #fff;
}
@mixin day_client {
  width: 35px;
  height: 35px;
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
    $container-width: 280px;
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
  .ve-calendar-days_item {
    font-size: 15px;

    text-align: center;
    color: #777777;
    position: relative;
    @include day_client;
    margin: 2px 0;
    cursor: pointer;
  }
  .ve-calendar_item_date {
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    z-index: 1;
    &:hover {
      @include activeDay;
    }
  }
}
.ve-calendar-week {
  display: flex;
  .ve-calendar-days-week {
    @include day_client;
    color: #777777;
    margin: auto;
    display: flex;
    font-size: 15px;
    justify-content: center;
    align-items: center;
  }
}

.ve-calendar-range {
  height: 100%;
  position: absolute;
  color: #fff;
  top: 0;
}
.ve_calendar_interval {
  &_start {
    .ve-calendar-range {
      background: #3498db;
      opacity: 0.7;
      width: 50%;
      right: 0;
    }
  }
  &_end {
    .ve-calendar-range {
      width: 50%;
      background: #3498db;
      opacity: 0.7;
      left: 0;
    }
  }
  &_middle {
    .ve-calendar-range {
      width: 100%;
      background: #3498db;
      opacity: 0.7;
    }
    .ve-calendar_item_date {
      color: #fff;
    }
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
  .ve_disable_click {
    cursor: not-allowed;
  }
}
</style>
