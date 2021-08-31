//import React from 'react'
import {Table} from "react-bootstrap";
//import Bar from "./Charts/Bar";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { cleanDataChartAPU, selectAPUS, SelectUrn } from "../actions/proyects.actions";
import { MostarModelo } from "../views/ViewerSc";

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



const LPlanos = [{
	'CodPlano': 'n4VduC1mikKexAKq81VrPw==',
	'NombreArchivRvt': "OBRA-2021-01-EST_UTP-TRUJILLO_210323_felipet79XYRPT",
	'RutaArchivoRvt': 'C:\Users\CRISTIAN\Documents\OBRA-2021-01-EST_UTP-TRUJILLO_210323_felipet79XYRPT.rvt',
	'UrnAddIn': 'urn:adsk.wipprod:fs.file:vf.i-ZglBH8RtWEb5f-BZvgCA?version=1',
	'UrnWeb': 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x',
	'EmailUsuario': 'ctorres@s10peru.com',  
  },{
	'CodPlano': 'au5cX016Pkq2F8FLjAqHeA==',
	'NombreArchivRvt': "Edificio colinas_felipet79XYRPT",
	'RutaArchivoRvt': 'C:\Users\CRISTIAN\Documents\Edificio colinas_felipet79XYRPT.rvt',
	'UrnAddIn': 'urn:adsk.wipprod:fs.file:vf.eRzcm6VWTMy2VuycStaTdQ?version=1',
	'UrnWeb': 'dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmVSemNtNlZXVE15MlZ1eWNTdGFUZFE/dmVyc2lvbj0x',
	'EmailUsuario': 'ctorres@s10peru.com',  
  }];


const Metrados = ({levelStart=1, idProject}) => {
	
	
	
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

		/*let orderedLevels = {};
		orderedLevels[0] = [];
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			orderedLevels[0].push({...item, open: false})
		}
		setAllLevels(orderedLevels);*/

		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			if (item.PhantomParentId==="")
				item.PhantomParentId=null;
				
			//orderedLevels[0].push({...item, open: false})
		}
		//setAllLevels(orderedLevels);

		
		//setAllLevels(orderedLevels);
		//console.log('datos de apus')
		//console.log(orderedLevels)

	}

	useEffect(() => {
		//console.log('datos de metrado')
		//console.log(proyects.DataMetrado)
		/*proyects.DataMetrado=[ {CodMedicion="",Descipcion="Raiz" } ,...proyects.DataMetrado]
		if (proyects.DataMetrado==undefined) return;
		orderTree(proyects.DataMetrado);
		//alert('ejecutó la primera carga');
			// console.log(result);
		// }
		 // <eslint-disable-next-line></eslint-disable-next-line>*/




		 if (proyects.DataMetrado==undefined) return;
		 orderTree(proyects.DataMetrado);
 

	}, [proyects.DataMetrado])
	


	const Seleccion_Item = (Item) => {
		//const codP= Item.ERPCode.substring(1, 7);
		//const codSub= Item.ERPCode.substring(8, 10);
		/*const codP= Item.CodPresupuesto;
		const codSub= Item.CodSubpresupuesto;
		const codItem= Item.Item;
		alert(codP + "-" + codSub + "-" + codItem);

		dispatch(selectAPUS(codP, codSub, codItem,''));
		//dispatch(cleanDataChartAPU());*/

		MostarModelo(Item.UniqueId);


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
					<td>{filter.Descripcion}</td>
					<td>{filter.Cantidad}</td>
					<td>{filter.Longitud}</td>
					<td>{filter.Ancho}</td>
					<td>{filter.Alto}</td>								
					<td>{filter.Total}</td>					
					<td>{filter.Detalle}</td>					
					<td>{filter.Vinculo}</td>					
					<td>{filter.UniqueId}</td>
					</tr>
				)}):''			
			)

			
	}

	
	
	function ObtenerCadena(Item)
	{
		var cadenaMostrar="";
		if (Item.UniqueId===""){
			const filtro = proyects.DataMetrado.filter( (filtro1) => filtro1.PhantomParentId === Item.CodMedicion );
			for (let i = 0; i < filtro.length; i++) {
				if (filtro[i].Tipo==="Medicion"){
					if (cadenaMostrar==="")
						cadenaMostrar=filtro[i].UniqueId;
					else
						cadenaMostrar= cadenaMostrar+','+filtro[i].UniqueId;
				}else{
					//buscar los datos de los hijos
					var CadenaAux=ObtenerCadena(filtro[i]);
					if (cadenaMostrar==="")
						cadenaMostrar=CadenaAux;
					else
						cadenaMostrar= cadenaMostrar+','+CadenaAux;
				}

			}

		}else
			return Item.UniqueId;
		return cadenaMostrar;
	}
	

	/*function dosDecimales(n) {
		let t=n.toString();
		let regex=/(\d*.\d{0,2})/;
		return t.match(regex)[0];
	  }*/
	  
	  //console.log(dosDecimales(3232.3456))





	
	function onSelectionChanged(e) {
		//console.log(e);

		//alert(e.row.data.Descripcion);
		const Item=e.row.data;
		
		//alert(codP + "-" + codSub + "-" + codItem);


		//verificar si es el plano

		//Item
		const filtro2 = LPlanos.find( (filtro1) => filtro1.CodPlano === Item.Vinculo );
		if (filtro2)
		if (filtro2.UrnWeb !== proyects.Urn){
			//alert(filtro2.UrnWeb + ' ' + proyects.Urn);
			dispatch(SelectUrn(filtro2.UrnWeb));
		}
		
		var cadenaMostrar="";
		if (Item.UniqueId===""){
			//proyects.DataMetrado
			const filtro = proyects.DataMetrado.filter( (filtro1) => filtro1.PhantomParentId === Item.CodMedicion );
			//console.log('Datos de metrados filtrados');
			//console.log(filtro);
			
			for (let i = 0; i < filtro.length; i++) {
				if (filtro[i].Tipo==="Medicion"){
					if (cadenaMostrar==="")
						cadenaMostrar=filtro[i].UniqueId;
					else
						cadenaMostrar= cadenaMostrar+','+filtro[i].UniqueId;
				}else{
					//buscar los datos de los hijos
					var CadenaAux=ObtenerCadena(filtro[i]);
					if (cadenaMostrar==="")
						cadenaMostrar=CadenaAux;
					else
						cadenaMostrar= cadenaMostrar+','+CadenaAux;
				}


			}
			
			MostarModelo(cadenaMostrar);
			//console.log(cadenaMostrar);


		}else
			MostarModelo(Item.UniqueId);

		//const selectedData = e.component.getSelectedRowsData(state.selectionMode);
		/*setState({
		  selectedRowKeys: e.selectedRowKeys,

		  //selectedEmployeeNames: this.getEmployeeNames(selectedData)
		});*/
	}
	

	/*useEffect(() => {
		dispatch(SelectUrn('dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLmktWmdsQkg4UnRXRWI1Zi1CWnZnQ0E/dmVyc2lvbj0x'));
	},[])*/

	
	return (
		<>
			{/*<Bar />*/}
			
		<TreeList
        dataSource={proyects.DataMetrado}
        keyExpr="CodMedicion"
        parentIdExpr="PhantomParentId"
        showBorders={true}
        focusedRowEnabled={true}
        defaultExpandedRowKeys={[1, 2, 3, 5]}
		columnAutoWidth={false}
		rootValue={-1}
		//selectedRowKeys={selectedRowKeys}

		//onSelectionChanged={() => {alert('hola')}}
		//onRowClick={() => {alert(this)}}
		onFocusedRowChanged={onSelectionChanged}
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
			width={'35%'}
		  	dataField="Descripcion" />
        <Column
		  width={'10%'}
          dataField="Cantidad"
		  alignment={'right'}		          
        />
        <Column 
		  width={'10%'}
		dataField="Longitud" 
		caption="Longitud"
		alignment={'right'}
		/>
		
        <Column 
		  width={'10%'}
		dataField= "Ancho" 
		alignment={'right'}						
		/>
		
        <Column 
		  width={'10%'}
		dataField= "Alto" 
		alignment={'right'}						
		/>
		
        <Column 
		  width={'10%'}
		dataField= "Total" 
		alignment={'right'}							
		/>	

        <Column 
		  width={'20%'}
		dataField= "Detalle" />		
		alignment={'center'}
        {/*<Column 
		  width={'10%'}
		dataField= "Vinculo" />		*/}

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
			
			
			
		{/*}	<Table
				striped
				bordered
				hover
				size="sm"
				className="mt-0 bg-white"
			>
				<thead>
					<tr>
						<th>Descripcion</th>
						<th>Cantidad</th>
						<th>Longitud</th>
						<th>Ancho</th>
						<th>Alto</th>
						<th>Total</th>
						<th>Detalle</th>
						<th>Vinculo</th>
						<th>UniqueId</th>
					</tr>
				</thead>
				<tbody>
					<>
						{
							drawerItems1(0)
						}
					</>
				</tbody>
					</Table>*/}

		</>
	)
}

export default Metrados
