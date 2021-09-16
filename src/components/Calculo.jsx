//import React from 'react'
import { Table } from "react-bootstrap";
//import Bar from "./Charts/Bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCalculo, cleanDataChartAPU, eliminarXCodigo, guardarCalculo, selectAPUS } from "../actions/proyects.actions";
import { Widgets } from "@material-ui/icons";
import TreeList, {
	Pager,
	Paging,
	Editing,
	HeaderFilter,
	FilterPanel,
	FilterRow,
	Scrolling,
	Column,
	Sorting
} from 'devextreme-react/tree-list';
import { ContextMenu, Template } from "devextreme-react";
import { CellNormal } from "./Cellrend";
import Swal from 'sweetalert2'
import BuscaPropiedad from "./BuscaPropiedad";

const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];

const opcMenuInicio = [
	{ text: 'Seleccionar campo..' },
];

const opcMenuInicio1 = [
	{ text: 'Agregar' },
	{ text: 'Seleccionar campo...' },
	{ text: 'Eliminar' },
	{ text: 'Eliminar formula' },
];


const Calculo = ({ levelStart = 1, idProject, itemSel }) => {


	const [opcMenu, setOpcMenu] = useState(opcMenuInicio)
	const [opcMenu1, setOpcMenu1] = useState(opcMenuInicio1)
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)

	const [coddetsel, setCodDetSel] = useState('')


	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);
	const [show, setShow] = useState(false);

	const [allLevels1, setAllLevels1] = useState(null)
	const [itemSelected1, setItemSelected1] = useState('')
	const [lastLevel1, setLastLevel1] = useState(0);

	const [allLevels2, setAllLevels2] = useState(null)

	/*const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);*/


	const [loading, setLoading] = useState(true);

	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	const [columnaSel, setColumnaSel] = useState(-1);


	//const subproyects = useSelector((state) => state.subproyects);


	/*	const orderTree = (tree) => {
			let orderedLevels = {};
			orderedLevels[0] = [];
			for (let i = 0; i < tree.length; i++) {
				const item = tree[i];
				orderedLevels[0].push({...item, open: false})
			}
			setAllLevels(orderedLevels);
	
		
			//setAllLevels(orderedLevels);
			console.log('datos de calculo')
			console.log(orderedLevels)
	
		}
	
	
		const orderTree1 = (tree1) => {
			let orderedLevels1 = {};
			orderedLevels1[0] = [];
			for (let i = 0; i < tree1.length; i++) {
				const item = tree1[i];
				orderedLevels1[0].push({...item, open: false})
			}
			setAllLevels1(orderedLevels1);
	
		
			//setAllLevels(orderedLevels);
			//console.log('datos de calculo 22')
			//console.log(orderedLevels1)
	
		}
	
	
		const orderTree2 = (tree1, tipo) => {
			let orderedLevels2 = {};
			orderedLevels2[0] = [];
			for (let i = 0; i < tree1.length; i++) {
				const item = tree1[i];
				if (item.TipoCampo==tipo)
					orderedLevels2[0].push({...item, open: false})
			}
			setAllLevels2(orderedLevels2);
		}*/


	function getRandomString(length) {
		var s = '';
		do { s += Math.random().toString(36).substr(2); } while (s.length < length);
		s = s.substr(0, length);
		return s;
	}




	useEffect(() => {

		//dispatch(eliminarXCodigo('Calculo','cx0rlmea2k5jfrqpvxpb5gsy'));
		//console.log(proyects.Datacalculo)

		if (itemSel.Unidad === null) return;

		if (proyects.Datacalculo == undefined) return;


		setTimeout(() => {

			if (proyects.Datacalculo.length === 0) {


				/*ActualizacionFecha: "2021-07-27T14:45:57.5"
				ActualizacionUsuario: "ctorres@s10peru.com"
				Alto: ""
				Ancho: "=(Longitud*0.5)"
				Cantidad: "1.00"
				CodCalculo: "dZcXz8gTKk68nZsAkhflAg=="
				CodPresupuesto: "0501001"
				CodSubpresupuesto: "001"
				CreacionFecha: "2021-07-22T14:14:22.253"
				CreacionUsuario: "ctorres@s10peru.com"
				Descripcion: ""
				Item: "000000000000035"
				Longitud: "0.25"*/



				const Nuevo = [{
					ActualizacionFecha: "2021-07-26T16:09:24.607",
					ActualizacionUsuario: "ctorres@s10peru.com",
					Alto: "",
					Ancho: "",
					Cantidad: "1.00",
					CodCalculo: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-07-26T16:09:24.607",
					CreacionUsuario: "ctorres@s10peru.com",
					Descripcion: "",
					Item: itemSel?.Item,
					Longitud: "",
				}];

				//console.log(itemSel)
				//console.log(Nuevo)

				dispatch(addCalculo(Nuevo));
				//guardarCalculo = (Presupuesto, SubPresupuesto, Item, CodCalculo, Descripcion, Cantidad, Longitud, Ancho, Alto, userId) => {
				dispatch(guardarCalculo(proyects.DatosPresupuesto[0].CodPresupuesto, proyects.Sub_sel, itemSel.Item, Nuevo[0].CodCalculo, '', '1.00', '', '', '', ''));



				//alert('esta vacio');

			}


		}, 1000);




		//console.log('datos de calculo 1')
		//console.log(proyects.Datacalculo)
		//if (proyects.Datacalculo==undefined) return;
		//orderTree(proyects.Datacalculo);

		//alert('ejecutó la primera carga');
		// console.log(result);
		// }
		// eslint-disable-next-line


		//"xgz0bw6jTUW0mo+ZAzvnzQ=="

	}, [proyects.Datacalculo])



	/*useEffect(() => {
		console.log('datos de calculo 2')
		console.log(proyects.Datacalculodet)
		if (proyects.Datacalculodet==undefined) return;
		orderTree1(proyects.Datacalculodet);
		//alert('ejecutó la primera carga');
			// console.log(result);
		// }
		orderTree2(proyects.Datacalculodet,'');
		 // eslint-disable-next-line
	}, [proyects.Datacalculodet])*/


	const Seleccion_Item = (Item, col) => {
		/*	if (col==1){
				orderTree2(proyects.Datacalculodet,'Longitud');
				//alert(Item.Longitud);
			}
	
			if (col==2){
				orderTree2(proyects.Datacalculodet,'Ancho');
				//alert(Item.Ancho);
			}
				
			if (col==3){
				orderTree2(proyects.Datacalculodet,'Alto');
				//alert(Item.Alto);
			}
	*/

		//const codP= Item.ERPCode.substring(1, 7);
		//const codSub= Item.ERPCode.substring(8, 10);
		/*const codP= Item.CodPresupuesto;
		const codSub= Item.CodSubpresupuesto;
		const codItem= Item.Item;
		

		dispatch(selectAPUS(codP, codSub, codItem,''));
		//dispatch(cleanDataChartAPU());*/




	}


	const Seleccion_Item1 = (Item) => {
		//const codP= Item.ERPCode.substring(1, 7);
		//const codSub= Item.ERPCode.substring(8, 10);
		/*const codP= Item.CodPresupuesto;
		const codSub= Item.CodSubpresupuesto;
		const codItem= Item.Item;
		alert(codP + "-" + codSub + "-" + codItem);

		dispatch(selectAPUS(codP, codSub, codItem,''));
		//dispatch(cleanDataChartAPU());*/




	}



	const drawerItems1 = (nivelact) => {

		if (allLevels == null || allLevels == undefined) return;
		if (allLevels[nivelact] == null || allLevels[nivelact] == undefined) return;
		//alert('ejecutó la carga');

		/*console.log('datos de subProyectos actualizados')
		console.log(allLevels1[0])
		
		return allLevels1[0].map( filter => {
				//const newTitle = `${parentName}${filter.Descripcion}`;
				 return (
				<StyledTreeItem
					nodeId={filter.CodSubpresupuesto}
					label={filter.Descripcion}
					key={filter.CodSubpresupuesto}
					onLabelClick={() => changeItem1(filter)} 
				>
				</StyledTreeItem>
			)})*/
		return (
			allLevels && allLevels[nivelact] ?
				allLevels[nivelact].map(filter => {
					return (<tr >
						<td>{filter.Descripcion}</td>
						<td>{filter.Cantidad}</td>
						<td onClick={() => Seleccion_Item(filter, 1)}>{filter.Longitud}</td>
						<td onClick={() => Seleccion_Item(filter, 2)}>{filter.Ancho}</td>
						<td onClick={() => Seleccion_Item(filter, 3)}>{filter.Alto}</td>
					</tr>
					)
				}) : ''
		)


	}






	const drawerItems2 = (nivelact) => {

		if (allLevels1 == null || allLevels1 == undefined) return;
		if (allLevels1[nivelact] == null || allLevels1[nivelact] == undefined) return;
		//alert('ejecutó la carga');

		/*console.log('datos de subProyectos actualizados')
		console.log(allLevels1[0])
		
		return allLevels1[0].map( filter => {
				//const newTitle = `${parentName}${filter.Descripcion}`;
				 return (
				<StyledTreeItem
					nodeId={filter.CodSubpresupuesto}
					label={filter.Descripcion}
					key={filter.CodSubpresupuesto}
					onLabelClick={() => changeItem1(filter)} 
				>
				</StyledTreeItem>
			)})*/
		return (
			allLevels1 && allLevels1[nivelact] ?
				allLevels1[nivelact].map(filter => {
					return (<tr onClick={() => Seleccion_Item1(filter)}>
						<td>{filter.Campo}</td>
						<td>{filter.Operacion}</td>
					</tr>
					)
				}) : ''
		)


	}


	const drawerItems3 = (nivelact) => {

		if (allLevels2 == null || allLevels2 == undefined) return;
		if (allLevels2[nivelact] == null || allLevels2[nivelact] == undefined) return;
		//alert('ejecutó la carga');

		/*console.log('datos de subProyectos actualizados')
		console.log(allLevels1[0])
		
		return allLevels1[0].map( filter => {
				//const newTitle = `${parentName}${filter.Descripcion}`;
				 return (
				<StyledTreeItem
					nodeId={filter.CodSubpresupuesto}
					label={filter.Descripcion}
					key={filter.CodSubpresupuesto}
					onLabelClick={() => changeItem1(filter)} 
				>
				</StyledTreeItem>
			)})*/
		return (
			allLevels2 && allLevels2[nivelact] ?
				allLevels2[nivelact].map(filter => {
					return (<tr onClick={() => Seleccion_Item1(filter)}>
						<td>{filter.Campo}</td>
						<td>{filter.Operacion}</td>
					</tr>
					)
				}) : ''
		)


	}



	function itemClick(e) {
		if (!e.itemData.items) {
			//notify(`The "${ e.itemData.text }" item was clicked`, 'success', 200);
			if (e.itemData.text === 'Seleccionar campo..') {
				setShow(true);
			}


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
				//dispatch(addEstructura(Nuevo));
				//export const guardarEstructura = (Presupuesto, SubPresupuesto, Item, CodEstructura, Nivel, Campo, Mostrar, userId) => {
				//dispatch(guardarEstructura(proyects.DatosPresupuesto[0].CodPresupuesto, proyects.Sub_sel, itemSel.Item, Nuevo[0].CodEstructura, Nuevo[0].Nivel, '', 'false', ''));


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




						dispatch(eliminarXCodigo('CalculoDetalle', coddetsel, ''))
						//dispatch(eliminaEstructura(codSelected));



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
			{/*<Bar />*/}
			<BuscaPropiedad columna={columnaSel} setShow={setShow} show={show} />
			<TreeList
				id="TreeCalculo"
				style={{ width: '75%' }}
				dataSource={proyects.Datacalculo}
				keyExpr="CodCalculo"
				//parentIdExpr="PhantomParentId"
				//orderedLevels="Nivel ASC"
				showBorders={true}
				//focusedRowEnabled={true}
				focusStateEnabled={true}
				defaultExpandedRowKeys={[1, 2, 3, 5]}
				columnAutoWidth={false}
				rootValue={-1}
				//selectedRowKeys={selectedRowKeys}

				//onSelectionChanged={() => {alert('hola')}}
				//onRowClick={() => {alert(this)}}

				onCellClick={(e) => {
					console.log(e)
					/*setClienteSel({
						Codigo: e.row.data.CodIdentificador,
						Descripcion: e.row.data.Descripcion,
					});*/

					setColumnaSel(e.columnIndex)

				}/*onSelectionChanged*/}
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
					width={'15%'}
					dataField="Descripcion"
					alignment={'center'}
					cellTemplate="Template1"
				/>

				<Column
					width={'20%'}
					dataField="Cantidad"
					alignment={'center'}
					cellTemplate="Template1"
				/>

				<Column
					width={'25%'}
					dataField="Longitud"
					alignment={'center'}
					cellTemplate="Template1"
				/>
				<Column
					width={'25%'}
					dataField="Ancho"
					alignment={'center'}
					cellTemplate="Template1"
				/>
				<Column
					width={'25%'}
					dataField="Alto"
					alignment={'center'}
					cellTemplate="Template1"
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
				<Template name="Template1" render={CellNormal} />
			</TreeList>



			<TreeList
				id="TreeCalculoDet"
				style={{ position: 'absolute', width: '25%', left: '75%', top: '10px' }}
				dataSource={proyects.Datacalculodet}
				keyExpr="CodCalculoDetalle"
				//parentIdExpr="PhantomParentId"
				//orderedLevels="Nivel ASC"
				showBorders={true}
				focusedRowEnabled={true}
				//defaultExpandedRowKeys={[1, 2, 3, 5]}
				columnAutoWidth={false}
				rootValue={-1}
				orderTree={"Posicion"}
				//selectedRowKeys={selectedRowKeys}

				//onSelectionChanged={() => {alert('hola')}}
				//onRowClick={() => {alert(this)}}
				onCellClick={(e) => {
					//if (e.columnIndex === 2 && e.data) {
					//console.log('click en celda'); console.log(e)
					//dispatch(guardarEstructura(e.data.CodPresupuesto, e.data.CodSubpresupuesto, e.data.Item, e.data.CodEstructura, e.data.Nivel, e.data.Campo, e.data.Mostrar, ''));

					//}
					console.log('click en celda'); console.log(e)
					setCodDetSel(e.data?.CodCalculoDetalle);

				}}

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
					width={'01%'}
					dataField="Posicion"
					alignment={'center'}
					defaultSortOrder="asc"
					visible={false}
				/>
				<Column
					width={'80%'}
					dataField="Campo"
					alignment={'center'}
					cellTemplate="Template1"

				/>

				<Column
					width={'30%'}
					dataField="Operacion"
					alignment={'center'}
					cellTemplate="Template1"

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
				<Template name="Template1" render={CellNormal} />
			</TreeList>
			<ContextMenu
				dataSource={opcMenu}
				width={120}
				target="#TreeCalculo"
				onItemClick={itemClick}
			/>
			<ContextMenu
				dataSource={opcMenu1}
				width={120}
				target="#TreeCalculoDet"
				onItemClick={itemClick}
			/>

			{/* <div id="ContC1" className="mt-0 p-2 h-20 col overflow-scroll" style={{ height:'100%', width:'65%' }}>
			<Table
				striped
				bordered
				hover
				size="sm"
				className="mt-0 bg-white"
			>
				<thead>
					<tr>
						<th>Descripcion</th>
						<th>cantidad</th>
						<th>Longitud</th>
						<th>Ancho</th>
						<th>Alto</th>
					</tr>
				</thead>
				<tbody>
					<>
						{
							drawerItems1(0)
						}
					</>

									
				</tbody>
			</Table>
			</div> */}
			{/* <div id="ContC2" className="mt-0 p-2 h-20 col overflow-scroll" style={{ /*position:'absolute',height:'100%', overflow:'scroll', width:'25%', left:'72%' }}>
			{/*<Table
				striped
				bordered
				hover
				size="sm"
				className="mt-0 bg-white"
			>
				<thead>
					<tr>
						<th>Campo</th>
						<th>Operacion</th>
					</tr>
				</thead>
				<tbody>
					<>
						{
							drawerItems3(0)
						}
					</>

									
				</tbody>
			</Table>
			</div> */}

		</>
	)
}

export default Calculo
