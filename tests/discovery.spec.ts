import { test, expect, Page } from '@playwright/test';

async function discoverTests({page, url} : { page: Page, url: String }) {
	await page.goto('http://localhost:8080/test-resources/sap/ui/qunit/testrunner.html');
	return page.evaluate((url) => sap.ui.qunit.TestRunner.checkTestPage(url), url);
}

test('Test discovery', async ({ page }) => {
	const testPages = await discoverTests({
		page,
		url: "/test/testsuite.qunit.html"
	});

	console.log(testPages);
});
