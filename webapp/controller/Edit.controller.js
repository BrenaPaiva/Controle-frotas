sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "../model/formatter"
], function(BaseController, MessageBox, formatter) {
    'use strict';
   
    BaseController.extend("template.ui5.controller.Edit", {

        formatter: formatter,


        onInit: function () {
            this.getRouter().getRoute("edit").attachPatternMatched(this.onEditMatched, this);
            // this.getRouter().getRoute("edit").attachPatternMatched(this._onCondutorMatched, this);

            // var oContext = this.getModel().Entry("/VeiculoSet", {
            //     success: this._fnEntityCreated.bind(this),
            //     error: this._fnEntityCreationFailed.bind(this)
            // });
            // this.getView().setBindingContext(oContext);
            // // this.getRouter().getRoute("detail").attachPatternMatched(this.onEdit, this);
            
			// var oOwnerComponent = this.getOwnerComponent();

			// this.oRouter = oOwnerComponent.getRouter();
			// this.oModel = oOwnerComponent.getModel();
            this._oResourceBundle = this.getResourceBundle();
            
        },
        _onCondutorMatched: function (oEvent) {
            this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");

            var oContext = this.getModel().createEntry("/VeiculoSet", {
                success: this._fnEntityCreated.bind(this),
                error: this._fnEntityCreationFailed.bind(this)
            });
            this.getView().setBindingContext(oContext);
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

        savePress: function () {

            this.getModel().submitChanges();
          
            // var sMessageSuccess = "Dados atualizados com sucesso.";
            // MessageBox.success(sMessageSuccess, {
            //     onClose: function (Action) {
            //         if (Action == MessageBox.Action.OK) {
                        
            //             this.getModel().submitChanges();
            //         }
            //     }
            // })
            
        },
        _fnEntityCreated: function (oEvent, oData) {
            utils.dialogSuccessMessage("Sucesso");
        },
        _fnEntityCreationFailed: function (oError) {
            utils.dialogErrorMessage(oError, "Erro", false);
        },
        onEdit: function () {
            var sMessageWarningg = "Requisição cancelada";
            MessageBox.information(sMessageWarningg, {
                
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                
                onClose: function (Action) {
                    if (Action == MessageBox.Action.OK) {

                        this.getRouter().navTo("detail", {}, true);
                    }
                }
            })

            /////////
            // let sMessageWarning = that._oResourceBundle.getText("successMessage");
            // MessageBox.warning(sMessageWarning, {
            //     onClose: function (oAction) {
            //         if (oAction == sap.m.MessageBox.Action.OK) {
            //             this.getModel("appView").setProperty("/layout", );
            //             var sReturn = oEvent.getParameter("arguments")
            //             this.getView().bindElement({
            //                 path: "/" + sReturn
            //             });
            //             }
            //         }
            //     })
			// var sPath = this.getView().getElementBinding().getPath(),
			// 	sVeiculo = sPath.replace("/", "");

			// this.oRouter.navTo("detail", {veiculo: sVeiculo});
        },
        // sReturn: function (oEvent) {
            
        //     this.getModel("appView").getProperty("/detail",);
        //                 var sReturn = oEvent.getParameter("arguments")
        //                 this.getView().bindElement({
        //                     path: "/" + sReturn
        //                 });
        // }
        


    })
});