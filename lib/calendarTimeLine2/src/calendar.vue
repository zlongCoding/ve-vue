
<template>
  <div class="ve-calendar-timeline">
    <div class="ve-calendar-timeline-wrapper">
      <section class="ve-calendar-timeline-container">
        <div class="ve-calendar-timeline-content">
          <ul>
            <li @click="PreMonth(myDate,false)">
              <div class="ve-calendar-timeline-title-left"></div>
            </li>
            <li class="ve-calendar-timeline-title-text">{{dateTop}}</li>
            <li @click="NextMonth(myDate,false)">
              <div class="ve-calendar-timeline-title-right"></div>
            </li>
          </ul>
          <div class="ve-calendar-timeline-week">
            <div class="ve-calendar-timeline-days-week" v-for="(tag, index)  in textTop" :key="index">{{tag}}</div>
          </div>
          <div class="ve-calendar-timeline-days">
            <div
              class="ve-calendar-timeline-days_item"
              v-for="(item,index) in dayList"
              @click="handlerDays(item,index)"
              :key="index"
            >
            <div>
              <!--  -->
<!--  -->

              <div class="ve-calendar-timeline-range"
              :class="[{'ve-calendar-more':dayMax[item.times] &&  dayMax[item.times].index === dayList }]"
              v-show=" !dayMax[item.times].index || dayMax[item.times].index > dayList - 1"
              :style="[{'top' : `${day.top}px`}, {'background':day.bg}]"
              v-for="(day, dayList) in timeLineData[item.times]" :key="dayList">
                {{dayMax[item.times].index === dayList ?   'more....' :day.id}}
             </div>
            </div>

              <div
                class="ve-calendar-timeline_item_date"
                 :class="[
            {ve_calendar_other_date:item.otherMonth!=='nowMonth'},
            {ve_calendar_today:item.isToday},
          ]"
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
function getRandom (start, end, fixed = 0) {
  let differ = end - start
  let random = Math.random()
  return (start + differ * random).toFixed(fixed)
}
var colorBg = {
  0: "blue",
  1: "red",
  2: "#000"

}
const arrays = []
function renderArrays () {
  let days = new Date().getTime()
  let limits = 1000 * 24 * 60 * 60
  for (let i = 1; i < 40; i++) {
    arrays.push({
      durationStart: timeUtil.getLimitTime(days + limits * i),
      durationEnd: timeUtil.getLimitTime(days + limits * getRandom(4, 40))
    })
  }
  return arrays
}

export default {
  name: "ve-calendar-timeline",
  data () {
    return {
      myDate: 0,
      dayList: [],
      dateTop: "",
      startDate: timeUtil.getLimitTime(this.startDay),
      textTop: WEEK_ARRAY,
      timeLineArray: renderArrays(),
      timeLineData: {},
      linesTop: {},
      dayClinetWidth: 0,
      dayMax: {}
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
  },
  methods: {
    intStart () {
      timeUtil.sundayStart = this.sundayStart
    },

    handlerDays: function (item, index) {

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
      console.log(arr)
      this.dayList = arr
      this.$nextTick(() => {
        this.dayClinetWidth = document.getElementsByClassName("ve-calendar-timeline_item_date")[0].clientWidth
        this.renderLine()
      })
    },
    renderLine () {
      console.log(this.timeLineArray)
      // console.log(startTimers, endTimers)
      this.timeLineData = {}
      this.linesTop = {}
      this.timeLineArray.forEach((item, index) => {
        this.dayList.forEach((day, dlists) => {
          // let bool = false
          // if (item.durationStart >= day.times && item.durationEnd <= day.times) {
          //   bool = true
          // }
          // if
          if (item.durationStart >= day.times && item.durationEnd <= day.times) {
            let id = `day${index}`
            if (!this.timeLineData[day.times]) {
              this.timeLineData[day.times] = []
            }
            let top = this.timeLineData[day.times].length * 13

            this.timeLineData[day.times].push({
              date: id,
              id: id,
              lineStatus: true,
              top: top,
              bg: colorBg[index]
            })
            if (!this.linesTop[id]) {
              this.linesTop[id] = []
            }
            this.linesTop[id].push(top)
          }
        })
      })
      this.calculateTop()
    },
    calculateTop () {
      let obj = {}
      this.dayMax = {}
      for (const key in this.linesTop) {
        if (this.linesTop.hasOwnProperty(key)) {
          obj[key] = Math.max.apply(Math, this.linesTop[key])
        }
      }
      console.log(obj)

      for (const key in this.timeLineData) {
        this.dayMax[key] = {}
        if (this.timeLineData.hasOwnProperty(key) && this.timeLineData[key]) {
          let val = this.timeLineData[key]
          for (let index = 0; index < val.length; index++) {
            val[index].top = obj[val[index].id]
          }
          for (let index = 0; index < val.length; index++) {
            if (val[index].top + 30 > this.dayClinetWidth) {
              this.dayMax[key].bool = true
              this.dayMax[key].index = index
              break
            }
          }
        }
      }

      // for (const key in this.timeLineData) {
      //   if (this.timeLineData.hasOwnProperty(key) && this.timeLineData[key]) {
      //     let val = this.timeLineData[key]

      //     for (let index = 0; index < val.length; index++) {
      //       // val[index].top = obj[val[index].id]
      // if (val[index].top + 20 > this.dayClinetWidth) {
      //   val[index].more = true
      //   val[index].index = index
      // }
      //     }
      //   }
      // }
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
$color: #3498db;
$uniformWidth: 14.28%;

.ve-calendar-timeline {
  height: 600px;
  position: relative;

  .ve-calendar-timeline-wrapper {
    box-sizing: border-box;
    width: 100%;;
    border: 1px solid #e6e6e6;
    border-radius: 12px;
    overflow: hidden;
    background: #ffffff;
  }
}
.ve-calendar-timeline-container {
  .ve-calendar-timeline-content {
    width: 100%;
    overflow: hidden;
    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding:20px 0;
      li {
        cursor: pointer;
        display: flex;
        color: #fff;
        font-size: 18px;
        flex: 1;
        justify-content: center;
        align-items: center;
      }
      .ve-calendar-timeline-title-left {
        width: 10px;
        height: 10px;
        border-top: 2px solid #777777;
        border-left: 2px solid #777777;
        transform: rotate(-45deg);
      }

      .ve-calendar-timeline-title-right {
        width: 10px;
        height: 10px;
        border-top: 2px solid #777777;
        border-right: 2px solid #777777;
        transform: rotate(45deg);
      }
      .ve-calendar-timeline-title-text {
        cursor: auto;
        flex: 2.5;
        font-size: 18px;
        color: #777;
      }
    }
  }
}

.ve-calendar-timeline-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  .ve-calendar-timeline-days_item {
    font-size: 15px;
    text-align: center;
    color: #777777;
    width: $uniformWidth;
    padding-bottom:$uniformWidth;
    position: relative;
    cursor: pointer;
    border-top: 1px solid #e6e6e6;
    // border-left: 1px solid #e6e6e6;
    box-sizing: border-box;
    // overflow: hidden;
    &::after{
      content: "";
      width: 1px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #e6e6e6;
    }
    &:nth-child(7n + 1)::after{
      width: 0px !important;
    }
  }
  .ve-calendar-timeline_item_date {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 4px;
    box-sizing: border-box;
    text-align: left;
    overflow-y: scroll;
    cursor: pointer;
  }
}
.ve-calendar-timeline-week {
  display: flex;

  .ve-calendar-timeline-days-week {
    width: $uniformWidth;
    border-left: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    padding: 4px 0;
    &:first-child{
      border-left:0;
    }
    color: #777777;
    margin: auto;
    display: flex;
    font-size: 15px;
    justify-content: center;
    align-items: center;
  }
}

.ve-calendar-timeline-days_item {
  .ve_calendar_today{
      color: $color;
  }
  .ve_calendar_other_date {
    color: $other-days-color;
  }
}
.ve-calendar-more{
  top: 80% !important;
}
.ve-calendar-timeline-range{
    position: absolute;
    width: 100%;
    height: 12px;
    background: red;
    z-index: 9;
    left: 0;
    font-size: 12px;
    line-height: 12px;

}

</style>
