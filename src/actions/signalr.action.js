// import {hubConnection} from "signalr-no-jquery";
import {
	ARBOL,
	REFRESH_IDCONNECTION,
	DATA_GENERAL,
	LISTAR_POR_PERIODO,
	PROJECT_DETAILS,
	LIST_HISTORY,
	PARTY_CONTROL,
	PARTY_CONTROL1,
	MENSUAL_DETALLE,
	PROJECT_LIST_DETAILS,
	APU_DETALLE,
	METRADO_DETALLE,
	ASOCIADO_DETALLE,
	ESTRUCTURA_DETALLE,
	CALCULO_DETALLE,
	CALCULODET_DETALLE,
	UNIQUE_DETALLE,
	LISTAR_SUBS,
	LEER_PRESUPUESTO,
	LISTAR_CLIENTES,
	LISTAR_UBICACIONES,
	LISTAR_MODELOS,
} from "../constants";

import $ from 'jquery';
window.jQuery = $;
require('signalr');

export const connectSignalr = (token) => {
	return (dispatch) => {

		// console.log(companyLocal.Id);
		var options = {
			qs: {
				AuthType: 1,
				Token: token,
				ModuleId: 21,
			}
		};
		const connection = $.hubConnection("http://200.48.100.203:5030", options);
		const hubProxy = connection.createHubProxy("S10ERPHub");

		hubProxy.on("receiveS10ERPDataResult", function (response) {
			const data = JSON.parse(response);

			//console.log(data);
			//console.log(JSON.parse(data.Data));

			switch (data.Name) {
				case ARBOL:
					dispatch({
						type: ARBOL,
						payload: {
							part: data.Part,
							data: JSON.parse(data.Data),
						},
					});
					break;
				case DATA_GENERAL:
					dispatch({
						type: DATA_GENERAL,
						payload: JSON.parse(data.Data),
					});
					break;

				case LISTAR_POR_PERIODO:
					dispatch({
						type: LISTAR_POR_PERIODO,
						payload: JSON.parse(data.Data),
					});
					break;

				case PROJECT_DETAILS:
					dispatch({
						type: PROJECT_DETAILS,
						payload: JSON.parse(data.Data),
					});
					break;

				case PARTY_CONTROL:
					dispatch({
						type: PARTY_CONTROL,
						payload: JSON.parse(data.Data),
					});
					break;

				case LISTAR_CLIENTES:
					//console.log('clientes llegados:');
					//console.log(JSON.parse(data.Data));

					dispatch({
						type: LISTAR_CLIENTES,
						payload: JSON.parse(data.Data),
					});
					break;


				case LISTAR_MODELOS:
					//console.log('Modelos llegados:');
					//console.log(JSON.parse(data.Data));

					dispatch({
						type: LISTAR_MODELOS,
						payload: JSON.parse(data.Data),
					});
					break;

				case LISTAR_UBICACIONES:
					//console.log('ubicaciones llegadas:');
					//console.log(JSON.parse(data.Data));

					dispatch({
						type: LISTAR_UBICACIONES,
						payload: JSON.parse(data.Data),
					});
					break;


				case PARTY_CONTROL1:
					//console.log('datos llegados de Subprespuestos:');
					//console.log(JSON.parse(data.Data));
					dispatch({
						type: PARTY_CONTROL1,
						payload: JSON.parse(data.Data),
					});
					break;

				case LISTAR_SUBS:
					//console.log('datos llegados de Subprespuestos tODOS:');
					//console.log(JSON.parse(data.Data));
					dispatch({
						type: LISTAR_SUBS,
						payload: JSON.parse(data.Data),
					});
					break;



				case LEER_PRESUPUESTO:
					console.log('datos llegados de pRESUPUESTO:');
					console.log(JSON.parse(data.Data));
					dispatch({
						type: LEER_PRESUPUESTO,
						payload: JSON.parse(data.Data),
					});
					break;

				case MENSUAL_DETALLE:
					console.log('datos llegados de items:');
					console.log(JSON.parse(data.Data));
					dispatch({
						type: MENSUAL_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;

				case APU_DETALLE:
					dispatch({
						type: APU_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;

				case METRADO_DETALLE:
					//console.log('metrados llegados:');
					//console.log(JSON.parse(data.Data));		
					dispatch({
						type: METRADO_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;

				case UNIQUE_DETALLE:
					console.log('UNIQUES llegados:');
					console.log(JSON.parse(data.Data));
					dispatch({
						type: UNIQUE_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;


				case ASOCIADO_DETALLE:
					dispatch({
						type: ASOCIADO_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;
				case ESTRUCTURA_DETALLE:
					dispatch({
						type: ESTRUCTURA_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;
				case CALCULO_DETALLE:
					dispatch({
						type: CALCULO_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;
				case CALCULODET_DETALLE:
					dispatch({
						type: CALCULODET_DETALLE,
						payload: JSON.parse(data.Data),
					});
					break;



				case PROJECT_LIST_DETAILS:
					dispatch({
						type: PROJECT_LIST_DETAILS,
						payload: JSON.parse(data.Data),
					});
					break;
				case LIST_HISTORY:
					dispatch({
						type: LIST_HISTORY,
						payload: JSON.parse(data.Data),
					});
					break;
				default:
					break;
			}
		});
		// connect
		connection
			.start()
			.done(function () {
				console.log("Now connected, connection ID=" + connection.id);
				localStorage.setItem("connectionId", connection.id);
				dispatch({
					type: REFRESH_IDCONNECTION,
				});
			})
			.fail(function () {
				console.log("Could not connect");
				// alert("Conexion fallida, posiblemente token vencido");
				dispatch({
					type: REFRESH_IDCONNECTION,
				});
			});
	};
};

export const refreshConnection = () => {
	return (dispatch) => {
		var companyLocal = JSON.parse(localStorage.getItem("company-s10"));
		if (companyLocal) {
			dispatch(connectSignalr(companyLocal.Token))
		} else {
			dispatch(connectSignalr('error!!'))
		}
	};
};
