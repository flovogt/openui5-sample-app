import QUnit from "sap/ui/thirdparty/qunit-2";
import AppController from "sap/ui/demo/todo/controller/App.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import View from "sap/ui/core/mvc/View";

declare const sinon: {
	stub: <T extends object, K extends keyof T>(obj: T, method: K) => {
		returns: (val: unknown) => void;
		restore: () => void;
	};
};

let oAppController: AppController;

QUnit.module("App.controller.js", {

	beforeEach() {
		oAppController = new AppController("testController");
	},

	afterEach() {
		oAppController.destroy();
	}
});

QUnit.test("getI18NKey", (assert) => {
	assert.strictEqual(oAppController.getI18NKey(undefined, undefined), undefined);
	assert.strictEqual(oAppController.getI18NKey(undefined, "My Todo"), "ITEMS_CONTAINING");
	assert.strictEqual(oAppController.getI18NKey("all", undefined), undefined);
	assert.strictEqual(oAppController.getI18NKey("active", undefined), "ACTIVE_ITEMS");
	assert.strictEqual(oAppController.getI18NKey("active", "My Todo"), "ACTIVE_ITEMS_CONTAINING");
	assert.strictEqual(oAppController.getI18NKey("completed", undefined), "COMPLETED_ITEMS");
	assert.strictEqual(oAppController.getI18NKey("completed", "My Todo"), "COMPLETED_ITEMS_CONTAINING");
});


QUnit.test("removeCompletedTodos", (assert) => {
	const aTodos = [{title: "My Todo", completed: false}, {title: "My Todo 2", completed: false}];
	oAppController.removeCompletedTodos(aTodos);
	assert.deepEqual(aTodos, [{title: "My Todo", completed: false}, {title: "My Todo 2", completed: false}]);

	aTodos[1].completed = true;
	oAppController.removeCompletedTodos(aTodos);
	assert.deepEqual(aTodos, [{title: "My Todo", completed: false}]);
});


QUnit.test("getTodos", (assert) => {
	// Prepare
	const oViewStub = {
		getModel: () => new JSONModel()
	} as unknown as View;
	const oGetViewStub = sinon.stub(oAppController, "getView");
	oGetViewStub.returns(oViewStub);

	// Act
	assert.deepEqual(oAppController.getTodos(), []);

	// Clean-up
	oGetViewStub.restore();
});
