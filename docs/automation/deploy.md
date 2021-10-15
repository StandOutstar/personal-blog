---
title: 部署自动化
---

## 自动化登录服务器部署

```py {1} title="deploy.py"
#! /Users/mac/.virtualenvs/PexpectDemo/bin/python

import getpass
import pexpect
import sys

JUMP_SERVER_HOST = '172.18.10.198'
JUMP_SERVER_PORT = '2222'

SSH_NEW_KEY_PROMPT = 'Are you sure you want to continue connecting'
PASSWORD_PROMPT = '[P|p]assword:'

COMMAND_PROMPT = [
    '# ',
    '>>> ',
    '> ',
    "$ ",
    '% '
]


def send_command(child: pexpect.spawn, cmd: str, prompt=None):
    if prompt is None:
        prompt = COMMAND_PROMPT

    if type(prompt) != list:
        prompt = [].append(prompt)

    child.sendline(cmd)

    ret = child.expect(pattern=[pexpect.TIMEOUT, pexpect.EOF, *prompt])

    if ret == 0:
        print('Cmd Run Timeout')
        return
    if ret == 1:
        print('Cmd Exited')
        return


def connect_jump_server(host: str, port: str, user: str, password: str):
    child = pexpect.spawn('ssh', ['-p', f'{port}', f'{user}@{host}'], encoding='utf-8')
    child.logfile_read = sys.stdout

    ret = child.expect([SSH_NEW_KEY_PROMPT, PASSWORD_PROMPT, pexpect.TIMEOUT, pexpect.EOF])

    if ret == 0:
        child.sendline('yes')
        ret = child.expect([pexpect.TIMEOUT, PASSWORD_PROMPT])

        if ret == 0:
            print('After Adding SSH Key, SSH Connect Timeout')
            return
    if ret == 2:
        print('SSH Connect Timeout')
        return
    if ret == 3:
        print('SSH Connect Exited')
        return

    child.sendline(password)
    ret = child.expect(['> ', pexpect.TIMEOUT, pexpect.EOF])
    if ret == 1:
        print('Connect JumpServer Timeout')
    if ret == 2:
        print('Connect JumpServer Exited')

    return child


def connect_target_server(child: pexpect.spawn, server_id: str):
    child.sendline(server_id)

    ret = child.expect(['# ', pexpect.TIMEOUT, pexpect.EOF])
    if ret == 1:
        print('Connect Target Server Timeout')
    if ret == 2:
        print('Connect Target Server Exited')

    return child


def read_account_from_input() -> (str, str):
    username = input("Please enter username: ")

    while username == '':
        username = input('Username is empty\nPlease enter username: ')

    password = getpass.getpass(prompt='Please enter password: ')

    while password == '':
        password = getpass.getpass('Password is empty\nPlease enter password: ')

    return username, password


def main():
    username, password = read_account_from_input()

    with connect_jump_server(JUMP_SERVER_HOST, JUMP_SERVER_PORT, username, password) as child:
        child = connect_target_server(child, '1\r')  # 输入资产 ID 后必须追加 '\r'，否则不能生效
        send_command(child, 'cd /var/www/dotnet/hrwecommsg')
        send_command(child, 'git pull')
        send_command(child, 'cd /var/www/dotnet/hrwecommsg/HRWeComMsg')
        send_command(child, 'systemctl stop hrwecommsg.service')
        send_command(child, 'systemctl status hrwecommsg.service')
        send_command(child, 'dotnet publish -o published/', prompt=['# '])  # 该命令的输出包含 '> ' 会干扰 expect ，因此改变 prompt
        send_command(child, 'systemctl restart hrwecommsg.service')
        send_command(child, 'systemctl status hrwecommsg.service')


if __name__ == '__main__':
    main()

```

该脚本将部署操作流程的所有命令固定下来，使用 Pexpect 代替手动在终端里输入的命令。Pexpect 可以生成子程序并与其进行交互，检视其输出，可参考 [My Blog](/blog/2021/02/23/python-pexpect)。

### 执行脚本

确认安装有脚本所需的 library `pexpect`的 Python 环境路径。

使用该 Python 环境路径执行脚本，`path/to/python ./deploy.py`。

这样每次还需要输入Python 程序的路径，如果想要省略输入 Python 路径，请看下面 [在终端里直接执行脚本](#在终端里直接执行脚本)。

### 直接执行脚本

第一行 `#! /Users/mac/.virtualenvs/PexpectDemo/bin/python` 设置 `shebang` ([shebang wiki](https://zh.wikipedia.org/zh-hans/Shebang))，这样就指定了脚本的执行程序路径。

给该脚本文件增加可执行权限，`chmod +x ./deploy.py`，这样脚本就可以直接执行。

在命令行里直接执行 `./deploy.py`。
