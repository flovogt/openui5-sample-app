/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Messaging","sap/ui/base/Object","sap/base/Log"],function(e,s,r){"use strict";var t=s.extend("sap.ui.core.message.MessageManager",{constructor:function(){r.error("MessageManager is deprecated and should not be created! "+"Please require 'sap/ui/core/Messaging' instead and use the module export directly without using 'new'.");s.apply(this,arguments)},metadata:{publicMethods:["addMessages","removeMessages","updateMessages","removeAllMessages","registerMessageProcessor","unregisterMessageProcessor","registerObject","unregisterObject","getMessageModel","destroy"]}});t.prototype.addMessages=e.addMessages;t.prototype.removeAllMessages=e.removeAllMessages;t.prototype.removeMessages=e.removeMessages;t.prototype.updateMessages=e.updateMessages;t.prototype.registerMessageProcessor=e.registerMessageProcessor;t.prototype.unregisterMessageProcessor=e.unregisterMessageProcessor;t.prototype.registerObject=e.registerObject;t.prototype.unregisterObject=e.unregisterObject;t.prototype.destroy=function(){r.warning("Deprecated: Do not call destroy on a MessageManager")};t.prototype.getMessageModel=e.getMessageModel;return t});
//# sourceMappingURL=MessageManager.js.map