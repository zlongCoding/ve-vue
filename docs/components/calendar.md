---
title: calendar - 日历
sidebarDepth: 2
---




<ClientOnly><calendar-demo /></ClientOnly>

### 可选项

| 参数        | 说明           | 类型  | 可选值  | 默认值  |
| ------------- |:--------:| :-----:|:-----:|:------------:|
| sundayStart      | 开始从第几周（默认周日） | Boolean | `true|false` |  true |
| startDay      | 开始时间 | Number |  —  |  默认当前时间的时间戳 |
| endDay      | 结束时间（只有在区间选时有用） |  Number |  —  |  默认当前时间第二天的时间戳 |
| limitBool      | 是否开启最小时间限制 | Boolean | `true|false`  |  false |
|limitDay| 限制的时间，必须在 limitBool 为 true时候才能开启| Number |  —  |  默认当前时间的时间戳 |
| dateRange      | 是否开启区间选择 | Boolean | `true|false`  |  false |
| changeMonth      | 改变月份的回调 | Function  | — | —  |
| changeDays      | 选择日期的回调 | Function | — | —  |
