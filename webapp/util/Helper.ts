/**
 * @namespace sap.ui.demo.todo.util
 */
const Helper = {
	resolvePath(sPath: string): string {
		// Relative to application root
		return sap.ui.require.toUrl("sap/ui/demo/todo/" + sPath);
	}
};

export default Helper;
