import Opa5 from "sap/ui/test/Opa5";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";
import Properties from "sap/ui/test/matchers/Properties";
import EnterText from "sap/ui/test/actions/EnterText";
import Press from "sap/ui/test/actions/Press";
import Device from "sap/ui/Device";
import List from "sap/m/List";
import CustomListItem from "sap/m/CustomListItem";
import CheckBox from "sap/m/CheckBox";
import HBox from "sap/m/HBox";
import OverflowToolbar from "sap/m/OverflowToolbar";
import ToggleButton from "sap/m/ToggleButton";
import UI5Element from "sap/ui/core/Element";

const sViewName = "sap.ui.demo.todo.view.App";
const sAddToItemInputId = "addTodoItemInput";
const sSearchTodoItemsInputId = "searchTodoItemsInput";
const sItemListId = "todoList";
const sToolbarId = Device.browser.mobile ? "toolbar-footer" : "toolbar";
const sClearCompletedId = Device.browser.mobile ? "clearCompleted-footer" : "clearCompleted";

export default class AppPage extends Opa5 {

	iStartMyApp(): void {
		this.iStartMyUIComponent({
			componentConfig: {
				name: "sap.ui.demo.todo",
				async: true,
				manifest: true
			}
		});
	}

	iEnterTextForNewItemAndPressEnter(text: string): this {
		return this.waitFor({
			id: sAddToItemInputId,
			viewName: sViewName,
			actions: [new EnterText({ text: text })],
			errorMessage: "The text cannot be entered"
		});
	}

	iEnterTextForSearchAndPressEnter(text: string): this {
		this._waitForToolbar();
		return this.waitFor({
			id: sSearchTodoItemsInputId,
			viewName: sViewName,
			actions: [new EnterText({ text: text })],
			errorMessage: "The text cannot be entered"
		});
	}

	iSelectTheLastItem(bSelected: boolean): this {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			actions: [(oListEl: UI5Element) => {
				const oList = oListEl as List;
				const iLength = oList.getItems().length;
				const oListItem = (oList.getItems()[iLength - 1] as CustomListItem).getContent()[0] as HBox;
				this._triggerCheckboxSelection(oListItem.getItems()[0] as CheckBox, bSelected);
			}],
			errorMessage: "Last checkbox cannot be pressed"
		});
	}

	iSelectAllItems(bSelected: boolean): this {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			actions: [(oListEl: UI5Element) => {
				const oList = oListEl as List;
				oList.getItems().forEach((oListItem) => {
					const oHBox = (oListItem as CustomListItem).getContent()[0] as HBox;
					const oCheckbox = oHBox.getItems()[0] as CheckBox;
					this._triggerCheckboxSelection(oCheckbox, bSelected);
				});
			}],
			errorMessage: "checkbox cannot be pressed"
		});
	}

	_triggerCheckboxSelection(oListItem: CheckBox, bSelected: boolean): void {
		//determine existing selection state and ensure that it becomes <code>bSelected</code>
		if (oListItem.getSelected() && !bSelected || !oListItem.getSelected() && bSelected) {
			const oPress = new Press();
			//search within the CustomListItem for the checkbox id ending with 'selectMulti-CB'
			(oPress as Press & { controlAdapters: Record<string, string> }).controlAdapters["sap.m.CustomListItem"] = "selectMulti-CB";
			oPress.executeOn(oListItem);
		}
	}

	iClearTheCompletedItems(): this {
		this._waitForToolbar();
		return this.waitFor({
			id: sClearCompletedId,
			viewName: sViewName,
			actions: [new Press()],
			errorMessage: "checkbox cannot be pressed"
		});
	}

	iFilterForItems(filterKey: string): this {
		this._waitForToolbar();
		return this.waitFor({
			viewName: sViewName,
			controlType: "sap.m.SegmentedButtonItem",
			matchers: [
				new Properties({ key: filterKey })
			],
			actions: [new Press()],
			errorMessage: "SegmentedButton can not be pressed"
		});
	}

	_waitForToolbar(): void {
		this.waitFor({
			id: sToolbarId,
			viewName: sViewName,
			success: (oToolbarEl: UI5Element) => {
				const oToolbar = oToolbarEl as OverflowToolbar;
				return this.waitFor({
					controlType: "sap.m.ToggleButton",
					visible: false,
					success: (aToggleButtonsEl: UI5Element[]) => {
						const aToggleButtons = aToggleButtonsEl as ToggleButton[];
						const oToggleButton = aToggleButtons.find((oButton) => oButton.getId().startsWith(oToolbar.getId()) && oButton.getParent() === oToolbar);
						if (oToggleButton) {
							this.waitFor({
								id: oToggleButton.getId(),
								actions: new Press()
							});
						} else {
							Opa5.assert.ok(true, "The overflow toggle button is not present");
						}
					}
				});
			}
		});
	}

	iShouldSeeTheItemBeingAdded(iItemCount: number, sLastAddedText: string): this {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [new AggregationLengthEquals({
				name: "items",
				length: iItemCount
			}), (oControlEl: UI5Element) => {
				const oControl = oControlEl as List;
				const iLength = oControl.getItems().length;
				const oHBox = (oControl.getItems()[iLength - 1] as CustomListItem).getContent()[0] as HBox;
				const oInput = (oHBox.getItems()[1] as HBox).getItems()[0];
				return new PropertyStrictEquals({
					name: "text",
					value: sLastAddedText
				}).isMatching(oInput);
			}],
			success() {
				Opa5.assert.ok(true, "The table has " + iItemCount + " item(s), with '" + sLastAddedText + "' as last item");
			},
			errorMessage: "List does not have expected entry '" + sLastAddedText + "'."
		});
	}

	iShouldSeeTheLastItemBeingCompleted(bSelected: boolean): this {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [(oControlEl: UI5Element) => {
				const oControl = oControlEl as List;
				const iLength = oControl.getItems().length;
				const oHBox = (oControl.getItems()[iLength - 1] as CustomListItem).getContent()[0] as HBox;
				const oCheckbox = oHBox.getItems()[0] as CheckBox;
				return bSelected && oCheckbox.getSelected() || !bSelected && !oCheckbox.getSelected();
			}],
			success() {
				Opa5.assert.ok(true, "The last item is marked as completed");
			},
			errorMessage: "The last item is not disabled."
		});
	}

	iShouldSeeAllButOneItemBeingRemoved(sLastItemText: string): this {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [new AggregationLengthEquals({
				name: "items",
				length: 1
			}), (oControlEl: UI5Element) => {
				const oControl = oControlEl as List;
				const oHBox = (oControl.getItems()[0] as CustomListItem).getContent()[0] as HBox;
				const oInput = (oHBox.getItems()[1] as HBox).getItems()[0];
				return new PropertyStrictEquals({
					name: "text",
					value: sLastItemText
				}).isMatching(oInput);
			}],
			success() {
				Opa5.assert.ok(true, "The table has 1 item, with '" + sLastItemText + "' as Last item");
			},
			errorMessage: "List does not have expected entry '" + sLastItemText + "'."
		});
	}

	iShouldSeeItemCount(iItemCount: number): this {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [new AggregationLengthEquals({
				name: "items",
				length: iItemCount
			})],
			success() {
				Opa5.assert.ok(true, "The table has " + iItemCount + " item(s)");
			},
			errorMessage: "List does not have expected number of items '" + iItemCount + "'."
		});
	}
}
