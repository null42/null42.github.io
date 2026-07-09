---
title: MS-03 Matlab Function 使用
date: 2026-07-09
quality: curated
status: learning
visibility: public
order: 40
summary: 讲清 Matlab Function 模块适合封装什么、输入输出如何定型、persistent 状态如何保存，以及代码生成前要检查什么。
---

# MS-03 Matlab Function 使用

Matlab Function 模块适合把一小段算法放进 Simulink，例如限幅、坐标变换、离散控制器、状态机。它不适合一开始就塞进整个系统。

## 1. 适合封装的内容

| 内容 | 是否适合 | 原因 |
| --- | --- | --- |
| 简单数学变换 | 适合 | 输入输出清楚 |
| 离散 PI 控制器 | 适合 | 可以用 `persistent` 保存积分状态 |
| 复杂对象模型 | 谨慎 | 调试不如框图直观 |
| 大量文件读写 | 不适合 | 仿真和代码生成边界不清 |
| 参数扫描外层流程 | 不适合 | 应放在 Matlab 脚本控制 |

## 2. 最小 PI 模块

```matlab
function u = pi_controller(ref, fbk, Kp, Ki, Ts, uMax)
%#codegen
persistent integ
if isempty(integ)
    integ = 0;
end

err = ref - fbk;
integ = integ + Ts * err;
integ = min(max(integ, -uMax), uMax);

u = Kp * err + Ki * integ;
u = min(max(u, -uMax), uMax);
end
```

`persistent` 相当于模块内部状态。它在仿真开始时初始化，在每个采样周期保留上一次值。新手要特别注意：如果你点击停止再运行，状态会重新初始化；如果只暂停再继续，状态不会丢。

## 3. 输入输出定型

Matlab Function 最容易报错的地方是尺寸和类型不明确。推荐在模块编辑器里明确：

| 项目 | 建议 |
| --- | --- |
| 输入维度 | 标量写 `1`，向量写固定长度 |
| 数据类型 | 控制算法先用 `double` 验证，再考虑 `single` 或定点 |
| 可变尺寸 | 新手阶段先关闭 |
| 采样时间 | 由外部离散模块或触发子系统控制 |

## 4. 代码生成前检查

如果这个模块未来要生成 C 代码，先避免这些写法：

```matlab
% 不建议在可生成代码模块里使用
eval('Kp = 1');
load('params.mat');
plot(y);
disp("debug text");
```

更稳的做法是把参数作为输入或 Simulink.Parameter 管理，把调试输出交给 Scope、To Workspace 或日志模块。

## 5. 新手调试顺序

先用常数输入测试模块，再接入真实反馈。先验证无状态算法，再加入 `persistent` 状态。先在浮点下跑通，再考虑定点和代码生成。每次只增加一个复杂度，问题会少很多。
