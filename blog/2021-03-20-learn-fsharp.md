---
title: FSharp 学习
---

## Unit-Of-Measure

定义单位，提高代码可读性，编译器可进行检查，保证代码正确。

可用中文定义单位，可以调用单位。

```fsharp
[<Measure>]type 元
[<Measure>]type 小孩
[<Measure>]type 大人

let kidPrice = 3<元/小孩>
let adultPrice = 5<元/大人>

let familyCost (child: int<小孩>) (adult: int<大人>) = 
    let cost = child * kidPrice + adult * adultPrice
    cost

let cost = familyCost 2<小孩> 2<大人>
printfn "%d" cost
printfb $"total cost: {cost}"

```

## 入口点

如果有入口点就从入口点开始，否则从头开始。

入口点程序后不允许再声明语句。

```fsharp
[<EntryPoint>]
let main argv =
    let message = "F#" // Call the function
    printfn "Hello world %s" message
    0 // return an integer exit code

// let x = 1 不允许
// let f x = 1 不允许
```

## 函数与变量

常量可以看成返回固定数值的函数。

函数参数名可以用 `_` 忽略。
函数调用可以传入 `()` 作为空参数。

没有变量就是常量，有参数就是函数。使用 `_` 作为参数就可以忽略参数的同时，让常量变为函数。

```fsharp
let print = printfn "check here %d"

let print2 _ = print 4

let print2 () // 传入空参数
```

## 开方乘十的实现

```fsharp
let ``inc 1`` = (+) 1 // 1. 标识符可以有空格 2. 运算符也是函数
let ``multi 2`` = (*) 2
let ``20 div`` = (/) 20  // 20是替代 a / b 中的 a

printfn "inc 1 result: %d" (``inc 1`` 50)
printfn "multi 2 result: %d" (``multi 2`` 4)
printfn "20 div result: %d" (``20 div`` 4)

let 开方 = sqrt
let 乘十 = (*) 10.

let 开方乘十 = 开方 >> 乘十  // 函数连接

printfn "开方乘十结果：%f" (开方乘十 36.)
``

## 不关心对象，关心类型

在 FSharp 中依靠类型来纠错

## 插管

使值可以放到函数前。

```fsharp
let 学生分数 = 60.0
let result = 学生分数 |> 开方乘十
printfn "使用管道输入：%f" result
```

可以告知 FSharp 忽略未处理的表达式输出

```fsharp
0 |> ignore
```

## tuple

```fsharp
let distance (x0, y0) (x1, y1) = sqrt ((x0 - x1)**2. + (y0 - y1)**2.)  // 元祖可以表明 x0 y0 是共生关系，一个存在另一个必须存在；这种形式能够更清晰的体现它的实际意义。

let a = 2., 2.
let orignal = (0., 0.)  // 定义元祖的两种形式

let x = a |> distance orignal  // distance orignal a 的变形
printfn "%A" x
```

元祖使用方便，可以用来比较 
但是意义不明确，不适合作为交接处使用。

## 对类的支持

FSharp 为什么要有类

1. 与其他语言交互
2. 不排除类这样成熟的设计，可以有新的诠释
3. 一种数据或函数的组织方式。还有其他的方式来组织。

```fsharp
type Dog() =
    member val age = 2 with get, set  // 定义数据
    member val breed = "狼狗" with  get,set

    member this.叫() = "汪汪"  //定义函数
    member this.哭() = "。。。"

let dog = Dog()

dog.叫() |> printfn "%s"
```

## 记录

相当于字段加了名字的元祖。

```fsharp
let dog = {| DogName: ""; Age: 3; |}  // 匿名记录

// 记录
type Dog = 
    {
        DogName: string
        Age: int
    }
```

### `with` 复制记录

### 相同标签的记录

相同标签的记录后定义的记录作为可忽略标签的记录。

可以在一个标签上指定记录名来指明是哪个记录。

```fashrp
let dog2 = { Dog.DogName="Tao"; Breed="German Shepherd"}
```

## 小技巧

```fsharp
let debug x = printfn "reach here %d" x 
// 可以简写为
let debug = printfn "reach here %d"
```
