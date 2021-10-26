---
title: 单文件中使用 Vue 和 Element-Plus
---

## Vue

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="../js/vue3.global.js"></script>

    <title>Title</title>
</head>
<body>
<div id="app">
    {{ message }}
</div>
<script type="text/javascript">

    const App = {
        data() {
            return {
                message: "Hello Vue",
            };
        },
    };
    const app = Vue.createApp(App);
    app.mount("#app");

</script>
</body>
</html>
```

## Element-Plus

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/element-plus.css">
    <script src="../js/vue3.global.js"></script>
    <script src="../js/element-plus.js"></script>

    <title>Title</title>
</head>
<body>
<div id="app">
    <el-button>{{ message }}</el-button>
</div>
<script type="text/javascript">
    const App = {
        data() {
            return {
                message: "Hello Element Plus",
            };
        },
    };
    const app = Vue.createApp(App);
    app.use(ElementPlus);
    app.mount("#app");
</script>
</body>
</html>
```
