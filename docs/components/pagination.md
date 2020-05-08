---
title: pagination 分页
sidebarDepth: 2
---




<ClientOnly><pagination-demo /></ClientOnly>

### 可选项

| 参数        | 说明           | 类型  | 可选值  | 默认值  |
| ------------- |:--------:| :-----:|:-----:|:------------:|
| value      | 开始页码 | Number | — |  1 |
| pageCount      | 总页码(必填) | Number | —  |  1 |
| besidePages      | 当页码过多时，两边显示的数目 | Number | —  |  1 |
| rangePages      | 当页码过多时，中间显示的数目 | Number | —  |  3 |
| prevText      | 上一页按钮文字 | String |  —   |  上一页 |
| nextText      | 下一页按钮文字 | String | —  |  下一页 |
| breakViewText      | 页码过多时候显示方式 | String | —  |  … |
| firstLastButton      | 首页和尾页的快捷按钮 | Boolean | `true|false` | false |
| throttleTag      | 请求完成之前的标识，通过这个可以控制是页码不可点击 | Boolean | `true|false` | true |
| firstButtonText      | 首页的文字 | String | —  |  首页 |
| lastButtonText      | 最后一页的文字 | String | —  |  最后一页 |
| hidePrevNext      | 上一页或者下一页不显示 | Boolean | `true|false` | false |