//import React from 'react'
import {Table} from "react-bootstrap";
//import Bar from "./Charts/Bar";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { cleanDataChartAPU, selectAPUS } from "../actions/proyects.actions";
import { Widgets } from "@material-ui/icons";

const Calculo = ({levelStart=1, idProject}) => {
	
	
	
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [ allLevels, setAllLevels ] = useState(null)
	const [ itemSelected, setItemSelected ] = useState('')
	const [ lastLevel, setLastLevel ] = useState(0);


	const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);

	const [ allLevels2, setAllLevels2 ] = useState(null)

	/*const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);*/


	const [loading, setLoading] = useState(true);
	
	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	//const subproyects = useSelector((state) => state.subproyects);


	const orderTree = (tree) => {
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
		console.log('datos de calculo 22')
		console.log(orderedLevels1)

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

		//setAllLevels(orderedLevels);
		//console.log('datos de calculo 22')
		//console.log(orderedLevels1)

	}


	useEffect(() => {
		console.log('datos de calculo 1')
		console.log(proyects.Datacalculo)
		if (proyects.Datacalculo==undefined) return;
		orderTree(proyects.Datacalculo);
		//alert('ejecutó la primera carga');
			// console.log(result);
		// }
		 // eslint-disable-next-line
	}, [levelStart, proyects.Datacalculo])
	






	useEffect(() => {
		console.log('datos de calculo 2')
		console.log(proyects.Datacalculodet)
		if (proyects.Datacalculodet==undefined) return;
		orderTree1(proyects.Datacalculodet);
		//alert('ejecutó la primera carga');
			// console.log(result);
		// }
		orderTree2(proyects.Datacalculodet,'');
		 // eslint-disable-next-line
	}, [proyects.Datacalculodet])


	const Seleccion_Item = (Item, col) => {
		if (col==1){
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
					<td onClick={() => Seleccion_Item(filter,1)}>{filter.Longitud}</td>
					<td onClick={() => Seleccion_Item(filter,2)}>{filter.Ancho}</td>
					<td onClick={() => Seleccion_Item(filter,3)}>{filter.Alto}</td>										
					</tr>
				)}):''			
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
				)}):''			
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
				)}):''			
			)

			
	}

	
	return (
		<>
			{/*<Bar />*/}
			<div id="ContC1" className="mt-0 p-2 h-20 overflow-scroll" style={{ position:'absolute', height:'200px', width:'65%' }}>
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
			</div>
			<div id="ContC2" className="mt-0 p-2 h-20 overflow-scroll" style={{ position:'absolute',height:'200px', overflow:'scroll', width:'25%', left:'72%' }}>
			<Table
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
			</div>

		</>
	)
}

export default Calculo