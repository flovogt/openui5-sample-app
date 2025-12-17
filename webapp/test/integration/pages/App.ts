import Opa5 from "sap/ui/test/Opa5";
import Device from "sap/ui/Device";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";
import Properties from "sap/ui/test/matchers/Properties";
import EnterText from "sap/ui/test/actions/EnterText";
import Press from "sap/ui/test/actions/Press";
import List from "sap/m/List";
import CustomListItem from "sap/m/CustomListItem";
import CheckBox from "sap/m/CheckBox";
import Text from "sap/m/Text";
import Toolbar from "sap/m/Toolbar";
import ToggleButton from "sap/m/ToggleButton";

const sViewName = "sap.ui.demo.todo.view.App";
const sAddToItemInputId = "addTodoItemInput";
const sSearchTodoItemsInputId = "searchTodoItemsInput";
const sItemListId = "todoList";
const sToolbarId = Device.browser.mobile ? "toolbar-footer" : "toolbar";
const sClearCompletedId = Device.browser.mobile ? "clearCompleted-footer" : "clearCompleted";

export default class AppPage extends Opa5 {

	public iStartMyApp(): Opa5 {
		return this.iStartMyUIComponent({
			componentConfig: {
				name: "sap.ui.demo.todo",
				async: true,
				manifest: true
			}
		});
	}

	public iEnterTextForNewItemAndPressEnter(text: string): Opa5 {
		return this.waitFor({
			id: sAddToItemInputId,
			viewName: sViewName,
			actions: [new EnterText({ text: text })],
			errorMessage: "The text cannot be entered"
		});
	}

	public iEnterTextForSearchAndPressEnter(text: string): Opa5 {
		this._waitForToolbar();
		return this.waitFor({
			id: sSearchTodoItemsInputId,
			viewName: sViewName,
			actions: [new EnterText({ text: text })],
			errorMessage: "The text cannot be entered"
		});
	}

	public iSelectTheLastItem(bSelected: boolean): Opa5 {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			// selectionChange
			actions: [(oList: List) => {
				const iLength = oList.getItems().length;
				const oListItem = (oList.getItems()[iLength - 1] as CustomListItem).getContent()[0].getItems()[0] as CheckBox;
				this._triggerCheckboxSelection(oListItem, bSelected);
			}],
			errorMessage: "Last checkbox cannot be pressed"
		});
	}

	public iSelectAllItems(bSelected: boolean): Opa5 {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			actions: [(oList: List) => {

				oList.getItems().forEach((oListItem) => {
					const oCheckbox = (oListItem as CustomListItem).getContent()[0].getItems()[0] as CheckBox;
					this._triggerCheckboxSelection(oCheckbox, bSelected)

				});
			}],
			errorMessage: "checkbox cannot be pressed"
		});
	}

	private _triggerCheckboxSelection(oListItem: CheckBox, bSelected: boolean): void {
		//determine existing selection state and ensure that it becomes <code>bSelected</code>
		if (oListItem.getSelected() && !bSelected || !oListItem.getSelected() && bSelected) {
			const oPress = new Press();
			//search within the CustomListItem for the checkbox id ending with 'selectMulti-CB'
			oPress.controlAdapters["sap.m.CustomListItem"] = "selectMulti-CB";
			oPress.executeOn(oListItem);
		}
	}

	public iClearTheCompletedItems(): Opa5 {
		this._waitForToolbar();
		return this.waitFor({
			id: sClearCompletedId,
			viewName: sViewName,
			actions: [new Press()],
			errorMessage: "checkbox cannot be pressed"
		});
	}

	public iFilterForItems(filterKey: string): Opa5 {
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

	private _waitForToolbar(): void {
		this.waitFor({
			id: sToolbarId,
			viewName: sViewName,
			success: (oToolbar: Toolbar) => {
				return this.waitFor({
					controlType: "sap.m.ToggleButton",
					visible: false,
					success: (aToggleButtons: ToggleButton[]) => {
						const oToggleButton = aToggleButtons.find((oButton) => oButton.getId().startsWith(oToolbar.getId()) && oButton.getParent() === oToolbar)
						if (oToggleButton) {
							this.waitFor({
								id: oToggleButton.getId(),
								actions: new Press()
							});
						} else {
							Opa5.assert.ok(true, "The overflow toggle button is not present");
						}
					}
				})
			}
		});
	}

	public iShouldSeeTheItemBeingAdded(iItemCount: number, sLastAddedText: string): Opa5 {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [new AggregationLengthEquals({
				name: "items",
				length: iItemCount
			}), (oControl: List) => {
				const iLength = oControl.getItems().length;
				const oInput = ((oControl.getItems()[iLength - 1] as CustomListItem).getContent()[0].getItems()[1] as any).getItems()[0] as Text;
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

	public iShouldSeeTheLastItemBeingCompleted(bSelected: boolean): Opa5 {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [(oControl: List) => {
				const iLength = oControl.getItems().length;
				const oCheckbox = (oControl.getItems()[iLength - 1] as CustomListItem).getContent()[0].getItems()[0] as CheckBox;
				return bSelected && oCheckbox.getSelected() || !bSelected && !oCheckbox.getSelected();
			}],
			success() {
				Opa5.assert.ok(true, "The last item is marked as completed");
			},
			errorMessage: "The last item is not disabled."
		});
	}

	public iShouldSeeAllButOneItemBeingRemoved(sLastItemText: string): Opa5 {
		return this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [new AggregationLengthEquals({
				name: "items",
				length: 1
			}), (oControl: List) => {
				const oInput = ((oControl.getItems()[0] as CustomListItem).getContent()[0].getItems()[1] as any).getItems()[0] as Text;
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

	public iShouldSeeItemCount(iItemCount: number): Opa5 {
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
