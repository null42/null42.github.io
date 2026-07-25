import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type RouteRecord = {
	path: string;
	kind: "astro" | "compatibility" | "removed";
	expectedStatus: number;
	finalUrl: string;
	target?: string;
};
type BaselineAttachment = { path: string; sha256: string };
type BaselineArticle = { attachments?: BaselineAttachment[] };

export type BuiltSiteReport = {
	missingRoutes: string[];
	redirectMismatches: string[];
	missingAttachments: string[];
	attachmentHashMismatches: string[];
	brokenInternalLinks: string[];
};

const routeToFile = (distDir: string, route: string) => {
	const clean = route.split(/[?#]/, 1)[0].replace(/\/index\/$/i, "/");
	if (clean === "/") return join(distDir, "index.html");
	if (clean === "/404/") return join(distDir, "404.html");
	if (extname(clean)) return join(distDir, clean.slice(1));
	return join(distDir, clean.slice(1), "index.html");
};

const sha256 = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");

const walkHtml = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
	const path = join(directory, entry.name);
	return entry.isDirectory() ? walkHtml(path) : entry.name.endsWith(".html") ? [path] : [];
});

const resolveInternalAsset = (distDir: string, htmlPath: string, reference: string) => {
	const clean = reference.split(/[?#]/, 1)[0];
	if (!clean || clean.includes("${") || clean.startsWith("#") || /^(?:[a-z]+:|\/\/)/i.test(clean)) return undefined;
	if (clean.startsWith("/")) return routeToFile(distDir, clean);
	const absolute = resolve(dirname(htmlPath), clean);
	return extname(absolute) ? absolute : join(absolute, "index.html");
};

export const verifyBuiltSite = async (rootDir = process.cwd()): Promise<BuiltSiteReport> => {
	const distDir = join(rootDir, "dist");
	const routeManifest = JSON.parse(readFileSync(join(rootDir, "reports/route-manifest.json"), "utf8")) as { routes: RouteRecord[] };
	const baseline = JSON.parse(readFileSync(join(rootDir, "reports/migration-baseline.json"), "utf8")) as { articles: BaselineArticle[] };
	const report: BuiltSiteReport = { missingRoutes: [], redirectMismatches: [], missingAttachments: [], attachmentHashMismatches: [], brokenInternalLinks: [] };
	const removedOutputs = new Set(routeManifest.routes.filter((route) => route.kind === "removed").map((route) => routeToFile(distDir, route.path).toLowerCase()));
	const outputFiles = new Set<string>();
	for (const file of walkHtml(distDir)) outputFiles.add(file.toLowerCase());
	const collectOtherFiles = (directory: string) => {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const output = join(directory, entry.name);
			if (entry.isDirectory()) collectOtherFiles(output);
			else outputFiles.add(output.toLowerCase());
		}
	};
	collectOtherFiles(distDir);

	for (const route of routeManifest.routes) {
		if (route.kind === "removed") continue;
		const output = routeToFile(distDir, route.path);
		if (!existsSync(output)) {
			report.missingRoutes.push(route.path);
			continue;
		}
		if (route.kind === "compatibility") {
			if (route.path === "/index.html") continue;
			const html = readFileSync(output, "utf8");
			const finalUrl = route.finalUrl || route.target;
			if (!finalUrl || !html.includes(`href="${finalUrl}"`) || !html.includes("location.replace(target+(location.hash||''))")) report.redirectMismatches.push(route.path);
		}
	}

	for (const article of baseline.articles) {
		for (const attachment of article.attachments ?? []) {
			const output = join(distDir, attachment.path);
			if (!existsSync(output)) report.missingAttachments.push(attachment.path);
			else if (sha256(output) !== attachment.sha256) report.attachmentHashMismatches.push(attachment.path);
		}
	}

	for (const htmlPath of walkHtml(distDir)) {
		if (removedOutputs.has(htmlPath.toLowerCase())) continue;
		const html = readFileSync(htmlPath, "utf8");
		for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
			const reference = match[1];
			const output = resolveInternalAsset(distDir, htmlPath, reference);
			if (output && !outputFiles.has(output.toLowerCase())) report.brokenInternalLinks.push(`${relative(distDir, htmlPath)} -> ${reference}`);
		}
	}

	for (const values of Object.values(report)) values.sort();
	return report;
};

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	const report = await verifyBuiltSite();
	console.log(JSON.stringify(report, null, 2));
	if (Object.values(report).some((items) => items.length > 0)) process.exitCode = 1;
}
