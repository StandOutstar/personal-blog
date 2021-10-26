---
title: init
---

# 【读源码】unittest -- \_\_init\_\_.py
目录

<!-- toc -->

- [\_\_init\_\_.py 源码](#__init__py-源码)
- [\_\_init\_\_.py 特殊文件的作用](#__init__py-特殊文件的作用)
- [\_\_all\_\_ 特殊变量的作用](#__all__-特殊变量的作用)
- [相对导入](#相对导入)
- [其他](#其他)
- [参考](#参考)

<!-- tocstop -->

## \_\_init\_\_.py 源码

```python
__all__ = ['TestResult', 'TestCase', 'TestSuite',
           'TextTestRunner', 'TestLoader', 'FunctionTestCase', 'main',
           'defaultTestLoader', 'SkipTest', 'skip', 'skipIf', 'skipUnless',
           'expectedFailure', 'TextTestResult', 'installHandler',
           'registerResult', 'removeResult', 'removeHandler']

# Expose obsolete functions for backwards compatibility
__all__.extend(['getTestCaseNames', 'makeSuite', 'findTestCases'])

__unittest = True

from .result import TestResult
from .case import (TestCase, FunctionTestCase, SkipTest, skip, skipIf,
                   skipUnless, expectedFailure)
from .suite import BaseTestSuite, TestSuite
from .loader import (TestLoader, defaultTestLoader, makeSuite, getTestCaseNames,
                     findTestCases)
from .main import TestProgram, main
from .runner import TextTestRunner, TextTestResult
from .signals import installHandler, registerResult, removeResult, removeHandler

# deprecated
_TextTestResult = TextTestResult

# There are no tests here, so don't try to run anything discovered from
# introspecting the symbols (e.g. FunctionTestCase). Instead, all our
# tests come from within unittest.test.
def load_tests(loader, tests, pattern):
    import os.path
    # top level directory cached on loader instance
    this_dir = os.path.dirname(__file__)
    return loader.discover(start_dir=this_dir, pattern=pattern)

```
## \_\_init\_\_.py 特殊文件的作用

\_\_init\_\_.py 文件的存在使得 unittest 的目录被 Python 解释器当做一个包 (Package)。

## \_\_all\_\_ 特殊变量的作用

\_\_all\_\_ 变量定义适用导入语句 `from unittest import *` 时，会导入到当前命名空间里的东西。

## 相对导入

`from .xxx import xxx` 使用相对导入从子模块中变量、类或函数等

## 其他

`load_tests` 定义一个函数，从 __init__.py 所在的目录适用 loader 模块的 discover 函数发现用例


## 参考

- [Python 3.6.1 unittest 源码](https://github.com/python/cpython/blob/3.6/Lib/unittest/\_\_init\_\_.py)
- [6. 模块 — Python 3.6.12 文档](https://docs.python.org/zh-cn/3.6/tutorial/modules.html#importing-from-a-package)