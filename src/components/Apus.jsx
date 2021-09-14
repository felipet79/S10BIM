//import React from 'react'
import { Table } from "react-bootstrap";
//import Bar from "./Charts/Bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanDataChartAPU, selectAPUS } from "../actions/proyects.actions";

import TreeList, {
	Pager,
	Paging,
	Editing,
	HeaderFilter,
	FilterPanel,
	FilterRow,
	Scrolling,
	Column
} from 'devextreme-react/tree-list';
import { Template } from "devextreme-react";
import CellRend from "./Cellrend";


const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];


const Apus = ({ levelStart = 1, idProject }) => {



	const dispatch = useDispatch();
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
		//console.log(proyects.DataApu)
		if (proyects.DataApu == undefined) return;
		orderTree(proyects.DataApu);
		//alert('ejecutó la primera carga');
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [levelStart, proyects.DataApu])



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
						<td>{filter.TipoDetalle}</td>
						<td>{filter.Descripcion}</td>
						<td>{filter.Unidad}</td>
						<td>{filter.CuadrillaInsumo}</td>
						<td>{filter.CantidadInsumo}</td>
						<td>{filter.PrecioInsumo1}</td>
						<td>{filter.Parcial1}</td>
					</tr>
					)
				}) : ''
		)


	}



	return (
		<>


			<TreeList
				dataSource={proyects.DataApu}
				keyExpr="Descripcion"
				//parentIdExpr="PhantomParentId"
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
					width={'10%'}
					dataField="TipoDetalle" 
					cellTemplate="Template1"
					/>

				<Column
					width={'45%'}
					dataField="Descripcion" 
					cellTemplate="Template1"
					/>
					
				<Column
					width={'7%'}
					dataField="Unidad"
					alignment={'center'}
					cellTemplate="Template1"
				/>
				<Column
					width={'10%'}
					dataField="CuadrillaInsumo"
					caption="Cuadrilla"
					alignment={'right'}
					cellTemplate="Template1"
				/>

				<Column
					width={'10%'}
					dataField="CantidadInsumo"
					caption="Cantidad"
					alignment={'right'}
					cellTemplate="Template1"
				/>

				<Column
					width={'10%'}
					dataField="PrecioInsumo1"
					caption="Precio"
					alignment={'right'}
					cellTemplate="Template1"
				/>

				<Column
					width={'10%'}
					dataField="Parcial1"
					caption="Parcial"
					alignment={'right'}
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
				<Template name="Template1" render={CellRend} />
			</TreeList>
			{/*<Bar />*/}
			{/* <Table
				striped
				bordered
				hover
				size="sm"
				className="mt-0 bg-white"
				style={{width:'100%'}}
			>
				<thead >
					<tr>
						<th>Tipo</th>
						<th>Descripcion</th>
						<th>Unidad</th>
						<th>Cuadrilla</th>
						<th>Cantidad</th>
						<th>Costo</th>
						<th>Parcial</th>					
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

export default Apus
