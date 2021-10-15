---
title: Tailwind 学习
---

## Tailwind 安装

[参考文档](https://www.tailwindcss.cn/docs/installation)

### 常用安装方式

1. 引用 CDN

   ```html
   <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
   ```

2. 下载文件，本地引入

    下载地址从 cdn 路径获取，比如：`https://unpkg.com/browse/tailwindcss@2.0.2/dist/`，下载 tailwind.min.css ，保存在项目的 /css/tailwind.min.css 中。

    ```html
    <link rel="stylesheet" type="text/css" href="../css/tailwind.min.css">
    ```

## Tailwind 核心理解

### 用处

- 简化为关键字。

    把一组 CSS 代码简化为一个关键字。比如 `display: none;` 简化为 `.hidden`，再比如 `grid-template-columns: repeat(1, minmax(0, 1fr));` 简化为 `.grid-cols-1`。

- 关键字可配置。

    关键字代表的一组样式还可配置。比如配置`container`默认居中，

    ```js
    // tailwind.config.js
    module.exports = {
        theme: {
            container: {
            center: true,
            },
        },
    }
    ```

- 关键字可组合。

    关键字可以组合，进一步简化一组样式(该功能不能再非编译的项目类型中使用)。

    比如，组合出 button 样式。

    ```html
    <!-- Using utilities -->
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
    </button>

    <!-- Extracting classes using @apply -->
    <button class="btn btn-blue">
        Button
    </button>

    <style>
        .btn {
            @apply font-bold py-2 px-4 rounded;
        }
        .btn-blue {
            @apply bg-blue-500 text-white;
        }
        .btn-blue:hover {
            @apply bg-blue-700;
        }
    </style>
    ```
### 自定义设计

- 在 full config 的 tailwind 配置文件里，修改默认设计
- 在 tailwind 配置文件里，修改或扩展配置