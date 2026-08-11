function run_sim()
% RUN_SIM  运行模型1, 验证指标 (超调<2%, ts<0.5s, 无振荡) 并保存结果图
% 评估方法:
%   - 超调: 瞬态过程中 |y-r|/|r_max| 的最大值 (相对参考峰值的最大相对偏差)
%   - 调节时间: 误差 |y-r| 首次持续 (<2% 峰值) 的时刻
%   - 无振荡: 误差信号过零次数 < 5
model = 'm01_pid_adrc_sine';
fprintf('=== Running %s ===\n', model);
sim(model);

% 从工作区取数据 (To Workspace 块导出为 sim_data: Structure With Time)
if ~exist('sim_data', 'var')
    error('sim_data not found in workspace. Check To Workspace block.');
end
t  = sim_data.time;
ys = sim_data.signals.values;   % [N x 6]: ref, y_pid, y_adrc, err_pid, err_adrc, u_adrc
ref    = ys(:,1);
y_pid  = ys(:,2);
y_adrc = ys(:,3);
e_pid  = ys(:,4);
e_adrc = ys(:,5);
u_adrc = ys(:,6);

% 评估指标 (取前 1.5s 内瞬态过程评估)
peak_ref = max(abs(ref(:)));
if peak_ref <= 0; peak_ref = 1; end
tol = 0.02 * peak_ref;

[os_pid,  ts_pid,  osc_pid]  = analyze_transient(t, y_pid,  ref, tol);
[os_adrc, ts_adrc, osc_adrc] = analyze_transient(t, y_adrc, ref, tol);

fprintf('\n--- PID 跟踪 ---\n');
fprintf('  Max relative deviation = %.2f%% (limit 2%%)  %s\n', ...
    os_pid*100, pass_fail(os_pid <= 0.02));
fprintf('  Settling time  = %.4f s (limit 0.5s)  %s\n', ...
    ts_pid, pass_fail(ts_pid <= 0.5));
fprintf('  Oscillation count = %d (limit <5)  %s\n', ...
    osc_pid, pass_fail(osc_pid < 5));
fprintf('  Steady RMS err (last 1s) = %.4f\n', rms(e_pid(t>=3)));

fprintf('\n--- LADRC 跟踪 ---\n');
fprintf('  Max relative deviation = %.2f%% (limit 2%%)  %s\n', ...
    os_adrc*100, pass_fail(os_adrc <= 0.02));
fprintf('  Settling time  = %.4f s (limit 0.5s)  %s\n', ...
    ts_adrc, pass_fail(ts_adrc <= 0.5));
fprintf('  Oscillation count = %d (limit <5)  %s\n', ...
    osc_adrc, pass_fail(osc_adrc < 5));
fprintf('  Steady RMS err (last 1s) = %.4f\n', rms(e_adrc(t>=3)));

% LADRC 内部信号诊断 (从 Scope_ESO 信号 - 但 sim_data 只有6路, 这里只看 u_adrc)
fprintf('\n--- LADRC 内部诊断 ---\n');
fprintf('  u_adrc: min=%.2f, max=%.2f, mean=%.2f\n', min(u_adrc), max(u_adrc), mean(u_adrc));
fprintf('  y_adrc: min=%.4f, max=%.4f\n', min(y_adrc), max(y_adrc));
fprintf('  e_adrc: min=%.4f, max=%.4f\n', min(e_adrc), max(e_adrc));
% 检查 u 是否饱和
sat_count = sum(abs(u_adrc) > 499);
fprintf('  u_adrc saturated samples: %d / %d\n', sat_count, numel(u_adrc));

% 保存对比图
fig = figure('Name', model, 'Position', [100 100 1000 600]);
subplot(2,2,1);
plot(t, ref, 'k--', t, y_pid, 'b-', t, y_adrc, 'r-', 'LineWidth', 1.2);
legend('Reference','PID','LADRC','Location','best'); xlabel('t (s)'); ylabel('y');
grid on; title('跟踪对比');
subplot(2,2,2);
plot(t, e_pid, 'b-', t, e_adrc, 'r-', 'LineWidth', 1.0);
legend('PID err','LADRC err','Location','best'); xlabel('t (s)'); ylabel('error');
grid on; title('跟踪误差');
subplot(2,2,3);
plot(t, u_adrc, 'm-', 'LineWidth', 1.0); xlabel('t (s)'); ylabel('u');
grid on; title('ADRC 控制输出 u');
subplot(2,2,4);
plot(t, ys(:,1)-ys(:,2), 'b-', t, ys(:,1)-ys(:,3), 'r-', 'LineWidth', 1.0);
legend('PID','LADRC','Location','best'); xlabel('t (s)'); ylabel('ref - y');
grid on; title('跟踪误差放大');
saveas(fig, fullfile(fileparts(mfilename('fullpath')), 'result.png'));
fprintf('\nFigure saved to result.png\n');
end

function [os, ts, osc] = analyze_transient(t, y, r, tol)
% 瞬态指标:
%   os  : |y-r|/|r|_max 的最大相对偏差 (取前 1.5s)
%   ts  : 误差最后一次超出 tol 的时刻 (即从该时刻起误差持续在容差内)
%   osc : 误差信号过零次数 (前 1.5s)
mask = t <= 1.5;
tt = t(mask);
ee = (y(mask) - r(mask));
peak_r = max(abs(r(mask)));
if peak_r <= 0; peak_r = 1; end
os = max(abs(ee)) / peak_r;
% 调节时间: 最后一次 |e|>tol 的时刻
outside = abs(ee) > tol;
if any(outside)
    ts = tt(find(outside, 1, 'last'));
else
    ts = 0;
end
% 振荡次数: 误差过零次数
zc = sum(diff(sign(ee)) ~= 0);
osc = zc;
end

function s = pass_fail(cond)
if cond
    s = '[PASS]';
else
    s = '[FAIL]';
end
end
