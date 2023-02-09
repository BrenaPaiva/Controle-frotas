sap.ui.define([
	"sap/m/MessageBox"
], function (MessageBox) {

	return {

		/**
		 * Exibe dialogo de erro
		 * @param {object} response corpo com mensagem de erro vindo de uma requisição
		 * @param {string} sErrorMsg Mensagem de erro padrão, quando não for possível identificar a causa
		 * @param {boolean} back indicador se ao fechar o dialogo deve fazer uma navegação para trás
		 */
		dialogErrorMessage: function (oResponse, sErrorMsg, back) {
			//extract error message from response
			var errorbackend;

			if (oResponse) {
				var sBody = oResponse.body || oResponse.responseText;

				if (sBody) {
					// errorbackend = sBody;
					try {
						var indexValue = sBody.indexOf("message");
						var indexValueEnd = sBody.substring(indexValue).indexOf("}");
						if (indexValueEnd > -1) {
							errorbackend = sBody.substring(indexValue + 8, indexValue + indexValueEnd - 1);
						} else {
							var oBody = jQuery.parseXML(sBody);
							errorbackend = this.getMessages(oBody);
						}
					} catch (error) {
						errorbackend = sErrorMsg;
					}
				} else { // Always fix it - some unexpected embarasing error happend
					errorbackend = sErrorMsg;
				}
			} else { // Always fix it - some unexpected embarasing error happend
				errorbackend = sErrorMsg;
			}

			var fnClose = function () {
				if (back === true) {
					jQuery.sap.history.back();
				}
			};

			MessageBox.error(errorbackend, {
				closeOnNavigation: false,
				onClose: fnClose
			});
		},

		/**
		 * Exibe dialogo de alerta
		 * @param {string} sAlertMsg Mensagem de alerta que será exibido no corpo do dialogo
		 * @param {boolean} back indicador se ao fechar o dialogo deve fazer uma navegação para trás
		 */
		dialogAlertMessage: function (sAlertMsg, back) {
			var fnClose = function () {
				if (back === true) {
					jQuery.sap.history.back();
				}
			};

			MessageBox.warning(sAlertMsg, {
				onClose: fnClose
			});


		},

		/**
		 * Exibe dialogo de sucesso
		 * @param {string} sMessage Mensagem de sucesso que será exibido no coropo do dialogo
		 * @param {function} fnClose Função que será executada ao fechar o dialogo
		 */
		dialogSuccessMessage: function (sMessage, fnClose) {
			MessageBox.success(sMessage, {
				onClose: fnClose
			});
		},

		/**
		 * Exibe dialogo de confirmação, solicitando ação do usuário
		 * @param {string} sTitle Titulo do dialogo
		 * @param {string} sMessage Mensagem que será exibida no corpo do dialogo
		 * @param {function} fnClose função que será executada ao fechar o dialogo com ação YES
		 */
		dialogConfirmationMessage: function (sTitle, sMessage, fnClose) {
			MessageBox.show(
				sMessage, {
				icon: MessageBox.Icon.INFORMATION,
				title: sTitle,
				actions: [MessageBox.Action.NO, MessageBox.Action.YES],
				//emphasizedAction: MessageBox.Action.YES,
				onClose: function (oAction) {
					var bOk = oAction === "YES";
					fnClose(bOk);
				}
			}
			);
		},

		getMessages: function (oBody) {
			var aMessages = oBody.getElementsByTagName("message");
			var aErrors = oBody.getElementsByTagName("errordetail");
			var sFormattedMessage = aMessages[0].childNodes[0].nodeValue + " \n";

			for (var i = 0; i < aErrors.length; i++) {
				var sCodeValue;
				var sMessageValue;

				try {
					//Code value = ErrorDetails > ErrorDetail > Code
					sCodeValue = aErrors[i].childNodes[0].childNodes[0].nodeValue;
					//Message value = ErrorDetails > ErrorDetail > Message
					sMessageValue = aErrors[i].childNodes[1].childNodes[0].nodeValue;
				} catch (error) {
					sCodeValue = "";
					sMessageValue = "";
				}

				if (sCodeValue == "YSD01/069" || sCodeValue == "YSD01/070") {
					sFormattedMessage += sMessageValue + " \n";
				}
			}

			return sFormattedMessage;
		}
	};
});