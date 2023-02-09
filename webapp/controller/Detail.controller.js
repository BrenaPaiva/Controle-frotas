sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
	'sap/f/library'	
], function (BaseController, MessageBox,  fioriLibrary) {
	"use strict";

    return BaseController.extend("template.ui5.controller.Detail", {
        
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

			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, informacoes: sInfo, informacoes: this._product});
		},
		_onProductMatched: function (oEvent) {

			this.getModel("appView").setProperty("/layout", oEvent.getParameter("arguments").layout);

			this._product = oEvent.getParameter("arguments").veiculo || this._product || "0";
			this.getView().bindElement({
				path: "/" + this._product
			});
		},
		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},
		onDelete: function () {
			MessageBox.information("This functionality is not ready yet.", { title: "Aw, Snap!" });
		},


		///CHAMANDO A MINHA ENTIDADE EM JAVASCRIPT
		// entities: function () {
		// 	var oModel = new sap.ui.model.odata.v2.ODataModel("http://sqap20.uniaoquimica.com.br:8000/sap/opu/odata/sap/ZFROTA_SRV/");
		// 	var OData = oModel.getData("/<VeiculoSet>")
		// 	OData.read("", {
		// 		urlParameters: {
		// 			"$expand": "<HistoricoSet>"
		// 		},
		// 		success: function (data) {
		// 			console.log(data);
		// 		},
		// 		error: function (error) {
		// 			console.log(error);
		// 		}
		// 	},)
		// },
        onExit: function () {
            this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
        }
	});
});