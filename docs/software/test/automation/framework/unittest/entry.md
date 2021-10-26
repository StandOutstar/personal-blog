---
title: entry
---

# 【读源码】unittest -- \_\_main\_\_.py

目录

<!-- toc -->

- [\_\_main\_\_.py 源码](#__main__py-源码)
- [\_\_main\_\_.py 特殊文件的作用](#__main__py-特殊文件的作用)
- [其他](#其他)
- [参考](#参考)

<!-- tocstop -->

#

## \_\_main\_\_.py 源码

```python
"""Main entry point"""

import sys
if sys.argv[0].endswith("__main__.py"):
    import os.path
    # We change sys.argv[0] to make help message more useful
    # use executable without path, unquoted
    # (it's just a hint anyway)
    # (if you have spaces in your executable you get what you deserve!)
    executable = os.path.basename(sys.executable)
    sys.argv[0] = executable + " -m unittest"
    del os
    print(sys.argv[0])

__unittest = True

from .main import main, TestProgram

main(module=None)
```

### \_\_main\_\_.py 特殊文件的作用

`python -m unittest xxx` 运行 unittest 时，\_\_main\_\_.py 会被执行

### 其他

`python -m unittest xxx` 运行 unittest 时，sys.argv 变量是个列表，内容是类似 `['/usr/local/Cellar/python/3.7.5/Frameworks/Python.framework/Versions/3.7/lib/python3.7/unittest/__main__.py', 'main.py']`。sys.executable 是 Python 解释器的可执行文件的名字也就是 `python`。

if 逻辑修改了 sys.argv[0] 的内容变成了 `python -m unittest`。目的是简化了信息。

然后使用相对导入，导入了 main、TestProgram，从 main.py 中看到 `main=TestProgram`，即 main 变量等同于 TestProgram 类。然后调用 main(module=None) 即执行 TestProgram 的实例初始化 \_\_init\_\_() 方法，因此， TestProram.\_\_init\_\_ 方法定义了主要的执行流程。


## 参考

- [Python 3.6.1 unittest 源码](https://github.com/python/cpython/blob/3.6/Lib/unittest/\_\_init\_\_.py)
- [6. 模块 — Python 3.6.12 文档](https://docs.python.org/zh-cn/3.6/tutorial/modules.html#importing-from-a-package)