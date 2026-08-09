% Clear workspace
close all
clear all
clear
clc

% Load model parameters
Ts                  = 5e-7;                     % [s] Model sampling time (1MHz)
Ts_ctrl             = 100e-6;                   % [s] Controller sampling time 10kHz(100us)
PWM_Cnt             = 6000;
PWM_Half_Cnt        = PWM_Cnt/2;

PWM_MODE0 = 0;
PWM_MODE1 = 1;

ADC_Trigger_Top = 1;
ADC_Trigger_Bottom = 2;
ADC_Trigger_Both = 3;

TIMER_PWM_MODE = PWM_MODE1;
ADC_Trigger = ADC_Trigger_Top;

%Simulink provider Motor parameters
n_polePairs  = 5;        % [-] Number of motor pole pairs
PM           = 0.018;   % Permanent magnet flux linkage,
Ld            = 0.043e-3;
Lq            = 0.060e-3;
Rs            = 0.015;
J            = 0.020; % Moment of inertia,
B            = 0.000;

Udc        = 96;      % DCbus max voltage

motor_init_angle = 0/n_polePairs;

%% 编码器参数
enc_cpr = 4095;

%% 相电流和母线电流采样电阻
Rshut = 0.001;
%% 相电流采样滤波
Rphase = 120;
Cphase = 2.2e-9;
%% 母线支撑电容和采样滤波
Vbus_C = 3000e-6;
Rdc = 2000;
Cdc = 470e-9;
%%母线电压采集分压
R1 = 400e3;
R2 = 12e3;
%% mos内阻
mos_r = 0.001;

%% set vd && vq
vd = 0.2 * Udc;
vq = 0.2 * Udc; %%sqrt((1/sqrt(3) * Udc)*(1/sqrt(3) * Udc) - vd * vd);