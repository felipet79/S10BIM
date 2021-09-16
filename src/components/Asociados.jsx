//import React from 'react'
import { Table } from "react-bootstrap";
//import Bar from "./Charts/Bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAsociado, agregaRegistro, cleanDataChartAPU, eliminaAsociado, eliminarXCodigo, guardarAsociado, seleccionarFilaAsociado, selectAPUS } from "../actions/proyects.actions";
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
	RequiredRule,
	Button
} from 'devextreme-react/tree-list';

import { ContextMenu } from "devextreme-react";
import notify from 'devextreme/ui/notify';
import Swal from 'sweetalert2'
import { randomInt } from "crypto";
import { Template } from 'devextreme-react';
import CellRend from "./Cellrend";


const opcMenuInicio = [
	{ text: 'Agregar' },
	{ text: 'Eliminar' }
];



const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];

const Asociados = ({ levelStart = 1, idProject, itemSel }) => {


	const [opcMenu, setOpcMenu] = useState(opcMenuInicio)


	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)

	const [filaAct, setFilaAct] = useState(0)

	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);


	/*const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);*/


	const [loading, setLoading] = useState(true);

	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	//const subproyects = useSelector((state) => state.subproyects);


	const orderTree = (tree) => {
		//let orderedLevels = {};

		/*for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			if (item.Nivel >= levelStart) {
				if (!orderedLevels[item.Nivel])
					orderedLevels[item.Nivel] = []
				if (item.Nivel > lastLevel)
					setLastLevel(item.Nivel)
				orderedLevels[item.Nivel].push({...item, open: false})
			}
		}*/

		let orderedLevels = {};
		orderedLevels[0] = [];
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			orderedLevels[0].push({ ...item, open: false })
		}
		setAllLevels(orderedLevels);



		//setAllLevels(orderedLevels);
		//console.log('datos de apus')
		//console.log(orderedLevels)

	}

	useEffect(() => {
		console.log('datos de Asociados')
		console.log(proyects.DataAsociado)
		if (proyects.DataAsociado == undefined) return;
		orderTree(proyects.DataAsociado);

		for (let i=0;i<proyects.DataAsociado.length;i++){
			if (proyects.DataAsociado[i].Valor!==''){
				if (proyects.DataAsociado[i].Valor.substring(0,1)==='=')
					proyects.DataAsociado[i].Comp='Igual';
				
				if (proyects.DataAsociado[i].Valor.substring(0,1)==='!')
					proyects.DataAsociado[i].Comp='Diferente';

			proyects.DataAsociado[i].Valor=proyects.DataAsociado[i].Valor.substring(1,proyects.DataAsociado[i].Valor.length);
			}



		}



		//alert('ejecutó la primera carga');
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [levelStart, proyects.DataAsociado])



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
					return (<tr onClick={() => Seleccion_Item(filter)}>
						<td>{filter.Categoria}</td>
						<td>{filter.Familia}</td>
						<td>{filter.Tipo}</td>
						<td>{filter.CampoFiltro}</td>
						<td>{filter.Valor}</td>
						<td>{filter.Valor}</td>
					</tr>
					)
				}) : ''
		)


	}


	const DataRow= (rowInfo) => {
		console.log('esta es la info de la fila')
		console.log(rowInfo)
		alert();
		return (
		  <tbody className={`employee dx-row ${rowInfo.rowIndex % 2 ? 'dx-row-alt' : ''}`}>
			<tr className="main-row">
			  <td rowSpan="2"><img src={rowInfo.data.Picture} /></td>
			  <td>{rowInfo.data.Prefix}</td>
			  <td>{rowInfo.data.FirstName}</td>
			  <td>{rowInfo.data.LastName}</td>
			  <td>{rowInfo.data.Position}</td>
			  {/* <td>{formatDate(new Date(rowInfo.data.BirthDate))}</td>
			  <td>{formatDate(new Date(rowInfo.data.HireDate))}</td> */}
			</tr>
			<tr className="notes-row">
			  <td colSpan="6"><div>{rowInfo.data.Notes}</div></td>
			</tr>
		  </tbody>
		);
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

				const Nuevo=[{
					ActualizacionFecha: "2021-07-26T16:09:24.607",
					ActualizacionUsuario: "ctorres@s10peru.com",
					CampoFiltro: "",
					Categoria: "",
					CodAsociado: getRandomString(24),
					CodPresupuesto: proyects.DatosPresupuesto[0].CodPresupuesto,
					CodSubpresupuesto: proyects.Sub_sel,
					CreacionFecha: "2021-07-26T16:09:24.607",
					CreacionUsuario: "ctorres@s10peru.com",
					Familia: "",
					Item: itemSel?.Item,
					Tipo: "",
					Valor:"",
				}];

				dispatch(addAsociado(Nuevo));
				/*console.log('agregando un asociado')
				console.log(Nuevo)
				console.log('Este es mi Item sel')
				console.log(itemSel.Item)*/
				//(Presupuesto, SubPresupuesto, Item, CodAsociado, Categoria, Familia, Tipo, campoFiltro, valorFiltro, userId) 
				dispatch(guardarAsociado(proyects.DatosPresupuesto[0].CodPresupuesto,proyects.Sub_sel,itemSel.Item,Nuevo[0].CodAsociado,'','','','','',''));
				


				//dispatch(agregaRegistro(''));
				return;

				//dispatch(agregaRegistro('Asociado'));
				
				//alert('Datos generales : Pres ' + itemSelected + ' Sub ' + itemSelected1 + ' tipo '+ tipoSeleccion);
				/*if (tipoSeleccion === 'Presupuesto')
					setDatosGenerales(true);
				else
					setDatosGeneralesSub(true);*/
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
				title: 'Estas Seguro de eliminar este elemento ' + proyects.filaAsociadoSel.Data.Categoria + ' ' + proyects.filaAsociadoSel.Data.Familia + ' ' + proyects.filaAsociadoSel.Data.Tipo +'  ?',
				text: "Esta acción no podrá ser revertida!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Si, eliminarlo!',
				cancelButtonText: 'No, salir!',
				reverseButtons: true
			  }).then((result) => {
				if (result.isConfirmed) {
					
					dispatch(eliminarXCodigo('Asociado',proyects.filaAsociadoSel.Data.CodAsociado,''))
					dispatch(eliminaAsociado(proyects.filaAsociadoSel.Data.CodAsociado));
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


	 
	
	const employees = [{
		'ID': 1,
		'Name': 'Armazón estructural'
	  }, {
		'ID': 2,
		'Name': 'Armadura Estructural'
	  }, {
		'ID': 3,
		'Name': 'Arthur Miller'
	  }, {
		'ID': 4,
		'Name': 'Robert Reagan'
	  }, {
		'ID': 5,
		'Name': 'Greta Sims'
	  }, {
		'ID': 6,
		'Name': 'Brett Wade'
	  }, {
		'ID': 7,
		'Name': 'Sandra Johnson'
	  }, {
		'ID': 8,
		'Name': 'Ed Holmes'
	  }, {
		'ID': 9,
		'Name': 'Barb Banks'
	  }];
	  
	  const operaciones = [{
		'ID': 1,
		'Name': 'Igual'
	  }, {
		'ID': 2,
		'Name': 'Diferente'
	  }];




	return (
		<>

			<TreeList
				id='TreeAsociado'
				dataSource={proyects.DataAsociado}
				keyExpr="CodAsociado"
				//parentIdExpr="PhantomParentId"
				showBorders={true}
				focusedRowEnabled={true}
				//defaultExpandedRowKeys={[1, 2, 3, 5]}
				columnAutoWidth={false}
				rowAlternationEnabled={true}
				//rootValue={-1}
				//selectedRowKeys={selectedRowKeys}

				//onSelectionChanged={() => {alert('hola')}}
				//onRowClick={() => {alert(this)}}
				onCellClick={(e) => {
					//console.log('OncellClick');console.log(e)
					//alert(e.rowIndex);
					if (filaAct!==e.rowIndex){
						setFilaAct(e.rowIndex);

						
						if (!e.data) return;
						//si tengo tipo = todos
						
						if (e.data.Tipo!==''){
							dispatch(seleccionarFilaAsociado({Fila:e.rowIndex, Categoria:e.data.Categoria, Familia:e.data.Familia, Tipo:e.data.Tipo, Data:e.data}));

						}

						if (e.data.Tipo==='' && e.data.Familia!==''){
							dispatch(seleccionarFilaAsociado({Fila:e.rowIndex, Categoria:e.data.Categoria, Familia:e.data.Familia, Tipo:'' , Data:e.data}));

						}

						if (e.data.Tipo==='' && e.data.Familia==='' && e.data.Categoria!==''){
							dispatch(seleccionarFilaAsociado({Fila:e.rowIndex, Categoria:e.data.Categoria, Familia:'', Tipo:'', Data:e.data}));

						}

						//si tengo familia = familia y cat
						//si tengo categoria = solo cat



/* e.data
ActualizacionFecha: "2021-07-26T16:09:24.607"
ActualizacionUsuario: "ctorres@s10peru.com"
CampoFiltro: ""
Categoria: "Armazón estructural"
CodAsociado: "wiVAgMNMPk+YqyEtuR2kow=="
CodPresupuesto: "0501001"
CodSubpresupuesto: "001"
CreacionFecha: "2021-07-26T16:09:24.607"
CreacionUsuario: "ctorres@s10peru.com"
Familia: ""
Item: "000000000000034"
Tipo: ""
Valor: ""*/

						
					}
					
				}}
				
				//onFocusedRowChanged={(e)=>{ console.log('Cambiando de fila');console.log(e) } }
				
				onEditCanceling={(e)=>{ console.log('Editando celda y cancelando');console.log(e) } }
				
				onInitNewRow={(e)=>{ 
					console.log('InitNewRow');
					console.log(e) 
					//e.data.Categoria='Suelos';
					//GENERAR NUEVO CODIGO
					
					
					//e.data.CodAsociado=getRandomString(24);
					
					
					
					/*ActualizacionFecha: "2021-08-09T08:08:08.783"
					ActualizacionUsuario: "ctorres@s10peru.com"
					CampoFiltro: ""
					Categoria: "Escaleras"
					CodAsociado: "VVmhDaL4IEW6bv8IbeKbcA=="
					CodPresupuesto: "0501001"
					CodSubpresupuesto: "001"
					CreacionFecha: "2021-08-06T18:19:33.91"
					CreacionUsuario: "ctorres@s10peru.com"
					Familia: ""
					Item: "000000000000039"
					Tipo: ""
					Valor: ""*/
					
					
					//console.log(proyects.DataAsociado) 
					
				} }

				//onEditingChange={(e)=>{ console.log('EditChange');console.log(e) } }
				//onEditingStart={(e)=>{ console.log('EditChange');console.log(e) } }
				onRowUpdated={(e)=>{ 
					console.log('Actualizando row');console.log(e) 
				
				                   /* console.log('Esta es mi data ') 
                    console.log(proyects.filaAsociadoSel.Data) 
                    console.log('Este es mi codigo ') 
                    console.log(proyects.filaAsociadoSel.Data.CodAsociado) 

                    console.log(proyects.DataAsociado) */
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


					}

					if (e.data.Tipo==='' && e.data.Familia!==''){
						//dispatch(seleccionarFilaAsociado({Fila:e.rowIndex, Categoria:e.data.Categoria, Familia:e.data.Familia, Tipo:'' , Data:e.data}));

						const filtr = proyects.DataElementos.filter((filtro1) => filtro1.Familia === e.data.Familia);
						if (filtr) {
							e.data.Categoria=filtr[0].Categoria;
							//e.data.Familia=filtr[0].Familia;		
						}


					}

					if (e.data.Tipo==='' && e.data.Familia==='' && e.data.Categoria!==''){
						//dispatch(seleccionarFilaAsociado({Fila:e.rowIndex, Categoria:e.data.Categoria, Familia:'', Tipo:'', Data:e.data}));

					}
					//(Presupuesto, SubPresupuesto, Item, CodAsociado, Categoria, Familia, Tipo, campoFiltro, valorFiltro, userId) 
					let agre='';
					if (e.data?.Comp==='Igual'){
						agre='=';
					}
					if (e.data?.Comp==='Diferente'){
						agre='!';
					}

					dispatch(guardarAsociado(e.data.CodPresupuesto,e.data.CodSubpresupuesto,e.data.Item,e.data.CodAsociado,e.data.Categoria,e.data.Familia,e.data.Tipo,e.data.CampoFiltro,agre+e.data.Valor,''));
				
				} } ///aqui actualizo

				//onEditingChange={(e)=>{ console.log('cambiando valor de celda');console.log(e) } }
				//onOptionChanged={(e)=>{ console.log('Option chaged');console.log(e) } }
				//onRowInserted={(e)=>{ console.log('Celda insertada');console.log(e) } }
				onRowRemoving={(e)=>{ console.log('Celda en eliminacion');console.log(e) } }

				/*rowRender={DataRow}*/
				
				wordWrapEnabled={true}
			>
				<Editing
					allowAdding={false}
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
					width={'25%'}
					dataField="Categoria" 
					cellTemplate="Template1"								
				>
				<Lookup
					//dataSource={employees}
					dataSource={proyects.DataCategorias}
					valueExpr="Name"
					displayExpr="Name" />
				{/* <RequiredRule/> */}
				</Column>
				
				<Column
					width={'25%'}
					dataField="Familia"
					cellTemplate="Template1"
					>
					
				<Lookup
					//dataSource={employees}
					dataSource={proyects.DataFamilia}
					valueExpr="Name"
					displayExpr="Name"
					cellTemplate="Template1"								
					/>
					
				</Column>
				<Column
					width={'25%'}
					dataField="Tipo"
					alignment={'center'}
					cellTemplate="Template1"								
				>
				<Lookup
					//dataSource={employees}
					dataSource={proyects.DataTipo}
					valueExpr="Name"
					displayExpr="Name"/>
				{/* <RequiredRule/>	 */}
				</Column>
				<Column
					width={'20%'}
					dataField="CampoFiltro"
					caption="Campo"
					alignment={'right'}
					cellTemplate="Template1"								
				>
				<Lookup
					//dataSource={employees}
					dataSource={proyects.Propiedades}
					valueExpr="Name"
					displayExpr="Name"/>
				{/* <RequiredRule/>	 */}
				</Column>


				<Column
					width={'10%'}
					dataField="Comp"
					caption="Comparación"
					alignment={'right'}
					cellTemplate="Template1"								
				>
				<Lookup
					//dataSource={employees}
					dataSource={operaciones}
					valueExpr="Name"
					displayExpr="Name" />
				{/* <RequiredRule/> */}
				</Column>
				
				<Column
					width={'20%'}
					dataField="Valor"
					alignment={'right'}
					cellTemplate="Template1"
				/>
				{/* <Column type="buttons">
            		<Button name="delete" />
          		</Column>				 */}


				<Pager
					allowedPageSizes={allowedPageSizes}
					showPageSizeSelector={true}
					showNavigationButtons={true}
				/>
				<Paging
					enabled={true}
					defaultPageSize={15}
				/>
				<Template name="Template1" render={CellRend} />
			</TreeList>


			<ContextMenu
				dataSource={opcMenu}
				width={120}
				target="#TreeAsociado"
				onItemClick={itemClick}
			/>

			{/*<Bar />*/}
			{/* <Table
				striped
				bordered
				hover
				size="sm"
				className="mt-0 bg-white"
			>
				<thead>
					<tr>
						<th>Categoria</th>
						<th>Familia</th>
						<th>Tipo</th>
						<th>Campo Filtrado</th>
						<th>Comp</th>
						<th>Valor</th>
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

export default Asociados
