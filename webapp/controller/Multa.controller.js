sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "../model/formatter"
], function(BaseController, MessageBox, formatter) {
    'use strict';
   
    BaseController.extend("template.ui5.controller.Multa", {

        formatter: formatter,


        onInit: function () {
            this.getRouter().getRoute("multa").attachPatternMatched(this.onEditMatched, this);
            this._oResourceBundle = this.getResourceBundle();
            
        },
        editPress: function () {
            
			var sPath = this.getView().getElementBinding().getPath(),
            sVeiculo = sPath.replace("/", "");

        this.oRouter.navTo("multa", {veiculo: sVeiculo});
        },
        onEditMatched: function (oEvent) {
            this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
            var veiculo = oEvent.getParameter("arguments").veiculo;
            this.getView().bindElement({
				path: "/" + veiculo
			});
        }
        


    })
});