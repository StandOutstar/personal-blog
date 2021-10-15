# Decorator

## 语法糖的转换形式

```py
def log_call(func):
    def proxy(*args, **kwargs):
        logging.info('begin call: {name}'.format(name=func.__name__))
        result = func(*args, **kwargs)
        logging.info('call done: {name}'.format(name=func.__name__))
        return result
    return proxy

@log_call
def work_foo(data):
    pass


work_foo = log_call(work_foo)
```

## 不同调用形式的转换

```py
def log_slow_call(func=None, threshold=1):
    def decorator(func):
        def proxy(*args, **kwargs):
            start_ts = time.time()
            result = func(*args, **kwargs)
            end_ts = time.time()

            seconds = end_ts - start_ts
            if seconds > threshold:
            logging.warn('slow call: {name} in {seconds}s'.format(
                name=func.func_name,
                seconds=seconds,
            ))

            return result

        return proxy

    if func is None:
        return decorator
    else:
        return decorator(func)
```

```py
@log_slow_call
def sleep_seconds(seconds):
    time.sleep(seconds)
```

相当于

```py
def sleep_seconds(seconds):
    time.sleep(seconds)

sleep_seconds = log_slow_call(sleep_seconds)
```

```py
@log_slow_call()
def sleep_seconds(seconds):
    time.sleep(seconds)
```

相当于

```py
def sleep_seconds(seconds):
    time.sleep(seconds)

sleep_seconds = log_slow_call()(sleep_seconds)
```

```py
@log_slow_call(threshold=0.5)
def sleep_seconds(seconds):
    time.sleep(seconds)
```

相当于

```py
def sleep_seconds(seconds):
    time.sleep(seconds)

sleep_seconds = sleep_seconds(threshold=0.5)(sleep_seconds)
```

## 两层装饰器

```py
def smart_decorator(decorator):

    def decorator_proxy(func=None, **kwargs):
        if func is not None:
            return decorator(func=func, **kwargs)

        def decorator_proxy(func):
            return decorator(func=func, **kwargs)

        return decorator_proxy

    return decorator_proxy
```

```py
@smart_decorator
def log_slow_call(func, threshold=1):
    def proxy(*args, **kwargs):
        start_ts = time.time()
        result = func(*args, **kwargs)
        end_ts = time.time()

        seconds = end_ts - start_ts
        if seconds > threshold:
        logging.warn('slow call: {name} in {seconds}s'.format(
            name=func.func_name,
            seconds=seconds,
        ))

        return result

    return proxy
```

相当于

```py
def log_slow_call(func, threshold=1):
    def proxy(*args, **kwargs):
        start_ts = time.time()
        result = func(*args, **kwargs)
        end_ts = time.time()

        seconds = end_ts - start_ts
        if seconds > threshold:
        logging.warn('slow call: {name} in {seconds}s'.format(
            name=func.func_name,
            seconds=seconds,
        ))

        return result

    return proxy

log_slow_call = smart_decorator(log_slow_call)  # 此时 log_slow_call = decorator_proxy
```

## 两层装饰器不同调用形式的转换

```py
@log_slow_call
def sleep_seconds(seconds):
    time.sleep(seconds)
```

相当于

```py
def sleep_seconds(seconds):
    time.sleep(seconds)

sleep_seconds = log_slow_call(sleep_seconds)  
# 此时 log_slow_call = decorator_proxy
# 就相当于 
# sleep_seconds = decorator_proxy(sleep_seconds)
# sleep_seconds = log_slow_call(sleep_seconds) 
# 此时的 log_slow_call 就是最初定义的 log_slow_call, 虽然现在 log_slow_call 被替换为 decorator_proxy 但是 log_slow_call 的原来本体还记录在闭包里，这不又返回来了
```

```py
@log_slow_call()
def sleep_seconds(seconds):
    time.sleep(seconds)
```

相当于

```py
def sleep_seconds(seconds):
    time.sleep(seconds)

sleep_seconds = log_slow_call()(sleep_seconds)  
# 此时 log_slow_call = decorator_proxy
# 就相当于 
# sleep_seconds = decorator_proxy()(sleep_seconds) # decorator_proxy() 返回 decorator_proxy 内部的 decorator_proxy
# sleep_seconds = decorator_proxy(sleep_seconds) 
# sleep_seconds = log_slow_call(sleep_seconds)
# 此时的 log_slow_call 就是最初定义的 log_slow_call, 虽然现在 log_slow_call 被替换为 decorator_proxy 但是 log_slow_call 的原来本体还记录在闭包里，这不又返回来了
```

```py
@log_slow_call(threshold=0.5)
def sleep_seconds(seconds):
    time.sleep(seconds)
```

相当于

```py
def sleep_seconds(seconds):
    time.sleep(seconds)

sleep_seconds = log_slow_call(threshold=0.5)(sleep_seconds)
# 此时 log_slow_call = decorator_proxy
# 就相当于 
# sleep_seconds = decorator_proxy(threshold=0.5)(sleep_seconds)
# decorator_proxy(threshold=0.5) 返回 decorator_proxy 内部的 decorator_proxy(None)
# sleep_seconds = log_slow_call(None, threshold=0.5)
# 此时的 log_slow_call 就是最初定义的 log_slow_call, 虽然现在 log_slow_call 被替换为 decorator_proxy 但是 log_slow_call 的原来本体还记录在闭包里，这不又返回来了
```

:::info important
每个函数编译后都有一个函数对象和函数名字，函数名字指向该函数对象。函数名字可以修改指向其他对象。

使用装饰器后，当前的函数名字就被修改指向了一个新的函数对象，该函数对象内部调用了原来的函数对象。
:::
