import requireModule from "sap/ui/require";

/**
 * @namespace sap.ui.demo.todo.util
 */
const Helper = {
	resolvePath(sPath: string): string {
		// Relative to application root
		return requireModule.toUrl("sap/ui/demo/todo/" + sPath);
	}
};

export default Helper;
