---
title: AutoWrapper 
---

Asp.Net Core 统一返回 AutoWrapper

[AutoWrapper Project Site](https://github.com/proudmonkey/AutoWrapper/blob/master/README.zh-cn.md)

## 安装依赖

```sh
dotnet add package AutoWrapper.Core
```

指定版本

```sh
dotnet add package AutoWrapper.Core -Version 4.3.0
```

注册中间件

要在 `UseRouting()` 中间件之前，可以直接放在第一个。

```c#
app.UseApiResponseAndExceptionWrapper();
```

注册中间件时可以指定一些功能配置

```csharp
app.UseApiResponseAndExceptionWrapper(new AutoWrapperOptions { IsDebug = false, UseApiProblemDetailsException = true, ShowApiVersion = true, ShowStatusCode = true});
```

## 控制器中

要么返回 `ApiResponse`，或者抛出异常。要么返回 `ApiException`。
