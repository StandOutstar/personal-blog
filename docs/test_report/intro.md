---
id: intro
title: 概述
---

## 测试报告种类

- 纯文本
- Excel
- 图片
- HTML

HTML 报告样式美观，可展示数据形式多，查看方便。

## HTML测试报告

HTML测试报告一般的生成方式有

1. 定义模板，生成测试数据，由模板引擎完全渲染出完整的页面。该 HTML 的内容已经完全包含在文件中，无需在浏览器里再处理，直接渲染出即可。
2. 同方式一流程相同，但是模板定义和由模板引擎渲染的数据不同。模板引擎只负责把数据渲染到报告中，数据的处理以及页面的进一步处理由 JS 来进行。

### 第一种方式

模板定义

```html title="no_js_template.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report</title>
</head>
<body>

<h1>{{ title }}</h1>
<div id="list">
    <ul>
        {% for item in items %}
        <li><a href="{{ item['href'] }}">{{ item['address'] }}</a></li>
        {% endfor %}
    </ul>
</div>

</body>
</html>
```

代码渲染

```py  title="no_js_render.py"
from jinja2 import Template

if __name__ == '__main__':
    with open('no_js_template.html', encoding='utf-8') as f:
        report_template = f.read()

    template = Template(report_template)
    report = template.render(
        title='测试报告',
        items=[
            {
                'href': 'www.baidu.com',
                'address': '百度'
            },
            {
                'href': 'www.sina.com',
                'address': '新浪'
            }
        ]
    )

    with open('report.html', 'w', encoding='utf-8') as f:
        f.write(report)
```

渲染后的 HTML

```html title="no_js_report.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report</title>
</head>
<body>

<h1>测试报告</h1>
<div id="list">
    <ul>
        
        <li><a href="www.baidu.com">百度</a></li>
        
        <li><a href="www.sina.com">新浪</a></li>
        
    </ul>
</div>

</body>
</html>
```

最终效果

![no_js_render](../../static/img/use_js_render.png)

可以看出，最终 HTML 的标签都是已经全部由模板引擎生成，只需浏览器根据标签生成 DOM 元素展示在页面上。

### 第二种方式

模板定义

```html  title="use_js_template.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report</title>
</head>
<body>

<div id="list" x-data="app()">
    <h1 x-text="data.title"></h1>
    <ul>
        <template x-for="(item, index) in data.items" :key="index">
            <li><a x-bind:href="item.href" x-text="item.address"></a></li>
        </template>
    </ul>
</div>

<!--引用 alpine js-->
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js" defer></script>

<script type="text/javascript">
    var data = '{"title": "测试报告", "items": [{"href": "www.baidu.com", "address": "百度"}, {"href": "www.sina.com", "address": "新浪"}]}';

    var jsObject = JSON.parse(data);

    function app() {
        return {
            data: jsObject,
        }
    }
</script>
</body>
</html>
```

代码渲染

```py  title="use_js_render.py"
# -*- coding: utf-8 -*-
import json

from jinja2 import Template

if __name__ == '__main__':
    with open('use_js_template.html', encoding='utf-8') as f:
        report_template = f.read()

    template = Template(report_template)

    render_data = {
        'title': '测试报告',
        'items': [
            {
                'href': 'www.baidu.com',
                'address': '百度'
            },
            {
                'href': 'www.sina.com',
                'address': '新浪'
            }
        ]
    }

    report = template.render(data=json.dumps(render_data, ensure_ascii=False))  # ensure_ascii=False 避免非 ASCII 字符转换

    with open('report.html', 'w', encoding='utf-8') as f:
        f.write(report)
```

渲染后的 HTML

```html  title="use_js_report.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report</title>
</head>
<body>

<div id="list" x-data="app()">
    <h1 x-text="data.title"></h1>
    <ul>
        <template x-for="(item, index) in data.items" :key="index">
            <li><a x-bind:href="item.href" x-text="item.address"></a></li>
        </template>
    </ul>
</div>

<!--引用 alpine js-->
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js" defer></script>

<script type="text/javascript">
    var data = '{"title": "测试报告", "items": [{"href": "www.baidu.com", "address": "百度"}, {"href": "www.sina.com", "address": "新浪"}]}';

    var jsObject = JSON.parse(data);

    function app() {
        return {
            data: jsObject,
        }
    }
</script>
</body>
</html>
```
最终效果

![no_js_render](../../static/img/no_js_render.png)

可以看出，模板引擎只向最终的 HTML 渲染了数据，模板中也只定义了骨架，最终是在浏览器里由 JS 生成了完整的内容然后浏览器渲染出来。

### 比较

- 第一种方式类似 web 开发方式中的后端渲染，由后端生成页面的所有内容。
- 第二种方式类似 web 开发方式中的前端渲染，由前端生成部分页面内容。

当然，两种方式结合也是可以的。

## 适合的 JS 库

- brython.js 使用 Python 替代 JavaScript，可以直接引入使用。
- alpinejs 简单，轻量，可以直接引入使用。
- vuejs(vue2 或 vue3) 入手简单，可以直接引入使用。

## 适合的 CSS 库

- bootstrap
- tailwind
- element 配合 vue2
- element-plus 配合 vue3

## Python 数据结构转换为 JavaScript 对象

Python 中使用 list/dict 等记录数据，js 库中都是使用 JS 对象来作为数据的

如何将 Python 数据结构转换为 JS 的对象呢？

方式是

Python 数据机构 -> json 字符串 -> JS 对象

```py title="Python 代码中"
import json

render_data = {
    'title': '测试报告',
    'items': [
        {
            'href': 'www.baidu.com',
            'address': '百度'
        },
        {
            'href': 'www.sina.com',
            'address': '新浪'
        }
    ]
}

json_str = json.dumps(render_data, ensure_ascii=False)  # 接受 Unicode 字符
```

```js title="JS 代码中"
<script type="text/javascript">
    var data = '{{ data }}';

    var jsObject = JSON.parse(data);

    function app() {
        return {
            data: jsObject,
        }
    }
</script>
```
