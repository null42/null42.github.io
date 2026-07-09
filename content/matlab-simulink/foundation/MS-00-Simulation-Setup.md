---
title: MS-00 环境与最小离散控制模型
date: 2026-07-09
quality: curated
status: learning
visibility: public
order: 10
summary: 用一个一阶对象和离散 PI 控制器建立最小仿真闭环，先跑通采样周期、状态更新、限幅和日志。
---

# MS-00 环境与最小离散控制模型

新手做仿真最容易卡在工具细节上。更好的开始方式是先写一个小到不能再小的闭环：一个一阶对象，一个离散 PI，一个采样周期，一组日志。

## 1. 建模边界

最小模型只保留这些量：

| 变量 | 含义 | 建议初值 |
| --- | --- | --- |
| `Ts` | 控制器采样周期 | `1e-4` 到 `1e-3` |
| `tau` | 一阶对象时间常数 | `0.02` |
| `ref` | 目标值 | `1.0` |
| `u` | 控制输出 | 限幅到 `[-1, 1]` |
| `y` | 对象输出 | 初值为 `0` |

连续一阶对象可以写成：

$$
\dot y = \frac{-y + K u}{\tau}
$$

用前向欧拉离散化后，每个采样周期更新一次：

$$
y[k+1] = y[k] + T_s \frac{-y[k] + K u[k]}{\tau}
$$

## 2. 最小 Matlab 脚本

```matlab
Ts = 1e-3;
Tend = 1.0;
N = round(Tend / Ts);

Kplant = 1.0;
tau = 0.02;
Kp = 0.8;
Ki = 30.0;

ref = ones(1, N);
y = zeros(1, N);
u = zeros(1, N);
integ = 0;

for k = 1:N-1
    err = ref(k) - y(k);
    integ = integ + Ts * err;
    u(k) = Kp * err + Ki * integ;
    u(k) = min(max(u(k), -1.0), 1.0);

    y(k + 1) = y(k) + Ts * (-y(k) + Kplant * u(k)) / tau;
end

t = (0:N-1) * Ts;
plot(t, ref, '--', t, y);
grid on;
legend('ref', 'y');
xlabel('time / s');
```

先不要急着调复杂参数。确认曲线能跟踪、输出没有无限增大、改变 `Ts` 后结果有合理变化，这一步才算过关。

## 3. 最小检查表

| 检查项 | 通过标准 |
| --- | --- |
| 采样周期统一 | 脚本、模型、控制器都使用同一个 `Ts` |
| 控制输出有限 | `u` 有明确上下限 |
| 状态更新只有一次 | 每个循环只更新一次 `y[k+1]` |
| 日志长度一致 | `t`、`ref`、`y`、`u` 长度一致 |
| 参数可复现实验 | 改 `Kp`、`Ki` 后曲线变化能解释 |

## 4. 什么时候进入 Simulink

当你能用脚本解释每个变量的来源，再进入 Simulink 会顺很多。Simulink 的价值不是替代思考，而是把采样、模块边界、数据流和多速率关系展示出来。
