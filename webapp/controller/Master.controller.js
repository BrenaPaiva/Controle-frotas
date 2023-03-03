sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library',
], function (BaseController, formatter, JSONModel, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return BaseController.extend("template.ui5.controller.Master", {

		formatter: formatter,

		onInit: function () {
			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();
		
		},

		_onMasterMatched: function () {
			this.setLayout("OneColumn");
			this.setBusy(false);
		},
		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("ContactName", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},
		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("ContactName", this._bDescendingSort);

			oBinding.sort(oSorter);
		},
	
		onListItemPress: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext().getPath(),
				sVeiculo = sPath.replace("/", "");
				
				this.oRouter.navTo("detail", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, veiculo: sVeiculo });
				return sVeiculo

		}
	})

});