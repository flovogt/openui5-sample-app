sap.ui.define([], function() {
	"use strict";

	var Helper = {
		resolvePath(sPath) {
			// Relative to application root
			return sap.ui.require.toUrl("sap/ui/demo/todo/" + sPath);
		}
	};

	return Helper;
});
