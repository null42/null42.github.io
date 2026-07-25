import { describe, expect, it } from "vitest";
import { verifyBuiltSite } from "../../scripts/migration/verify-built-site";

describe("built site integrity", () => {
	it("skips explicitly removed route artifacts during link scanning", () => {
		const source = require("node:fs").readFileSync("scripts/migration/verify-built-site.ts", "utf8");
		expect(source).toContain("removedOutputs.has(htmlPath.toLowerCase())");
	});

	it("matches the route manifest and attachment baseline", async () => {
		const report = await verifyBuiltSite();

		expect(report.missingRoutes).toEqual([]);
		expect(report.redirectMismatches).toEqual([]);
		expect(report.missingAttachments).toEqual([]);
		expect(report.attachmentHashMismatches).toEqual([]);
		expect(report.brokenInternalLinks).toEqual([]);
	});
});
