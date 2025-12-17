import opaTest from "sap/ui/test/opaQunit";
import AppPage from "./pages/App";
import QUnit from "sap/ui/thirdparty/qunit-2";

const onTheAppPage = new AppPage();

QUnit.module("Todo List");

opaTest("should add an item", function () {

	// Arrangements
	onTheAppPage.iStartMyApp();

	//Actions
	onTheAppPage.iEnterTextForNewItemAndPressEnter("my test");

	// Assertions
	onTheAppPage.iShouldSeeTheItemBeingAdded(3, "my test");

	// Cleanup
	onTheAppPage.iTeardownMyApp();
});

opaTest("should remove a completed item", function () {

	// Arrangements
	onTheAppPage.iStartMyApp();

	//Actions
	onTheAppPage.iEnterTextForNewItemAndPressEnter("my test");
	onTheAppPage.iSelectAllItems(true);
	onTheAppPage.iClearTheCompletedItems();
	onTheAppPage.iEnterTextForNewItemAndPressEnter("my test");

	// Assertions
	onTheAppPage.iShouldSeeAllButOneItemBeingRemoved("my test");

	// Cleanup
	onTheAppPage.iTeardownMyApp();
});

opaTest("should select an item", function () {

	// Arrangements
	onTheAppPage.iStartMyApp();

	//Actions
	onTheAppPage.iEnterTextForNewItemAndPressEnter("my test");
	onTheAppPage.iSelectTheLastItem(true);

	// Assertions
	onTheAppPage.iShouldSeeTheLastItemBeingCompleted(true);

	// Cleanup
	onTheAppPage.iTeardownMyApp();
});

opaTest("should unselect an item", function () {

	// Arrangements
	onTheAppPage.iStartMyApp();

	//Actions
	onTheAppPage.iEnterTextForNewItemAndPressEnter("my test");
	onTheAppPage.iSelectAllItems(true);
	onTheAppPage.iClearTheCompletedItems();
	onTheAppPage.iEnterTextForNewItemAndPressEnter("my test");
	onTheAppPage.iSelectTheLastItem(true);
	onTheAppPage.iSelectTheLastItem(false);

	// Assertions
	onTheAppPage.iShouldSeeTheLastItemBeingCompleted(false);

	// Cleanup
	onTheAppPage.iTeardownMyApp();
});
