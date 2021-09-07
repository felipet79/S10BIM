
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
	AGREGA_REGISTRO,
	LISTAR_MONEDAS,
	URN_WEB1,
	METRADO_LIMPIAR,
	AGREGA_CATEGORIA,
	AGREGA_TIPO,
	AGREGA_FAMILIA,
	AGREGA_GRUPO,
	MODIFICA_GRUPO,
	ELIMINA_GRUPO,
	AGREGA_ELEMENTOS,
	MODIFICA_SUB,
	MODIFICA_SUB1,
	AGREGA_SUB1,
	ACT_PRESUPUESTO,
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
	titlePC: null,
	DataApu: [],
	DataClientes: [],
	DataUbicaciones: [],
	DataModelos: [],
	DataMonedas: [],
	DataMetrado: [],
	Urn: null,
	DatosPresupuesto: [],
	DataAsociado: [],
	Dataestructura: [],
	Datacalculo: [],
	DataCategorias: null,
	DataTipo: null,
	DataFamilia: null,
	DataElementos: null,
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
			//console.log('pasa a guardar datos de items');
			//console.log(state);
			//console.log(payload);

			return {
				...state,
				DataPc: [...state.DataPc, ...payload],
				//DataPc: payload,
				//titlePC: 'Cambiamos titulo'
			};


		case LISTAR_POR_PERIODO:
			//console.log('pasa a borrar');
			//console.log(state);
			//console.log(payload);

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
				//DataUbicaciones: [...state.DataUbicaciones, ...payload]
				DataUbicaciones: [...payload]
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
			//console.log('pasa al DataUnique');
			//console.log(payload);

			return {
				...state,
				//DataUnique: [...state.DataUnique, ...payload]
				DataUnique: [...payload]
			};


		case METRADO_LIMPIAR:
			//console.log('pasa a borrar');
			//console.log(state);
			//console.log(payload);
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

		case ACT_PRESUPUESTO:
			/*console.log('este es mi dato');
			console.log(...state.DatosPresupuesto);

		    console.log('este es mi nuevo dato');
			console.log(payload);*/
			return {
				...state,
				DatosPresupuesto: [payload]
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

		case AGREGA_GRUPO:
			return {
				...state,
				treePartyControl: [...state.treePartyControl, ...payload]
			};

		case MODIFICA_GRUPO:
			//console.log('este es el codPresupuesto');
			//console.log(payload);
			return {
				...state,
				treePartyControl: [...state.treePartyControl.filter((filtro1) => filtro1.CodPresupuesto !== payload[0].CodPresupuesto), ...payload].sort((a, b) => a.Fila - b.Fila)
				//treePartyControl: [...state.treePartyControl.filter( (filtro1) => filtro1.CodPresupuesto !== '1504' ), ...payload]
			};
		case ELIMINA_GRUPO:
			return {
				...state,
				treePartyControl: [...state.treePartyControl.filter((filtro1) => filtro1.CodPresupuesto !== payload[0].CodPresupuesto)]
			};


		case MODIFICA_SUB:
			/*console.log('este es el codSUBPresupuesto');
			console.log(payload);			*/
			return {
				...state,
				treeSubControl: [...state.treeSubControl.filter((filtro1) => filtro1.CodSubpresupuesto !== payload[0].CodSubpresupuesto), ...payload].sort((a, b) => a.CodSubpresupuesto - b.CodSubpresupuesto)
			};

		case MODIFICA_SUB1:
			//console.log('este es el ELEMENTO QUE VOY A CAMBIAR');
			//console.log(payload);			
			return {
				...state,
				//subPres: [...state.subPres.filter( (filtro1) => (((filtro1.CodPresupuesto !== payload[0].CodPresupuesto) && (filtro1.CodSubpresupuesto !== payload[0].CodSubpresupuesto))) ), ...payload]/*.sort((a, b) => a.CodSubpresupuesto - b.CodSubpresupuesto)*/

				subPres: [...state.subPres.filter((filtro1) => {
					//if(filtro1.CodPresupuesto !== payload[0].CodPresupuesto && filtro1.CodSubpresupuesto!==payload[0].CodSubpresupuesto){
					if (filtro1.CodPresupuesto + filtro1.CodSubpresupuesto !== payload[0].CodPresupuesto + payload[0].CodSubpresupuesto) {
						return filtro1;
					}
				}), ...payload].sort((a, b) => a.CodPresupuesto - b.CodPresupuesto).sort((a, b) => a.CodSubpresupuesto - b.CodSubpresupuesto)


			};


		case AGREGA_SUB1:
			//console.log('este es el ELEMENTO QUE VOY A CAMBIAR');
			//console.log(payload);			
			return {
				...state,
				subPres: [...state.subPres, ...payload].sort((a, b) => a.CodPresupuesto - b.CodPresupuesto).sort((a, b) => a.CodSubpresupuesto - b.CodSubpresupuesto)

				/*subPres: [...state.subPres.filter((filtro1) => {
					//if(filtro1.CodPresupuesto !== payload[0].CodPresupuesto && filtro1.CodSubpresupuesto!==payload[0].CodSubpresupuesto){
					if (filtro1.CodPresupuesto + filtro1.CodSubpresupuesto !== payload[0].CodPresupuesto + payload[0].CodSubpresupuesto) {
						return filtro1;
					}
				}), ...payload].sort((a, b) => a.CodPresupuesto - b.CodPresupuesto).sort((a, b) => a.CodSubpresupuesto - b.CodSubpresupuesto)*/


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

		case AGREGA_REGISTRO:
			//alert('El payload ' + payload);
			return {
				...state,
				agregandoReg: payload,
			};

		case AGREGA_CATEGORIA:
			return {
				...state,
				//DataCategorias: [...state.DataCategorias, ...payload]
				DataCategorias: payload,
			};

		case AGREGA_TIPO:
			return {
				...state,
				//DataCategorias: [...state.DataCategorias, ...payload]
				DataTipo: payload,
			};

		case AGREGA_FAMILIA:
			return {
				...state,
				//DataCategorias: [...state.DataCategorias, ...payload]
				DataFamilia: payload,
			};

		case AGREGA_ELEMENTOS:
			return {
				...state,
				//DataCategorias: [...state.DataCategorias, ...payload]
				DataElementos: payload,
			};


		default:
			return state
	};
}
