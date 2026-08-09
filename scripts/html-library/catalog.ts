export interface HtmlDocumentSource {
  slug: string
  title: string
  description: string
  source: string
  assets?: string[]
}

export const HTML_DOCUMENT_SOURCES: HtmlDocumentSource[] = [
  {
    slug: 'imu-dashboard',
    title: 'IMU 姿态采集与识别上位机',
    description: '包含串口、姿态仪表盘、曲线、离线回放与数据导出的交互式 IMU 页面。',
    source: 'Attitude and Navigation/imu-dashboard-demo/index.html',
    assets: [
      'Attitude and Navigation/imu-dashboard-demo/styles.css',
      'Attitude and Navigation/imu-dashboard-demo/app.js',
    ],
  },
  {
    slug: 'pid-explorer',
    title: 'PID 二阶对象交互实验',
    description: '交互观察 PID 参数对二阶对象时域响应与稳定性的影响。',
    source: 'MotorControl-main/Controllers-from-PID-to-QP_MPC-main/pid_explorer.html',
  },
  {
    slug: 'root-locus-explorer',
    title: '根轨迹交互实验',
    description: '通过交互式根轨迹理解闭环极点、增益与瞬态响应之间的关系。',
    source: 'MotorControl-main/Controllers-from-PID-to-QP_MPC-main/root_locus_explorer.html',
  },
  {
    slug: 'current-loop-pi-calculator',
    title: '电流环 PI 参数整定计算器',
    description: '根据电机与采样参数计算电流环 PI 初值并展示关键设计指标。',
    source: 'MotorControl-main/motor-control-knowledge-base/algorithm/ALG-00-PI-Calculator.html',
  },
  {
    slug: 'pole-zero-cancellation',
    title: '电流环 PI 零极点对消动画',
    description: '动画演示 PI 零点与电机电气极点对消时的动态变化。',
    source: 'MotorControl-main/motor-control-knowledge-base/algorithm/ALG-00-Pole-Zero-Animation.html',
  },
]
