function build_model()
% BUILD_MODEL  构建 PID vs LADRC 正弦跟踪对比模型
%   受控对象: G(s) = 100/(s^2 + 10s + 100)  (omega_n=10, zeta=0.5)
%   指令: r(t) = sin(2*pi*0.5*t)  (0.5 Hz, 幅值 1)
%   指标: 超调 < 2%, 调节时间 < 0.5s, 无振荡
%
%   设计要点:
%     - PID: 离散 PID, Kp=80, Ki=200, Kd=12, N=100, 采样 1ms
%     - LADRC: 三阶 LESO (带宽 omega_o=60), 线性状态误差反馈 (带宽 omega_c=25),
%              补偿增益 b0=10, 采样 1ms
%     - 仿真时长 4s, 变步长 ode45, 最大步长 5e-4
%     - 5 个 Scope 显示各环节波形:
%         Scope_Track : 参考 / PID 跟踪 / ADRC 跟踪
%         Scope_PID   : PID 误差 / PID 控制输出
%         Scope_ADRC  : ADRC 鉴相误差 / ADRC 控制输出
%         Scope_ESO   : z1(y跟踪) / z2(y导数) / z3(扰动估计)
%         Scope_Err   : PID 跟踪误差 / ADRC 跟踪误差

model = 'm01_pid_adrc_sine';
% 稳健关闭: 若已加载则强制关闭(不保存)
if bdIsLoaded(model)
    try
        bdclose(model, 0);
    catch
        try close_system(model, 0); catch, end
    end
end
new_system(model);
open_system(model);

% ---- 求解器配置 ----
set_param(model, 'Solver', 'ode45', ...
               'StopTime', '4', ...
               'MaxStep', '5e-4', ...
               'ReturnWorkspaceOutputs', 'off');

% ---- 参考正弦 + 参考导数 (cos 分量, 用于 LADRC 前馈) ----
add_block('simulink/Sources/Sine Wave', [model '/Ref'], ...
    'Amplitude', '1', 'Frequency', '2*pi*0.5', 'Phase', '0', ...
    'SampleTime', '0');
add_block('simulink/Sources/Sine Wave', [model '/Ref_dot'], ...
    'Amplitude', '2*pi*0.5', 'Frequency', '2*pi*0.5', 'Phase', 'pi/2', ...
    'SampleTime', '0');

% ---- PID 路径 ----
add_block('simulink/Math Operations/Sum', [model '/Err_PID'], ...
    'Inputs', '+-', 'IconShape', 'round');
add_block('simulink/Discrete/Discrete PID Controller', [model '/PID'], ...
    'P', '300', 'I', '1500', 'D', '15', 'N', '500', ...
    'SampleTime', '0.001', ...
    'TimeDomain', 'Continuous-time', ...
    'ExternalReset', 'none');
add_block('simulink/Continuous/Transfer Fcn', [model '/Plant_PID'], ...
    'Numerator', '[100]', 'Denominator', '[1 10 100]');

% ---- ADRC 路径 ----
add_block('simulink/Math Operations/Sum', [model '/Err_ADRC'], ...
    'Inputs', '+-', 'IconShape', 'round');
% LADRC 块: 输入 r, rdot, y; 输出 u, z1, z2, z3
add_block('simulink/User-Defined Functions/MATLAB Function', [model '/LADRC']);
config_ladrc([model '/LADRC']);
add_block('simulink/Continuous/Transfer Fcn', [model '/Plant_ADRC'], ...
    'Numerator', '[100]', 'Denominator', '[1 10 100]');

% ---- 信号汇总 (Mux) ----
add_block('simulink/Signal Routing/Mux', [model '/Mux3_Track'], 'Inputs', '3');
add_block('simulink/Signal Routing/Mux', [model '/Mux2_PID'],   'Inputs', '2');
add_block('simulink/Signal Routing/Mux', [model '/Mux2_ADRC'],  'Inputs', '2');
add_block('simulink/Signal Routing/Mux', [model '/Mux3_ESO'],   'Inputs', '3');
add_block('simulink/Signal Routing/Mux', [model '/Mux2_Err'],   'Inputs', '2');

% 误差计算: ref - y
add_block('simulink/Math Operations/Sum', [model '/CalcErrPID'], ...
    'Inputs', '+-', 'IconShape', 'round');
add_block('simulink/Math Operations/Sum', [model '/CalcErrADRC'], ...
    'Inputs', '+-', 'IconShape', 'round');

% ---- Scope (仅设置端口数; 数据导出用 To Workspace) ----
add_block('simulink/Sinks/Scope', [model '/Scope_Track'], 'NumInputPorts', '3');
add_block('simulink/Sinks/Scope', [model '/Scope_PID'],   'NumInputPorts', '2');
add_block('simulink/Sinks/Scope', [model '/Scope_ADRC'],  'NumInputPorts', '2');
add_block('simulink/Sinks/Scope', [model '/Scope_ESO'],   'NumInputPorts', '3');
add_block('simulink/Sinks/Scope', [model '/Scope_Err'],   'NumInputPorts', '2');

% Scope 命名说明 (不修改 Name 属性, 避免影响 add_line 寻址):
%   Scope_Track : 跟踪对比 参考/PID/ADRC
%   Scope_PID   : PID环节 误差/控制输出
%   Scope_ADRC  : ADRC环节 鉴相误差/控制输出
%   Scope_ESO   : ESO状态 z1/z2/z3
%   Scope_Err   : 跟踪误差 PID/ADRC

% ---- To Workspace (导出所有信号) ----
add_block('simulink/Sinks/To Workspace', [model '/ToWs'], ...
    'VariableName', 'sim_data', 'SaveFormat', 'Structure With Time');

% ============ 连线 ============
% PID 路径
add_line(model, 'Ref/1',         'Err_PID/1',     'autorouting', 'on');
add_line(model, 'Err_PID/1',     'PID/1',         'autorouting', 'on');
add_line(model, 'PID/1',         'Plant_PID/1',   'autorouting', 'on');
add_line(model, 'Plant_PID/1',   'Err_PID/2',     'autorouting', 'on');
% PID 跟踪误差
add_line(model, 'Ref/1',         'CalcErrPID/1',  'autorouting', 'on');
add_line(model, 'Plant_PID/1',   'CalcErrPID/2',  'autorouting', 'on');

% ADRC 路径 (LADRC 输入 r, rdot, y; 输出 u, z1, z2, z3)
% 注意: LADRC 内部自己计算误差, 输入1必须是参考r本身(不是r-y误差)
add_line(model, 'Ref/1',          'LADRC/1',       'autorouting', 'on');
add_line(model, 'Ref_dot/1',      'LADRC/2',       'autorouting', 'on');
add_line(model, 'Plant_ADRC/1',   'LADRC/3',       'autorouting', 'on');
add_line(model, 'LADRC/1',        'Plant_ADRC/1',  'autorouting', 'on');
% Err_ADRC 仅用于Scope显示 (r - y)
add_line(model, 'Ref/1',          'Err_ADRC/1',    'autorouting', 'on');
add_line(model, 'Plant_ADRC/1',   'Err_ADRC/2',    'autorouting', 'on');
% ADRC 跟踪误差
add_line(model, 'Ref/1',          'CalcErrADRC/1', 'autorouting', 'on');
add_line(model, 'Plant_ADRC/1',   'CalcErrADRC/2', 'autorouting', 'on');

% Scope_Track: 参考, PID输出, ADRC输出
add_line(model, 'Ref/1',         'Mux3_Track/1', 'autorouting', 'on');
add_line(model, 'Plant_PID/1',   'Mux3_Track/2', 'autorouting', 'on');
add_line(model, 'Plant_ADRC/1',  'Mux3_Track/3', 'autorouting', 'on');
add_line(model, 'Mux3_Track/1',  'Scope_Track/1','autorouting', 'on');

% Scope_PID: PID误差, PID控制输出
add_line(model, 'Err_PID/1',     'Mux2_PID/1',  'autorouting', 'on');
add_line(model, 'PID/1',         'Mux2_PID/2',  'autorouting', 'on');
add_line(model, 'Mux2_PID/1',    'Scope_PID/1', 'autorouting', 'on');

% Scope_ADRC: ADRC鉴相误差, ADRC控制输出
add_line(model, 'Err_ADRC/1',    'Mux2_ADRC/1',  'autorouting', 'on');
add_line(model, 'LADRC/1',       'Mux2_ADRC/2',  'autorouting', 'on');
add_line(model, 'Mux2_ADRC/1',   'Scope_ADRC/1', 'autorouting', 'on');

% Scope_ESO: z1, z2, z3
add_line(model, 'LADRC/2',       'Mux3_ESO/1',  'autorouting', 'on');
add_line(model, 'LADRC/3',       'Mux3_ESO/2',  'autorouting', 'on');
add_line(model, 'LADRC/4',       'Mux3_ESO/3',  'autorouting', 'on');
add_line(model, 'Mux3_ESO/1',    'Scope_ESO/1', 'autorouting', 'on');

% Scope_Err: PID误差, ADRC误差
add_line(model, 'CalcErrPID/1',  'Mux2_Err/1',  'autorouting', 'on');
add_line(model, 'CalcErrADRC/1', 'Mux2_Err/2',  'autorouting', 'on');
add_line(model, 'Mux2_Err/1',    'Scope_Err/1', 'autorouting', 'on');

% To Workspace: 6路信号 (参考、PID输出、ADRC输出、PID误差、ADRC误差、ADRC控制)
add_block('simulink/Signal Routing/Mux', [model '/Mux6'], 'Inputs', '6');
add_line(model, 'Ref/1',         'Mux6/1', 'autorouting', 'on');
add_line(model, 'Plant_PID/1',   'Mux6/2', 'autorouting', 'on');
add_line(model, 'Plant_ADRC/1',  'Mux6/3', 'autorouting', 'on');
add_line(model, 'CalcErrPID/1',  'Mux6/4', 'autorouting', 'on');
add_line(model, 'CalcErrADRC/1', 'Mux6/5', 'autorouting', 'on');
add_line(model, 'LADRC/1',       'Mux6/6', 'autorouting', 'on');
add_line(model, 'Mux6/1',        'ToWs/1', 'autorouting', 'on');

% 保存
save_system(model, fullfile(fileparts(mfilename('fullpath')), [model '.slx']));
fprintf('Model built: %s\n', model);
end

% ----------------------------------------------------------------------
function config_ladrc(block_path)
% 配置 MATLAB Function 块为 LADRC 控制器
% 输入: r (参考), y (测量)
% 输出: u (控制), z1 (y跟踪), z2 (y导数估计), z3 (扰动估计)

% 参数 (调试后确定: 兼顾响应速度与数值稳定性)
w_o = 50;    % LESO 带宽 (rad/s)
w_c = 30;    % 控制器带宽 (rad/s), 取 w_o*0.6
b0  = 100;   % 补偿增益 = 对象输入增益 (G(s)=100/(s^2+10s+100) 输入增益=100)
h   = 0.001; % 采样时间

% LESO 增益 (极点配置: -w_o 三重根)
beta1 = 3*w_o;       % 150
beta2 = 3*w_o^2;     % 7500
beta3 = w_o^3;       % 125000  ->  h*beta3 = 125 (前向 Euler 临界稳定)

% LSEF 增益 (极点配置: -w_c 二重根)
k1 = w_c^2;          % 900
k2 = 2*w_c;          % 60

code_lines = {
    '% LADRC: 二阶对象, 三阶 LESO, 线性状态误差反馈 + 参考导数前馈', ...
    '% 输入: r (参考), rdot (参考导数), y (测量)', ...
    '% 输出: u (控制), z1 (y跟踪), z2 (y导数), z3 (扰动估计)', ...
    'function [u, z1, z2, z3] = fcn(r, rdot, y)', ...
    '%#codegen', ...
    'persistent z1s z2s z3s u_prev', ...
    'if isempty(z1s)', ...
    '    z1s = 0; z2s = 0; z3s = 0; u_prev = 0;', ...
    'end', ...
    sprintf('h = %.10f;', h), ...
    sprintf('b0 = %.10f;', b0), ...
    sprintf('beta1 = %.10f; beta2 = %.10f; beta3 = %.10f;', beta1, beta2, beta3), ...
    sprintf('k1 = %.10f; k2 = %.10f;', k1, k2), ...
    '% 三阶 LESO 离散更新 (前向 Euler)', ...
    'e = y - z1s;', ...
    'z1s = z1s + h * (z2s + beta1 * e);', ...
    'z2s = z2s + h * (z3s + beta2 * e + b0 * u_prev);', ...
    'z3s = z3s + h * (beta3 * e);', ...
    '% 线性状态误差反馈 (含参考导数前馈) + 扰动前馈', ...
    'u0 = k1 * (r - z1s) + k2 * (rdot - z2s);', ...
    'u = (u0 - z3s) / b0;', ...
    'u = max(min(u, 500), -500);  % 输入饱和 +-500', ...
    'u_prev = u;', ...
    '% 输出状态', ...
    'z1 = z1s; z2 = z2s; z3 = z3s;', ...
    'end' ...
};
code = strjoin(code_lines, newline);

% 通过 Stateflow API 设置 MATLAB Function 代码
sf = sfroot;
chart = sf.find('-isa', 'Stateflow.EMChart', 'Path', block_path);
if isempty(chart)
    error('Cannot find MATLAB Function chart at %s', block_path);
end
chart.Script = code;

% 设置 MATLAB Function 块的采样时间为离散 0.001s
% (persistent 变量必须搭配显式采样时间, 否则继承采样时间会报错)
% MATLAB Function 块底层是 Stateflow EMChart, 需先设 ChartUpdate=DISCRETE 再设 SampleTime
try
    chart.ChartUpdate = 'DISCRETE';
    chart.SampleTime  = '0.001';
catch ME
    warning('设置 chart 采样时间失败: %s', ME.message);
end
end
