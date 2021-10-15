---
title: signal 信号处理模块
tags: ["Python"]
---

使用 signal 模块可能出现的隐藏问题，
问题：signal handler 抛出的异常可能被抛出前运行点的异常处理捕获，从而无法直接向上抛出。
https://anonbadger.wordpress.com/2018/12/15/python-signal-handlers-and-exceptions/
