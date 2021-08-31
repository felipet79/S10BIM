import axios from '../config/axios';
import {APU_DETALLE, METRADO_DETALLE, ID_DATA_TABLE, ID_PC, LISTAR_POR_PERIODO, MENSUAL_DETALLE, NAVIGATION_TREE, NAVIGATION_TREE_PC, TREE_SELECTEDS, URN_WEB,URN_WEB1, CAMBIA_SELECCION, SUB_SEL, METRADO_LIMPIAR, LIMPIAR_UBICACIONES, PARTY_CONTROL1, AGREGA_REGISTRO} from '../constants';

export const selectProyect = (idCod, userName, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		// console.log(idCod, '<--- lo que le paso');
		await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_06_TableroProyecto_Listar '${userName}', '01', '${idCod}'`,
				RequestId: "DATA_GENERAL",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 10,
				},
			}
		);

		dispatch({
			type: ID_DATA_TABLE,
			payload: idCod
		})
	}
}

export const selectPc = (idCod, idPc, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_06_Tablero_PartidaControlListar '${idCod}', '01', '${idPc}', ''`,
				RequestId: "MENSUAL_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 10,
				},
			}
		);
		console.log(data);

		dispatch({
			type: ID_PC,
			payload: idPc
		})
	}
}

export const ListarPorPeriodo = (idCod, moneda) =>{
	return async () =>{
		// console.log('ListarPorPeriodo');
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let user = JSON.parse(localStorage.getItem("user-s10"));
		await axios.post(
			"",
			{
				HasOutputParam: false,
				ObjectName: `dbo.S10_00_ResultadoOperativo_ListarPorPeriodo '${idCod}', '01', ''`,
				RequestId: "LISTAR_POR_PERIODO",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: user.IdUser, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 10,
				},
			}
		);
		// console.log(data);
	}
}

export const ListarPorPeriodoPc = (idCod, idPc) =>{
	return async () =>{
		// console.log('ListarPorPeriodo');
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let user = JSON.parse(localStorage.getItem("user-s10"));
		await axios.post(
			"",
			{
				HasOutputParam: false,
				ObjectName: `dbo.S10_00_ResultadoOperativo_ListarPorPeriodo '${idCod}', '01', ${idPc}`,
				RequestId: "LISTAR_POR_PERIODO",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: user.IdUser, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 10,
				},
			}
		);
		// console.log(data);
	}
}

export const ProjectDetails = (idCod, moneda) =>{
	return async () =>{
		// console.log('ProjectDetails#')
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let user = JSON.parse(localStorage.getItem("user-s10"));
		await axios.post(
			"",
			{
				HasOutputParam: false,
				ObjectName: `dbo.S10_06_Tablero_ListarProyectoDetalle '${idCod}', '01'`,
				RequestId: "PROJECT_DETAILS",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: user.IdUser, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 10,
				},
			}
		);
		// console.log(data);
	}
}

export const ProjectDetailsPc = (idCod, idPc) =>{
	return async () =>{
		// console.log('ProjectDetails#')
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let user = JSON.parse(localStorage.getItem("user-s10"));
		await axios.post(
			"",
			{
				HasOutputParam: false,
				ObjectName: `dbo.S10_06_Tablero_ListarProyectoDetalle '${idCod}', '01', ${idPc}`,
				RequestId: "PROJECT_DETAILS",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: user.IdUser, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 10,
				},
			}
		);
		// console.log(data);
	}
}

export const listHistory = (codProyecto) =>{
	return async () =>{
	
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let user = JSON.parse(localStorage.getItem("user-s10"));
		await axios.post(
			"",
			{
				HasOutputParam: true,
				ObjectName: `dbo.S10_06_Tablero_ListarProyectoMensualDetalle '${codProyecto}', '01', '', '', 20, 1`,
				RequestId: "LIST_HISTORY",
				SignalRConnectionID:  localStorage.getItem("connectionId"),
				SecurityUserId: user.IdUser, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 10,
				},
			}
		);
		// console.log(data);
	}
}





export const selectItems = (CodPres, CodSubP, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_Presupuesto_ListarHoja '${CodPres}','${CodSubP}'`,
				RequestId: "MENSUAL_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);
		//alert('paso por aca');
		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}

export const selectCLIENTES = (Descripcion, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_00_Identificador_ListarPorDescripcion '${Descripcion}'`,
				RequestId: "LISTAR_CLIENTES",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}


export const guardarModelo = (CodPlano, NombreArchivoRvt, RutaArchivoRvt,  UrnAddIn,  UrnWeb, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let email = localStorage.getItem("email");
		//console.log(idCod, idPc);
		
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: false,
				// dbo.s10_06_Proyecto_General
				//ObjectName: `dbo.S10_01_SubpresupuestoDetallePlano_Actualizar '${CodPlano}','${NombreArchivoRvt}','${RutaArchivoRvt}','${UrnAddIn}','${UrnWeb}','${email}'`,
				ObjectName: `dbo.S10_01_SubpresupuestoDetallePlano_Actualizar '${CodPlano}','${NombreArchivoRvt}','${UrnAddIn}','${UrnWeb}','${email}'`,
				RequestId: "ActPlano",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: '1148', // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		console.log("estado del guardar modelo" + `dbo.S10_01_SubpresupuestoDetallePlano_Actualizar '${CodPlano}','${NombreArchivoRvt}','${UrnAddIn}','${UrnWeb}','${email}'` );
		console.log(data);


		/*request.AddParameter("RequestId", "ActPlano");
		request.AddParameter("SignalRConnectionID", SignalToken);
		request.AddParameter("SecurityUserId", "1148");
		request.AddHeader("Token", Token);
		request.AddHeader("ModuleID", "11");
		request.AddHeader("Content-Type", "application/x-www-form-urlencoded");*/

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}



export const ModificarSubPresupuesto = (CodPresupuesto, CodSubPresupuesto, Descripcion,  CodModelo, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let email = localStorage.getItem("email");
		//console.log(idCod, idPc);
		
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: false,
				// dbo.s10_06_Proyecto_General
				//ObjectName: `dbo.S10_01_Subpresupuesto_Modificar '${CodPresupuesto}','${CodSubPresupuesto}','${Descripcion}','${CodModelo}'`,
				ObjectName: `dbo.S10_01_Subpresupuesto_Modificar '${CodPresupuesto}','${CodSubPresupuesto}','${Descripcion}','${CodModelo}','${email}'`,
				RequestId: "ActSub",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: '1148', // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log("estado del guardar modelo" + `dbo.S10_01_SubpresupuestoDetallePlano_Actualizar '${CodPlano}','${NombreArchivoRvt}','${UrnAddIn}','${UrnWeb}','${email}'` );
		//console.log(data);


		/*request.AddParameter("RequestId", "ActPlano");
		request.AddParameter("SignalRConnectionID", SignalToken);
		request.AddParameter("SecurityUserId", "1148");
		request.AddHeader("Token", Token);
		request.AddHeader("ModuleID", "11");
		request.AddHeader("Content-Type", "application/x-www-form-urlencoded");*/

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}


export const selectMODELOS = (userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_SubpresupuestoDetallePlano_Listar`,
				RequestId: "LISTAR_MODELOS",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}


export const selectMONEDAS = (userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_00_Moneda_ListarPorDescripcion ''`,
				RequestId: "LISTAR_MONEDAS",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}


export const selectUBICACIONES = (Descripcion, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_00_UbicacionGeografica_ListarPorDescripcion '${Descripcion}','2700','1'`,
				RequestId: "LISTAR_UBICACIONES",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}

export const selectAPUS = (CodPres, CodSubP, CodItem, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.s10_01_SubpresupuestoDetalle_ListarAnalisisPU '${CodPres}','${CodSubP}','${CodItem}'`,
				RequestId: "APU_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}

export const selectMETRADOS = (CodPres, CodSubP, CodItem, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_SubpresupuestoDetalle_ListarMedicion '${CodPres}','${CodSubP}','${CodItem}'`,
				RequestId: "METRADO_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}





export const selectParidas = ( Unique, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_SubpresupuestoDetalle_ListarMedicionPorUniqueId '${Unique}'`,
				RequestId: "UNIQUE_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}


export const selectAsociados = (CodPres, CodSubP, CodItem, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_SubpresupuestoDetalle_ListarAsociado '${CodPres}','${CodSubP}','${CodItem}'`,
				RequestId: "ASOCIADO_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}


export const selectEstructura = (CodPres, CodSubP, CodItem, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_SubpresupuestoDetalle_ListarEstructura '${CodPres}','${CodSubP}','${CodItem}'`,
				RequestId: "ESTRUCTURA_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}



export const selectCalculo = (CodPres, CodSubP, CodItem, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_SubpresupuestoDetalle_ListarCalculo '${CodPres}','${CodSubP}','${CodItem}'`,
				RequestId: "CALCULO_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}

export const selectCalculoDet = (CodPres, CodSubP, CodItem, userId) =>{
	return async (dispatch) =>{
		let company = JSON.parse(localStorage.getItem("company-s10"));
		//console.log(idCod, idPc);
		const {data} = await axios.post(
			"",
			{
				HasOutputParam: true,
				// dbo.s10_06_Proyecto_General
				ObjectName: `dbo.S10_01_SubpresupuestoDetalle_ListarCalculoDetalle '${CodPres}','${CodSubP}','${CodItem}'`,
				RequestId: "CALCULODET_DETALLE",
				SignalRConnectionID: localStorage.getItem("connectionId"),
				SecurityUserId: userId, // SecurityUserId obtenido al logear
			},
			{
				headers: {
					Token: company.Token , // no lo mandes en duro este vence
					ModuleId: 21,
				},
			}
		);
		//console.log(data);

		/*dispatch({
			type: ID_PC,
			payload: CodPres
		})*/
	}
}


export const cleanDataChart1 = () =>{
	// console.log('reiniciando desde actions')
	return (dispatch) =>
		dispatch({
			type: LISTAR_POR_PERIODO,
			payload: []
		})
}



export const SelectUrn = (Urn) =>{
	// console.log('reiniciando desde actions')
	//alert(Urn);
	return (dispatch) =>
		dispatch({
			type: URN_WEB,
			payload: Urn
		})
}

export const SelectUrnB = (Urn) =>{
	// console.log('reiniciando desde actions')
	//alert(Urn);
	return (dispatch) =>
		dispatch({
			type: URN_WEB1,
			payload: Urn
		})
}


export const cleanDataChartAPU = () =>{
	// console.log('reiniciando desde actions')
	return (dispatch) =>
		dispatch({
			type: APU_DETALLE,
			payload: []
		})
}





export const cleanDataChart = () =>{
	// console.log('reiniciando desde actions')
	return (dispatch) =>
		dispatch({
			type: LISTAR_POR_PERIODO,
			payload: []
		})
}


export const LimpiarSubPres = () =>{
	// console.log('reiniciando desde actions')
	return (dispatch) =>
		dispatch({
			type: PARTY_CONTROL1,
			payload: []
		})
}


export const cleanDataChart22 = () =>{
	// console.log('reiniciando desde actions')
	return (dispatch) =>
		dispatch({
			type: METRADO_LIMPIAR,
			payload: []
		})
}


/*export const selectSeleccion = (sel) =>{
	//alert('llada a dispatch  ' + sel);
	return (dispatch) =>
		dispatch({
			type: CAMBIA_SELECCION,
			payload: sel
		})	
}*/

/*export const selectSeleccion = (sel) => {
	alert('llada a dispatch  ' + sel);
	return ({
  type: CAMBIA_SELECCION,
  payload: sel
})}*/

export const limpiaUbicaciones = () => ({
	type: LIMPIAR_UBICACIONES,
	payload: []
  })


export const navigationTree = (grupo) => ({
  type: NAVIGATION_TREE,
  payload: {grupo}
})

export const navigationTreePC = (grupo) => ({
  type: NAVIGATION_TREE_PC,
  payload: {grupo}
})


export const cambiaSeleccion = (sel) => ({
	type: CAMBIA_SELECCION,
	payload: sel
  })
  

 export const agregaRegistro = (sel) => ({
	type: AGREGA_REGISTRO,
	payload: sel
  })


export const SeleccionaSub = (sel) => ({
	type: SUB_SEL,
	payload: sel
  })

export const selectTree = (nodeId) => {	
	return ({
  type: TREE_SELECTEDS,
  payload: nodeId
})}
