import Opa5 from "sap/ui/test/Opa5";
import Device from "sap/ui/Device";
import AggregationLengthEquals from "sap/ui/test/matchers/AggregationLengthEquals";
import PropertyStrictEquals from "sap/ui/test/matchers/PropertyStrictEquals";
import Properties from "sap/ui/test/matchers/Properties";
import EnterText from "sap/ui/test/actions/EnterText";
import Press from "sap/ui/test/actions/Press";

const sViewName = "sap.ui.demo.todo.view.App";
const sAddToItemInputId = "addTodoItemInput";
const sSearchTodoItemsInputId = "searchTodoItemsInput";
const sItemListId = "todoList";
const sToolbarId = Device.browser.mobile ? "toolbar-footer" : "toolbar";
const sClearCompletedId = Device.browser.mobile ? "clearCompleted-footer" : "clearCompleted";

export default class AppPage extends Opa5 {

	public iStartMyApp(): this {
		this.iStartMyUIComponent({
			componentConfig: {
				name: "sap.ui.demo.todo",
				async: true,
				manifest: true
			}
		});
		return this;
	}

	public iEnterTextForNewItemAndPressEnter(text: string): this {
		this.waitFor({
			id: sAddToItemInputId,
			viewName: sViewName,
			actions: [new EnterText({ text: text })],
			errorMessage: "The text cannot be entered"
		});
		return this;
	}

	public iEnterTextForSearchAndPressEnter(text: string): this {
		this._waitForToolbar();
		this.waitFor({
			id: sSearchTodoItemsInputId,
			viewName: sViewName,
			actions: [new EnterText({ text: text })],
			errorMessage: "The text cannot be entered"
		});
		return this;
	}

	public iSelectTheLastItem(bSelected: boolean): this {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			// selectionChange
			actions: [(oList: any) => {
				const iLength = oList.getItems().length;
				const oListItem = oList.getItems()[iLength - 1].getContent()[0].getItems()[0];
				this._triggerCheckboxSelection(oListItem, bSelected);
			}],
			errorMessage: "Last checkbox cannot be pressed"
		});
		return this;
	}

	public iSelectAllItems(bSelected: boolean): this {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			actions: [(oList: any) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				oList.getItems().forEach((oListItem: any) => {
					const oCheckbox = oListItem.getContent()[0].getItems()[0];
					this._triggerCheckboxSelection(oCheckbox, bSelected)

				});
			}],
			errorMessage: "checkbox cannot be pressed"
		});
		return this;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _triggerCheckboxSelection(oListItem: any, bSelected: boolean): void {
		//determine existing selection state and ensure that it becomes <code>bSelected</code>
		if (oListItem.getSelected() && !bSelected || !oListItem.getSelected() && bSelected) {
			const oPress = new Press();
			//search within the CustomListItem for the checkbox id ending with 'selectMulti-CB'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(oPress as any).controlAdapters["sap.m.CustomListItem"] = "selectMulti-CB";
			oPress.executeOn(oListItem);
		}
	}

	public iClearTheCompletedItems(): this {
		this._waitForToolbar();
		this.waitFor({
			id: sClearCompletedId,
			viewName: sViewName,
			actions: [new Press()],
			errorMessage: "checkbox cannot be pressed"
		});
		return this;
	}

	public iFilterForItems(filterKey: string): this {
		this._waitForToolbar();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.waitFor({
			viewName: sViewName,
			controlType: "sap.m.SegmentedButtonItem",
			matchers: [
				new Properties({ key: filterKey }) as any
			],
			actions: [new Press()],
			errorMessage: "SegmentedButton can not be pressed"
		});
		return this;
	}

	private _waitForToolbar(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.waitFor({
			id: sToolbarId,
			viewName: sViewName,
			success: (oToolbar: any) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return this.waitFor({
					controlType: "sap.m.ToggleButton",
					visible: false,
					success: (aToggleButtons: any) => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						const oToggleButton = aToggleButtons.find((oButton: any) => oButton.getId().startsWith(oToolbar.getId()) && oButton.getParent() === oToolbar)
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

	public iShouldSeeTheItemBeingAdded(iItemCount: number, sLastAddedText: string): this {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [new AggregationLengthEquals({
				name: "items",
				length: iItemCount
			}), (oControl: any) => {
				const iLength = oControl.getItems().length;
				const oInput = oControl.getItems()[iLength - 1].getContent()[0].getItems()[1].getItems()[0];
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
		return this;
	}

	public iShouldSeeTheLastItemBeingCompleted(bSelected: boolean): this {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [(oControl: any) => {
				const iLength = oControl.getItems().length;
				const oCheckbox = oControl.getItems()[iLength - 1].getContent()[0].getItems()[0];
				return bSelected && oCheckbox.getSelected() || !bSelected && !oCheckbox.getSelected();
			}],
			success() {
				Opa5.assert.ok(true, "The last item is marked as completed");
			},
			errorMessage: "The last item is not disabled."
		});
		return this;
	}

	public iShouldSeeAllButOneItemBeingRemoved(sLastItemText: string): this {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.waitFor({
			id: sItemListId,
			viewName: sViewName,
			matchers: [new AggregationLengthEquals({
				name: "items",
				length: 1
			}), (oControl: any) => {
				const oInput = oControl.getItems()[0].getContent()[0].getItems()[1].getItems()[0];
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
		return this;
	}

	public iShouldSeeItemCount(iItemCount: number): this {
		this.waitFor({
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
		return this;
	}
}
