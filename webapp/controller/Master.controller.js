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
				oTableSearchState = [new Filter("St_Modelo", FilterOperator.Contains, sQuery)];

			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},
		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("St_Modelo", this._bDescendingSort);

			oBinding.sort(oSorter);
		},
	
		onListItemPress: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext().getPath(),
				sVeiculo = sPath.replace("/", "");
				
				this.oRouter.navTo("detail", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, veiculo: sVeiculo });
				return sVeiculo

		},
		// StatusIcon: function () {
		// 	list.bindAggregation("items", {

		// 		path:"/HistoricoSet",
		// 		template: new sap.m.StandardListItem({
				
		// 		icon: sap.ui.core.IconPool.getIconURI('accept'),
				
		// 		type : sap.m.ListType.Navigation,
				
		// 		title: '{}',
				
		// 		// description: '{Parameter2}',
				
		// 		// info: '{CurrentParameter3}',
				
		// 		tap: function(evt){}
				
		// 		})
				
		// 		});
								
		// 		if (icon == "path") {
				
		// 		icon : sap.ui.core.IconPool.getIconURI('accept')
				
		// 		} else {
				
		// 		icon : sap.ui.core.IconPool.getIconURI('alert')
				
		// 		}
		// }
	})

});