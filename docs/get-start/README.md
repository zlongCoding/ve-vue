---
title: 快速上手
---
# 快速上手

## 使用之前

您应该在一定程度上了解 vue 的相关概念、基础知识，这样在使用本框架的时候会更顺利。

## 全局引用

在项目的入口文件（一般是 `main.js`）中配置：

```js
import Vue from 'vue';
import App from './App.vue';
import VeVue from 've-vue';

Vue.use(VeVue);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 VeUI 的引入。
::: warning  不推荐
这种方法是将所有组件全部引入到项目中。
:::
## 按需引用

我们可以只引入需要的组件，以达到减小项目体积的目的。


```js
import Vue from 'vue';
import Tooltip from "ve-vue/lib/tooltip"
import Button from "ve-vue/lib/button"
Vue.use(Tooltip)
Vue.use(Button)


new Vue({
  el: '#app',
  render: h => h(App)
});
```
::: tip 通过这种方式引入的目的
为了降低成本配置成本，在每个组件指定一个入口文件，然后就可以支持按需加载了
:::

<!-- ## 特别提醒

在使用 VeUI 时，您需要使用 `border-box` 盒模型，否则会影响样式。CSS 代码示例：

```css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
``` -->

<!-- 至此，一个基于 Vue 和 VeUI 的开发环境已经搭建完毕，现在就可以编写代码了。 :tada: :tada: -->

<!-- 各个组件的使用方法请参阅它们各自的文档。 -->