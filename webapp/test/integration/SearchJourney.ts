import Device from "sap/ui/Device";
import opaTest from "sap/ui/test/opaQunit";
import AppPage from "./pages/App";
import QUnit from "sap/ui/thirdparty/qunit-2";

const onTheAppPage = new AppPage();

QUnit.module("Search");

if (Device.browser.mobile) {
	// Search functionality is currently not support on mobile devices
} else {

	opaTest("should show correct item count after search (1)", function () {

		// Arrangements
		onTheAppPage.iStartMyApp();

		//Actions
		onTheAppPage.iEnterTextForSearchAndPressEnter("earn");

		// Assertions
		onTheAppPage.iShouldSeeItemCount(1);

		// Cleanup
		onTheAppPage.iTeardownMyApp();
	});

	opaTest("should show correct item count after search (0)", function () {

		// Arrangements
		onTheAppPage.iStartMyApp();

		//Actions
		onTheAppPage.iEnterTextForSearchAndPressEnter("there should not be an item for this search");

		// Assertions
		onTheAppPage.iShouldSeeItemCount(0);

		// Cleanup
		onTheAppPage.iTeardownMyApp();
	});

	opaTest("should show correct item count after search and clearing the search", function () {

		// Arrangements
		onTheAppPage.iStartMyApp();

		//Actions
		onTheAppPage.iEnterTextForSearchAndPressEnter("earn");
		onTheAppPage.iEnterTextForSearchAndPressEnter("");

		// Assertions
		onTheAppPage.iShouldSeeItemCount(2);

		// Cleanup
		onTheAppPage.iTeardownMyApp();
	});

	opaTest("should show correct item count after search and active items filter", function () {

		// Arrangements
		onTheAppPage.iStartMyApp();

		//Actions
		onTheAppPage.iEnterTextForSearchAndPressEnter("earn");
		onTheAppPage.iFilterForItems("active");

		// Assertions
		onTheAppPage.iShouldSeeItemCount(1);

		// Cleanup
		onTheAppPage.iTeardownMyApp();
	});

	opaTest("should show correct item count after search and completed items filter", function () {

		// Arrangements
		onTheAppPage.iStartMyApp();

		//Actions
		onTheAppPage.iEnterTextForSearchAndPressEnter("earn");
		onTheAppPage.iFilterForItems("completed");

		// Assertions
		onTheAppPage.iShouldSeeItemCount(0);

		// Cleanup
		onTheAppPage.iTeardownMyApp();
	});

	opaTest("should show correct item count after search and all items filter", function () {

		// Arrangements
		onTheAppPage.iStartMyApp();

		//Actions
		onTheAppPage.iEnterTextForSearchAndPressEnter("earn");
		onTheAppPage.iFilterForItems("all");

		// Assertions
		onTheAppPage.iShouldSeeItemCount(1);

		// Cleanup
		onTheAppPage.iTeardownMyApp();
	});

}
