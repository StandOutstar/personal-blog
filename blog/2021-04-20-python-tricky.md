---
title: Python Tricky
---

## 函数参数

1. 参数是个列表，传参时，遵循命名参数要在非命名参数后边，而且最终形成的参数列表里必须是命名的参数必须靠后。

比如定义

```py
def f(a, b, c):
    print('a: ', a)
    print('b: ', b)
    print('c: ', c)
```

参数列表是 [a, b, c]

可能使用的参数形式：

```py
f(1, 2, c=3) // ok
f(1, b=2, 3) // error
f(1, 3, b=2) // error
```

2. 参数可以定义默认值，定义默认值同样遵循定义默认值的要在未定义默认值的参数后。

```py
def x(a, b=2, c) // error
def x(a=1, b=2, c=3) //ok
def x(a, b, c=3) //ok
```

3. 捕获多余参数

```py
def f(a, b, c, *args, **kwargs)
```

## 函数参数默认值使用 mutable 和 immutable 对象的区别


## Python Functions

https://medium.com/pipedrive-engineering/tricky-python-part-ii-ade7ec16c132
