//import React from 'react'
import { Table } from "react-bootstrap";
//import Bar from "./Charts/Bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { agregaRegistro, cleanDataChartAPU, seleccionarFilaAsociado, selectAPUS } from "../actions/proyects.actions";
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

const opcMenuInicio = [
	{ text: 'Agregar' },
	{ text: 'Eliminar' }
];



const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];

const Asociados = ({ levelStart = 1, idProject }) => {


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
		//console.log('datos de apus 1')
		//console.log(proyects.DataAsociado)
		if (proyects.DataAsociado == undefined) return;
		orderTree(proyects.DataAsociado);
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
					dispatch(agregaRegistro(''));
					return;
				}
				dispatch(agregaRegistro('Asociado'));
				//alert('Datos generales : Pres ' + itemSelected + ' Sub ' + itemSelected1 + ' tipo '+ tipoSeleccion);
				/*if (tipoSeleccion === 'Presupuesto')
					setDatosGenerales(true);
				else
					setDatosGeneralesSub(true);*/
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
				//rootValue={-1}
				//selectedRowKeys={selectedRowKeys}

				//onSelectionChanged={() => {alert('hola')}}
				//onRowClick={() => {alert(this)}}
				onCellClick={(e) => {
					//console.log('OncellClick');console.log(e)
					//alert(e.rowIndex);
					if (filaAct!==e.rowIndex){
						setFilaAct(e.rowIndex);

						
						
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
					
					
					e.data.CodAsociado=getRandomString(24);
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

				
				
				} } ///aqui actualizo

				//onEditingChange={(e)=>{ console.log('cambiando valor de celda');console.log(e) } }
				//onOptionChanged={(e)=>{ console.log('Option chaged');console.log(e) } }
				//onRowInserted={(e)=>{ console.log('Celda insertada');console.log(e) } }

				wordWrapEnabled={true}
			>
				<Editing
					allowAdding={true}
					allowUpdating={true}
					allowDeleting={true}
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
					dataField="Familia">
				<Lookup
					//dataSource={employees}
					dataSource={proyects.DataFamilia}
					valueExpr="Name"
					displayExpr="Name"/>
								
				</Column>
				<Column
					width={'25%'}
					dataField="Tipo"
					alignment={'center'}
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
				/>
				<Column type="buttons">
            		<Button name="delete" />
          		</Column>				


				<Pager
					allowedPageSizes={allowedPageSizes}
					showPageSizeSelector={true}
					showNavigationButtons={true}
				/>
				<Paging
					enabled={true}
					defaultPageSize={15}
				/>
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
