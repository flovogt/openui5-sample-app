import { test, expect } from '@playwright/test';

test('unitTests.html', async ({ page }) => {
	await page.goto('http://localhost:8080/test/unit/unitTests.qunit.html');
	const result = await page.evaluate(() => {
		var fnResolve;
		const p = new Promise((resolve, reject) => {
			fnResolve = resolve;
		});
		const testRes = [];
		var testResult;
		window.QUnit.testStart(function (test) {
			testResult = { success: true };
		});
		window.QUnit.log(function (details) {
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
			testRes.push(test)
		});
		window.QUnit.done(function(){
			fnResolve(testRes);
		});
		return p;
	});

	console.log(result)

	await expect(result.failed);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);

	// create a locator
	const getStarted = page.getByRole('link', { name: 'Get started' });

	// Expect an attribute "to be strictly equal" to the value.
	await expect(getStarted).toHaveAttribute('href', '/docs/intro');

	// Click the get started link.
	await getStarted.click();

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*intro/);
});
