import QUnit from "sap/ui/thirdparty/qunit-2";
import AppController from "sap/ui/demo/todo/controller/App.controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import sinon from "sinon";

let oAppController: AppController;

QUnit.module("App.controller.js", {

	beforeEach() {
		oAppController = new AppController("test");
	},

	afterEach() {
		oAppController.destroy();
	}
});

QUnit.test("getI18NKey", (assert) => {
	assert.strictEqual(oAppController.getI18NKey("", ""), undefined);
	assert.strictEqual(oAppController.getI18NKey("", "My Todo"), "ITEMS_CONTAINING");
	assert.strictEqual(oAppController.getI18NKey("all", ""), undefined);
	assert.strictEqual(oAppController.getI18NKey("active", ""), "ACTIVE_ITEMS");
	assert.strictEqual(oAppController.getI18NKey("active", "My Todo"), "ACTIVE_ITEMS_CONTAINING");
	assert.strictEqual(oAppController.getI18NKey("completed", ""), "COMPLETED_ITEMS");
	assert.strictEqual(oAppController.getI18NKey("completed", "My Todo"), "COMPLETED_ITEMS_CONTAINING");
});


QUnit.test("removeCompletedTodos", (assert) => {
	const aTodos = [{title: "My Todo", completed: false}, {title: "My Todo 2", completed: false}];
	oAppController.removeCompletedTodos(aTodos);
	assert.deepEqual(aTodos, [{title: "My Todo", completed: false}, {title: "My Todo 2", completed: false}]);

	aTodos[1].completed = true;
	oAppController.removeCompletedTodos(aTodos)
	assert.deepEqual(aTodos, [{title: "My Todo", completed: false}]);
});


QUnit.test("getTodos", (assert) => {
	// Prepare
	const oViewStub = {
		getModel: () => {
			return new JSONModel();
		}
	};
	const oGetViewStub = sinon.stub(oAppController, "getView");
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	oGetViewStub.returns(oViewStub as any);

	// Act
	assert.deepEqual(oAppController.getTodos(), []);

	// Clean-up
	oGetViewStub.restore();
});
