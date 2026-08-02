/**
 * subset-fonts 包装脚本
 *
 * 背景：subset-font 依赖 harfbuzzjs（wasm），V8 默认栈大小（~984KB）在编译 wasm 时不足，
 * 触发 Windows SEH 异常 0xC0000409 (STATUS_STACK_BUFFER_OVERRUN)。
 *
 * 修复：用 --stack-size=8192（8MB）增大 V8 栈。
 * 但 --stack-size 不允许在 NODE_OPTIONS 中使用（Node 安全限制），
 * 且在 npm script（cmd.exe 上下文）中直接 `node --stack-size=8192 --import tsx` 不稳定。
 *
 * 本脚本作为 wrapper：在子进程中用 --stack-size=8192 加载 subset-fonts.ts，
 * wrapper 自身不加载 wasm，不会崩溃。
 *
 * 额外措施：
 * - --max-old-space-size=8192：增大 V8 堆内存，避免 build 链中 astro build 退出后内存碎片化
 * - 启动前延迟 2s：等待系统回收 astro build 占用的内存
 * - 崩溃重试（最多 3 次）：wasm 编译对内存敏感，间歇性崩溃后重试通常能成功
 */
import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const target = resolve(__dirname, "subset-fonts.ts");
const MAX_RETRIES = 3;

function runSubsetFonts() {
	return new Promise((resolve) => {
		const child = spawn(
			process.execPath,
			["--stack-size=8192", "--max-old-space-size=8192", "--import", "tsx", target],
			{ stdio: "inherit", cwd: process.cwd() },
		);
		child.on("exit", (code) => resolve(code ?? 1));
		child.on("error", (err) => {
			console.error(err);
			resolve(1);
		});
	});
}

// 启动前等待系统回收 astro build 占用的内存
await setTimeout(2000);

let code = 1;
for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
	if (attempt > 1) console.log(`\n⚠️ subset-fonts retry ${attempt}/${MAX_RETRIES}...`);
	code = await runSubsetFonts();
	if (code === 0) break;
	if (attempt < MAX_RETRIES) {
		console.log(`⚠️ subset-fonts exited with code ${code}, waiting 3s before retry...`);
		await setTimeout(3000);
	}
}
process.exit(code);
