import {
	ARBOL,
	DATA_GENERAL,
	ID_DATA_TABLE,
	LISTAR_POR_PERIODO,
	PROJECT_DETAILS,
	LIST_HISTORY,
	NAVIGATION_TREE,
	NAVIGATION_TREE_PC,
	PARTY_CONTROL,
	PARTY_CONTROL1,
	MENSUAL_DETALLE,
	APU_DETALLE,
	METRADO_DETALLE,
	ASOCIADO_DETALLE,
	ESTRUCTURA_DETALLE,
	CALCULO_DETALLE,
	CALCULODET_DETALLE,
	ID_PC,
	TREE_SELECTEDS,
	URN_WEB,
	UNIQUE_DETALLE,
	LISTAR_SUBS,
	LEER_PRESUPUESTO,
	CAMBIA_SELECCION,
	SUB_SEL,
	LISTAR_CLIENTES,
	LISTAR_UBICACIONES,
	LIMPIAR_UBICACIONES,
	LISTAR_MODELOS,
	LISTAR_MONEDAS,
	URN_WEB1,
	METRADO_LIMPIAR,
} from '../constants';

const initialState = {
	TreeProyects: [],
	TreeCount: [],
	DataCards: [],
	DataPc: [],
	idCard: null,
	idPc: null,
	periodo: null,
	projectDetails: [],
	listHistory: [],
	treePartyControl: [],
	treeSelecteds: [],
	titleProject: null,
	titlePC: null
};



// eslint-disable-next-line
export default (state = initialState, { type, payload }) => {
	//alert('se dispara ' + payload);
	switch (type) {

		case ARBOL:
			if (state.TreeCount.indexOf(payload.part) >= 0)
				return state;

			return {
				...state,
				TreeProyects: [...state.TreeProyects, ...payload.data],
				TreeCount: [...state.TreeCount, payload.part]
			};
		case TREE_SELECTEDS:
			const newState = (state.treeSelecteds && state.treeSelecteds.indexOf(payload) >= 0)
				? state.treeSelecteds.filter(item => item !== payload)
				: [...state.treeSelecteds, payload];

			return {
				...state,
				treeSelecteds: newState,
			};

		case DATA_GENERAL:
			return {
				...state,
				DataCards: payload
			};

		case MENSUAL_DETALLE:
			console.log('pasa a guardar datos de items');
			console.log(state);
			console.log(payload);

			return {
				...state,
				DataPc: [...state.DataPc, ...payload],
				//DataPc: payload,
				//titlePC: 'Cambiamos titulo'
			};


		case LISTAR_POR_PERIODO:
			console.log('pasa a borrar');
			console.log(state);
			console.log(payload);

			return {
				...state,
				DataPc: [...payload]
				//DataPc: payload
			};

		case APU_DETALLE:
			return {
				...state,
				DataApu: payload
			};


		case LISTAR_CLIENTES:
			return {
				...state,
				DataClientes: payload
			};


		case LISTAR_UBICACIONES:
			return {
				...state,
				DataUbicaciones: [...state.DataUbicaciones, ...payload]
				//DataUbicaciones: payload
			};

		case LIMPIAR_UBICACIONES:
			return {
				...state,
				DataUbicaciones: []
			};

		case LISTAR_MODELOS:
			return {
				...state,
				//DataUbicaciones:[...state.DataUbicaciones, ...payload]
				DataModelos: payload
			};


		case LISTAR_MONEDAS:
			return {
				...state,
				//DataUbicaciones:[...state.DataUbicaciones, ...payload]
				DataMonedas: payload
			};


		case METRADO_DETALLE:
			return {
				...state,
				DataMetrado: [...state.DataMetrado, ...payload]
				//DataMetrado: [...payload]
			};

		case UNIQUE_DETALLE:
			console.log('pasa al DataUnique');
			console.log(payload);

			return {
				...state,
				//DataUnique: [...state.DataUnique, ...payload]
				DataUnique: [...payload]
			};


		case METRADO_LIMPIAR:
				console.log('pasa a borrar');
				console.log(state);
				console.log(payload);
			return { 
					...state,
					DataMetrado: []
		
					//DataPc: payload
			};		

		case LEER_PRESUPUESTO:
			return {
				...state,
				DatosPresupuesto: payload
			};

		case ASOCIADO_DETALLE:
			return {
				...state,
				DataAsociado: payload
			};
		case ESTRUCTURA_DETALLE:
			return {
				...state,
				Dataestructura: payload
			};
		case CALCULO_DETALLE:
			return {
				...state,
				Datacalculo: payload
			};

		case CALCULODET_DETALLE:
			return {
				...state,
				Datacalculodet: payload
			};


		case ID_DATA_TABLE:
			return {
				...state,
				idCard: payload
			};

		case ID_PC:
			return {
				...state,
				idPc: payload
			};

		case URN_WEB:
			return {
				...state,
				Urn: payload
			};

		case URN_WEB1:
			return {
				...state,
				UrnS1: payload
			};
	
		/*	case LISTAR_POR_PERIODO:
				return { 
					...state,
					periodo: payload
				};*/

		case PROJECT_DETAILS:
			return {
				...state,
				projectDetails: payload
			};

		case LIST_HISTORY:
			return {
				...state,
				listHistory: payload
			};

		case PARTY_CONTROL:
			return {
				...state,
				treePartyControl: payload
			};

		case LISTAR_SUBS:
			return {
				...state,
				subPres: payload
			};


		case PARTY_CONTROL1:
			return {
				...state,
				treeSubControl: payload
			};

		case NAVIGATION_TREE:
			return {
				...state,
				titleProject: payload.grupo,
				titlePC: null
			};

		case NAVIGATION_TREE_PC:
			return {
				...state,
				titlePC: payload.grupo,
			};

		case CAMBIA_SELECCION:
			//alert('El payload ' + payload);
			return {
				...state,
				seleccionado: payload,
			};

		case SUB_SEL:
			//alert('El payload ' + payload);
			return {
				...state,
				Sub_sel: payload,
			};


		default:
			return state
	};
}
