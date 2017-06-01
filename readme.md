## 介绍

为页面操作提供弱提示。主要用于简洁的单行提示，如提交成功 / 提交失败。

该组件为单纯的提示框，即用即销毁，当一个弹出提示执行完动画后立即销毁。

## [在线demo](https://codepen.io/rubyisapm/pen/vmooQK)
## 使用

1.直接引用

npm版本和内部系统中的资源保持一致，可以直接通过script方式引入：
```
<script src='domain/cdn/component/minimsg/1.5.0/src/js/minimsg-umd.js'></script>
<link rel="stylesheet" href="domain/cdn/component/miniMsg/1.5.0/src/css/minimsg.css">
```

2. npm方式

```
// 安装

npm install ct-adc-mini-msg

// 使用示例
import MiniMsg from 'ct-adc-mini-msg';
import 'ct-adc-mini-msg/src/css/miniMsg.css';

var miniMsg = new MiniMsg({
    content: '操作成功，将为您刷新页面...',
    type: 'success',
    duration: 1
});

miniMsg.animation();
```

#### 配置项

 参数 | 描述 | 类型 | 是否必填 | 默认值
-- | -- | -- | -- | --
content | 提示内容 | String | 必填 | ''
type | 提示类型 | String['success'|'error'|'warning'|'info'] | 非必填 | 'info'
container | ﻿承载信息框的外层容器 |DOM|非必填|body
duration | 信息框的停留时长，单位:秒 | Number | 非必填 | 2
top | 信息框容器顶部的最大高度 | Number | 非必填 | 16

#### 方法

##### animation

参数: callback 非必填 执行完动画后的回调函数

执行信息框动画，通过执行该方法来显示一个信息框。

