---
title: 重试
---

## 需要重试具有的功能

- 根据次数重试
- 根据异常重试
- 根据结果重试
- 可执行自定义操作

## 看 tenacity 是否可实现

### 条件重试

1. 默认，`@retry` 装饰器遇到异常一直重试，直到成功。

    ```python
    import random
    from tenacity import retry

    @retry
    def do_something_unreliable():
        if random.randint(0, 10) > 1:
            raise IOError("Broken sauce, everything is hosed!!!111one")
        else:
            return "Awesome sauce!"

    print(do_something_unreliable())
    ```

2. 根据次数重试

    ```python
    @retry(stop=stop_after_attempt(2))
    def stop_after_n_attempt():
        print("Stopping after n attempts")
        raise Exception

    # stop_after_n_attempt()
    ```

3. 根据异常重试

    ```python
    @retry(retry=retry_if_exception_type(IOError))
    def might_io_error():
        print("Retry forever with no wait if an IOError occurs, raise any other errors")
        # raise Exception  # not retry
        raise IOError  # will retry


    might_io_error()
    ```

4. 根据结果重试

    ```python
    def is_none_p(value):
        """Return True if value is None"""
        return value is None


    @retry(retry=retry_if_result(is_none_p))
    def might_return_none():
        print("Retry with no wait if return value is None")
        # default return none, will retry


    might_return_none()
    ```

### 自定义动作

1. 重试前执行

    ```python
    def before_action(retry_state):
        print(f"before action: {retry_state}")


    @retry(stop=stop_after_attempt(3), before=before_action)
    def before_retry():
        raise Exception("Fail")


    before_retry()
    ```

2. 重试后执行

    ```python
    def after_action(retry_state):
        print(f"after action: {retry_state}")


    @retry(stop=stop_after_attempt(3), after=after_action)
    def after_retry():
        raise Exception("Fail")


    after_retry()
    ```

3. 重试异常后执行

    ```python
    def return_last_value(retry_state):
        """return the result of the last call attempt"""
        print(f"call error callback")
        return retry_state.outcome.result()


    def is_false(value):
        """Return True if value is False"""
        print(f"get value: {value}")
        return value is False


    # will return False after trying 3 times to get a different result
    @retry(stop=stop_after_attempt(3),
        retry_error_callback=return_last_value,
        retry=retry_if_result(is_false))
    def eventually_return_false():
        return False


    eventually_return_false()
    ```

提供的 callback

- before 重试前
- after 重试后
- before_sleep 重试间隔前
- wait 重试间隔

## Other

1. 如果要对三方库中的函数或方法加上重试，应该是将其封装，然后在封装上使用重试。
2. 如何复用设置项多的 `retry` ?

    ```python
    # 命令式重用
    retryer = Retrying(wait=wait_fixed(0.5), stop=stop_after_attempt(3), before_sleep=before_sleep_action, reraise=True)


    def func1():
        print(f"f1 run at: {time.perf_counter()}")
        raise Exception


    def func2():
        print(f"f2 run at: {time.perf_counter()}")
        raise Exception


    retryer(func1)

    retryer(func2)
    ```

    ```python
    # 声明式重用
    def default_retry():
        return retry(wait=wait_fixed(0.5), stop=stop_after_attempt(3), before_sleep=before_sleep_action, reraise=True)


    @default_retry()
    def func3():
        print(f"f3 run at: {time.perf_counter()}")
        raise Exception


    @default_retry()
    def func4():
        print(f"f4 run at: {time.perf_counter()}")
        raise Exception


    r(func3)

    r(func4)
    ```

3. 设置 `reraise=True` 的话，最后抛出的异常就是代码实际抛出的异常，否则，会被替代为 `tenacity` 定义的 `RetryError`。
4. 可以使用 `Retrying` 类来重试代码块

    ```python
    from tenacity import Retrying, RetryError, stop_after_attempt

    try:
        for attempt in Retrying(stop=stop_after_attempt(3)):
            with attempt:
                raise Exception('My code is failing!')
    except RetryError:
        pass
    ```

    重试代码块，设置 `reraise=True` 时抛出的是代码块的异常，否则是 `RetryError`

    代码块没有异常时，执行一遍就会推出，跟普通的 for 循环不同。

5. 如何获取重试过程中的数据？通过被装饰函数对象上被绑定的 `retry` 属性，它引用的是一个 `Retrying` 类型的实例对象。通过 `retry.statistics` 获取到一个 dict 对象，它的数据包括 `{'start_time': 0.079929851, 'attempt_number': 3, 'idle_for': 1.0, 'delay_since_first_attempt': 0.502063669}`。

    ```python
    @retry(stop=stop_after_attempt(3))
    def raise_my_exception():
        raise MyException("Fail")

    try:
        raise_my_exception()
    except Exception:
        pass

    print(raise_my_exception.retry.statistics)
    ```

6. 如何在自定义动作中获取重试调用状态？通过动作调用时传入的 `retry_state` 参数引用的一个 `RetryCallState` 类型的实例对象。


7. 如何在运行时修改重试设置？通过被装饰函数对象上被绑定的 `retry_with` 属性，它引用的是一个 `Retrying` 实例对象。

    ```python
    @retry(stop=stop_after_attempt(3))
    def raise_my_exception():
        raise MyException("Fail")

    try:
        raise_my_exception.retry_with(stop=stop_after_attempt(4))()
    except Exception:
        pass

    print(raise_my_exception.retry.statistics)
    ```
