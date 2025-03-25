sap.ui.define(["sap/ui/test/opaQunit","./pages/App"],e=>{"use strict";QUnit.module("Todo List");e("should add an item",(e,t,n)=>{e.iStartMyApp();t.onTheAppPage.iEnterTextForNewItemAndPressEnter("my test");n.onTheAppPage.iShouldSeeTheItemBeingAdded(3,"my test");n.iTeardownMyApp()});e("should remove a completed item",(e,t,n)=>{e.iStartMyApp();t.onTheAppPage.iEnterTextForNewItemAndPressEnter("my test").and.iSelectAllItems(true).and.iClearTheCompletedItems().and.iEnterTextForNewItemAndPressEnter("my test");n.onTheAppPage.iShouldSeeAllButOneItemBeingRemoved("my test");n.iTeardownMyApp()});e("should select an item",(e,t,n)=>{e.iStartMyApp();t.onTheAppPage.iEnterTextForNewItemAndPressEnter("my test").and.iSelectTheLastItem(true);n.onTheAppPage.iShouldSeeTheLastItemBeingCompleted(true);n.iTeardownMyApp()});e("should unselect an item",(e,t,n)=>{e.iStartMyApp();t.onTheAppPage.iEnterTextForNewItemAndPressEnter("my test").and.iSelectAllItems(true).and.iClearTheCompletedItems().and.iEnterTextForNewItemAndPressEnter("my test").and.iSelectTheLastItem(true).and.iSelectTheLastItem(false);n.onTheAppPage.iShouldSeeTheLastItemBeingCompleted(false);n.iTeardownMyApp()})});
//# sourceMappingURL=TodoListJourney.js.map