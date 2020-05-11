
<template>
<div class="ve-calendar-wrapper">
  <p><button @click="changeDays(preNext -= 1)">上一月</button><button @click="changeDays(preNext += 1)">下一月</button></p>
  <div class="ve-calendar-timeline">
    <ul class="ve-calendar-timeline-timer">
      <li v-for="(item,index) in dayList" :key="index">{{item.date}}</li>
    </ul>
    <div class="ve-calendar-timeline-detail">
      <ul>
        <li
          v-for="(item,index) in dayList"
          :id="`ve-month-${index}`"
          :ref="`ve-month-${index}`"
          :key="index"
        ></li>
      </ul>
      <div class="ve-calendar-timeline-daysLine">
        <div class="ve-calendar-timeline-detail-wrapper" :style="{'height': `${containerHeight}`}">
          <div
            :id="`ve-calendar-timeLine${index}`"
            v-for="(val, index) in timerLineArray"
            :key="index"
            :style="[
            { width: val.width },
            { left: val.left },
            { top: val.top },
            { background: val.bg },
            { borderColor: val.border },
            {color: val.color}
          ]"
            :class="['ve-calendar-line-cover',
           startClass(val.startCode), endClass(val.endCode),
           {'ve-timeline-minWidth': calculateWidth(val.width)}]"
          >
            {{val.durationStart | timerFormate}}
            {{val.durationEnd | timerFormate}}
            <!-- <span class="campaigns-time-line-cover-name" >{{val.milestone}}</span> -->
            <!-- <span class="campaigns-time-line-cover-name" :style="{ color: val.color }" @click="jumpCampaign(val)">{{val.milestone}}</span> -->
            <!--<span class="campaigns-time-line-cover-btn" @click="jump(val)">{{val.businessContent ? 'Edit Creative' : 'New Creative'}}</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import timeUtil from "./utils"
function getRandom (start, end, fixed = 0) {
  let differ = end - start
  let random = Math.random()
  return (start + differ * random).toFixed(fixed)
}
const arrays = []
function renderArrays () {
  let days = new Date().getTime()
  let limits = 1000 * 24 * 60 * 60
  for (let i = -4; i < 8; i++) {
    arrays.push({
      durationStart: timeUtil.getLimitTime(days + limits * i),
      durationEnd: timeUtil.getLimitTime(days + limits * getRandom(5, 30))
    })
  }
  return arrays
}

const differenceTop = 20
export default {
  name: "ve-calendar-timeline",
  data () {
    return {
      myDate: new Date(),
      dayList: [],
      timerLineArray: [],
      timeArray: renderArrays(),
      containerHeight: 0,
      preNext: 0,
      clientWrapper: 0
    }
  },
  mounted () {
    // this.myDate = new Date()
    this.listenerWidth()
    this.changeDays(this.preNext)
  },
  filters: {
    timerFormate (time) {
      return `${new Date(time).getMonth()}-${new Date(time).getDate()}`
    }
  },
  methods: {

    changeDays () {
      const curMonth = new Date()
      var month = curMonth.getMonth() + this.preNext
      curMonth.setMonth(month)
      this.dayList = timeUtil.getMonthListNoOther(curMonth)
      this.$nextTick(() => {
        this.calculateCoordinates()
      })
    },
    listenerWidth () {
      this.$nextTick(() => {
        this.clientWrapper = document.getElementsByClassName("ve-calendar-timeline-detail-wrapper")[0].clientWidth
      })
    },
    // timeUtil
    endClass (code) {
      return code === 1 ? "ve-border-right" : "ve-border-right-none"
    },
    startClass (code) {
      return code === 1 ? "ve-border-left" : "ve-border-left-none"
    },
    calculateWidth (width) {
      if (this.clientWrapper * parseFloat(width) / 100 < 200) {
        return true
      }
      return false
    },
    calculateCoordinates () {
    // 主要是通过这个方法进行渲染的，具体的思路是计算出每条数据对应的时间戳，然后通过开始时间以及结束时间算出插值，再把
    // 其他几种情况进行以下限制，就可以了
      //  这里需要注意这里的时间戳是整形也就是new Date('2019/10/1').getTime() 这种情况等到的时间戳 1569859200000
      // 这样设计的主要是方便计算
      let timeLines = []
      let startTimers = this.dayList[0]
      let endTimers = this.dayList[this.dayList.length - 1]
      let startEndLimit = new Date(endTimers.times).getDate()
      let topIndex = 0
      const daysLimitWidth = document
        .getElementById("ve-month-0")
        .getBoundingClientRect()

      this.timeArray.forEach((item, index) => {
        if (
          startTimers.times <= item.durationStart ||
          endTimers.times >= item.durationEnd ||
          (startTimers.times >= item.durationStart &&
            endTimers.times <= item.durationEnd)
        ) {
          let timeStartDay = new Date(item.durationStart).getDate()
          let limitsEnd = item.durationEnd
          let limitsStart = item.durationStart
          let endBool = 0
          let startBool = 0
          // 这两个判断的作用就是限制开始和结束时间不在这个时间段或者超出这个时间段

          if (startTimers.times <= item.durationStart) {
            if (startTimers.times <= item.durationEnd) {
              startBool = 1
            }
          } else {
            // 这里主要是开始时间小于当前月份的最小时间
            if (item.durationEnd >= startTimers.times) {
              startBool = 2
              limitsStart = startTimers.times
            }
          }
          if (endTimers.times >= item.durationEnd || endTimers.times + 86400000 >= item.durationEnd) {
            if (item.durationEnd >= startTimers.times) {
              endBool = 1
            }
          } else {
            // 结束时间大于当前月份
            if (item.durationStart <= endTimers.times) {
              endBool = 2
              limitsEnd = endTimers.times
            }
          }

          let width = 0

          let limitTimer = (limitsEnd - limitsStart) / 1000 / 60 / 60 / 24
          if (endBool === 1 || endBool === 2) {
            width = `${(limitTimer + 1) / startEndLimit * 100}%`
          } else {
            width = 0
          }

          if (width !== 0) {
            timeLines.push({
              ...item,
              left:
                startBool === 1
                  ? `${daysLimitWidth.width * (timeStartDay - 1) - (timeStartDay - 1)}px`
                  : 0,
              width: width,
              top: `${differenceTop +
                differenceTop * topIndex +
                10 * topIndex}px`,
              startCode: startBool,
              endCode: endBool
            })
            topIndex += 1
          }
        }
      })
      if (timeLines.length > 0) {
        this.timerLineArray = timeLines
      } else {
        this.timerLineArray = []
      }
      var coverHeight = document.getElementsByClassName(
        "ve-calendar-timeline-detail-wrapper"
      )[0].clientHeight
      let fullWidth
      if (this.timerLineArray[this.timerLineArray.length - 1]) {
        let limitHeight =
          parseInt(
            this.timerLineArray[this.timerLineArray.length - 1].top.split(
              "px"
            )[0]
          ) + differenceTop + 20
        fullWidth = `${
          coverHeight > limitHeight ? coverHeight : limitHeight
        }px`
      } else {
        fullWidth = "100%"
      }

      this.containerHeight = fullWidth
    }
  }
}
</script>

<style lang="scss">
$height: 400px;
.ve-calendar-timeline {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  color: #777777;
  height: $height;
  ul {
    list-style: none;
    width: 100%;
    display: flex;
    margin: 0;
    padding: 0;
    li {
      flex: 1;
      border-right: 1px solid #e6e6e6;
      // box-sizing: border-box;
      &:first-child {
        border-left: 1px solid #e6e6e6;
      }
    }
  }
  &-timer {
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  }
  &-detail {
    // height: 400px;
     flex: 1;
    position: relative;
    ul {
      height: 100%;
      border-bottom: 1px solid #e6e6e6;
    }
    .ve-calendar-timeline-daysLine {
      overflow-y: scroll;
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    &-wrapper {
      position: absolute;
      min-height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      overflow: hidden;
      div {
        background: #e6e6e6;
        position: absolute;
        height: 20px;
        left: 0;
        border-width: 1px;
        border-style: solid;
        cursor: pointer;
        transition: all 0.4s;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        // z-index: 99;
        //  border-radius: 6px;
        &.ve-border-left {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        &.ve-border-right {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        &.ve-border-right-none {
          border-right: 0;
        }
        &.ve-border-left-none {
          border-left: 0;
        }
      }
    }
  }
}
.ve-timeline-minWidth{
  &:hover{
    width: 200px !important;
  }
  // min-width: 200px;
}
@media screen and (max-width: 600px) {
    .ve-calendar-timeline {
        font-size: 12px;
    }
}
</style>
