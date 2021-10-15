---
title: 概述
---

## 基础

[MDN CSS](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)

### 重点理解

- [选择器](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors)
- [盒模型](https://zxuqian.cn/docs/css/box-model/box-model/)
- [block, inline and inline-block](https://segmentfault.com/a/1190000015202771)

## 常用技巧

### 避免边距折叠

避免边距折叠和宽高计算。

```css
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
```

### 全局样式设置

设置HTML根元素的样式，可被子元素继承。

```css
html {
  /* px 表示 “像素（pixels）”: 基础字号为 10 像素 */
  font-size: 10px;
  /* Google fonts 输出的 CSS */
  font-family: 'Open Sans', sans-serif;
}
```

### 属性区别

background-color ：元素内容和内边距底下的颜色
color ：元素内容（通常是文本）的颜色

text-shadow ：为元素内的文本设置阴影

### CSS 复杂的地方

可以设置布局，样式，字体，过渡，动画等等
布局技术经历多个实现，且共存
很多属性差别细微
很多属性，不同浏览器实现不同
