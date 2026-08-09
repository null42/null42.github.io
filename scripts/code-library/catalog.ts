export interface CodeProjectSource {
  codeId: string
  title: string
  description: string
  files: string[]
  root?: 'learning' | 'repository'
}

export const CODE_PROJECT_SOURCES: CodeProjectSource[] = [
  {
    codeId: 'motor-speed-profile-article',
    title: '电机仿真速度曲线文章摘录',
    description: '文章使用的速度指令、逆变器补偿与观测器信号代码摘录。',
    root: 'repository',
    files: [
      'content/motor/simulation/code-examples/02-custom-speed-profile/pmsm_comm_modified_excerpt.c',
      'content/motor/simulation/code-examples/03-enable-inverter-nonlinearity/ACMSim_modified_excerpt.h',
      'content/motor/simulation/code-examples/04-add-observer-signal/utility_modified_excerpt.c',
    ],
  },
  {
    codeId: 'axdr-foc-core',
    title: 'AxDr FOC 核心与编码器',
    description: '电流环、坐标变换、PWM 驱动与编码器反馈实现。',
    files: [
      'AxDr/AxDr/User/motor/foc_ctrl.c',
      'AxDr/AxDr/User/motor/foc_ctrl.h',
      'AxDr/AxDr/User/motor/foc_calc.c',
      'AxDr/AxDr/User/motor/foc_calc.h',
      'AxDr/AxDr/User/motor/encoder.c',
      'AxDr/AxDr/User/motor/encoder.h',
    ],
  },
  {
    codeId: 'motor-foc-simulink',
    title: '电机 FOC Simulink 工程',
    description: 'FOC/SVPWM 模型初始化与构建脚本，并保留原始 SLX 模型下载。',
    files: [
      'foc_controller-master/motor_controller/Simulink/mc_init.m',
      'foc_controller-master/motor_controller/Simulink/build_foc.m',
      'foc_controller-master/motor_controller/Simulink/motor_foc.slx',
      'foc_controller-master/motor_controller/Simulink/svpwm.slx',
    ],
  },
  {
    codeId: 'imu-attitude-madgwick',
    title: 'IMU Madgwick 姿态解算',
    description: '嵌入式 Madgwick 姿态融合示例及 IMU 数据入口。',
    files: [
      'Attitude and Navigation/Madgwick算法在嵌入式平台上的使用/main.c',
      'Attitude and Navigation/Madgwick算法在嵌入式平台上的使用/main.h',
      'Attitude and Navigation/ekf姿态解算（c8t6）/Hardware/icm20602.c',
    ],
  },
  {
    codeId: 'python-error-state-ekf',
    title: 'Python Error-State EKF',
    description: '自动驾驶定位课程中的误差状态 EKF 与旋转工具。',
    files: [
      'Attitude and Navigation/Coursera-State-Estimation-and-Localization-for-Self-Driving-Cars-main/Module5/Final Project/es_ekf.py',
      'Attitude and Navigation/Coursera-State-Estimation-and-Localization-for-Self-Driving-Cars-main/Module5/Final Project/rotations.py',
    ],
  },
]
