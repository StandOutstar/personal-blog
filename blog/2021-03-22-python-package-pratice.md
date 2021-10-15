---
title: Python Package 最佳实践
tags: ["Python"]
---

最近更新：2021年04月19日17:30:22，修改 setup.py 避免引入依赖，导致导入包错误。

## 自建 pypiserver

- [pypiserver docker](https://hub.docker.com/r/pypiserver/pypiserver)
- [pypiserver offical](https://pypi.org/project/pypiserver/#upload-with-setuptools)

## 参考

- [Python Package Best Pratices](http://education.molssi.org/python-package-best-practices/)

## 步骤

在本机的包上一级目录，创建 `setup.py`、`LICENSE`、`README.md` 等文件

`setup.py` 简单示例：

```py title="setup.py"
from pathlib import Path
import setuptools


readme_text = Path(__file__).with_name("README.md").read_text()

setuptools.setup(
    name="nvtt",
    version="1.0.2",
    author="xingkui.zhang",
    author_email="xingkui.zhang@ninebot.com",
    description="Ninebot Vehicle Testing Tool",
    long_description=readme_text,
    long_description_content_type="text/markdown",
    url="http://git.ninebot.cn:8888/autotest/ninebot-vehicle-testing-tool",
    python_requires='>=3.6.0',
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[
      "Programming Language :: Python :: 3.6",
      "Operating System :: Unix",
    ],
    install_requires=['loguru', 'pyserial'],
)
```

在本机 `~` 下创建 `.pypirc` 文件，写入内容：

```txt
[distutils]
index-servers =
  local

[local]
repository: http://10.10.36.11:8089
username: admin
password: admin123456
```

在服务器上

```sh
$cd ~/DockerVolumes/pypi-packages

$htpasswd -bc .htpasswd admin admin123456

$docker run -p 8089:8080 -v ~/DockerVolumes/pypi-packages:/data/packages -v ~/DockerVolumes/pypi-packages/.htpasswd:/data/.htpasswd --name pypi-server pypiserver/pypiserver:latest -P .htpasswd
```

在本机上传

```sh
$python setup.py sdist upload -r local
```

安装

```sh
$pip install --index-url http://10.10.36.11:8089 vehicle-controller --trusted-host 10.10.36.11
```

当然也可以写入到 `~/.config/pip.conf` 来避免传入 URL。

此处的 `local` 对应在 `.pypirc` 中的 `[local] section`。

## 遇到的问题

1. `AssertionError: unsupported schema`

    检查是否存在 `~/.pypirc` 并填入内容

2. `error: Upload failed (403): Forbidden`

    检查账号密码

3. 怎么删除上传过的包呢？

  进入数据卷的目录，直接删除，🤣