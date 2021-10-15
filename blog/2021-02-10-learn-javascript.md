---
title: JavaScript 学习
---

## 经典学习

### 经典资料

- [Moliza MDN Web JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types)


## 基础

### 语法

#### 变量声明

三种形式：

```js
var x = 1;
let x = 1;
const x = 1;
```

初始值：

```js
var a;  // a 的值是 undefined
```

- 未赋初始值，默认为 undefined。
- undefined 在布尔环境中作为 false，undefined 在数值环境中作为 NaN
- 空值 null 在数值环境中作为 0，在布尔环境中作为 false

#### 变量作用域

- 函数之外声明式全局变量
- 函数内部是局部变量
- let 在语句块中声明的变量只能在语句块中使用。语句块示例：`if(true) { var x = 5; }`

#### 变量提升

- 变量可以在使用后声明，但是在使用的时候变量返回的是 undefined 值。
- 变量提升不能跨 script

```js
console.log(x === undefined); // true
var x = 3;
```

感觉没有必要，又容易造成代码不清晰。

#### 函数提升

函数声明会被提升到顶部。函数调用不会被提升。

#### 全局变量

全局变量是全局对象的属性。全局对象是 window。可以用 `window.varibale` 来访问全局变量。

#### 常量

关键字 `const` 定义只读常量。
常量不可重新赋值。
常量不可重新声明。
常量不需初始化。
常量作用域与 let 相同是块级作用。
同一作用域中，不能使用存在的变量名或函数名来声明常量。
对象被赋值为常量是不受保护的。

```js
const MY_OBJECT = {"key": "value"};
MY_OBJECT.key = "othervalue";         // 不会产生错误
```

数组被赋值为常量也是不受保护的。

```js
const MY_ARRAY = ['HTML','CSS'];
MY_ARRAY.push('JAVASCRIPT');          // 不会产生错误
console.log(MY_ARRAY); //logs ['HTML','CSS','JAVASCRIPT'];
```

### 数据结构和类型

#### 数据类型

- 七种基本数据类型
- 以及对象(object)

##### 对象字面量

属性名必须是合法的 JavaScript 标识符或字符串（包括空字符串）。
属性名不是合法的 JavaScript 标识符是字符串的话，必须用下标的方式访问 [""]。




## 体悟

JavaScript 为每种不同的操作方式可能设置不同的表现行为。