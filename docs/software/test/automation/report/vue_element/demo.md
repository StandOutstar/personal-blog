---
title: 思路和 demo
---

将 Python 的 dict 数据转换为 json 字符串写入到模板中，通过 JSON.Parse() 转换为 JS 对象由 Vue app 的 data() 中返回，由 Vue 来渲染数据增强页面动态性，Element Plus 提供组件和样式。

在一个 HTML 中包含所有东西，数据由 pyhton 写入。也可以定义组件。

<!--truncate-->

## 实现步骤

1. Python 记录数据在 dict 中，复杂类型值要转换为字符串，比如 datetime。
2. 将 dict 通过 json 库转换为 json 字符串。
3. 将 json 字符串使用 jinjia2 引擎渲染进模板中的指定位置。（jinjia2 变量标识与 Vue 冲突，修改 jinjia2 的变量标识为 {@ var @}）
4. 模板中把数据字符串通过 JSON.parse() 转换为 JsObject，由 vue 实例 的 data() 返回作为数据，渲染到 template 中。
5. 样式使用 element-plus，动态效果都由 vue 来实现。

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

    <!-- vue 3 cdn -->
    <script src="https://unpkg.com/vue@next"></script>

    <!-- element plus cdn -->
    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css">
    <!-- 引入组件库 -->
    <script src="https://unpkg.com/element-plus/lib/index.full.js"></script>
    <style>
        .el-table .warning-row {
            background: #fcebd4;
        }

        .el-table .fail-row {
            background: #fbd2d2;
        }

        .el-table .success-row {
            background: #e8fbdf;
        }

        .main {
            margin-left: 50px;
        }
    </style>
    <title>Title</title>
</head>
<body>
<div id="app" class="main">
    <h2>{{ title }}</h2>
    <p>开始时间：{{ start_time }}</p>
    <p>描述：{{ description }}</p>
    <p>时长：{{ duration }}</p>
    <p>概要：{{ summary }}</p>

    <el-table
            :data="tableData"
            border
            style="width: 80%;margin: 50px auto 0;"
            :row-class-name="tableRowClassName">
        <el-table-column
                prop="vehicle_type"
                label="车型"
                min-width="100">
        </el-table-column>
        <el-table-column
                prop="vehicle_name"
                label="车辆"
                min-width="150">
        </el-table-column>
        <el-table-column
                prop="case"
                label="用例"
                min-width="250">
        </el-table-column>
        <el-table-column
                prop="success"
                label="成功"
                min-width="100">
        </el-table-column>
        <el-table-column
                prop="failure"
                label="失败"
                min-width="100">
        </el-table-column>
        <el-table-column
                prop="error"
                label="异常"
                min-width="100">
        </el-table-column>
        <el-table-column
                prop="success_ratio"
                label="成功率"
                min-width="100">
        </el-table-column>
        <el-table-column
                prop="average_time"
                label="平均时长(s)"
                min-width="100">
        </el-table-column>
    </el-table>

</div>
<script type="text/javascript">
    var data = '{@ data @}';
    var jsObject = JSON.parse(data);
    const App = {
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (row.failure === 0) {
                    return 'success-row';
                } else if (row.error >= row.failure){
                    return 'warning-row';
                } else {
                    return 'fail-row';
                }
            }
        },
        data() {
            return jsObject;
        },
    }
    const app = Vue.createApp(App);
    app.use(ElementPlus);
    app.mount("#app");
</script>
</body>
</html>
```

</TabItem>
<TabItem value="py">

```py
def generate_report(self, config: ProjectConfig):

    table_data = []
    for test, recorder in self.result.result_map.items():
        table_data.append({
            'vehicle_type': config.vehicle.type,
            'vehicle_name': config.vehicle.name,
            'case': test._testMethodName,
            'total': config.case.repeat,
            'success': recorder.success_count,
            'failure': recorder.fail_count,
            'error': recorder.error_count,
            'success_ratio': '{:.0%}'.format(recorder.success_count / config.case.repeat),
            'average_time': round(CasePerformanceMetricsRecorder.average_time(test._testMethodName), 2)
        })

    env = Environment(variable_start_string='{@', variable_end_string='@}',
                        loader=FileSystemLoader('www/html'))  # 修改jinjia2 默认的变量首尾标识符 '{{' '}}'，因为和 Vue 冲突了
    template = env.get_template('report_template.html')

    report = template.render(data=json.dumps({
        'title': config.title,
        'description': config.description,
        'start_time': self.start_time.strftime("%Y-%m-%d %H:%M:%S"),
        'duration': str(self.duration),
        'summary': self.result.get_summary(),
        'tableData': table_data
    }))

    self.write_report(report)
    unittest_logger.info("generate report to {}", self.report_output_path)

def write_report(self, report):
    if '{time}' in self.report_output_path:
        self.report_output_path = self.report_output_path.format(time=self.start_time.strftime("%Y%m%d%H%M%S"))

    file_path = Path(self.report_output_path)
    unittest_logger.info('will write report to {}', file_path)

    if not file_path.is_absolute():
        file_path = file_path.absolute()
        unittest_logger.info('report resolve to {}', file_path)

    if not file_path.exists():
        file_path.parent.mkdir(exist_ok=True)
        unittest_logger.info('make report dir: {}', file_path.parent)

    with file_path.open('w', encoding='utf-8') as w:
        w.write(report)
```

</TabItem>
</Tabs>