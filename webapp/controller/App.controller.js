/**
 * UI5 Data Binding Overview
 *
 * Data Binding in UI5 creates a live connection between UI controls and data models.
 * When the underlying data changes, the UI updates automatically - and with two-way
 * binding, UI interactions are reflected back into the model as well.
 *
 * --- Models ---
 * A model is the data container. This app uses three model types:
 *   - JSONModel (default/unnamed ""):  Holds local app state (todos, newTodo, itemsRemovable, ...).
 *                                     Loaded from model/todoitems.json via manifest.json.
 *   - ResourceModel ("i18n"):         Provides translated strings, accessed as {i18n>KEY}.
 *   - JSONModel ("view"):             Created programmatically in onInit() for view-specific
 *                                     state like the isMobile flag.
 *
 * --- Binding Types ---
 * 1. Property Binding – links a control property directly to a model path.
 *    Syntax in XML view:  value="{/newTodo}"
 *    Programmatic:        control.bindProperty("text", { path: "/newTodo" })
 *
 * 2. Aggregation / List Binding – binds a list or table to an array in the model.
 *    The framework creates one child control per array entry automatically.
 *    Syntax in XML view:  items="{ path: '/todos', events: { change: '.onUpdateItemsLeftCount' } }"
 *    Programmatic:        oList.getBinding("items").filter([...])
 *
 * 3. Expression Binding – evaluates a JavaScript-like expression at binding time.
 *    Useful for simple conditional or computed properties without a separate formatter.
 *    Example:  visible="{= !${view>/isMobile} }"
 *
 * 4. Named Model Binding – when a model is registered under a name, that name is used
 *    as a prefix separated by ">" in binding paths.
 *    Example:  text="{i18n>TITLE}"   (named model "i18n")
 *              visible="{= !!${view>/isMobile} }"  (named model "view")
 *
 * --- Binding Modes ---
 * - One-Way:  Model → View only. Default for JSONModel.
 * - Two-Way:  Model ↔ View. Changes in the UI propagate back to the model.
 * - One-Time: Model → View once at binding creation, no further updates.
 *
 * --- Formatters ---
 * A formatter function transforms the raw model value before it is displayed.
 * Example in this controller:
 *   this.byId("filterLabel").bindProperty("text", {
 *       path: sI18nKey, model: "i18n",
 *       formatter: (text) => formatMessage(text, [this.sSearchQuery])
 *   });
 *
 * For further details see the Data Binding documentation: https://ui5.sap.com/#/topic/e5310932a71f42daa41f3a6143efca9c
 */

jQuery.sap.declare("sap.ui.demo.todo.controller.App");

jQuery.sap.require("sap.ui.Device");
jQuery.sap.require("sap.ui.core.mvc.Controller");
jQuery.sap.require("sap.ui.model.Filter");
jQuery.sap.require("sap.ui.model.FilterOperator");
jQuery.sap.require("sap.ui.model.json.JSONModel");
jQuery.sap.require("sap.ui.core.BarColor");
jQuery.sap.require("sap.ui.demo.todo.util.Helper");
sap.ui.controller("sap.ui.demo.todo.controller.App", {

	onInit() {
		this.aSearchFilters = [];
		this.aTabFilters = [];
		this.BarColor = sap.ui.core.BarColor;

		this.getView().setModel(new sap.ui.model.json.JSONModel({
			isMobile: sap.ui.Device.browser.mobile
		}), "view");
	},

	onAfterRendering() {
		const avatarDOM = jQuery("#container-todo---app--avatar-profile");
		const avatarCtr = avatarDOM.control(0);
		avatarCtr.setSrc(sap.ui.demo.todo.util.Helper.resolvePath('./img/logo_ui5.png'));
	},

	/**
	 * Get the default model from the view
	 *
	 * @returns {sap.ui.model.json.JSONModel} The model containing the todo list, etc.
	 */
	getModel() {
		return this.getView().getModel();
	},

	/**
	 * Adds a new todo item to the bottom of the list.
	 */
	addTodo() {
		const oModel = this.getModel();
		const aTodos = this.getTodos().map((oTodo) => Object.assign({}, oTodo));

		aTodos.push({
			title: oModel.getProperty("/newTodo"),
			completed: false
		});

		oModel.setProperty("/todos", aTodos);
		oModel.setProperty("/newTodo", "");
	},

	/**
	 * Trigger removal of all completed items from the todo list.
	 */
	onClearCompleted() {
		const aTodos = this.getTodos().map((oTodo) => Object.assign({}, oTodo));
		this.removeCompletedTodos(aTodos);
		this.getModel().setProperty("/todos", aTodos);
	},

	/**
	 * Removes all completed items from the given todos.
	 *
	 * @param {object[]} aTodos
	 */
	removeCompletedTodos(aTodos) {
		let i = aTodos.length;
		while (i--) {
			const oTodo = aTodos[i];
			if (oTodo.completed) {
				aTodos.splice(i, 1);
			}
		}
	},

	/**
	 * Determines the todo list
	 *
	 * @returns {object[]} The todo list
	 */
	getTodos() {
		const oModel = this.getModel();
		return oModel && oModel.getProperty("/todos") || [];
	},

	/**
	 * Updates the number of items not yet completed
	 */
	onUpdateItemsLeftCount() {
		const iItemsLeft = this.getTodos().filter((oTodo) => oTodo.completed !== true).length;
		this.getModel().setProperty("/itemsLeftCount", iItemsLeft);
	},

	/**
	 * Trigger search for specific items. The removal of items is disable as long as the search is used.
	 * @param {sap.ui.base.Event} oEvent Input changed event
	 */
	onSearch(oEvent) {
		const oModel = this.getModel();

		// First reset current filters
		this.aSearchFilters = [];

		// add filter for search
		this.sSearchQuery = oEvent.getSource().getValue();
		if (this.sSearchQuery && this.sSearchQuery.length > 0) {
			oModel.setProperty("/itemsRemovable", false);
			const filter = new Filter("title", FilterOperator.Contains, this.sSearchQuery);
			this.aSearchFilters.push(filter);
		} else {
			oModel.setProperty("/itemsRemovable", true);
		}

		this._applyListFilters();
	},

	onFilter(oEvent) {
		// First reset current filters
		this.aTabFilters = [];

		// add filter for search
		this.sFilterKey = oEvent.getParameter("item").getKey();

		switch (this.sFilterKey) {
			case "active":
				this.aTabFilters.push(new Filter("completed", FilterOperator.EQ, false));
				break;
			case "completed":
				this.aTabFilters.push(new Filter("completed", FilterOperator.EQ, true));
				break;
			case "all":
			default:
			// Don't use any filter
		}

		this._applyListFilters();
	},

	_applyListFilters() {
		const oList = sap.ui.getCore().byId("container-todo---app--todoList");
		// const oList = this.byId("todoList");
		const oBinding = oList.getBinding("items");

		oBinding.filter(this.aSearchFilters.concat(this.aTabFilters), "todos");

		const sI18nKey = this.getI18NKey(this.sFilterKey, this.sSearchQuery);

		this.byId("filterToolbar").setVisible(!!sI18nKey);
		if (sI18nKey) {
			this.byId("filterLabel").bindProperty("text", {
				path: sI18nKey,
				model: "i18n",
				formatter: (textWithPlaceholder) => {
					return formatMessage(textWithPlaceholder, [this.sSearchQuery]);
				}
			});
		}
	},

	getI18NKey(sFilterKey, sSearchQuery) {
		if (!sFilterKey || sFilterKey === "all") {
			return sSearchQuery ? "ITEMS_CONTAINING" : undefined;
		} else if (sFilterKey === "active") {
			return "ACTIVE_ITEMS" + (sSearchQuery ? "_CONTAINING" : "");
		} else {
			return "COMPLETED_ITEMS" + (sSearchQuery ? "_CONTAINING" : "");
		}
	}
});
