## miniMsg

#### 组件目的

为页面操作提供弱提示

备注：主要用于简洁的单行提示，如提交成功 / 提交失败。

#### 组件理念

该组件为单纯的提示框，即用即销毁，当一个弹出提示执行完动画后立即销毁。

#### 配置项



##### content
必填项

弹框提示内容



##### type

非必填项

弹框类型，共四种类型: success / error / warning / info，分别针对正确 / 错误 / 警告 / 提示 信息。



##### container 

非必填项

﻿承载信息框的外层容器，默认为body



##### duration

非必填项

信息框的停留时长，默认为不停留，显示到底2s收回。



##### top

非必填项

信息框显示完成后距离顶部的高度。默认为16。



#### 方法



##### animation

执行信息框动画，通过执行该方法来显示一个信息框。

