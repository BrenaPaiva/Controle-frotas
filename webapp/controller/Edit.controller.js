sap.ui.define([
    "./BaseController"
   ], function(BaseController) {
       'use strict';
      
       BaseController.extend("template.ui5.controller.Edit", {
   
           onInit: function () {
               this.getRouter().getRoute("edit").attachPatternMatched(this.onEditMatched, this);
   
               // var oContext = this.getModel().Entry("/VeiculoSet", {
               //     success: this._fnEntityCreated.bind(this),
               //     error: this._fnEntityCreationFailed.bind(this)
               // });
               // this.getView().setBindingContext(oContext);
               // // this.getRouter().getRoute("detail").attachPatternMatched(this.onEdit, this);
               
               // var oOwnerComponent = this.getOwnerComponent();
   
               // this.oRouter = oOwnerComponent.getRouter();
               // this.oModel = oOwnerComponent.getModel();
              
               
           },
           _fnEntityCreated: function (oEvent, oData) {
               utils.dialogSuccessMessage("Sucesso");
           },
   
           _fnEntityCreationFailed: function (oError) {
               utils.dialogErrorMessage(oError, "Erro", false);
           },
           onEditMatched: function (oEvent) {
               this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
               var veiculo = oEvent.getParameter("arguments").veiculo;
               this.getView().bindElement({
                   path: "/" + veiculo
               });
           },
   
           SavePress: function () {
               
               this.getModel().submitChanges();
           },
           onEdit: function (oEvent) {
                this.getModel("appView").setProperty("/layout", );
               var sReturn = oEvent.getParameter("arguments")
               this.getView().bindElement({
                   path: "/" + sReturn
               });
               // var sPath = this.getView().getElementBinding().getPath(),
               // 	sVeiculo = sPath.replace("/", "");
   
               // this.oRouter.navTo("detail", {veiculo: sVeiculo});
           }
           
   
   
       })
   });