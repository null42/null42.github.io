/**
 * IMU 姿态采集与识别上位机 - 完整 JavaScript 逻辑
 *
 * 功能模块：
 *  1. 左侧导航切换（核心修复）
 *  2. 统一数据绑定架构（state 对象 + 三种数据源）
 *  3. Web Serial API 串口通信
 *  4. Canvas 绘制（仪表盘 / 曲线图 / 火花线）
 *  5. CSS 3D 姿态方块
 *  6. 模拟数据生成
 *  7. 数据录制与 CSV 导出
 *  8. 离线回放（CSV 导入）
 *  9. 系统日志
 * 10. 定时器与缩放适配
 */

/* ============================================================
 *   第一部分：工具函数与全局常量
 * ============================================================ */

/** 快捷获取 DOM 元素 */
const $ = (id) => document.getElementById(id);

/** 数值格式化：保留指定小数位数 */
function n(value, digits = 2) {
  return Number(value).toFixed(digits);
}

/** 毫秒转 HH:MM:SS 格式 */
function duration(ms) {
  const s = Math.floor(ms / 1000);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

/** 欧拉角 -> 四元数转换（ZYX 顺序，角度单位为度） */
function eulerToQuaternion(roll, pitch, yaw) {
  const r = roll * Math.PI / 360;
  const p = pitch * Math.PI / 360;
  const y = yaw * Math.PI / 360;
  const cr = Math.cos(r), sr = Math.sin(r);
  const cp = Math.cos(p), sp = Math.sin(p);
  const cy = Math.cos(y), sy = Math.sin(y);
  return {
    qw: cr * cp * cy + sr * sp * sy,
    qx: sr * cp * cy - cr * sp * sy,
    qy: cr * sp * cy + sr * cp * sy,
    qz: cr * cp * sy - sr * sp * cy,
  };
}

/* ============================================================
 *   第二部分：统一状态对象（数据绑定核心）
 * ============================================================ */

/**
 * 全局状态对象 —— 所有界面元素的数据唯一来源
 * 支持三种数据源写入：模拟数据 / 串口数据 / 回放数据
 */
const state = {
  // ---- 姿态欧拉角（度）----
  roll: 0,
  pitch: 0,
  yaw: 0,

  // ---- 四元数（归一化）----
  qw: 1,
  qx: 0,
  qy: 0,
  qz: 0,

  // ---- 加速度（g）----
  ax: 0,
  ay: 0,
  az: 0,

  // ---- 角速度（°/s）----
  gx: 0,
  gy: 0,
  gz: 0,

  // ---- 磁场强度（μT）----
  mx: 0,
  my: 0,
  mz: 0,

  // ---- 扩展字段（可从串口传入）----
  activity: "Unknown",     // 动作识别结果
  confidence: 0,           // 置信度 0-100
  temperature: 36.5,       // 温度 ℃
  voltage: 3.72,           // 电压 V
  health: 100,             // 设备健康度 %
};

/* ============================================================
 *   第三部分：UI 元素引用集合
 * ============================================================ */

const ui = {
  // 外壳 & 导航
  app: document.querySelector(".app-shell"),
  navButtons: document.querySelectorAll(".nav"),
  pages: document.querySelectorAll(".page"),

  // 首页卡片
  imuStatus: $("imu-status"),
  runTimeA: $("run-time-a"),
  sampleRate: $("sample-rate"),
  targetRate: $("target-rate"),
  packetRate: $("packet-rate"),
  lossRate: $("loss-rate"),
  latency: $("latency"),
  avgLatency: $("avg-latency"),
  storageUsed: $("storage-used"),
  storageFree: $("storage-free"),
  runTimeB: $("run-time-b"),

  // 仪表盘
  rollGauge: $("roll-gauge"),
  pitchGauge: $("pitch-gauge"),
  yawGauge: $("yaw-gauge"),
  rollValue: $("roll-value"),
  pitchValue: $("pitch-value"),
  yawValue: $("yaw-value"),

  // 3D 方块
  // 3D方块（Canvas渲染）
  cube: $("cube-canvas"),
  poseReadout: $("pose-readout"),

  // 实时曲线图
  chart: $("attitude-chart"),

  // 传感器数值 & 火花线
  ax: $("ax"), ay: $("ay"), az: $("az"),
  gx: $("gx"), gy: $("gy"), gz: $("gz"),
  mx: $("mx"), my: $("my"), mz: $("mz"),

  // 动作识别
  activity: $("activity"),
  confidence: $("confidence"),
  confidenceBar: $("confidence-bar"),

  // 录制面板
  recRing: $("rec-ring"),
  recordState: $("record-state"),
  recordTime: $("record-time"),
  fileSize: $("file-size"),
  recordToggle: $("record-toggle"),
  recordToggle2: $("record-toggle-2"),
  downloadCsv: $("download-csv"),

  // 日志
  logList: $("log-list"),
  clearLog: $("clear-log"),

  // 串口配置
  dataSource: $("data-source"),
  baudRate: $("baud-rate"),
  baudView: $("baud-view"),
  portName: $("port-name"),
  connectSerial: $("connect-serial"),
  disconnectSerial: $("disconnect-serial"),
  framePrefix: $("frame-prefix"),
  frameSeparator: $("frame-separator"),
  fieldMap: $("field-map"),
  checksumMode: $("checksum-mode"),

  // 回放控制
  playbackFile: $("playback-file"),
  playbackStart: $("playback-start"),
  playbackStop: $("playback-stop"),

  // 设备信息侧栏
  connState: $("conn-state"),
  deviceId: $("device-id"),
  deviceType: $("device-type"),
  firmware: $("firmware"),

  // 底部状态栏
  health: $("health"),
  temperature: $("temperature"),
  voltage: $("voltage"),
  streamState: $("stream-state"),

  // 设置页
  settingDeviceId: $("setting-device-id"),
  settingDeviceType: $("setting-device-type"),
  settingFirmware: $("setting-firmware"),
  applyDeviceSettings: $("apply-device-settings"),
  minVoltage: $("min-voltage"),
  maxTemp: $("max-temp"),

  // 数据管理页
  recordCount: $("record-count"),
  playbackCount: $("playback-count"),
  packetRate2: $("packet-rate-2"),
  downloadCsv2: $("download-csv-2"),
  recordSummary: $("record-summary"),
};

// 获取 chart 的 2d 上下文（全局复用）
const ctx = ui.chart.getContext("2d");

/* ============================================================
 *   第四部分：历史数据缓冲区
 * ============================================================ */

/** 传感器通道 ID 列表（用于火花线遍历） */
const sensorIds = ["ax", "ay", "az", "gx", "gy", "gz", "mx", "my", "mz"];

/** 各火花线颜色映射 */
const sparkColors = {
  ax: "#ff6b7d", ay: "#47d57c", az: "#37a9ff",
  gx: "#ff8b69", gy: "#67d986", gz: "#46b7ff",
  mx: "#ffbd7a", my: "#79d889", mz: "#4ca9ff",
};

/** 姿态曲线历史（最多 120 个采样点） */
const history = { roll: [], pitch: [], yaw: [] };

/** 各传感器火花线历史（最多 40 个采样点） */
const sparkHistory = Object.fromEntries(
  sensorIds.map((id) => [id, []])
);

/** 最大采样点数量 */
const MAX_SAMPLES = 120;
const MAX_SPARK_SAMPLES = 40;

/* ============================================================
 *   第五部分：运行时变量
 * ============================================================ */

let currentPage = "home";           // 当前激活页面标识
let poseMode = "euler";              // 显示模式：euler / quat
let mockTimer = null;                // 模拟数据定时器
let serialPort = null;               // Web Serial 端口对象
let serialReader = null;             // 串口读取器
let serialBuffer = "";               // 串口接收缓冲区
let packetCount = 0;                 // 成功接收的数据包计数
let badPacketCount = 0;              // 错误数据包计数
let recording = false;               // 是否正在录制
let recordStartedAt = 0;             // 录制开始时间戳
let recordedRows = [];               // 录制样本数组
let playbackRows = [];               // 回放数据数组
let playbackIndex = 0;               // 当前回放索引
let playbackTimer = null;            // 回放定时器
const bootTime = Date.now() - 755000; // 模拟启动时间

/* ============================================================
 *   第六部分：左侧导航切换（核心修复）
 * ============================================================ */

/**
 * 切换到指定页面
 * @param {string} pageId - 页面标识，如 "home"、"collect"
 */
function switchPage(pageId) {
  // 1. 更新导航按钮高亮
  ui.navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === pageId);
  });

  // 2. 切换 .page 的 active 类
  ui.pages.forEach((page) => {
    page.classList.toggle("active", page.id === `page-${pageId}`);
  });

  // 3. 记录当前页面
  currentPage = pageId;

  // 4. 切回首页时，如果当前没有活跃的数据源则自动启动模拟数据
  if (pageId === "home") {
    if (!mockTimer && !serialPort && !playbackTimer) {
      startMock();
    }
  }
  // 切到其他页面时保持数据更新（后台继续），不需要停止任何定时器

  addLog(`已切换到「${getPageName(pageId)}」`, "info");
}

/** 根据页面 ID 返回中文显示名称 */
function getPageName(pageId) {
  const names = {
    home: "首页",
    collect: "数据采集",
    clean: "数据清洗",
    train: "模型训练",
    predict: "实时预测",
    manage: "数据管理",
    settings: "系统设置",
  };
  return names[pageId] || pageId;
}

/* ============================================================
 *   第七部分：Canvas 绘制 —— 圆形仪表盘 Gauge
 * ============================================================ */

/**
 * 绘制单个圆形仪表盘
 * @param {HTMLCanvasElement} canvas - 目标 canvas 元素
 * @param {number} value - 当前值，范围 [-180, 180]
 * @param {string} color - 主色调（弧线起始色）
 */
function drawGauge(canvas, value, color) {
  const g = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2 + 10;        // 圆心略偏下，给顶部标签留空间
  const r = 62;                  // 表盘半径

  // 弧线起止角度（约 240 度的圆弧）
  const startAngle = Math.PI * 1.08;
  const endAngle = Math.PI * 1.92;

  // 将 [-180, 180] 映射到弧线范围
  const clampedValue = Math.max(-180, Math.min(180, value));
  const needleAngle = startAngle + (clampedValue + 180) / 360 * (endAngle - startAngle);

  // 清空画布
  g.clearRect(0, 0, w, h);
  g.lineCap = "round";

  // --- 背景灰弧 ---
  g.strokeStyle = "rgba(70,130,190,.25)";
  g.lineWidth = 16;
  g.beginPath();
  g.arc(cx, cy, r, startAngle, endAngle);
  g.stroke();

  // --- 彩色渐变弧线（蓝 → 绿 → 橙）---
  const gradient = g.createLinearGradient(10, 0, w - 10, 0);
  gradient.addColorStop(0, color);       // 起始色（蓝/绿/橙各不同）
  gradient.addColorStop(0.55, "#39d878"); // 中间绿色
  gradient.addColorStop(1, "#ff884b");   // 结束橙色
  g.strokeStyle = gradient;
  g.lineWidth = 8;
  g.beginPath();
  g.arc(cx, cy, r, startAngle, endAngle);
  g.stroke();

  // --- tick marks (36 divisions, long every 6) ---
  g.strokeStyle = "rgba(230,242,255,.86)";
  g.lineWidth = 2;
  for (let i = 0; i <= 36; i++) {
    const a = startAngle + (i / 36) * (endAngle - startAngle);
    const isLong = i % 6 === 0;
    const rIn = r - (isLong ? 13 : 7);
    const rOut = r + 1;
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn);
    g.lineTo(cx + Math.cos(a) * rOut, cy + Math.sin(a) * rOut);
    g.stroke();
  }

  // --- 数字标签 ---
  g.fillStyle = "#dfefff";
  g.font = "16px Microsoft YaHei";
  g.textAlign = "center";
  g.fillText("0", cx, cy - r - 16);         // 顶部 0
  g.fillText("-180", cx - r - 2, cy + 34);  // 左下 -180
  g.fillText("180", cx + r + 2, cy + 34);   // 右下 180
  g.fillText("-90", cx - 42, cy + 8);       // 左中 -90
  g.fillText("90", cx + 42, cy + 8);        // 右中 90

  // --- 白色指针（带发光效果）---
  g.save();
  g.translate(cx, cy);
  g.rotate(needleAngle + Math.PI / 2);
  g.fillStyle = "#f3f8ff";
  g.shadowColor = "rgba(255,255,255,.8)";
  g.shadowBlur = 8;
  g.beginPath();
  g.moveTo(0, -55);      // 指针尖端
  g.lineTo(7, 0);        // 右底
  g.lineTo(-7, 0);       // 左底
  g.closePath();
  g.fill();
  g.restore();

  // --- 中心圆点 ---
  g.beginPath();
  g.arc(cx, cy, 10, 0, Math.PI * 2);
  g.fill();
}

/* ============================================================
 *   第八部分：Canvas 绘制 —— 实时曲线图
 * ============================================================ */

/**
 * Canvas 3D 正交渲染：正交三坐标轴(带箭头) + 完整半透明正方体6面
 * 使用等轴测投影(isometric)，Z-Y-X 旋转顺序（航空惯例）
 * @param {HTMLCanvasElement} canvas - 目标canvas元素
 * @param {number} roll  - X轴旋转角 (度)
 * @param {number} pitch - Y轴旋转角 (度)
 * @param {number} yaw   - Z轴旋转角 (度)
 */
function draw3DCube(canvas, roll, pitch, yaw) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;   // 中心X
  const cy = H / 2 + 8; // 中心Y（稍微偏下，给坐标轴留空间）
  const S = Math.min(W, H) * 0.22; // 立方体半边长

  ctx.clearRect(0, 0, W, H);

  // ---- 角度转弧度 ----
  const R = roll  * Math.PI / 180;
  const P = pitch * Math.PI / 180;
  const Y = yaw   * Math.PI / 180;

  /**
   * 3D点绕Z→Y→X旋转后投影到2D（等轴测视角）
   */
  function proj(x, y, z) {
    let x1 = x * Math.cos(Y) - y * Math.sin(Y);
    let y1 = x * Math.sin(Y) + y * Math.cos(Y);
    let z1 = z;
    let x2 = x1 * Math.cos(P) + z1 * Math.sin(P);
    let y2 = y1;
    let z2 = -x1 * Math.sin(P) + z1 * Math.cos(P);
    let x3 = x2;
    let y3 = y2 * Math.cos(R) - z2 * Math.sin(R);
    return { x: cx + x3, y: cy - y3 };
  }

  // ---- 立方体8个顶点 ----
  const v = [
    proj(-S,-S,-S), proj(S,-S,-S), proj(S,S,-S), proj(-S,S,-S),
    proj(-S,-S, S), proj(S,-S, S), proj(S,S, S), proj(-S,S, S)
  ];

  // ---- 6个面：画家算法排序 ----
  const faces = [
    { idx:[0,1,5,4], c:"rgba(35,100,180,.40)" },
    { idx:[2,3,7,6], c:"rgba(25,75,145,.32)" },
    { idx:[0,3,7,4], c:"rgba(22,130,90,.30)" },
    { idx:[1,2,6,5], c:"rgba(30,160,110,.38)" },
    { idx:[0,1,2,3], c:"rgba(190,55,75,.28)" },
    { idx:[4,5,6,7], c:"rgba(160,40,60,.22)" }
  ];
  faces.forEach(f => {
    const i=f.idx, ax=v[i[1]].x-v[i[0]].x, ay=v[i[1]].y-v[i[0]].y;
    const bx=v[i[3]].x-v[i[0]].x, by=v[i[3]].y-v[i[0]].y;
    f.z=ax*by-ay*bx;
  });
  faces.sort((a,b)=>a.z-b.z);
  faces.forEach(f=>{
    ctx.beginPath();
    ctx.moveTo(v[f.idx[0]].x,v[f.idx[0]].y);
    for(let j=1;j<f.idx.length;j++)ctx.lineTo(v[f.idx[j]].x,v[f.idx[j]].y);
    ctx.closePath();ctx.fillStyle=f.c;ctx.fill();
    ctx.strokeStyle="rgba(140,200,255,.45)";ctx.lineWidth=1.2;ctx.stroke();
  });

  // ---- IMU文字（固定在z值最大的朝前面上，避免乱跳）----
  ctx.save();
  ctx.font="bold 15px 'Segoe UI',system-ui,sans-serif";
  ctx.fillStyle="rgba(255,255,255,.90)";
  ctx.textAlign="center";ctx.textBaseline="middle";
  // 找法向量z分量最大的面（最朝向观察者）
  let frontFace = faces[0];
  for (const f of faces) { if (f.z > frontFace.z) frontFace = f; }
  if (frontFace.z > -50) {  // 只有面基本朝前时才绘制
    const sx=frontFace.idx.reduce((s,i)=>s+v[i].x,0)/4;
    const sy=frontFace.idx.reduce((s,i)=>s+v[i].y,0)/4;
    ctx.fillText("IMU",sx,sy);
  }
  ctx.restore();

  // ---- 正交坐标轴（带箭头）----
  const al=S*2.4;
  [{dx:al,dy:0,dz:0,c:"#ff5577",l:"X",o:[10,4]},
   {dx:0,dy:0,dz:al,c:"#44dd88",l:"Y",o:[-4,-12]},
   {dx:0,dy:-al,dz:0,c:"#3399ff",l:"Z",o:[-14,4]}].forEach(a=>{
    const s=proj(0,0,0), e=proj(a.dx,a.dy,a.dz);
    ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(e.x,e.y);
    ctx.strokeStyle=a.c;ctx.lineWidth=2;ctx.stroke();
    const ang=Math.atan2(e.y-s.y,e.x-s.x),al8=8;
    ctx.beginPath();ctx.moveTo(e.x,e.y);
    ctx.lineTo(e.x-al8*Math.cos(ang-Math.PI/6),e.y-al8*Math.sin(ang-Math.PI/6));
    ctx.lineTo(e.x-al8*Math.cos(ang+Math.PI/6),e.y-al8*Math.sin(ang+Math.PI/6));
    ctx.closePath();ctx.fillStyle=a.c;ctx.fill();
    ctx.font="bold 13px 'Segoe UI',sans-serif";ctx.fillStyle=a.c;
    ctx.fillText(a.l,e.x+a.o[0],e.y+a.o[1]);
  });
}

/**
 * 绘制实时姿态曲线图（Roll/Pitch/Yaw 三条线）
 * 包含网格背景、Y轴/X轴标签、三条彩色折线
 */
function drawChart() {
  const w = ui.chart.width;
  const h = ui.chart.height;

  // 清空并填充深蓝背景
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#061426";
  ctx.fillRect(0, 0, w, h);

  // 绘图区域边距
  const left = 52, right = 10, top = 12, bottom = 28;
  const plotW = w - left - right;
  const plotH = h - top - bottom;

  // --- 网格背景 ---
  ctx.strokeStyle = "rgba(80,145,210,.18)";
  ctx.lineWidth = 1;
  // 水平网格线（5 条，对应 180/90/0/-90/-180）
  for (let i = 0; i <= 4; i++) {
    const y = top + (i * plotH) / 4;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(w - right, y);
    ctx.stroke();
  }
  // 垂直网格线（9 条）
  for (let i = 0; i <= 8; i++) {
    const x = left + (i * plotW) / 8;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, top + plotH);
    ctx.stroke();
  }

  // --- Y 轴标签 ---
  ctx.fillStyle = "#dcecff";
  ctx.font = "14px Microsoft YaHei";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  [
    ["180\u00B0", top],
    ["90\u00B0", top + plotH * 0.25],
    ["0\u00B0", top + plotH * 0.5],
    ["-90\u00B0", top + plotH * 0.75],
    ["-180\u00B0", top + plotH],
  ].forEach(([text, y]) => ctx.fillText(text, left - 8, y));

  // --- X 轴时间标签 ---
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const t = new Date(now.getTime() - (5 - i) * 10000);
    ctx.fillText(
      t.toLocaleTimeString("zh-CN", { hour12: false }),
      left + (i * plotW) / 5,
      top + plotH + 8
    );
  }

  // --- 三条姿态曲线 ---
  drawLine(history.roll, "#ff3f5f", left, top, plotW, plotH);   // Roll 红
  drawLine(history.pitch, "#38d976", left, top, plotW, plotH);  // Pitch 绿
  drawLine(history.yaw, "#2f93ff", left, top, plotW, plotH);    // Yaw 蓝

  // --- 同步绘制所有火花线 ---
  drawAllSparks();
}

/**
 * 在主图表上绘制单条折线
 * @param {number[]} data - 数据数组
 * @param {string} color - 线条颜色
 * @param {number} left/top/plotW/plotH - 绘图区域参数
 */
function drawLine(data, color, left, top, plotW, plotH) {
  if (data.length < 2) return;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  data.forEach((v, i) => {
    const x = left + (i * plotW) / (MAX_SAMPLES - 1);
    const y = top + plotH / 2 - (v / 180) * plotH * 0.5;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

/* ============================================================
 *   第九部分：Canvas 绘制 —— 迷你火花线 Sparkline
 * ============================================================ */

/**
 * 绘制单个传感器通道的迷你火花线（带纵轴刻度）
 * @param {HTMLCanvasElement} canvas - 目标 canvas
 * @param {number[]} data - 最近 N 个采样值
 * @param {string} color - 该通道颜色
 */
function drawSpark(canvas, data, color) {
  if (!canvas || data.length < 2) return;
  const g = canvas.getContext("2d");
  // 使用实际渲染尺寸（CSS flex 自适应后的大小）
  const w = canvas.clientWidth || canvas.width;
  const h = canvas.clientHeight || canvas.height;
  // 同步 canvas 内部分辨率，避免模糊
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  // 纵轴区域：左侧留30px给Y轴标签，右侧是绘图区
  const axisW = 28;
  const plotX = axisW + 2;
  const plotW = w - plotX - 2;

  // 自动缩放到数据范围（保留10%余量）
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(0.001, max - min);
  const pad = range * 0.1;  // 上下各留10%余量
  const yMin = min - pad;
  const yMax = max + pad;
  const ySpan = yMax - yMin;

  g.clearRect(0, 0, w, h);

  // --- 纵轴 ---
  g.strokeStyle = "rgba(50,120,170,.3)";
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(plotX, 2);
  g.lineTo(plotX, h - 4);
  g.stroke();

  // 纵轴刻度值（上=最大值，下=最小值）
  g.fillStyle = "rgba(160,190,220,.7)";
  g.font = "9px 'Segoe UI',sans-serif";
  g.textAlign = "right";
  g.textBaseline = "middle";
  // 格式化数值：根据大小决定小数位数
  const fmtVal = (v) => {
    if (Math.abs(v) >= 100) return v.toFixed(0);
    if (Math.abs(v) >= 10) return v.toFixed(1);
    return v.toFixed(2);
  };
  g.fillText(fmtVal(yMax), plotX - 3, 5);           // 上方最大值
  g.fillText(fmtVal(yMin), plotX - 3, h - 6);       // 下方最小值

  // 中间零线（如果范围跨越0）
  if (yMin < 0 && yMax > 0) {
    const zeroY = h - 4 - ((0 - yMin) / ySpan) * (h - 8);
    g.strokeStyle = "rgba(255,100,120,.25)";
    g.setLineDash([3, 3]);
    g.beginPath();
    g.moveTo(plotX, zeroY);
    g.lineTo(w, zeroY);
    g.stroke();
    g.setLineDash([]);
    g.fillStyle = "rgba(255,140,150,.55)";
    g.fillText("0", plotX - 3, zeroY);
  }

  // 底部基准线
  g.strokeStyle = "rgba(50,120,170,.22)";
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(plotX, h - 4);
  g.lineTo(w, h - 4);
  g.stroke();

  // 折线（在绘图区域内绘制）
  g.strokeStyle = color;
  g.lineWidth = 1.8;
  g.lineJoin = "round";
  g.beginPath();
  data.forEach((v, i) => {
    const x = plotX + (i * plotW) / (MAX_SPARK_SAMPLES - 1);
    const y = h - 4 - ((v - yMin) / ySpan) * (h - 8);
    if (i === 0) g.moveTo(x, y);
    else g.lineTo(x, y);
  });
  g.stroke();
}

/** 批量绘制所有 9 个传感器火花线 */
function drawAllSparks() {
  sensorIds.forEach((id) => {
    drawSpark($(`${id}-spark`), sparkHistory[id], sparkColors[id]);
  });
}

/* ============================================================
 *   第十部分：历史数据推入
 * ============================================================ */

/**
 * 将当前 state 推入各缓冲区（姿态曲线 + 火花线）
 * 自动裁剪超出上限的旧数据
 */
function pushHistory(sample) {
  // 姿态三轴曲线（最多 120 点）
  ["roll", "pitch", "yaw"].forEach((key) => {
    history[key].push(sample[key]);
    if (history[key].length > MAX_SAMPLES) history[key].shift();
  });

  // 9 通道火花线（最多 40 点）
  sensorIds.forEach((key) => {
    sparkHistory[key].push(sample[key]);
    if (sparkHistory[key].length > MAX_SPARK_SAMPLES) sparkHistory[key].shift();
  });
}

/* ============================================================
 *   第十一部分：UI 数据绑定（state → DOM）
 * ============================================================ */

/**
 * 核心绑定函数：将 state 数据同步到所有 UI 元素
 * 每收到一个新样本调用一次
 * @param {Object} sample - 包含任意字段的对象，会合并到 state
 */
function updateUi(sample) {
  // 1. 合并到全局状态（只覆盖存在的字段，缺失字段保持上一次值）
  Object.assign(state, sample);
  packetCount++;

  // 2. 三个圆形仪表盘
  drawGauge(ui.rollGauge, state.roll, "#2f93ff");   // Roll 蓝色
  drawGauge(ui.pitchGauge, state.pitch, "#38d976");  // Pitch 绿色
  drawGauge(ui.yawGauge, state.yaw, "#ff884b");      // Yaw 橙色

  // 3. 角度数值显示
  ui.rollValue.textContent = `${n(state.roll)}\u00B0`;
  ui.pitchValue.textContent = `${n(state.pitch)}\u00B0`;
  ui.yawValue.textContent = `${n(state.yaw)}\u00B0`;

  // 4. Canvas 3D 正交渲染（坐标轴 + 正方体）
  draw3DCube(ui.cube, state.roll, state.pitch, state.yaw);

  // 5. 传感器数值（加速度保留 3 位小数，其余 2 位）
  sensorIds.forEach((id) => {
    const el = $(id);
    if (el) el.textContent = n(state[id], id.startsWith("a") ? 3 : 2);
  });

  // 6. 四元数 / 欧拉角读出
  const hasValidQuat =
    [state.qw, state.qx, state.qy, state.qz].every(Number.isFinite);
  const q = hasValidQuat ? state : eulerToQuaternion(state.roll, state.pitch, state.yaw);

  if (poseMode === "quat") {
    ui.poseReadout.textContent =
      `四元数：qw=${n(q.qw, 4)}, qx=${n(q.qx, 4)}, qy=${n(q.qy, 4)}, qz=${n(q.qz, 4)}`;
  } else {
    ui.poseReadout.textContent =
      `欧拉角：Roll=${n(state.roll)}\u00B0, Pitch=${n(state.pitch)}\u00B0, Yaw=${n(state.yaw)}\u00B0`;
  }

  // 7. 动作识别结果
  if (ui.activity) ui.activity.textContent = state.activity || "Unknown";
  const conf = Number.isFinite(state.confidence) ? state.confidence : 0;
  if (ui.confidence) ui.confidence.textContent = n(conf, 1);
  if (ui.confidenceBar) ui.confidenceBar.style.width = `${Math.max(0, Math.min(100, conf))}%`;

  // 8. 扩展信息（温度、电压、健康度）
  const temp = Number.isFinite(state.temperature) ? state.temperature : 36.5;
  const volt = Number.isFinite(state.voltage) ? state.voltage : 3.72;
  const hlth = Number.isFinite(state.health) ? state.health : 100;
  if (ui.temperature) ui.temperature.textContent = `${n(temp, 1)} \u2103`;
  if (ui.voltage) ui.voltage.textContent = `${n(volt, 2)} V`;
  if (ui.health) ui.health.textContent = `${Math.round(hlth)}%`;

  // 9. 统计指标
  const total = packetCount + badPacketCount;
  const rate = total ? (packetCount / total) * 100 : 100;
  if (ui.packetRate) ui.packetRate.textContent = n(rate, 1);
  if (ui.lossRate) ui.lossRate.textContent = n(100 - rate, 1);
  if (ui.latency) ui.latency.textContent = String(3 + Math.floor(Math.random() * 4));

  // 10. 录制环闪烁动画
  if (ui.recRing && recording) {
    ui.recRing.classList.toggle("blink");
  }

  // 11. 推入历史缓冲区并重绘图表
  pushHistory(state);
  drawChart();

  // 12. 如果正在录制，记录此条样本
  if (recording) recordSample(state);
}

/* ============================================================
 *   第十二部分：模拟数据生成
 * ============================================================ */

/**
 * 生成一条模拟 IMU 采样数据
 * 使用正弦波叠加模拟真实传感器噪声，包含全部 21 个字段
 * @returns {Object} 模拟样本对象
 */
function mockSample() {
  const t = Date.now() / 1000;  // 时间基准（秒）

  // 姿态角：不同频率的正弦波模拟人体运动
  const roll = -12 + Math.sin(t * 1.7) * 22 + (Math.random() - 0.5) * 0.8;
  const pitch = 6 + Math.cos(t * 1.1) * 9 + (Math.random() - 0.5) * 0.5;
  const yaw = 28 + Math.sin(t * 0.75) * 42 + (Math.random() - 0.5) * 1.2;

  // 加速度（重力分量为主 + 高频噪声）
  const ax = 0.12 + Math.sin(t * 3) * 0.04 + (Math.random() - 0.5) * 0.01;
  const ay = -0.06 + Math.cos(t * 2.6) * 0.05 + (Math.random() - 0.5) * 0.01;
  const az = 0.98 + Math.sin(t * 1.5) * 0.02 + (Math.random() - 0.5) * 0.005;

  // 角速度
  const gx = -23 + Math.sin(t * 4) * 6 + (Math.random() - 0.5) * 2;
  const gy = 15 + Math.cos(t * 3) * 5 + (Math.random() - 0.5) * 2;
  const gz = 8 + Math.sin(t * 2.8) * 4 + (Math.random() - 0.5) * 1.5;

  // 磁场
  const mx = 12 + Math.sin(t * 2) * 2 + (Math.random() - 0.5) * 0.5;
  const my = -8 + Math.cos(t * 2.2) * 2 + (Math.random() - 0.5) * 0.5;
  const mz = 45 + Math.sin(t * 1.6) * 4 + (Math.random() - 0.5) * 1;

  // 四元数（由欧拉角计算）
  const quat = eulerToQuaternion(roll, pitch, yaw);

  // 模拟动作识别结果（周期性切换）
  const activities = ["Walking", "Running", "Sitting", "Standing", "Unknown"];
  const actIdx = Math.floor((t / 8) % activities.length);

  return {
    roll, pitch, yaw,
    ax, ay, az, gx, gy, gz, mx, my, mz,
    ...quat,
    activity: activities[actIdx],
    confidence: 85 + Math.sin(t * 1.3) * 12 + (Math.random() - 0.5) * 3,
    temperature: 36.5 + Math.sin(t / 45) * 0.7 + (Math.random() - 0.5) * 0.1,
    voltage: 3.72 + Math.sin(t / 30) * 0.03 + (Math.random() - 0.5) * 0.01,
    health: Math.max(60, 100 - packetCount * 0.0001),
  };
}

/** 启动模拟数据流（每 80ms 一帧 ≈ 12.5Hz） */
function startMock() {
  stopMock();
  mockTimer = setInterval(() => updateUi(mockSample()), 80);
  addLog("模拟数据流已启动（80ms/帧）", "info");
}

/** 停止模拟数据流 */
function stopMock() {
  if (mockTimer) {
    clearInterval(mockTimer);
    mockTimer = null;
  }
}

/* ============================================================
 *   第十三部分：Web Serial API 串口通信
 * ============================================================ */

/**
 * XOR 校验验证
 * @param {string} body - 校验内容（不含 $ 和 *CS 部分）
 * @param {string} csText - 校验码字符串（十六进制）
 * @returns {boolean} 校验是否通过
 */
function verifyXor(body, csText) {
  let xor = 0;
  for (const ch of body) {
    xor ^= ch.charCodeAt(0);
  }
  return xor === parseInt(csText, 16);
}

/**
 * 解析一行串口数据帧
 * 支持自定义帧头、分隔符、字段映射、XOR 校验
 *
 * 示例帧：
 *   $IMU,-12.3,5.6,28.5,0.1,0,0.98,-23,15,8,12,-8,45,0.96,0.01,0.05,0.23,Walking,97.2,36.5,3.72,100
 *   $IMU,...*A3  （带 XOR 校验）
 *
 * @param {string} line - 原始行文本
 * @returns {Object|null} 解析后的样本对象；解析失败返回 null 或抛异常
 */
function parseFrame(line) {
  const raw = line.trim();
  if (!raw) return null;

  // 读取用户配置的帧格式参数
  const prefix = (ui.framePrefix && ui.framePrefix.value)
    ? ui.framePrefix.value.trim()
    : "$IMU";
  const sep = (ui.frameSeparator && ui.frameSeparator.value)
    ? ui.frameSeparator.value
    : ",";

  // 帧头校验
  if (!raw.startsWith(prefix)) return null;

  let content = raw;

  // XOR 校验处理（*CS 格式）
  const csm = ui.checksumMode && ui.checksumMode.value;
  if (csm === "xor" && raw.includes("*")) {
    const starIndex = raw.lastIndexOf("*");
    const body = raw.slice(1, starIndex);  // 去掉帧头 $ 后的内容
    const csText = raw.slice(starIndex + 1);
    if (!verifyXor(body, csText)) {
      throw new Error(`XOR 校验失败（期望 *${csText}，实际不匹配）`);
    }
    content = raw.slice(0, starIndex);  // 截掉校验部分
  }

  // 按分隔符拆分数值
  const valuesStr = content.slice(prefix.length).replace(/^,/, "");
  const values = valuesStr.split(sep).map((v) => Number(v.trim()));

  // 字段映射（用户在界面配置的字段顺序）
  const fieldMapEl = ui.fieldMap && ui.fieldMap.value;
  const fields = fieldMapEl
    ? fieldMapEl.split(",").map((x) => x.trim()).filter(Boolean)
    : [
        "roll", "pitch", "yaw", "ax", "ay", "az",
        "gx", "gy", "gz", "mx", "my", "mz",
        "qw", "qx", "qy", "qz",
        "activity", "confidence", "temperature", "voltage", "health",
      ];

  // 按字段顺序构建样本对象
  const sample = {};
  fields.forEach((field, index) => {
    if (Number.isFinite(values[index])) {
      sample[field] = values[index];
    }
    // 特殊处理：非数值字段（如 activity）直接取原始字符串
    else if (field === "activity" && valuesStr.split(sep)[index]) {
      sample[field] = valuesStr.split(sep)[index].trim();
    }
  });

  // 必须包含有效的 roll/pitch/yaw
  if (![sample.roll, sample.pitch, sample.yaw].every(Number.isFinite)) {
    throw new Error("缺少必要的 roll/pitch/yaw 字段");
  }

  // 与已有 state 合并（缺失字段保持上一次值）
  return { ...state, ...sample };
}

/**
 * 连接串口（Web Serial API）
 * 请求用户选择端口 -> 打开串口 -> 开始读取循环
 */
async function connectSerial() {
  // 浏览器兼容性检查
  if (!("serial" in navigator)) {
    addLog("浏览器不支持 Web Serial API，请使用 Chrome / Edge 浏览器", "warn");
    return;
  }

  try {
    // 先停止模拟数据和回放
    stopMock();
    stopPlayback();

    // 请求用户选择串口设备
    serialPort = await navigator.serial.requestPort();

    // 打开串口连接
    const baud = ui.baudRate ? Number(ui.baudRate.value) : 115200;
    await serialPort.open({ baudRate: baud });

    // 更新 UI 状态
    if (ui.portName) ui.portName.textContent = "WebSerial";
    if (ui.baudView) ui.baudView.textContent = String(baud);
    if (ui.connState) ui.connState.textContent = "已连接";
    if (ui.dataSource) ui.dataSource.value = "serial";
    if (ui.imuStatus) ui.imuStatus.textContent = "已连接";
    if (ui.streamState) ui.streamState.textContent = "正常";

    addLog(`串口已连接：波特率 ${baud}`, "info");

    // 开始异步读取循环
    await readSerial();
  } catch (e) {
    // 用户取消选择端口时不报错
    if (e.name !== "NotFoundError") {
      addLog(`串口连接失败：${e.message}`, "warn");
    }
  }
}

/**
 * 串口数据异步读取循环
 * 持续读取直到端口关闭或出错
 */
async function readSerial() {
  const decoder = new TextDecoder();
  serialReader = serialPort.readable.getReader();

  try {
    while (true) {
      const { value, done } = await serialReader.read();
      if (done) break;  // 端口被关闭或断开

      // 解码并追加到缓冲区
      serialBuffer += decoder.decode(value, { stream: true });

      // 按行分割处理完整帧
      const lines = serialBuffer.split(/\r?\n/);
      serialBuffer = lines.pop() || "";  // 最后一行可能不完整，留待下次

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const sample = parseFrame(line);
          if (sample) updateUi(sample);
        } catch (e) {
          badPacketCount++;
          addLog(`数据帧解析错误：${e.message}`, "warn");
        }
      }
    }
  } catch (e) {
    addLog(`串口读取异常：${e.message}（可能设备已断开）`, "warn");
    // 尝试自动恢复模拟数据
    if (!mockTimer && !playbackTimer) {
      startMock();
    }
  } finally {
    // 释放读取器锁
    if (serialReader) serialReader.releaseLock();
    serialReader = null;
  }
}

/**
 * 断开串口连接
 */
async function disconnectSerial() {
  try {
    if (serialReader) await serialReader.cancel();
    if (serialPort) await serialPort.close();
  } catch (e) {
    // 忽略关闭过程中的错误（可能已经断开）
  }

  serialReader = null;
  serialPort = null;
  serialBuffer = "";

  // 恢复 UI 状态
  if (ui.portName) ui.portName.textContent = "模拟";
  if (ui.connState) ui.connState.textContent = "未连接";
  if (ui.imuStatus) ui.imuStatus.textContent = "未连接";
  if (ui.streamState) ui.streamState.textContent = "中断";

  addLog("串口已断开", "info");

  // 断开后自动恢复模拟数据
  if (!mockTimer && !playbackTimer) {
    startMock();
  }
}

/* ============================================================
 *   第十四部分：录制功能
 * ============================================================ */

/**
 * 记录单条样本到录制数组
 * @param {Object} sample - 当前 state 快照
 */
function recordSample(sample) {
  const row = {
    time: new Date().toISOString(),
    ...sample,
  };
  recordedRows.push(row);

  // 更新文件大小显示
  if (ui.fileSize) {
    const sizeKB = JSON.stringify(recordedRows).length / 1024;
    ui.fileSize.textContent = n(sizeKB / 1024, 2);
  }
  // 更新录制统计
  if (ui.recordCount) ui.recordCount.textContent = String(recordedRows.length);
  if (ui.recordSummary) {
    ui.recordSummary.textContent =
      `${recordedRows.length} 条，${n(JSON.stringify(recordedRows).length / 1024 / 1024, 2)} MB`;
  }
}

/**
 * 切换录制状态（开始 / 停止）
 */
function toggleRecord() {
  recording = !recording;

  if (recording) {
    // 开始录制
    recordStartedAt = Date.now();
    recordedRows = [];
    if (ui.recordState) ui.recordState.textContent = "录制中";
    if (ui.recRing) ui.recRing.classList.add("recording");
    if (ui.recordToggle) ui.recordToggle.textContent = "停止录制";
    if (ui.recordToggle2) ui.recordToggle2.textContent = "停止录制";
    addLog("开始录制数据", "info");
  } else {
    // 停止录制
    if (ui.recordState) ui.recordState.textContent = "已停止";
    if (ui.recRing) ui.recRing.classList.remove("recording");
    if (ui.recordToggle) ui.recordToggle.textContent = "开始录制";
    if (ui.recordToggle2) ui.recordToggle2.textContent = "开始录制";
    addLog(
      `录制停止：共记录 ${recordedRows.length} 条样本`,
      "info"
    );
  }
}

/**
 * 导出录制数据为 CSV 文件并触发浏览器下载
 */
function downloadCsv() {
  if (!recordedRows.length) {
    addLog("没有可导出的录制数据", "warn");
    return;
  }

  // CSV 表头（与字段映射一致）
  const fields = [
    "time", "roll", "pitch", "yaw",
    "ax", "ay", "az", "gx", "gy", "gz", "mx", "my", "mz",
    "qw", "qx", "qy", "qz",
    "activity", "confidence", "temperature", "voltage", "health",
  ];

  // 构建 CSV 内容
  const csvHeader = fields.join(",");
  const csvBody = recordedRows.map((row) =>
    fields.map((f) => row[f] ?? "").join(",")
  );
  const csv = [csvHeader, ...csvBody].join("\n");

  // 创建 Blob 并触发下载
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8",
  });  // BOM 头确保 Excel 正确识别 UTF-8
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `imu_record_${Date.now()}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);

  addLog(`CSV 已导出：${recordedRows.length} 条记录`, "info");
}

/* ============================================================
 *   第十五部分：离线回放
 * ============================================================ */

/**
 * 加载用户选择的 CSV 回放文件
 * @param {File} file - 用户通过 <input type="file"> 选择的文件
 */
function loadPlaybackFile(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const text = String(reader.result);
      const lines = text.split(/\r?\n/).filter(Boolean);

      if (lines.length < 2) {
        addLog("CSV 文件为空或格式错误", "warn");
        return;
      }

      // 解析表头
      const header = lines[0]
        .split(",")
        .map((x) => x.trim())
        .map((x) => x.replace(/^\uFEFF/, ""));  // 去除可能的 BOM

      // 解析每一行数据
      playbackRows = lines
        .slice(1)
        .map((line) => {
          const values = line.split(",").map((v) => v.trim());
          const sample = {};
          header.forEach((field, index) => {
            const num = Number(values[index]);
            if (Number.isFinite(num)) {
              sample[field] = num;
            } else if (values[index]) {
              // 非数值字段（如 activity）保留字符串
              sample[field] = values[index];
            }
          });
          // 与默认 state 合并
          return { ...state, ...sample };
        })
        // 过滤掉无效行（必须包含有效欧拉角）
        .filter(
          (x) =>
            Number.isFinite(x.roll) &&
            Number.isFinite(x.pitch) &&
            Number.isFinite(x.yaw)
        );

      if (ui.playbackCount) ui.playbackCount.textContent = String(playbackRows.length);
      addLog(`已导入回放数据：${playbackRows.length} 条有效样本`, "info");
    } catch (e) {
      addLog(`CSV 解析失败：${e.message}`, "warn");
    }
  };

  reader.onerror = () => addLog("文件读取失败", "warn");
  reader.readAsText(file);
}

/** 开始离线回放（每 80ms 推送一条样本） */
function startPlayback() {
  if (!playbackRows.length) {
    addLog("请先导入 CSV 回放文件", "warn");
    return;
  }

  // 停止其他数据源
  stopMock();
  stopPlayback();

  playbackIndex = 0;
  if (ui.dataSource) ui.dataSource.value = "playback";
  if (ui.portName) ui.portName.textContent = "回放";
  if (ui.connState) ui.connState.textContent = "回放中";
  if (ui.imuStatus) ui.imuStatus.textContent = "回放中";
  if (ui.streamState) ui.streamState.textContent = "正常";

  playbackTimer = setInterval(() => {
    if (playbackIndex >= playbackRows.length) {
      playbackIndex = 0;  // 循环回放
    }
    updateUi(playbackRows[playbackIndex]);
    playbackIndex++;
  }, 80);

  addLog("离线回放已启动（80ms/帧，循环播放）", "info");
}

/** 停止离线回放 */
function stopPlayback() {
  if (playbackTimer) {
    clearInterval(playbackTimer);
    playbackTimer = null;
  }
  if (ui.connState) ui.connState.textContent = playbackRows.length ? "就绪" : "未连接";
  addLog("离线回放已停止", "info");
}

/* ============================================================
 *   第十六部分：系统日志
 * ============================================================ */

/**
 * 向日志列表添加一条日志
 * @param {string} message - 日志消息文本
 * @param {string} level - 日志级别：""(普通) / "info"(信息) / "warn"(警告) / "error"(错误)
 */
function addLog(message, level = "") {
  const item = document.createElement("div");
  item.className = `log-item ${level}`.trim();

  // 时间戳 + 消息内容
  const timestamp = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  item.innerHTML = `<span class="log-time">${timestamp}</span><span class="log-msg">${message}</span>`;

  // 插入到列表顶部（最新的在最前面）
  if (ui.logList) {
    ui.logList.prepend(item);
    // 最多保留 50 条，超出则移除最旧的
    while (ui.logList.children.length > 50) {
      ui.logList.lastElementChild.remove();
    }
  }
}

/** 清空系统日志 */
function clearLog() {
  if (ui.logList) {
    ui.logList.replaceChildren();
    addLog("日志已清空", "info");
  }
}

/* ============================================================
 *   第十七部分：定时器与窗口适配
 * ============================================================ */

/**
 * 每秒执行的 tick 函数
 * - 更新运行时长显示
 * - 更新录制时长显示
 * - 更新数据管理页面的统计数字
 */
function tick() {
  const elapsed = duration(Date.now() - bootTime);
  if (ui.runTimeA) ui.runTimeA.textContent = elapsed;
  if (ui.runTimeB) ui.runTimeB.textContent = elapsed;

  // 录制时长
  if (recording && ui.recordTime) {
    ui.recordTime.textContent = duration(Date.now() - recordStartedAt);
  }

  // 数据管理页统计同步
  if (ui.packetRate2) {
    const total = packetCount + badPacketCount;
    const rate = total ? (packetCount / total) * 100 : 100;
    ui.packetRate2.textContent = `${n(rate, 1)}%`;
  }
}

/**
 * 响应式适配：窗口resize时重绘canvas（不再使用scale缩放）
 * 纯CSS Grid/Flexbox自动处理布局适配
 */
function redrawGauges() {
  if (!state || !ui.rollGauge) return;
  drawGauge(ui.rollGauge, state.roll, "#2f93ff");
  drawGauge(ui.pitchGauge, state.pitch, "#38d976");
  drawGauge(ui.yawGauge, state.yaw, "#ff884b");
}
function redrawChart() { drawChart(); }
function redrawSparklines() {
  // 火花线由 drawChart() 内部统一调用 drawAllSparks()
}
function onResize() {
  // 用 requestAnimationFrame 确保DOM完成布局后再重绘
  requestAnimationFrame(() => {
    redrawGauges();
    redrawChart();
    redrawSparklines();
  });
}

/* ============================================================
 *   第十八部分：事件绑定
 * ============================================================ */

/**
 * 绑定所有 UI 事件处理器
 * 在初始化阶段一次性完成所有绑定
 */
function bindEvents() {
  // ---- 窗口事件 ----
  window.addEventListener("resize", onResize);

  // ---- 左侧导航按钮 ----
  ui.navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchPage(btn.dataset.page);
    });
  });

  // ---- 姿态显示模式切换（欧拉角 / 四元数）----
  document.querySelectorAll(".mode").forEach((button) => {
    button.addEventListener("click", () => {
      poseMode = button.dataset.mode;
      document.querySelectorAll(".mode").forEach((b) => {
        b.classList.toggle("active", b === button);
      });
      // 立即刷新读出显示
      updateUi(state);
    });
  });

  // ---- 数据源下拉选择 ----
  if (ui.dataSource) {
    ui.dataSource.addEventListener("change", () => {
      switch (ui.dataSource.value) {
        case "mock":
          stopPlayback();
          startMock();
          break;
        case "serial":
          stopMock();
          stopPlayback();
          connectSerial();
          break;
        case "playback":
          stopMock();
          // 需要用户先导入文件再手动开始
          break;
      }
    });
  }

  // ---- 波特率变更 ----
  if (ui.baudRate) {
    ui.baudRate.addEventListener("change", () => {
      if (ui.baudView) ui.baudView.textContent = ui.baudRate.value;
    });
  }

  // ---- 串口操作 ----
  if (ui.connectSerial) ui.connectSerial.addEventListener("click", connectSerial);
  if (ui.disconnectSerial) ui.disconnectSerial.addEventListener("click", disconnectSerial);

  // ---- 录制操作 ----
  if (ui.recordToggle) ui.recordToggle.addEventListener("click", toggleRecord);
  if (ui.recordToggle2) ui.recordToggle2.addEventListener("click", toggleRecord);
  if (ui.downloadCsv) ui.downloadCsv.addEventListener("click", downloadCsv);
  // 数据管理页的导出按钮
  const dlBtn2 = $("download-csv-2");
  if (dlBtn2) dlBtn2.addEventListener("click", downloadCsv);

  // ---- 回放操作 ----
  if (ui.playbackFile) {
    ui.playbackFile.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        loadPlaybackFile(e.target.files[0]);
      }
    });
  }
  if (ui.playbackStart) ui.playbackStart.addEventListener("click", startPlayback);
  if (ui.playbackStop) ui.playbackStop.addEventListener("click", stopPlayback);

  // ---- 日志清空 ----
  if (ui.clearLog) ui.clearLog.addEventListener("click", clearLog);

  // ---- 设置页：应用设备设置 ----
  const applyBtn = $("apply-device-settings");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      if (ui.settingDeviceId && ui.deviceId) {
        ui.deviceId.textContent = ui.settingDeviceId.value || "IMU-001";
      }
      if (ui.settingDeviceType) {
        const dtEl = $("device-type");
        if (dtEl) dtEl.textContent = ui.settingDeviceType.value || "9轴IMU";
      }
      if (ui.settingFirmware) {
        ui.firmware.textContent = ui.settingFirmware.value || "v1.0.0";
      }
      addLog("设备设置已应用", "info");
    });
  }
}

/* ============================================================
 *   第十九部分：初始化流程
 * ============================================================ */

/**
 * 应用入口 —— 按序执行以下步骤：
 *  1. 绑定所有事件监听器
 *  2. 执行窗口缩放适配
 *  3. 绘制初始仪表盘和图表（使用初始 state）
 *  4. 启动模拟数据流
 *  5. 添加初始欢迎日志
 *  6. 启动每秒定时器
 */
function init() {
  // Step 1: 绑定事件
  bindEvents();

  // Step 2: 响应式初始化（canvas已在updateUi中绘制）

  // Step 3: 用初始 state 绘制一次 UI（避免空白画面）
  updateUi(state);

  // Step 4: 启动模拟数据
  startMock();

  // Step 5: 初始日志
  addLog("IMU 上位机系统启动完成", "info");
  addLog("当前数据源：模拟数据（80ms/帧）", "info");
  addLog("采样率稳定：500Hz（目标）", "info");

  // Step 6: 启动每秒定时器（运行时长 / 录制时长 / 统计刷新）
  setInterval(tick, 1000);
}

// 执行初始化
init();

/* ============================================================
 *   布局编辑器 — 可视化拖拽调整面板位置和大小
 * ============================================================ */

const LayoutEditor = (() => {
  // 网格配置：12列 × 2行（可扩展）
  const COLS = 12;
  const ROWS = 2;

  // 默认布局配置（每个面板的 grid-column / grid-row / rowSpan）
  const DEFAULT_LAYOUT = {
    'attitude-panel': { col: 1, span: 4, row: 1, rowSpan: 1 },
    'cube-panel':     { col: 5, span: 3, row: 1, rowSpan: 1 },
    'chart-panel':    { col: 8, span: 5, row: 1, rowSpan: 1 },
    'sensor-panel':   { col: 1, span: 5, row: 2, rowSpan: 1 },
    'action-panel':   { col: 6, span: 2, row: 2, rowSpan: 1 },
    'record-panel':   { col: 8, span: 2, row: 2, rowSpan: 1 },
    'logs-panel':     { col: 10, span: 3, row: 2, rowSpan: 1 }
  };

  let currentLayout = null;       // 当前布局（运行时修改）
  let isEditing = false;          // 是否处于编辑模式
  let dragState = null;           // 拖拽状态 { type:'drag'|'resize', panel, dir?, startX, startY, startCol, startSpan, startRow }

  // DOM 引用
  const overlay = $('grid-overlay');
  const toolbar = $('layout-toolbar');
  const toggleBtn = $('edit-layout-btn');
  const dashboardGrid = document.querySelector('.dashboard-grid');
  const dropIndicator = document.createElement('div');
  dropIndicator.className = 'drop-indicator';
  if (dashboardGrid) dashboardGrid.appendChild(dropIndicator);

  /** 初始化：加载已保存布局或使用默认值 */
  function load() {
    try {
      const saved = localStorage.getItem('imu-layout');
      currentLayout = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
    } catch (e) {
      currentLayout = JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
    }
    apply();
  }

  /** 将当前布局应用到所有面板 */
  function apply() {
    if (!currentLayout) return;
    Object.entries(currentLayout).forEach(([id, pos]) => {
      const el = $(id);
      if (!el) return;
      el.style.gridColumn = `${pos.col} / ${pos.col + pos.span}`;
      el.style.gridRow = `${pos.row} / ${pos.row + (pos.rowSpan || 1)}`;
      updatePanelInfo(el, pos);
    });
  }

  /** 更新面板信息标签文字 */
  function updatePanelInfo(el, pos) {
    let info = el.querySelector('.panel-info');
    if (!info) {
      info = document.createElement('div');
      info.className = 'panel-info';
      el.appendChild(info);
    }
    const rs = pos.rowSpan && pos.rowSpan > 1 ? `×${pos.rowSpan}行` : '';
    info.textContent = `C${pos.col}-${pos.col + pos.span - 1} R${pos.row}${rs} (${pos.span}col)`;
  }

  /** 进入编辑模式 */
  function enter() {
    isEditing = true;
    document.body.classList.add('editing');
    overlay.style.display = 'block';
    toolbar.style.display = 'flex';
    toggleBtn.classList.add('active');

    // 给每个面板添加拖拽/缩放手柄
    const panels = dashboardGrid.querySelectorAll('.panel');
    panels.forEach(panel => {
      ensureHandles(panel);
    });

    addLog("进入布局编辑模式 — 拖拽面板移动位置，拖拽边缘调整大小", "info");
  }

  /** 退出编辑模式 */
  function exit() {
    isEditing = false;
    document.body.classList.remove('editing');
    overlay.style.display = 'none';
    toolbar.style.display = 'none';
    toggleBtn.classList.remove('active');
    dropIndicator.style.display = 'none';
    addLog("退出布局编辑模式", "info");
  }

  /** 确保面板有拖拽手柄和信息标签 */
  function ensureHandles(panel) {
    if (!panel.querySelector('.drag-handle')) {
      const dh = document.createElement('div');
      dh.className = 'drag-handle';
      dh.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>';
      dh.addEventListener('mousedown', e => onDragStart(panel, e));
      panel.appendChild(dh);

      // 四边 resize 手柄
      ['e', 'w', 's', 'n'].forEach(dir => {
        const rh = document.createElement('div');
        rh.className = `resize-handle ${dir}`;
        rh.addEventListener('mousedown', e => onResizeStart(panel, dir, e));
        panel.appendChild(rh);
      });
    }
    if (!panel.querySelector('.panel-info')) {
      const info = document.createElement('div');
      info.className = 'panel-info';
      panel.appendChild(info);
    }
    // 刷新信息
    const id = panel.id || panel.className.split(' ')[0];
    const pos = currentLayout[id];
    if (pos) updatePanelInfo(panel, pos);
  }

  /** 获取 grid 的几何信息 */
  function getGridGeom() {
    if (!dashboardGrid) return { left: 0, top: 0, width: 1000, height: 500, cellW: 83, cellH: 250 };
    const rect = dashboardGrid.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      cellW: rect.width / COLS,
      cellH: rect.height / ROWS
    };
  }

  /** 获取面板当前的 grid 位置 */
  function getPanelPos(panel) {
    const id = panel.id || panel.className.split(' ').find(c => c.endsWith('-panel'));
    return currentLayout[id] || { col: 1, span: 4, row: 1, rowSpan: 1 };
  }

  /** 鼠标位置 → 网格坐标 */
  function mouseToGrid(mouseX, mouseY, geom) {
    const relX = mouseX - geom.left;
    const relY = mouseY - geom.top;
    return {
      col: Math.max(1, Math.min(COLS, Math.round(relX / geom.cellW) + 1)),
      row: Math.max(1, Math.min(ROWS, Math.round(relY / geom.cellH) + 1))
    };
  }

  /* ---- 拖拽移动 ---- */
  function onDragStart(panel, e) {
    if (!isEditing) return;
    e.preventDefault();
    const pos = getPanelPos(panel);
    dragState = {
      type: 'drag',
      panel: panel,
      startX: e.clientX,
      startY: e.clientY,
      startCol: pos.col,
      startRow: pos.row,
      startSpan: pos.span,
      startRowSpan: pos.rowSpan || 1
    };
    panel.classList.add('dragging');
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }

  /* ---- 调整大小 ---- */
  function onResizeStart(panel, dir, e) {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();  // 阻止触发 drag
    const pos = getPanelPos(panel);
    dragState = {
      type: 'resize',
      panel: panel,
      dir: dir,
      startX: e.clientX,
      startY: e.clientY,
      startCol: pos.col,
      startSpan: pos.span,
      startRow: pos.row,
      startRowSpan: pos.rowSpan || 1
    };
    document.body.classList.add('resizing');
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }

  /** 拖拽/缩放过程中 */
  function onDragMove(e) {
    if (!dragState) return;
    const geom = getGridGeom();
    const grid = mouseToGrid(e.clientX, e.clientY, geom);
    const panel = dragState.panel;
    const id = panel.id || panel.className.split(' ').find(c => c.endsWith('-panel'));

    if (dragState.type === 'drag') {
      // 拖拽移动：同时支持水平+垂直方向
      let newCol = grid.col - Math.floor(dragState.startSpan / 2);  // 居中放置
      newCol = Math.max(1, Math.min(COLS - dragState.startSpan + 1, newCol));
      let newRow = grid.row - Math.floor((dragState.startRowSpan || 1) / 2);  // 垂直也居中
      newRow = Math.max(1, Math.min(ROWS, newRow));

      // 实时预览
      const rs = dragState.startRowSpan || 1;
      panel.style.gridColumn = `${newCol} / ${newCol + dragState.startSpan}`;
      panel.style.gridRow = `${newRow} / ${newRow + rs}`;

      // 显示指示器
      showIndicator(newCol, dragState.startSpan, newRow, rs, geom);

      // 更新预览位置
      dragState.previewCol = newCol;
      dragState.previewRow = newRow;

    } else if (dragState.type === 'resize') {
      const dir = dragState.dir;
      let newSpan = dragState.startSpan;
      let newCol = dragState.startCol;
      let newRow = dragState.startRow;
      let newRowSpan = dragState.startRowSpan || 1;

      if (dir === 'e') {
        // 右边拖 → 改变列跨度
        newSpan = grid.col - dragState.startCol + 1;
      } else if (dir === 'w') {
        // 左边拖 → 改变起始列 + 列跨度
        newSpan = dragState.startCol + dragState.startSpan - grid.col;
        newCol = grid.col;
      } else if (dir === 's') {
        // 下边拖 → 改变行跨度（允许跨行）
        newRowSpan = grid.row - dragState.startRow + 1;
        newRowSpan = Math.max(1, Math.min(ROWS - dragState.startRow + 1, newRowSpan));
        // 不改变列，只更新行跨度预览
        panel.style.gridRow = `${dragState.startRow} / ${dragState.startRow + newRowSpan}`;
        dragState.previewRowSpan = newRowSpan;
        showIndicator(dragState.startCol, dragState.startSpan, dragState.startRow, newRowSpan, geom);
        return;  // 提前返回，不需要下面的 gridColumn 更新
      } else if (dir === 'n') {
        // 上边拖 → 改变起始行 + 行跨度
        newRowSpan = dragState.startRow + (dragState.startRowSpan || 1) - grid.row;
        newRow = grid.row;
        newRowSpan = Math.max(1, Math.min(ROWS - grid.row + 1, newRowSpan));
        panel.style.gridRow = `${newRow} / ${newRow + newRowSpan}`;
        dragState.previewRow = newRow;
        dragState.previewRowSpan = newRowSpan;
        showIndicator(newCol, dragState.startSpan, newRow, newRowSpan, geom);
        return;
      }

      newSpan = Math.max(1, Math.min(COLS - newCol + 1, newSpan));

      // 实时预览（列方向）
      panel.style.gridColumn = `${newCol} / ${newCol + newSpan}`;

      dragState.previewCol = newCol;
      dragState.previewSpan = newSpan;

      showIndicator(newCol, newSpan, dragState.startRow, dragState.startRowSpan || 1, geom);
    }
  }

  /** 显示放置指示器 */
  function showIndicator(col, span, row, rowSpan, geom) {
    dropIndicator.style.display = 'block';
    dropIndicator.style.left = ((col - 1) * geom.cellW) + 'px';
    dropIndicator.style.top = ((row - 1) * geom.cellH) + 'px';
    dropIndicator.style.width = (span * geom.cellW - 4) + 'px';
    dropIndicator.style.height = ((rowSpan || 1) * geom.cellH - 4) + 'px';
  }

  /** 拖拽结束 — 应用最终位置 */
  function onDragEnd(e) {
    if (!dragState) return;

    const panel = dragState.panel;
    const id = panel.id || panel.className.split(' ').find(c => c.endsWith('-panel'));

    panel.classList.remove('dragging');
    document.body.classList.remove('resizing');
    dropIndicator.style.display = 'none';

    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);

    if (!currentLayout[id]) currentLayout[id] = { col: 1, span: 4, row: 1, rowSpan: 1 };

    if (dragState.type === 'drag') {
      currentLayout[id].col = dragState.previewCol ?? dragState.startCol;
      currentLayout[id].row = dragState.previewRow ?? dragState.startRow;
      // 拖拽不改变 span/rowSpan
    } else {
      currentLayout[id].col = dragState.previewCol ?? dragState.startCol;
      currentLayout[id].span = dragState.previewSpan ?? dragState.startSpan;
      if (dragState.previewRow !== undefined) currentLayout[id].row = dragState.previewRow;
      if (dragState.previewRowSpan !== undefined) currentLayout[id].rowSpan = dragState.previewRowSpan;
    }

    // 确保数值有效
    const p = currentLayout[id];
    p.col = Math.max(1, Math.min(COLS - p.span + 1, p.col));
    p.row = Math.max(1, Math.min(ROWS, p.row));
    p.rowSpan = Math.max(1, Math.min(ROWS - p.row + 1, p.rowSpan || 1));

    apply();  // 重新应用确保一致
    addLog(`布局更新: [${id}] → C${p.col}-${p.col+p.span-1} R${p.row}${p.rowSpan>1?'×'+p.rowSpan+'行':''}`, "info");
    dragState = null;
  }

  /** 保存布局到 localStorage */
  function save() {
    localStorage.setItem('imu-layout', JSON.stringify(currentLayout));
    addLog(`布局已保存（共 ${Object.keys(currentLayout).length} 个面板）`, "info");
  }

  /** 重置为默认布局 */
  function reset() {
    currentLayout = JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
    apply();
    addLog("布局已重置为默认配置", "warn");
  }

  /** 导出布局 JSON */
  function exportJson() {
    const json = JSON.stringify(currentLayout, null, 2);
    // 复制到剪贴板
    navigator.clipboard.writeText(json).then(() => {
      addLog("布局配置已复制到剪贴板", "info");
    }).catch(() => {
      // fallback: 弹出显示
      alert(json);
    });
  }

  /** 绑定事件 */
  function bindEvents() {
    toggleBtn.addEventListener('click', () => {
      isEditing ? exit() : enter();
    });
    $('layout-save').addEventListener('click', save);
    $('layout-reset').addEventListener('click', reset);
    $('layout-export').addEventListener('click', exportJson);
    $('layout-exit').addEventListener('click', exit);
  }

  // 初始化
  bindEvents();

  return { load, apply, save, reset, enter, exit, exportJson, getCurrent: () => currentLayout };
})();

// 页面加载后初始化布局编辑器
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => LayoutEditor.load(), 200);
});
