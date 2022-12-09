import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { ui5TestRunnerProject, setPlaywrightTest } from '@ui5/playwright/dist/playwright-test.js'

import * as playwrightTest from '@playwright/test'
setPlaywrightTest(playwrightTest);

// @ui5/playwright configuration
process.env["UI5_PLAYWRIGHT_TEST_PAGE"] = "test/testsuite.qunit.html";
process.env["UI5_PLAYWRIGHT_BASE_URL"] = "http://localhost:8080";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {

	/* Maximum time one test can run for. */
	timeout: 30 * 1000,

	retries: 2,

	/* Run tests in files in parallel */
	fullyParallel: true,

	/* Configure projects for major browsers */
	projects: [
		{

			use: {
				...devices["Desktop Chrome"],
			},

			...ui5TestRunnerProject,

		},
	],

};

export default config;
