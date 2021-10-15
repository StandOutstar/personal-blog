---
title: UI 自动化测试路线
---

## app

android 系统基础
    - adb
    - apk

ios 系统基础
    - libxxx
    - webdriveragent
    - ipa

## 计算机基础

- 网络
- HTTP/TCP
- Git

## 编程

- Python
- Java
- ...

- HTML

## 框架

- senelineum
- appium
- airtest，（阿里有工具可以使得非 Mac 可以连接 iPhone webdriveragent）
- STF (设备管理)
- atxserver2 (设备管理)
- [tidevice(ios 自动化工具)](https://github.com/alibaba/taobao-iphone-device)

## 框架理论

- 单元测试框架
- PO 模式

## 环境和集成

- Docker
- Jenkins

## UI 自动化测试理论

- 用例粒度
- 用例解耦
- 元素定位/图像定位

## 参考

- [tidevice 参考](https://mp.weixin.qq.com/s/P95Fr93mlf5CvV02-Oi9zw)

## 一些经验

在一些用例会对其后用例产生影响的情况下，且较容易出现失败比如受网络慢影响，则应该把这部分用例跟可以稳定运行的用例分离出去，免得影响效率低下。

如果某个步骤必须执行，且可能失败，那么如果失败应该立即让测试结束执行。

## 考虑一些解决方案

一些一次性弹窗：靠缓存
