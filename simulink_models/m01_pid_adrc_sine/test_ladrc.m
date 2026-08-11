function test_ladrc()
% TEST_LADRC  纯 MATLAB 验证 LADRC 算法 (脱离 Simulink)
% 复现模型1参数: 对象 G(s)=100/(s^2+10s+100), 输入 r=sin(pi*t), rdot=pi*cos(pi*t)

% LADRC 参数
w_o = 30;    b0 = 100;    w_c = 15;    h = 0.001;
beta1 = 3*w_o;    beta2 = 3*w_o^2;    beta3 = w_o^3;
k1 = w_c^2;       k2 = 2*w_c;

% 仿真
T_end = 4;
t = (0:h:T_end)';
N = numel(t);
r    = sin(pi*t);            % 参考 0.5Hz
rdot = pi*cos(pi*t);         % 参考导数

% 对象状态 (连续二阶: y'' + 10*y' + 100*y = 100*u)
y = zeros(N,1);  ydot = zeros(N,1);
% LADRC 状态
z1 = 0; z2 = 0; z3 = 0; u_prev = 0;
u_log = zeros(N,1);
z1_log = zeros(N,1); z2_log = zeros(N,1); z3_log = zeros(N,1);

for k = 1:N-1
    % 当前输出
    yk = y(k);
    % LADRC
    e = yk - z1;
    z1 = z1 + h*(z2 + beta1*e);
    z2 = z2 + h*(z3 + beta2*e + b0*u_prev);
    z3 = z3 + h*(beta3*e);
    u0 = k1*(r(k) - z1) + k2*(rdot(k) - z2);
    u = (u0 - z3)/b0;
    u = max(min(u, 500), -500);
    u_prev = u;
    u_log(k) = u; z1_log(k) = z1; z2_log(k) = z2; z3_log(k) = z3;

    % 对象离散更新 (RK4 简化为前向 Euler, 步长 h)
    ydot(k+1) = ydot(k) + h*(-10*ydot(k) - 100*y(k) + 100*u);
    y(k+1)    = y(k) + h*ydot(k);
end
u_log(end) = u; z1_log(end) = z1; z2_log(end) = z2; z3_log(end) = z3;

% 统计
fprintf('--- LADRC 纯MATLAB验证 ---\n');
fprintf('  r:   min=%.3f max=%.3f\n', min(r), max(r));
fprintf('  y:   min=%.3f max=%.3f\n', min(y), max(y));
fprintf('  u:   min=%.3f max=%.3f mean=%.3f\n', min(u_log), max(u_log), mean(u_log));
fprintf('  z1:  min=%.3f max=%.3f\n', min(z1_log), max(z1_log));
fprintf('  z2:  min=%.3f max=%.3f\n', min(z2_log), max(z2_log));
fprintf('  z3:  min=%.3f max=%.3f\n', min(z3_log), max(z3_log));
fprintf('  err: min=%.3f max=%.3f\n', min(r-y), max(r-y));

figure('Name','LADRC pure MATLAB','Position',[100 100 1000 600]);
subplot(2,2,1); plot(t, r, 'k--', t, y, 'r-'); legend('r','y'); grid on; title('跟踪');
subplot(2,2,2); plot(t, u_log); grid on; title('u'); ylabel('u');
subplot(2,2,3); plot(t, z1_log, 'b', t, z2_log, 'g', t, z3_log, 'm'); legend('z1','z2','z3'); grid on; title('ESO states');
subplot(2,2,4); plot(t, r-y); grid on; title('err');
saveas(gcf, fullfile(fileparts(mfilename('fullpath')), 'ladrc_pure.png'));
end
