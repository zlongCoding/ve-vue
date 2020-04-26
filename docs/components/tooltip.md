---
title: Tooltip - 弹出框
sidebarDepth: 2
---

# Tooltip

可用于弹出信息。

基础用法：

可选择不同方式触发：click / hover；可选择不同方位触发。

<ClientOnly><tooltip-demo></tooltip-demo></ClientOnly>

### Attributes


| 参数        | 说明           | 类型  | 可选值  | 默认值  | 
| ------------- |:--------:| :-----:|:-----:|:------------:|
| position      | tooltip 显示的位置 | String | `top | botter | lef | right` |top |
| effect      | tooltip 显示方式是否有边框 | Boolean | `true|false` | top |
| trigger      | tooltip 触发的方式 | String | `click | hover` | hover |
| template      | tooltip的内容，slot | tempalte | —— |—— |
| slot-scope	      | 如果需要在 tooltip 内添加关闭 tooltip 的设置，则需要 slot-scope 引用 close 方法	 | Object | ——	 |——	 |