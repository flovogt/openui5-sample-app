import { chromium } from "playwright";
import { test, expect } from "@playwright/test";

const testPages = await discoverTests({
	url: "/test/testsuite.qunit.html"
});

async function discoverTests({ url }: { url: String }) {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:8080/test-resources/sap/ui/qunit/testrunner.html');
	const pages = page.evaluate((url) => sap.ui.qunit.TestRunner.checkTestPage(url), url);
	return pages;
}

function startWatching(page) {
	return page.evaluate(() => {
		var fnResolve;
		const p = new Promise((resolve, reject) => {
			fnResolve = resolve;
		});
		const testRes = [];
		var testResult;
		window.QUnit.testStart(function (test) {
			testResult = { success: true, errors: [] };
		});
		window.QUnit.log(function (details) {
			debugger;
			if (!details.result) {
				let msg = "";

				if (details.message) {
					msg += details.message + "\n";
				}

				if (typeof details.expected !== "undefined") {
					msg += "Expected: " + QUnit.dump.parse(details.expected) + "\n" +
						"Actual: " + QUnit.dump.parse(details.actual) + "\n";
				}

				if (details.source) {
					msg += details.source + "\n";
				}

				testResult.success = false;
				testResult.errors.push(msg);
			}
		});
		window.QUnit.testDone(function (test) {
			debugger;
			testRes.push(test)
		});
		window.QUnit.done(function () {
			fnResolve(testRes);
		});
		return p;
	});
}

testPages.forEach((testPage) => {
	test(testPage, async ({page}) => {
		await page.goto("http://localhost:8080" + testPage);
		const result = await startWatching(page);
		const modules = [...new Set(result.map((r) => {name: r.module, modules: []}))];
		const groupedResult = [];
		for (const testResult of result) {
			const myModule = modules.find(module => module.name === testResult.module);
			
			await test.step(testResult.module + ": " + testResult.name, async () => {
				for (const assertInfo of testResult.assertions) {
					await test.step(assertInfo.message, async () => {
						test.info(testResult.details);
						expect(assertInfo.result).toBe(true);
					});
				};
			});
		}
	});
});
