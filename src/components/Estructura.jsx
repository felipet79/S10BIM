//import React from 'react'
import { Table } from "react-bootstrap";
//import Bar from "./Charts/Bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEstructura, cleanDataChartAPU, eliminaEstructura, eliminarXCodigo, guardarEstructura, modificaEstructura, selectAPUS } from "../actions/proyects.actions";
import TreeList, {
	Pager,
	Paging,
	Editing,
	HeaderFilter,
	FilterPanel,
	FilterRow,
	Scrolling,
	Column,
	Lookup,
	Sorting
} from 'devextreme-react/tree-list';

import { ContextMenu, Template } from 'devextreme-react';
import { CellCheck, CellNormal } from "./Cellrend";
import Swal from 'sweetalert2'

const opcMenuInicio = [
	{ text: 'Agregar' },
	{ text: 'Eliminar' }
];


const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];


const Estructura = ({ levelStart = 1, idProject, itemSel }) => {

	const [opcMenu, setOpcMenu] = useState(opcMenuInicio)

	const dispatch = useDispatch();
	const [codSelected, setCodSelected] = useState('')
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)
	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);


	/*const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);*/


	const [loading, setLoading] = useState(true);

	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	//const subproyects = useSelector((state) => state.subproyects);


	/*	const orderTree = (tree) => {
		
			let orderedLevels = {};
			orderedLevels[0] = [];
			for (let i = 0; i < tree.length; i++) {
				const item = tree[i];
				orderedLevels[0].push({...item, open: false})
			}
			setAllLevels(orderedLevels);
			  console.log('datos de estructura')
			console.log(orderedLevels)
	
		}
	
		useEffect(() => {
			console.log('datos de estructura 1')
			console.log(proyects.Dataestructura)
			if (proyects.Dataestructura==undefined) return;
			orderTree(proyects.Dataestructura);
			//alert('ejecutó la primera carga');
				// console.log(result);
			// }
			 // eslint-disable-next-line
		}, [levelStart, proyects.Dataestructura])*/


	/*	useEffect(() => {
			alert('');
		}, [proyects.Dataestructura])*/


	const Seleccion_Item = (Item) => {
		//const codP= Item.ERPCode.substring(1, 7);
		//const codSub= Item.ERPCode.substring(8, 10);
		/*const codP= Item.CodPresupuesto;
		const codSub= Item.CodSubpresupuesto;
		const codItem= Item.Item;
		alert(codP + "-" + codSub + "-" + codItem);

		dispatch(selectAPUS(codP, codSub, codItem,''));
		//dispatch(cleanDataChartAPU());*/




	}

	function getRandomString(length) {
		var s = '';
		do { s += Math.random().toString(36).substr(2); } while (s.length < length);
		s = s.substr(0, length);
		return s;
	}


	function itemClick(e) {
		if (!e.itemData.items) {
			//notify(`The "${ e.itemData.text }" item was clicked`, 'success', 200);



			if (e.itemData.text === 'Agregar') {
				if (proyects.Urn === '' || proyects.Urn === undefined || proyects.Urn === null) {
					Swal.fire({
						title: 'Error!',
						text: 'Este Presupuesto no tiene modelo asociado',
						icon: 'error',
						confirmButtonText: 'Ok'
					})


				}


				/*ActualizacionFecha: "2021-09-15T19:08:04.77"
				ActualizacionUsuario: "ctorres"
				Campo: "Fase de creación"
				CodEstructura: "FcItUpxs70mYMrRhaUMt3g=="
				CodPresupuesto: "0501001"
				CodSubpresupuesto: "001"
				CreacionFecha: "2021-07-14T17:14:52.793"
				CreacionUsuario: "ctorres@s10peru.com"
				Item: "000000000000034"
				Mostrar: "true"
				Nivel: "Nivel 1"*/
				let Niv = (proyects.Dataestructura.length) + 1;
				const Nuevo = [{
					ActualizacionFecha: "2021-07-26T16:09:24.607",
					ActualizacionUsuario: "ctorres@s10peru.com",
					Campo: "",
					CodEstructura: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-07-26T16:09:24.607",
					CreacionUsuario: "ctorres@s10peru.com",
					Item: itemSel?.Item,
					Mostrar: "false",
					Nivel: "Nivel " + Niv,
				}];

				//dispatch(addAsociado(Nuevo));
				dispatch(addEstructura(Nuevo));
				//export const guardarEstructura = (Presupuesto, SubPresupuesto, Item, CodEstructura, Nivel, Campo, Mostrar, userId) => {
				dispatch(guardarEstructura(proyects.DatosPresupuesto[0].CodPresupuesto, proyects.Sub_sel, itemSel.Item, Nuevo[0].CodEstructura, Nuevo[0].Nivel, '', 'false', ''));


			}




			if (e.itemData.text === 'Eliminar') {

				//console.log(proyects.filaAsociadoSel.Data.CodAsociado)


				const swalWithBootstrapButtons = Swal.mixin({
					customClass: {
						confirmButton: 'btn btn-dark',
						cancelButton: 'btn btn-light'
					},
					buttonsStyling: false
				})

				swalWithBootstrapButtons.fire({
					title: 'Estas Seguro de eliminar el elemento  ?',
					text: "Esta acción no podrá ser revertida!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Si, eliminarlo!',
					cancelButtonText: 'No, salir!',
					reverseButtons: true
				}).then((result) => {
					if (result.isConfirmed) {

						let pos = 0;
						for (let i = 0; i < proyects.Dataestructura.length; i++) {
							if (proyects.Dataestructura[i].CodEstructura === codSelected) {
								pos = i;
							}
							//proyects.Dataestructura[i]
						}
						let nn = pos + 1;
						for (let i = pos + 1; i < proyects.Dataestructura.length; i++) {
							proyects.Dataestructura[i].Nivel = 'Nivel ' + nn;
							nn++;

							dispatch(guardarEstructura(proyects.Dataestructura[i].CodPresupuesto, proyects.Dataestructura[i].CodSubpresupuesto, proyects.Dataestructura[i].Item, proyects.Dataestructura[i].CodEstructura, proyects.Dataestructura[i].Nivel, proyects.Dataestructura[i].Campo, proyects.Dataestructura[i].Mostrar, ''));

							//if (proyects.Dataestructura[i].CodEstructura===codSelected){
							//	pos=i;
							//}
							//proyects.Dataestructura[i]
						}


						dispatch(eliminarXCodigo('Estructura', codSelected, ''))
						dispatch(eliminaEstructura(codSelected));



						//let ItemAux=proyects.Dataestructura[i];
						//ItemAux.Nivel='Nivel ' + (i + 1);
						//dispatch(modificaEstructura(ItemAux));




						swalWithBootstrapButtons.fire(
							'Borrado!',
							'Su registro ha sido eliminado.',
							'success'
						)

						//localStorage.setItem("EliminadoResp", resp[0].Response);

					} else if (
						/* Read more about handling dismissals below */
						result.dismiss === Swal.DismissReason.cancel
					) {
						swalWithBootstrapButtons.fire(
							'Accion cancelada',
							'No se hanb realizado Cambios :)',
							'error'
						)
					}
				})

			}

		}
	}



	return (
		<>
			<TreeList
				id="TreeEstructura"
				dataSource={proyects.Dataestructura}
				keyExpr="CodEstructura"
				//parentIdExpr="PhantomParentId"
				//orderedLevels="Nivel ASC"
				showBorders={true}
				focusedRowEnabled={true}
				defaultExpandedRowKeys={[1, 2, 3, 5]}
				columnAutoWidth={false}
				rootValue={-1}
				showRowLines={true}
				showColumnLines={true}
				rowAlternationEnabled={true}
				orderTree={"Nivel"}
				//selectedRowKeys={selectedRowKeys}

				//onSelectionChanged={() => {alert('hola')}}
				//onRowClick={() => {alert(this)}}
				onCellClick={(e) => {
					if (e.columnIndex === 2 && e.data) {
						console.log('click en celda'); console.log(e)
						dispatch(guardarEstructura(e.data.CodPresupuesto, e.data.CodSubpresupuesto, e.data.Item, e.data.CodEstructura, e.data.Nivel, e.data.Campo, e.data.Mostrar, ''));

					}

					setCodSelected(e.data?.CodEstructura);

				}}
				onRowUpdated={(e) => {
					console.log('Actualizando row'); console.log(e)

					/*console.log('Esta es mi data ') 
					console.log(proyects.filaAsociadoSel.Data) */
					//console.log('Este es mi data de estructura ') 
					//console.log(proyects.filaAsociadoSel.Data.CodAsociado) 

					/*console.log(proyects.DataAsociado) 
					if (e.data.Tipo===undefined) e.data.Tipo='';
					if (e.data.Categoria===undefined) e.data.Categoria='';
					if (e.data.Familia===undefined) e.data.Familia='';

					if (e.data.Tipo!==''){
						//dispatch(seleccionarFilaAsociado({Fila:e.rowIndex, Categoria:e.data.Categoria, Familia:e.data.Familia, Tipo:e.data.Tipo, Data:e.data}));

						const filtr = proyects.DataElementos.filter((filtro1) => filtro1.Tipo === e.data.Tipo);
						if (filtr) {
							
							e.data.Categoria=filtr[0].Categoria;
							e.data.Familia=filtr[0].Familia;		
						}


					}*/


					//guardarEstructura = (Presupuesto, SubPresupuesto, Item, CodEstructura, Nivel, Campo, Mostrar, userId) => {
					dispatch(guardarEstructura(e.data.CodPresupuesto, e.data.CodSubpresupuesto, e.data.Item, e.data.CodEstructura, e.data.Nivel, e.data.Campo, e.data.Mostrar, ''));



				}} ///aqui actualizo
				//onFocusedRowChanged={onSelectionChanged}

				wordWrapEnabled={true}
			>
				<Editing
					allowUpdating={true}
					allowDeleting={false}
					selectTextOnEditStart={true}
					useIcons={true}
					mode="cell"
				/>
				<Sorting
					mode="singular"
				/>
				<HeaderFilter
					visible={false}
				/>
				<FilterPanel
					visible={false}
				/>
				<FilterRow
					visible={false}
				/>
				<Scrolling
					mode="standard"
				/>

				<Column
					width={'30%'}
					dataField="Nivel"
					cellTemplate="Template1"
					alignment={'center'}
					defaultSortOrder="asc"
					allowEditing={false}
				/>

				<Column
					width={'40%'}
					dataField="Campo"
					alignment={'center'}
					cellTemplate="Template1"
				>
					<Lookup
						//dataSource={employees}
						dataSource={proyects.Propiedades}
						valueExpr="Name"
						displayExpr="Name" />
					{/* <RequiredRule/>	 */}
				</Column>
				<Column
					width={'7%'}
					dataField="Mostrar"
					alignment={'center'}
					cellTemplate="Template"
					allowEditing={false}
				/>

				<Pager
					allowedPageSizes={allowedPageSizes}
					showPageSizeSelector={true}
					showNavigationButtons={true}
				/>
				<Paging
					enabled={true}
					defaultPageSize={15}
				/>
				<Template name="Template" render={CellCheck} />
				<Template name="Template1" render={CellNormal} />
			</TreeList>
			<ContextMenu
				dataSource={opcMenu}
				width={120}
				target="#TreeEstructura"
				onItemClick={itemClick}
			/>
			{/* <Table
				striped
				bordered
				hover
				size="sm"
				className="mt-0 bg-white"
			>
				<thead>
					<tr>
						<th>Nivel</th>
						<th>Campo</th>
						<th>Mostrar</th>
					</tr>
				</thead>
				<tbody>
					<>
						{
							drawerItems1(0)
						}
					</>

									
				</tbody>
			</Table> */}

		</>
	)
}

export default Estructura
