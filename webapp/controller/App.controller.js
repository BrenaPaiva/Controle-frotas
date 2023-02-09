sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"../model/utils"
], function (BaseController, JSONModel, Controller, utils) {
	"use strict";

	return BaseController.extend("gestaoFrota.controller.App", {

		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			///
			/// CONEXÃO DEFAULT COM SAP ODATA
			///
			
			var that = this;
			/*
			var sUrl = document.location.hostname;
			var sEnviroment = sUrl.includes("launchpad") ? "PRD" : "QAS";
			var sServiceUrl = sEnviroment === "PRD" ?
				"http://launchpad.uniaoquimica.com.br/Portal/webapp/model/destination.json" :
				"http://sqap00.uniaoquimica.com.br:9094/Portal/webapp/model/destination.json";
				fetch(sServiceUrl)
				.then(function (r) {
					r.json().then(function (oService) {
						this._oService = oService.SOCREATE[sEnviroment];
						*/

						var oModel = new sap.ui.model.odata.v2.ODataModel(
							"https://services.odata.org/v2/northwind/northwind.svc/",
							{
								withCredentials: true,
								maxDataServiceVersion: "2.0",
								json: false,
								defaultUpdateMethod: "Put",
								defaultCountMode: "None",
								useBatch: false
							}
						);

						this.getOwnerComponent().setModel(oModel);

						var fnSetAppNotBusy = function () {
							that.setBusy(false);
						};

						this.getOwnerComponent().getModel().metadataLoaded()
							.then(fnSetAppNotBusy)
							.catch(fnSetAppNotBusy);

						this.getOwnerComponent().getModel().attachMetadataFailed(function (oError) {
							var sMessage;
							var sText = oError.getParameter("responseText");
							if (sText != "") {
								sMessage = oError.getParameter("responseText");
							} else {
								sMessage = this.getResourceBundle().getText("DEFAULT_SERVER_ERROR");
							}

							utils.dialogErrorMessage(oError, sMessage);
							fnSetAppNotBusy();
						}.bind(this));

						//return this._oService;
				//	}.bind(this));
				//}.bind(this));

			
			// since then() has no "reject"-path attach to the MetadataFailed-Event to disable the busy indicator in case of an error
			

			var oViewModel = new JSONModel({
				busy: true,
				delay: 0,
				layout: "OneColumn",
				previousLayout: "",
				actionButtonsInfo: {
					midColumn: {
						fullScreen: false
					}
				}
			});

			this.setModel(oViewModel, "appView");

			// apply content density mode to root view
			this.getView().addStyleClass(
				this.getOwnerComponent().getContentDensityClass()
			);
		},

		onRouteMatched: function (oEvent) {
			var sRouteName = oEvent.getParameter("name"),
				oArguments = oEvent.getParameter("arguments");

			// Save the current route name
			this.currentRouteName = sRouteName;
			this.currentProduct = oArguments.product;
		},

		onStateChanged: function (oEvent) {
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");

			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct}, true);
			}
		},

		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
		}

	});

});