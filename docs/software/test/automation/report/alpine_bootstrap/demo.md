---
title: 思路和 demo
---

将 Python 的 dict 数据转换为 json 字符串写入到模板中，通过 JSON.Parse() 转换为 JS 对象由 alpine app 的创建函数返回值中作为 data 返回，由 alpine 来渲染数据增强页面动态性，bootstrap 提供组件和样式。

在一个 HTML 中包含所有东西，数据由 Python 写入。也可以定义组件。

<!--truncate-->

## 实现步骤

1. Python 记录数据在 dict 中，复杂类型值要转换为字符串，比如 datetime。
2. 将 dict 通过 json 库转换为 json 字符串。
3. 将 json 字符串使用 jinjia2 引擎渲染进模板中的指定位置。
4. 模板中把数据字符串通过 JSON.parse() 转换为 JsObject，在 apline app 创建函数返回值中的 data 作为数据，渲染到 template 中。
5. 样式使用  bootstrap，动态效果都由 alpine 来实现。

## 示例代码

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="html"
  values={[
    { label: 'Html', value: 'html', },
    { label: 'Python', value: 'py', },
  ]
}>

<TabItem value="html">

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--引用 bootstrap CSS-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

    <title>Report</title>
</head>
<body>
<main x-data="app()" class="container">
    <h1 x-text="data.title"></h1>
    <p>描述：<span x-text="data.description"></span></p>
    <p>开始时间：<span x-text="data.start_time"></span></p>
    <p>时长：<span x-text="data.duration"></span></p>
    <p>概要：<span x-text="data.summary"></span></p>
    <p>测试车型：<span x-text="data.vehicle_type"></span></p>
    <p>测试车辆：<span x-text="data.vehicle_name"></span></p>
    <p>固件版本：<span x-text="data.firmware_version"></span></p>
    <p>插件版本：<span x-text="data.plugin_version"></span></p>

    <table class="table table-sm table-responsive text-center table-bordered caption-top align-middle">
        <caption class="text-center">测试数据</caption>
        <thead>
        <tr class=" align-middle">
            <th scope="col" rowspan="2" width="4%">#</th>
            <th scope="col" rowspan="2" width="8%">测试项</th>
            <th scope="col" rowspan="2">测试用例</th>
            <th scope="col" rowspan="2">预期结果</th>
            <th scope="col" colspan="5">测试结果</th>
        </tr>
        <tr>
            <th scope="col" width="6%">成功数</th>
            <th scope="col" width="6%">失败数</th>
            <th scope="col" width="6%">异常数</th>
            <th scope="col" width="6%">成功率</th>
            <th scope="col" width="8%">平均时长(s)</th>
        </tr>
        </thead>
        <tbody>
        <!--这里每行应该都是 x-for 循环来产生-->
        <template x-for="(item, index) in data.tableData" :key="index">
            <tr x-bind:class="tableRowClassName(item.success, item.failure, item.error)">
                <th scope="row" x-text="index">序号</th>
                <td x-text="item.test_case">测试用例</td>
                <td x-html="item.test_step" class="text-start">测试步骤</td>
                <td x-html="item.test_expect" class="text-start">预期结果</td>
                <td x-text="item.success">成功</td>
                <td x-text="item.failure">失败</td>
                <td x-text="item.error">异常</td>
                <td x-text="item.success_ratio">成功率</td>
                <td x-text="item.average_time">平均时长</td>
            </tr>
        </template>
        </tbody>
    </table>
</main>


<!--引用 bootstrap js-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

<!--引用 alpine js-->
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js" defer></script>


<script type="text/javascript">
    var data = '{{ data }}';

    var jsObject = JSON.parse(data);

    function app() {
        return {
            data: jsObject,
            show: false,
            tableRowClassName(success_num, fail_num, error_num) {
                if (fail_num === 0 && error_num === 0) {
                    return 'table-success';
                } else if (error_num > fail_num) {
                    return 'table-warning';
                } else {
                    return 'table-danger';
                }
            }
        }
    }
</script>
</body>
</html>
```

</TabItem>

<TabItem value="py">

```py
def render_report(report_data, source: str = 'local'):

    if source == 'local' or source == 'cdn':
        template_file = source + '_' + 'template.html'
    else:
        # 不合法的源
        return

    template_data = pkgutil.get_data(__package__, 'static/' + template_file)
    template_content = template_data.decode()

    template = Template(template_content)

    rendered = template.render(data=json.dumps(report_data, ensure_ascii=False))

    return rendered


def write_to_html(rendered, html_path):
    if '{time}' in html_path:
        html_path = html_path.format(time=datetime.now().strftime("%Y%m%d%H%M%S"))

    file_path = Path(html_path)

    if not file_path.is_absolute():
        file_path = file_path.absolute()

    if not file_path.exists():
        file_path.parent.mkdir(exist_ok=True)

    with file_path.open('w', encoding='utf-8') as w:
        w.write(rendered)

def pack_local_report(html_path, archive_file_path):
    # 打包压缩
    with zipfile.ZipFile(archive_file_path, 'w', compression=zipfile.ZIP_DEFLATED) as z:
        z.write(html_path)
        package_dir = os.path.dirname(sys.modules[__package__].__file__)  # 获取本包所在的路径
        z.write(os.path.join(package_dir, 'static/js/alpine.js'), 'js/alpine.js')
        z.write(os.path.join(package_dir, 'static/js/bootstrap.bundle.js'), 'js/bootstrap.bundle.js')
        z.write(os.path.join(package_dir, 'static/css/bootstrap.min.css'), 'css/bootstrap.min.css')
        os.remove(html_path)  # 移除压缩包外的 HTML
```

</TabItem>
</Tabs>

## 问题记录

1. Python 如何使用包内资源
   - pkgutil
   - 计算出 package 路径
