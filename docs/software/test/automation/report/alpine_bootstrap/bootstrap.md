---
title: Bootstarp 
---

## 引入

### CDN

css

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
```

js

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
```

### 本地引入


## 模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">

    <title>Template</title>
</head>
<body>
    <h1>Bootstrap Template</h1>
    <div class="container">

    </div>

    <script src="../js/bootstrap.bundle.js"></script>
</body>
</html>
```

## 全局默认配置

这是 bootstrap 默认的全部配置，了解一下，避免以后踩坑。

### HTML5 doctype

声明 HTML 标准必须用 HTML5 的 doctype。

```html
<!doctype html>
<html lang="en">
  ...
</html>
```

### 响应式元数据标签

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### 盒模型更改

 box-sizing 全局从 content-box 修改到 border-box。使得留白 (padding) 不影响元素长宽计算。

如果需要修改，可以覆盖

```css
.selector-for-some-widget {
  box-sizing: content-box;
}
```



## 布局

### container

.container 是基本的布局容器。基本布局容器有 3 种形式，它们的宽度比例在屏幕大小变化时，变化不相同。

- `.container`
- `.container-fluid`
- `.container-{breakpoint}`，.container-lg 指的是小于 lg 时 宽度都是 100%，到达或超过 lg 时，按各断点宽度。

|                    | Extra small <576px | Small ≥576px | Medium ≥768px | Large ≥992px | X-Large ≥1200px | XX-Large ≥1400px |
| ------------------ | ------------------ | ------------ | ------------- | ------------ | --------------- | ---------------- |
| `.container`       | 100%               | 540px        | 720px         | 960px        | 1140px          | 1320px           |
| `.container-sm`    | 100%               | 540px        | 720px         | 960px        | 1140px          | 1320px           |
| `.container-md`    | 100%               | 100%         | 720px         | 960px        | 1140px          | 1320px           |
| `.container-lg`    | 100%               | 100%         | 100%          | 960px        | 1140px          | 1320px           |
| `.container-xl`    | 100%               | 100%         | 100%          | 100%         | 1140px          | 1320px           |
| `.container-xxl`   | 100%               | 100%         | 100%          | 100%         | 100%            | 1320px           |
| `.container-fluid` | 100%               | 100%         | 100%          | 100%         | 100%            | 100%             |

### grid

#### 响应式断点

| Breakpoint        | Class infix | Dimensions |
| ----------------- | ----------- | ---------- |
| X-Small           | *None*      | <576px     |
| Small             | `sm`        | ≥576px     |
| Medium            | `md`        | ≥768px     |
| Large             | `lg`        | ≥992px     |
| Extra large       | `xl`        | ≥1200px    |
| Extra extra large | `xxl`       | ≥1400px    |

#### 列分 12 份

.col 默认等比分批

.col-4 占据 4 份宽度

.col-sm-4 在宽度超过 sm 时，都占 4 份。

#### 间隔支持响应式

#### 行和列都支持设置数量或比例，都支持断点。

### columns

#### 对齐

##### 垂直对齐

整行设置垂直对齐

```html
<div class="container">
  <div class="row align-items-start">
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
    <div class="col">
      One of three columns
    </div>
  </div>
</div>
```

`align-items-start` `align-items-center` `align-items-end`

单独设置垂直对齐

```html
<div class="container">
  <div class="row">
    <div class="col align-self-start">
      One of three columns
    </div>
    <div class="col align-self-center">
      One of three columns
    </div>
    <div class="col align-self-end">
      One of three columns
    </div>
  </div>
</div>
```

##### 水平对齐

```html
<div class="container">
  <div class="row justify-content-start">
    <div class="col-4">
      One of two columns
    </div>
    <div class="col-4">
      One of two columns
    </div>
  </div>
</div>
```

`justify-content-start` `justify-content-center` `justify-content-end`

##### 列自动换行

超出 12 份的列自动放到一个新行中。

##### 列断行

```html
<div class="container">
  <div class="row">
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>

    <!-- Force next columns to break to new line -->
    <div class="w-100"></div>

    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
    <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
  </div>
</div>
```

响应式断行

```html
<div class="container">
  <div class="row">
    <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
    <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>

    <!-- Force next columns to break to new line at md breakpoint and up -->
    <div class="w-100 d-none d-md-block"></div>

    <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
    <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
  </div>
</div>
```

#### 重排

##### 排序

通过给单元格指定 `.order-*`来重排该单元格的顺序

`.order-first` `.order-last` `.order: -1` `.order: 6`

##### 偏移

###### offset

通过给单元格指定 `.offset-{breakpoint}-*`来设置偏移。

###### margin utilities

通过给单元格指定 `.ms-{breakpoint}-auto`来设置间隔。

##### 单独列

`.col`可以在 `.row`外使用，以给元素设置宽度。

```html
<div class="col-3 bg-light p-3 border">
  .col-3: width of 25%
</div>
<div class="col-sm-9 bg-light p-3 border">
  .col-sm-9: width of 75% above sm breakpoint
</div>
```

### gutters

水平间隔

​	在行上使用`.gx-*`

垂直间隔

​	在行上使用`.gy-*`

水平和垂直间隔

​	在行上使用 `.g-*`

可以使用断点

 `.g-{bk}-*`

不要间隔

`.g-0`

