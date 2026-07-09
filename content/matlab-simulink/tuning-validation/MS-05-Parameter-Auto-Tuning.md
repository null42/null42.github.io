---
title: MS-05 参数自整定与仿真验证
date: 2026-07-09
quality: curated
status: learning
visibility: public
order: 60
summary: 从手动参数扫描开始理解自整定，把指标函数、参数范围、日志记录和结果复核连成一条可靠流程。
---

# MS-05 参数自整定与仿真验证

参数自整定不是按一个按钮得到完美参数。它的核心是定义目标、约束范围、批量仿真、比较指标，再回到模型检查结果是否可信。

## 1. 先写指标函数

在控制系统里，一个简单指标可以由误差、控制量和超调组成：

$$
J = w_e \sum_k e[k]^2 T_s + w_u \sum_k u[k]^2 T_s + w_o M_p
$$

其中 `e[k]` 是误差，`u[k]` 是控制量，`M_p` 是超调。权重不是越多越好，新手先用三项就够。

## 2. 参数扫描

先做网格扫描，比直接用优化器更容易理解。

```matlab
KpList = linspace(0.2, 2.0, 10);
KiList = linspace(5, 80, 10);

best.J = inf;
for i = 1:numel(KpList)
    for j = 1:numel(KiList)
        result = run_case(KpList(i), KiList(j));
        if result.J < best.J
            best = result;
        end
    end
end

disp(best);
```

`run_case` 应该返回曲线和指标，而不是只返回一个分数。否则你可能得到一个分数很低但波形不可接受的参数。

## 3. 从扫描到自整定

常见流程如下：

```mermaid
flowchart LR
  Range["设置参数范围"] --> Batch["批量仿真"]
  Batch --> Metric["计算指标"]
  Metric --> Pick["选择候选参数"]
  Pick --> Review["复核波形和约束"]
  Review --> Narrow["缩小范围"]
  Narrow --> Batch
```

自动化的重点是减少重复劳动，不是取消判断。每轮扫描后都要看候选波形，确认没有靠过度饱和、过大控制量或模型漏洞拿到好分数。

## 4. 结果表格

建议每次输出一张表：

| Kp | Ki | 超调 | 调节时间 | 稳态误差 | 控制量峰值 | 指标 J |
| --- | --- | --- | --- | --- | --- | --- |
| 0.8 | 30 | 0.04 | 0.18 s | 0.002 | 0.72 | 1.35 |
| 1.2 | 45 | 0.11 | 0.12 s | 0.001 | 1.00 | 1.42 |
| 0.5 | 20 | 0.00 | 0.35 s | 0.004 | 0.48 | 1.80 |

看表格时不要只看 `J` 最小。控制量峰值贴近饱和、超调过大、调节时间太长，都可能让参数不适合实机。

## 5. Simulink 批量仿真接口

```matlab
model = "discrete_pi_model";
in = Simulink.SimulationInput(model);
in = in.setVariable("Kp", 0.8);
in = in.setVariable("Ki", 30.0);
in = in.setVariable("Ts", 1e-3);

out = sim(in);
logs = out.logsout;
```

批量仿真时，参数要从脚本传入模型，不要手动改模块对话框。这样每次实验都可复现，也方便以后接入优化器。

## 6. 自整定验收

| 验收项 | 说明 |
| --- | --- |
| 参数范围合理 | 不搜索明显不可能的区域 |
| 指标函数可解释 | 每一项都对应真实需求 |
| 候选波形可接受 | 不是只看单个分数 |
| 饱和次数可统计 | 避免参数依赖长期饱和 |
| 结果可复现 | 同一脚本重复运行得到同一候选 |

等这些都稳定后，再考虑 `fminsearch`、`patternsearch`、Simulink Design Optimization 或更复杂的自动整定工具。
