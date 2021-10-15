---
id: alpine
title: Alpine
---

## Alpine

相当于一个简化版的 Vue。提供了基础的功能来动态操作页面。这样对于刚开始学习前端框架来说，学习的内容会少一些，更合适一些。

[Alpine](https://github.com/alpinejs/alpine/ "Alpine")

[参考](https://www.jianshu.com/p/51ca3de3926b)

## 指令

### 分类

| 类别             | 描述         | 指令                                                         |
| ---------------- | ------------ | :----------------------------------------------------------- |
| 组件声明         | x-data       | 声明一个新的组件范围                                         |
| 属性设置         | x-bind       | 将属性值设置为JS表达式的结果                                 |
| 文本渲染         | x-text       | 工作原理类似 `x-bind`不同之处会更新元素的`innerText`属性     |
| HTML渲染         | x-html       | 工作元素类似`x-bind`不同之处会更新元素的`innerHTML`属性      |
| 双向绑定         | x-model      | 为元素添加双向绑定，使输入元素与组件数据保持同步。           |
| 条件删除         | x-if         | 从DOM中完全删除一个元素，需在`<template>`标记上使用。        |
| 条件隐藏         | x-show       | 根据表达式的布尔值在元素上切换`display:none/block`属性值     |
| 列表渲染         | x-for        | 遍历数组，为象每个数组项目创建新的DOM节点，需在`<template>`标记中使用。 |
| 事件监听         | x-on、@      | 为元素添加一个事件监听器，在触发监听事件后执行JS表达式。     |
| 初始化           | x-init       | 当一个组件被初始化时运行指定的表达式，类似Vue中的`mounted`在组件挂载到DOM后触发。 |
| 元素过渡         | x-transition | 元素过渡指令                                                 |
| 隐藏预初始化 DOM | x-clock      | 在Alpine初始化时将被移除，用于隐藏预初始化的DOM。            |
| 元素获取         | x-ref        | 快捷地从组件中获取元素的DOM元素                              |

### `x-data`

`x-data` 所在的标签声明成为一个组件，这个标签内的子标签都可以使用这个组件的属性。

`x-data` 的值必须是对象字面量或一个表达式能返回对象。类似于 Vue 组件的 data 属性。

- 对象字面量

```html
<div x-data="{ foo: 'bar' }">...</div>
```

- 表达式

```html
<div x-data="dropdown()">
    <button x-on:click="open">Open</button>

    <div x-show="isOpen()" x-on:click.away="close">
        // Dropdown
    </div>
</div>

<script>
    function dropdown() {
        return {
            show: false,
            open() { this.show = true },
            close() { this.show = false },
            isOpen() { return this.show === true },
        }
    }
</script>
```

### `x-init`

组件初始化时执行一段代码。

```html
<div x-data="{ foo: 'bar' }" x-init="foo = 'baz'"></div>
```

如果希望在组件初始化之后执行，那么可以让 `x-init` 返回一个 `callback` 。

```js
x-init="() => { // we have access to the post-dom-initialization state here // }"
```



### `x-show`

根据条件表达式的值，翻转 `display: none`。

```html
<div x-show="open"></div>
```

如果要加动效，可以使用 Alpine 提供的便利 API

```html
<div x-show.transition="open">
    These contents will be transitioned in and out.
</div>
```

这些特效 API 有：

| 效果             | 指令                                                    | 描述                                                         |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| 淡入淡出         | `x-show.transition`                                     | (opacity, scale: 0.95, timing-function: cubic-bezier(0.4, 0.0, 0.2, 1), duration-in: 150ms, duration-out: 75ms) |
| 只有转入         | `x-show.transition.in`                                  |                                                              |
| 只有转出         | `x-show.transition.out`                                 |                                                              |
| 只有淡化         | `x-show.transition.opacity`                             |                                                              |
| 只有缩放         | `x-show.transition.scale`                               |                                                              |
| 缩放比例 75%     | `x-show.transition.scale.75`                            |                                                              |
| 进入设置为 200ms | `x-show.transition.duration.200ms`                      | 退出为进入的一半时间。                                       |
|                  | `x-show.transition.origin.top.right`                    | 自定义 css 转换坐标 `transform-origin: top right`            |
|                  | `x-show.transition.in.duration.200ms.out.duration.50ms` | 进入退出设置不同时间                                         |



### `x-bind`

给 DOM 元素属性设置为表达式返回的值。

```html
<div x-bind:class="{ 'hidden': foo }"></div>
```

`x-bind` 支持布尔属性，当表达式返回的是 `true` ，渲染后的元素就存在该属性，否则就不存在。（HTML 标准，布尔属性，存在就为 true，不存在就为 false）



### `x-on`

给元素绑定事件监听处理。

```html
<button x-on:click="foo = 'bar'"></button>
```

如果表达式中更新了数据，绑定了该数据的元素也会更新。

表达式可以直接使用函数名。

```html
<button x-on:click="myFunction"></button>

<!-- 等价于 -->
<input type="text" x-on:keydown.escape="open = false">
```

可以通过修饰符指定特定事件。

`keydown.escape` , `keydown.enter`,`keydown.arrow-up`,`keydown.arrow-down`

`click.away`,`click.prevent`,`click.stop`,`click.self`,

`mousedown.passive`,

`input.debounce`,

`.caml`

### `x-model`

双向绑定数据。意为，数据跟新，DOM 元素更新；DOM 元素更新，数据更新。

x-model 自动判定不同类型元素改绑定的值（与 Vue 一样）。

可以通过修饰符转换数据类型 `.number`

可以通过修饰符给数据变更时添加抖动消除 `.debunce`，避免事件连续触发。

```html
<!-- 设置抖动消除时长 750ms -->
<input x-model.debounce.750="search">
<input x-model.debounce.750ms="search">
```



### `x-text`

结构：`<span x-text="[expression]"`

示例：`<span x-text="foo"></span>`

更新元素的 innerText 为表达式的值。类似 x-bind，不过 x-bind 是指定元素的属性来绑定。

更新文本元素的文本。



### `x-html`

结构：`<span x-html="[expression]"`

示例：`<span x-html="foo"></span>`

更新元素的 innerHTML 为表达式的值。类似 x-bind，不过 x-bind 是指定元素的属性来绑定。

更新块元素的内容。

### `x-ref`

结构：`<div x-ref="[ref name]"></div><button x-on:click="$refs.[ref name].innerText = 'bar'"></button>`

示例：`<div x-ref="foo"></div><button x-on:click="$refs.foo.innerText = 'bar'"></button>`

给元素设置标记，以在其他地方方便引用该元素。

### `x-if`

结构：`<template x-if="[expression]"><div>Some Element</div></template>`

示例：`<template x-if="true"><div>Some Element</div></template>`

x-show 隐藏元素，x-if 会真正从 DOM 脏哦给你移除元素。

x-if 必须使用在 template 标签上，template 标签内只能有一个根元素。因为 Alpine 没有 虚拟 DOM。

### `x-for`

示例：

```html
<template x-for="item in items" :key="item">
    <div x-text="item"></div>
</template>
```

x-for 必须用在 template 标签上，template 标签内只能有一个根元素。因为 Alpine 没有 虚拟 DOM。

带上索引：

```html
<template x-for="(item, index) in items" :key="index">
    <!-- You can also reference "index" inside the iteration if you need. -->
    <div x-text="index"></div>
</template>
```

带上集合：

```html
<template x-for="(item, index, collection) in items" :key="index">
    <!-- You can also reference "collection" inside the iteration if you need. -->
    <!-- Current item. -->
    <div x-text="item"></div>
    <!-- Same as above. -->
    <div x-text="collection[index]"></div>
    <!-- Previous item. -->
    <div x-text="collection[index - 1]"></div>
</template>
```

嵌套循环：

```html
<template x-for="item in items">
    <div>
        <template x-for="subItem in item.subItems">
            <div x-text="subItem"></div>
        </template>
    </div>
</template>
```

支持 `i in n` 语法：

```html
<template x-for="i in 10">
    <span x-text="i"></span>
</template>
```



### `x-transition`

设置元素过渡动画效果。

使用 Tailwind CSS：

```html
<div
    x-show="open"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 transform scale-90"
    x-transition:enter-end="opacity-100 transform scale-100"
    x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 transform scale-100"
    x-transition:leave-end="opacity-0 transform scale-90"
>...</div>
```

```html
<template x-if="open">
    <div
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform scale-90"
        x-transition:enter-end="opacity-100 transform scale-100"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 transform scale-100"
        x-transition:leave-end="opacity-0 transform scale-90"
    >...</div>
</template>
```

支持 6 个过渡指令来应用在元素消失和出现的不同阶段。

| 指令         | 描述               |
| ------------ | ------------------ |
| :enter       | 应用在整个进入阶段 |
| :enter-start | 进入开始状态       |
| :enter-end   | 进入结束状态       |
| :leave       | 应用在整个退出阶段 |
| :leave-start | 退出开始状态       |
| :leave-end   | 退出结束状态       |



### `x-spread`

把元素上应用的多个 Alpine 的指令给抽取出来，并设置名字来代表，可以复用该逻辑。`x-spread`指定名字，把抽取出的指令应用在该元素上。

示例：

```html
<div x-data="dropdown()">
    <button x-spread="trigger">Open Dropdown</button>

    <span x-spread="dialogue">Dropdown Contents</span>
</div>

<script>
    function dropdown() {
        return {
            open: false,
            trigger: {
                ['@click']() {
                    this.open = true
                },
            },
            dialogue: {
                ['x-show']() {
                    return this.open
                },
                ['@click.away']() {
                    this.open = false
                },
            }
        }
    }
</script>
```

`x-data`和`x-init`不能出现在抽取出的指令里。

### `x-cloak`

示例：`<div x-data="{}" x-cloak></div>`

Alpine 初始化时，该指令 `x-cloak` 会被从元素上移除。可以用来隐藏预初始化 DOM。

典型用法：

```html
<style>
    [x-cloak] { display: none; }
</style>
```

## 魔法属性

### `$el`

用来获取当前元素所在的根组件。

示例：

```html
<div x-data>
    <button @click="$el.innerHTML = 'foo'">Replace me with "foo"</button>
</div>
```

### `$refs`

用来获取 `x-ref`标记的元素。

示例：

```html
<span x-ref="foo"></span>

<button x-on:click="$refs.foo.innerText = 'bar'"></button>
```

### `$event`

用在事件处理器中，来获取浏览器事件。

示例：

```html
<input x-on:input="alert($event.target.value)">
```

```html
<button x-on:click="myFunction($event)"></button>
```

### `$dispatch`

用来触发指定事件。

示例：

```html
<!-- 这样是不会生效的 -->
<div x-data>
    <span @custom-event="console.log($event.detail.foo)"></span>
    <button @click="$dispatch('custom-event', { foo: 'bar' })">
<div>
```

 这样是不会生效的，因为事件冒泡，触发事件是从 div 开始。

```html
<!-- 正确的使用 -->
<div @custom-event="console.log($event.detail.foo)">
    <button @click="$dispatch('custom-event', { foo: 'bar' })">
    <!-- When clicked, will console.log "bar" -->
</div>
```

如果要触发同级元素的事件，需要 `.window`修饰符来把事件

```html
<div x-data @custom-event.window="console.log($event.detail)"></div>

<button x-data @click="$dispatch('custom-event', 'Hello World!')">
```

`$dispatch` 触发事件传递的数据会绑定到 `.detail`属性上。

```js
$event.detail.foo
```

`$dispatch` 可以触发 x-model 的更新

```html
<div x-data="{ foo: 'bar' }">
    <span x-model="foo">
        <button @click="$dispatch('input', 'baz')">
        <!-- After the button is clicked, `x-model` will catch the bubbling "input" event, and update foo to "baz". -->
    </span>
</div>
```

在 JavaScript function 中使用 `$dispatch`：

```html
<button x-on:click="myFunction($dispatch)"></button>
```

### `$nextTick`

在 Alpine 更新 DOM 后，执行一段代码。

示例：

```html
<div x-data="{ fruit: 'apple' }">
    <button
        x-on:click="
            fruit = 'pear';
            $nextTick(() => { console.log($event.target.innerText) });
        "
        x-text="fruit"
    ></button>
</div>
```

### `$watch`

监听组件的属性，在发生变化时执行一段代码。

示例：

```html
<div x-data="{ open: false }" x-init="$watch('open', value => console.log(value))">
    <button @click="open = ! open">Toggle Open</button>
</div>
```