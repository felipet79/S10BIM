//import React from 'react'
import {Table} from "react-bootstrap";
//import Bar from "./Charts/Bar";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { cleanDataChartAPU, selectAPUS } from "../actions/proyects.actions";
import TreeList, {
	Pager,
	Paging,
	Editing,
	HeaderFilter,
	FilterPanel,
	FilterRow,
	Scrolling,
	Column } from 'devextreme-react/tree-list';


const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];


const Estructura = ({levelStart=1, idProject}) => {
	
	
	
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [ allLevels, setAllLevels ] = useState(null)
	const [ itemSelected, setItemSelected ] = useState('')
	const [ lastLevel, setLastLevel ] = useState(0);


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
			orderedLevels[0].push({...item, open: false})
		}
		setAllLevels(orderedLevels);


		
		//setAllLevels(orderedLevels);
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
	}, [levelStart, proyects.Dataestructura])
	


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
					<td>{filter.Nivel}</td>
					<td>{filter.Campo}</td>
					<td>{filter.Mostrar}</td>
					</tr>
				)}):''			
			)

			
	}


	
	return (
		<>
			<TreeList
				dataSource={proyects.Dataestructura}
				keyExpr="Nivel"
				//parentIdExpr="PhantomParentId"
				//orderedLevels="Nivel ASC"
				showBorders={true}
				focusedRowEnabled={true}
				defaultExpandedRowKeys={[1, 2, 3, 5]}
				columnAutoWidth={false}
				rootValue={-1}
				showRowLines={true}
				showColumnLines={true}
						
				//selectedRowKeys={selectedRowKeys}

				//onSelectionChanged={() => {alert('hola')}}
				//onRowClick={() => {alert(this)}}


				//onFocusedRowChanged={onSelectionChanged}

				wordWrapEnabled={true}
			>
				<Editing
					allowUpdating={false}
					allowDeleting={false}
					selectTextOnEditStart={true}
					useIcons={true}
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
					
				/>
					
				<Column
					width={'40%'}
					dataField="Campo" />
				<Column
					width={'7%'}
					dataField="Mostrar"
					alignment={'center'}
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
			</TreeList>

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
