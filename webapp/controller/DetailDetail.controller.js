sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("template.ui5.controller.DetailDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
		},
		onSupplierPress: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext().getPath(),
				sInfo = sPath.replace("/", "");

			// this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, informacoes: sInfo, informacoes: this._product});
		},
		_onProductMatched: function (oEvent) {

			this.getModel("appView").setProperty("/layout", oEvent.getParameter("arguments").layout);

			this._product = oEvent.getParameter("arguments").veiculo || this._product || "0";
			this.getView().bindElement({
				path: "/" + this._product
			});
		},
		handleEditPress : function () {

			//Clone the data
			this._oSupplier = Object.assign({}, this.getView().getModel().getData().SupplierCollection[0]);
			this._toggleButtonsAndView(true);

		},

		handleCancelPress : function () {

			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			oData.SupplierCollection[0] = this._oSupplier;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);

		},

		handleSavePress : function () {

			this._toggleButtonsAndView(false);

		},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			// this._showFormFragment(bEdit ? "Change" : "Display");
		},

		_getFormFragment: function (sFragmentName) {
			var pFormFragment = this._formFragments[sFragmentName],
				oView = this.getView();

			if (!pFormFragment) {
				pFormFragment = Fragment.load({
					id: oView.getId(),
					name: "sap.ui.layout.sample.Form354wide." + sFragmentName
				});
				this._formFragments[sFragmentName] = pFormFragment;
			}

			return pFormFragment;
		},
		onSupplierPress: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext().getPath(),
				sInfo = sPath.replace("/", "");

			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, informacoes: sInfo, informacoes: this._product});
		},
		// _onProductMatched: function (oEvent) {

		// 	this.getModel("appView").setProperty("/layout", oEvent.getParameter("arguments").layout);

		// 	this._product = oEvent.getParameter("arguments").veiculo || this._product || "0";
		// 	this.getView().bindElement({
		// 		path: "/" + this._product
		// 	});
		// },
		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			this._getFormFragment(sFragmentName).then(function(oVBox){
				oPage.insertContent(oVBox);
			});
		}

	});
});