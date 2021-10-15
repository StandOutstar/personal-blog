---
title: using 语句和 IDisposable 接口实现自动执行 clean code
---

```csharp
public class AutoDeleteImage : IDisposable
{
    public readonly string ImagePath;
    private bool _disposed = false;

    public AutoDeleteImage(string imagePath)
    {
        ImagePath = imagePath;
    }

    public void Dispose() => Dispose(true);

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;
        if (disposing)
        {
            if (File.Exists(ImagePath)) File.Delete(ImagePath);
        }

        _disposed = true;
    }
}
```

## 参考

- [实现 Dispose 方法](https://docs.microsoft.com/zh-cn/dotnet/standard/garbage-collection/implementing-dispose)