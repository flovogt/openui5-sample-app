sap.ui.define([], () => {
	"use strict";

	return {
		resolvePath(sPath) {
			// Relative to application root
			return sap.ui.require.toUrl("sap/ui/demo/todo/" + sPath);
		}
	};
});
