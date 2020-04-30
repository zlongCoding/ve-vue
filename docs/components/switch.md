---
title: Switch - 开关
sidebarDepth: 2
---

# Switch

切换状态

基础用法：
点击切换目标进行状态切换

<ClientOnly><switch-demo></switch-demo></ClientOnly>

### Attributes


| 参数        | 说明           | 类型  | 可选值  | 默认值  | 
| ------------- |:--------:| :-----:|:-----:|:------------:|
| width      | 显示的宽度 | Number |  —— | 50 |
| isChecked      | 初始化的状态 | Boolean | `true|false` | false |
| inactiveText      | 不选中的的文本 | String | —— | '' |
|  activeText      | 选中的的文本 | String | —— | '' |
| change      | 改变状态之后的回调 | Function | —— |—— |
| styleType      | 两种常见的状态样式 | Boolean |`true|false` | true |


