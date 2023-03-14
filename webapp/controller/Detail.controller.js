sap.ui.define([
	"./BaseController",
	'sap/ui/core/Fragment',
	"sap/m/MessageBox",
	'sap/f/library',
	
], function (BaseController, Fragment, MessageBox,  fioriLibrary) {
	"use strict";

    return BaseController.extend("template.ui5.controller.Detail", {
        
		onInit: function () {

			var oModel 
			this.getView().setModel(oModel);

			this.getView().bindElement("/VeiculoSet");

			this._formFragments = {};

			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();
			this.getView().bindElement("/VeiculoSet");
			

				// Set the initial form to be the display one
				this._showFormFragment("Change");

			//this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			
		},
		onSupplierPress: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext().getPath(),
				sInfo = sPath.replace("/", "");

			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, informacoes: sInfo, informacoes: this._product});
		},
		
		handleEditPress: function () {
			
			var sPath = this.getView().getElementBinding().getPath(),
				sVeiculo = sPath.replace("/", "");

			this.oRouter.navTo("edit", {veiculo: sVeiculo});
		

		},

		handleCancelPress : function () {

			//Restore the data
			var oModel = this.getView().getModel();

			var oData = oModel.getData();

			oData = this._oVehicle;

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
			this._showFormFragment(bEdit ? "Change" : "Detail");
		},

		_getFormFragment: function (sFragmentName) {
			var pFormFragment = this._formFragments[sFragmentName],
				oView = this.getView();

			if (!pFormFragment) {
				pFormFragment = Fragment.load({
					id: oView.getId(),
					name: "gestaoFrota.Fragments.Change"
				});
				this._formFragments[sFragmentName] = pFormFragment;
			}

			return pFormFragment;
		},
		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("object");

			// oPage.removeAllContent();
			// this._getFormFragment(sFragmentName).then(function(oVBox){
			// 	oPage.insertContent(oVBox);
			// });
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
		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("master", {layout: sNextLayout});
		},
		handleFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("detail", {layout: sNextLayout})
		},
		onPress: function (oEvent) {
			var sPath = this.getView().getElementBinding().getPath(),
            sVeiculo = sPath.replace("/", "");
			this.oRouter.navTo("multa", { layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, veiculo: sVeiculo });
				return sVeiculo
		},
		formatDate: function () {

				var oDateInput = this.getView().byId("dataInicio").getValue();
				var oDateInput = this.getView().byId("dataFim").getValue();
					 var sDateValue = oDateInput.getValue();
						sDateValue = new Date(),
						dia  = data.getDate().toString().padStart(2, '0'),
						mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
						ano  = data.getFullYear();
					return dia+"/"+mes+"/"+ano;
			
				// sDateValue = sDateValue.split("/").reverse().join("").slice(0, 6);
	
		},
        onExit: function () {
            // this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
            // this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
        }
	});
});