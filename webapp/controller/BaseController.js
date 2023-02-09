sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	'use strict';

	return Controller.extend("template.ui5.Controller.BaseController", {

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		getModel: function (sName) {
			return this.getOwnerComponent().getModel(sName);
		},

		setModel: function (oModel, sName) {
			return this.getOwnerComponent().setModel(oModel, sName);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true);
			}
		},

		onNavToMaster: function () {
			this.getRouter().navTo("master", {}, true);
		},

		setBusy: function (bShow) {
			this.getModel("appView").setProperty("/busy", bShow);
		},

		setLayout: function (sLayout) {
			this.getModel("appView").setProperty("/layout", sLayout);
		}

	})

});