import UIComponent from "sap/ui/core/UIComponent";
import "sap/ui/core/ComponentSupport";
import type { MetadataOptions } from "sap/ui/core/Component";

/**
 * @namespace sap.ui.demo.todo
 */
export default class Component extends UIComponent {
	static readonly metadata: MetadataOptions = {
		manifest: "json"
	};
}
