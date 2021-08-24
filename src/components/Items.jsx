//import React from 'react'
import { Card, Form, Table } from "react-bootstrap";
import { Col, Nav } from "react-bootstrap";
//import Bar from "./Charts/Bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery';
import { cleanDataChart, cleanDataChart22, cleanDataChartAPU, selectAPUS, selectAsociados, selectCalculo, selectCalculoDet, selectEstructura, selectItems, selectMETRADOS } from "../actions/proyects.actions";
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
import { Resizable } from "re-resizable";
import { Collapse } from "@material-ui/core";
import { relative } from "path";

import Apus from "../components/Apus";
import Asociados from "../components/Asociados";
import Estructura from "../components/Estructura";
import Calculo from "../components/Calculo";
import Metrados from "../components/Metrados";
import Tree from "./TreeAll";
//import { ViewScreen1 } from "../views/ViewScreen1";
import { ViewerSc, RefrescarV } from "../views/ViewerSc";
import { ContextMenu, DropDownButton } from "devextreme-react";
import notify from 'devextreme/ui/notify';



const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];


const menuModo = [
	{ id: 1, name: 'Solo hoja', icon: 'doc' },
	{ id: 1, name: 'Detalle', icon: 'menu' },
	{ id: 4, name: 'Detalle y modelo', icon: 'event' },
	{ id: 2, name: 'Modelo', icon: 'image' },
  ];




const Items = ({ widthItems, levelStart = 1, idProject }) => {



	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)
	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);



	const [modo, setModo] = useState('Detalle y Modelo');

	const [minimop, setMinimoP] = useState(600);
	const [width, setWidth] = useState(600);
	const [width1, setWidth1] = useState(500);
	const [height, setHeight] = useState(window.innerHeight - 580 - 18);
	
	
	const [open, setOpen] = useState(true);
	const [open1, setOpen1] = useState(true);
	const [open2, setOpen2] = useState(true);

	const [levelPC, setLevelPC] = useState(1);
	const [level, setLevel] = useState(2);


	const [ultimoAPU, setUltimoAPU] = useState('');
	const [ultimoMETRADO, setUltimoMETRADO] = useState('');
	const [ultimoESTRUCTURA, setUltimoESTRUCTURA] = useState('');
	const [ultimoASOCIADOS, setUltimoASCOCIADOS] = useState('');	
	const [ultimoCALCULO, setUltimoCALCULO] = useState('');

	const [itemSeleccionado, setItemSeleccionado] = useState('');


	const emptySelectedText = 'Nobody has been selected';

	const [state, setState] = useState(
		{
			selectedRowKeys: [],
			recursive: false,
			selectedEmployeeNames: emptySelectedText,
			selectionMode: 'all'
		}
	)
	/*const [ allLevels1, setAllLevels1 ] = useState(null)
	const [ itemSelected1, setItemSelected1 ] = useState('')
	const [ lastLevel1, setLastLevel1 ] = useState(0);*/


	const [loading, setLoading] = useState(true);

	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	//const subproyects = useSelector((state) => state.subproyects);


	const orderTree = (tree) => {

		if (!tree) return;
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];

			//if (item.Orden === "") item.Orden = null;
			/*	if (item.PhantomParentId === null && item.Orden==="") {
					item.Orden = "00";
					//item.PhantomParentId = null;
				}
				if (item.PhantomParentId === "") {
					item.PhantomParentId = "00";
					//item.PhantomParentId = null;
				}
				
				if (item.Orden === "") item.Orden = i+'01';
				//else item.Metrado = roundN(item.Metrado, 2);*/


			if (item.Metrado === null) item.Metrado = null;
			else item.Metrado = roundN(item.Metrado, 2);

			if (item.Precio1 === null) item.Precio1 = null;
			else item.Precio1 = roundN(item.Precio1, 2);

			if (item.Total === null) item.Total = 0.00;
			else item.Total = roundN(item.Metrado * item.Precio1, 2);

			//item.Metrado=dosDecimales(item.Metrado);

			//orderedLevels[0].push({...item, open: false})
		}



		//const Item=e.row.data;

		//alert(codP + "-" + codSub + "-" + codItem);


		//if (Item.UniqueId===""){
		//proyects.DataMetrado
		//const filtro = proyects.DataMetrado.filter( (filtro1) => filtro1.PhantomParentId === Item.CodMedicion );

		const filtro = proyects.DataPc.filter((filtro1) => filtro1.PhantomParentId === null);
		var Sumatoria = 0.00;
		for (let i = 0; i < filtro.length; i++) {

			if (filtro[i].Metrado !== null) {
				Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
			} else {
				var TotalAux = ObtenerSuma(filtro[i]);
				Sumatoria = Sumatoria + TotalAux;
				filtro[i].Total = formatNumber(TotalAux);
			}

		}



	}

	function ObtenerSuma(Item) {
		var Sumatoria = 0.00;

		if (proyects.DataPc && Item.Orden != "") {
			//console.log(proyects.DataPc + ' ' + Item.Orden);
			const filtro = proyects.DataPc.filter((filtro1) => filtro1.PhantomParentId === Item.OrdenJerarquico);
			for (let i = 0; i < filtro.length; i++) {
				if (filtro[i].Metrado !== null) {
					Sumatoria = Sumatoria + parseFloat(filtro[i].Total);
				} else {
					//buscar los datos de los hijos
					var TotalAux = ObtenerSuma(filtro[i]);
					Sumatoria = Sumatoria + TotalAux;
					filtro[i].Total = formatNumber(TotalAux);
				}
			}

		}
		return parseFloat(Sumatoria);
	}

	function formatNumber(num) {
		if (!num || num == 'NaN') return '-';
		if (num == 'Infinity') return '&#x221e;';
		var num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num))
			num = "0";
		var sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		var cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10)
			cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + num + ',' + cents);
	}

	function roundN(num, n) {
		return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
	}

	/*function financial(x) {
		return Number.parseFloat(x).toFixed(2);
	  }
	function dosDecimales(n) {
		let t=n.toString();
		let regex=/(\d*.\d{0,2})/;
		return t.match(regex)[0];
	  }*/


	useEffect(() => {
		//console.log('datos de items')
		//console.log(proyects.DataPc)

		orderTree(proyects.DataPc);
		//alert('ejecutó la primera carga');
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [levelStart, proyects.DataPc])



	const orderTree2 = (tree) => {

		if (!tree) return;
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];


			//if (item.Orden === "") item.Orden = null;
			/*	if (item.PhantomParentId === null && item.Orden==="") {
					item.Orden = "00";
					//item.PhantomParentId = null;
				}
				if (item.PhantomParentId === "") {
					item.PhantomParentId = "00";
					//item.PhantomParentId = null;
				}
	
				if (item.Orden === "") item.Orden = i+'01';*/

			//item.Orden = i+item.Orden;


			//else item.Metrado = roundN(item.Metrado, 2);


			if (item.Metrado === null) item.Metrado = null;
			else item.Metrado = roundN(item.Metrado, 2);

			if (item.Precio1 === null) item.Precio1 = null;
			else item.Precio1 = roundN(item.Precio1, 2);

			if (item.Total === null) item.Total = 0.00;
			else item.Total = roundN(item.Metrado * item.Precio1, 2);

			//item.Metrado=dosDecimales(item.Metrado);

			//orderedLevels[0].push({...item, open: false})
		}
	}

	useEffect(() => {
		if (proyects.treeSubControl)
			if (proyects.treeSubControl.length !== 0) {
				//llamar a metrados de tosod los subs
				//console.log('DATOS DE PROYECTOS');
				//console.log(proyects.DatosPresupuesto);

				/*for (let i=0;i<proyects.treeSubControl.length;i++){
					if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0]){
	
						//alert('se jecuta' + proyects.DatosPresupuesto[0].CodPresupuesto + ' - ' + proyects.treeSubControl[i].CodSubpresupuesto);
						//alert(proyects.treeSubControl[i].CodSubpresupuesto);
						dispatch(selectItems(proyects.DatosPresupuesto[0].CodPresupuesto, proyects.treeSubControl[i].CodSubpresupuesto, ''));
						
					}
				}*/
				//alert(proyects.DatosPresupuesto[0].CodPresupuesto);
				if (proyects.DatosPresupuesto && proyects.DatosPresupuesto[0])
					dispatch(selectItems(proyects.DatosPresupuesto[0].CodPresupuesto, '', ''));

				orderTree2(proyects.DataPc);
				//orderTree(proyects.DataPc);
				dispatch(cleanDataChart());

			}
	}, [proyects.treeSubControl])



	/*useEffect(() => {
		setWidth(width);
	}, [widthItems])*/


	/*const Seleccion_Item = (Item) => {
		//const codP= Item.ERPCode.substring(1, 7);
		//const codSub= Item.ERPCode.substring(8, 10);
		//alert(Item);
		const codP = Item.CodPresupuesto;
		const codSub = Item.CodSubpresupuesto;
		const codItem = Item.Item;
		//alert(codP + "-" + codSub + "-" + codItem);

		dispatch(selectAPUS(codP, codSub, codItem, ''));

		dispatch(selectAsociados(codP, codSub, codItem, ''));

		dispatch(selectEstructura(codP, codSub, codItem, ''));

		dispatch(selectCalculo(codP, codSub, codItem, ''));

		dispatch(selectCalculoDet(codP, codSub, codItem, ''));


		dispatch(selectMETRADOS(codP, codSub, codItem, ''));

		dispatch(cleanDataChart22());
		//dispatch(cleanDataChartAPU());



	}*/



	/*const drawerItems1 = (nivelact) => {

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
			)})
		return (
			allLevels && allLevels[nivelact] ?
				allLevels[nivelact].map(filter => {
					return (<tr onClick={() => Seleccion_Item(filter)}>
						<td>{filter.Orden}</td>
						<td>{filter.Descripcion}</td>
						<td>{filter.Unidad}</td>
						<td>{filter.Metrado}</td>
						<td>{filter.Precio1}</td>
						<td>{filter.Metrado * filter.Precio1}</td>

					</tr>
					)
				}) : ''
		)


	}*/

	function onSelectionChanged(e) {
		//console.log(e);

		//alert(e.row.data.Descripcion);
		
		const Item = e.row.data;
		const codP = Item.CodPresupuesto;
		const codSub = Item.CodSubpresupuesto;
		const codItem = Item.Item;

		setItemSeleccionado(codP+codSub+codItem);
		//alert(codP + "-" + codSub + "-" + codItem);
		if (levelPC === 1){
			if (ultimoAPU!==codP+codSub+codItem){
				dispatch(selectAPUS(codP, codSub, codItem, ''));
			}
			setUltimoAPU(codP+codSub+codItem);
		}
		
		if (levelPC === 2){
			if (ultimoMETRADO!==codP+codSub+codItem){
				dispatch(selectMETRADOS(codP, codSub, codItem, ''));
				dispatch(cleanDataChart22());	
			}	
			setUltimoMETRADO(codP+codSub+codItem);
		}

		if (levelPC === 3){

			if (ultimoASOCIADOS!==codP+codSub+codItem){
				dispatch(selectAsociados(codP, codSub, codItem, ''));
			}
			setUltimoASCOCIADOS(codP+codSub+codItem);
			
		}

		if (levelPC === 4){
			if (ultimoESTRUCTURA!==codP+codSub+codItem){
				dispatch(selectEstructura(codP, codSub, codItem, ''));	
			}
			setUltimoESTRUCTURA(codP+codSub+codItem);
		
		}

		if (levelPC === 5){
			if (ultimoCALCULO!==codP+codSub+codItem){
				dispatch(selectCalculo(codP, codSub, codItem, ''));	
				dispatch(selectCalculoDet(codP, codSub, codItem, ''));				
			}
			setUltimoCALCULO(codP+codSub+codItem);

		}
		

		

		





		//const selectedData = e.component.getSelectedRowsData(state.selectionMode);
		/*setState({
		  selectedRowKeys: e.selectedRowKeys,

		  //selectedEmployeeNames: this.getEmployeeNames(selectedData)
		});*/
	}
	//console.log('Renderizando Items');

	

	const priceColumn_customizeText = (e) => {
		return e ? (<p> {e.value} </p>): '';
	};



	  const ItemsM = [
		{
		  text: 'Nuevo',
		  items: [
			{ text: 'Item' },
			{ text: 'Capitulo' }]
		},
		{ text: 'Generar Metrado' },
		{ text: 'Actualizar todos los metrados' },
	  ];	  

	const { selectedRowKeys, recursive, selectionMode, selectedEmployeeNames } = state;
	return (
		<>
			{/*<h3 className="text-center mb-3">Presupuesto</h3>*/}
			{/*<Bar />*/}



			{/* <div style={{ overflow: 'scroll', marginTop: '0px', height: '100%' }}> */}

			<div id="ContenedorTotal1" className="d-flex flex-wrap justify-content-between overflow-hidden h-100" style={{ height: height - 20, fontSize:'0.8rem !important' }}>
				<Resizable
					className="tree-fixed p-0 d-flex justify-content-between"
					size={{ width: width, height: height }}
					//maxHeight="60vh"
					maxWidth={open ? 1200 : 20}
					//minHeight="67.5vh"
					maxHeight={window.innerHeight - 200}
					minWidth={minimop}
					minHeight="320px"
					onResizeStop={(e, direction, ref, d) => {

						setWidth(width + d.width);
						
						if (open1)
							setHeight(height + d.height);

							$("#barra1").animate({ height: height + d.height }, 0);
						//alert('');
						
						//$("#ab").animate({ height: height + d.height -20 }, 10);


						//$("#DetalleItem").animate({ height: window.innerHeight - (height + d.height) - 130 }, 100);

						//$("#ab").animate({ height: height + d.height -20}, 100);
						//$("#Conten1").animate({ height: height + d.height -20 }, 100);
						//alert('');
						/*if ($("#FormLista").innerWidth()<=600)
							document.getElementById("FormLista").style.width = '600px';*/
						setTimeout(() => {
							RefrescarV();
						}, 150);
					}}
					onResize={(e, direction, ref, d) => {
						//console.log('resizando');
						//$("#barra2").marginTop=width;
						if (open1){
							$("#barra1").animate({ height: height + d.height }, 0);
							$("#barra2").animate({ marginTop: height + d.height }, 0);
							$("#ContenedorTotal").animate({ height: height + d.height }, 0);
							$("#Card1").animate({ height: height + d.height }, 0);
							$("#ContDet").animate({ top: height + d.height + 10 }, 0);
							$("#ContDet2").animate({ top: height + d.height + 10 }, 0);
							$("#ab").animate({ height: height + d.height -20}, 0);
							$("#forgeViewer").animate({ height: '100%'}, 100);
						}
						
						//console.log($("#FormLista").innerWidth());
						
						//$("#Conten1").animate({ height: height + d.height -20}, 0);
						//$("#ab").animate({ height: height + d.height -20}, 0);
						//$("#forgeViewer").animate({ height: '100%'}, 100);
						//$("#ab").animate({ width: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80 }, 0);
						//$("#ab").animate({ left: width + 10 }, 0);
						
						/*setTimeout(() => {
							RefrescarV();
						}, 150);*/

						//$("#barra2").css("draggable:true")
					}}
				//onResizeStop={()=>{}}

				>
					<Collapse in={open}>




						<Card id="Card1" style={{ height: height - 20, overflow: 'scroll' }}>

							<Card.Header>Hoja del Presupuesto

							
							<div className="dx-field-value" style={{position:'relative', right:'0px' , top:'0px', width:'180px'}}>
							<DropDownButton
								splitButton={true}
								width='180px'
								useSelectMode={false}
								text={modo}
								icon="dist/img/manager.png"
								items={menuModo}
								displayExpr="name"
								keyExpr="id"
								//onButtonClick={this.onButtonClick}
								onItemClick={(e)=>{
									
									setModo(e.itemData.name);
									notify(e.itemData.name || e.itemData, 'success', 300);

									if (e.itemData.name==='Solo hoja')
									{
										setOpen1(false);
										setOpen2(false);
										setHeight(window.innerHeight-60);
										$("#barra1").animate({ height: height  }, 0);
									}

									if (e.itemData.name==='Detalle')
									{
										setOpen1(true);
										setOpen2(false);
										setHeight(window.innerHeight-500);
										$("#barra1").animate({ height: window.innerHeight-500  }, 0);										
									}

									if (e.itemData.name==='Detalle y modelo')
									{
										setOpen1(true);
										setOpen2(true);
										setHeight(window.innerHeight-500);
										$("#barra1").animate({ height: window.innerHeight-500  }, 0);
									}

									if (e.itemData.name==='Modelo')
									{
										setOpen1(false);
										setOpen2(true);
										setHeight(window.innerHeight-60);
										$("#barra1").animate({ height: height  }, 0);
									}
									
									//if (open1){
										
									//}else{
										//
	
									//}
									setTimeout(() => {
										RefrescarV();
									}, 120);				

									//alert(e.itemData.name);
								}}
							/>
							</div>

							</Card.Header>
							<Card.Body>

								<Form id="FormLista">


									<TreeList


										dataSource={proyects.DataPc}
										keyExpr="OrdenJerarquico"
										parentIdExpr="PhantomParentId"
										showBorders={true}
										focusedRowEnabled={true}
										//defaultExpandedRowKeys={[1, 2, 3, 5]}
										columnAutoWidth={false}
										hasItemsExpr="Has_Items"
										selectedRowKeys={selectedRowKeys}
										orderTree={"CodSubpresupuesto"}

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
											visible={true}
										/>
										<Scrolling
											mode="standard"
										/>

										<Column
											width={'6%'}
											dataField="OrdenJerarquico"
											defaultSortOrder="asc"
											caption="OrdenJ"
											visible={false}
										/>
										<Column
											width={'15%'}
											dataField="Orden"
											caption="Orden"

										/>

										<Column
											width={'34%'}
											dataField="Descripcion"
											caption="Descripcion"
										/>
										<Column
											width={'7%'}
											dataField="Unidad"
											caption="Un"
										/>

										<Column
											alignment={'right'}
											width={'12%'}
											dataField="Metrado" 
											
											/>


										<Column
											alignment={'right'}
											width={'13%'}
											dataField="Precio1" 
											caption="Precio"
											/>
											
										<Column
											
											alignment={'right'}
											width={'18%'}
											dataField="Total" 
											
											//style={{fontSize:'0.5rem|important'}}
											
											//customizeText={priceColumn_customizeText}
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



								</Form>


							</Card.Body>
						</Card>



					</Collapse>
							<ContextMenu
							dataSource={ItemsM}
							width={200}
							target="#Card1"
							//onItemClick={itemClick} 
							/>

					<div
						id="barra1"
						className="bara-cerrar d-flex align-items-center"
						style={{
							width: 12,
							height: "100%",
							background: "#dee2e6",
							marginLeft: 5,
						}}
					>
						<div
							style={{ cursor: "pointer" }}
							className="h-25 w-100 bg-primary d-flex justify-contentcenter align-items-center"
							onClick={() => {
								if (open){
									setMinimoP(0);
									setWidth(20);
								}else{
									setWidth(600);
									setMinimoP(600);
								}

								setOpen(!open);

								//alert('');
								//$("#ab").animate({ with: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80 }, 100);
								
								setTimeout(() => {
									RefrescarV();
								}, 120);


								//$("#ab").animate({ height: height -30 }, 100);
							}}
							aria-controls="example-collapse-text"
							aria-expanded={open}
						>
							{open ? (
								<ion-icon name="caret-back-outline"></ion-icon>
							) : (
								<ion-icon name="caret-forward-outline"></ion-icon>
							)}
						</div>
					</div>




					<div
						id="barra2" className="bara-cerrar d-flex align-items-center"
						style={{
							/*cursor: 'row-resize',*/
							position: 'absolute',
							//width: '98%',
							width: '100vw',
							height: '12px',
							background: "#dee2e6",
							marginLeft: 5,
							marginTop: height - 12,

						}}
					>
						<div
							style={{ cursor: "pointer", marginLeft: $("#ContDet2").innerWidth()/2-70  , width: '140px', height: '12px' }}
							className="bg-primary d-flex justify-contentcenter align-items-center"
							onClick={() => {
								setOpen1(!open1);
								if (open1){
									setHeight(window.innerHeight-60);
								}else{
									setHeight(window.innerHeight-500);
									$("#barra1").animate({ height: window.innerHeight-500  }, 0);
								}
								
								setTimeout(() => {
									RefrescarV();
								}, 120);	
								
								
							}}
							//aria-controls="example-collapse-text"
							aria-expanded={open}
						>
							{open1 ? (
								<>
									<ion-icon name="caret-down-outline" style={{ marginLeft: '45%' }}></ion-icon>
									{/* <ion-icon name="caret-up-outline" style={{marginLeft:'1px'}}></ion-icon> */}
								</>
							) : (
								<ion-icon name="caret-up-outline" style={{ marginLeft: '45%' }}></ion-icon>
							)}
						</div>



					</div>



				</Resizable>



			</div>

			<Resizable
					id="Conten1"
					//style={{ position: 'absolute', left: width + 10, top: '5px', height: height - 30, width: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80 }}
					style={{ position: 'absolute', left: width + 10, top: '5px' }}
					size={{ width:  window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80, height: height-20 }}
					//maxWidth={open ? 1200 : 0}
					maxHeight={window.innerHeight}
					enable={{ top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
					//minWidth="20px"
					minHeight="320px"
					


					onResizeStop={(e, direction, ref, d) => {

						//setWidth(width + d.width);
						if (open1)
							setHeight(height + d.height);
							//$("#barra1").animate({ height: height  }, 0);

						//alert('');
						//$("#ab").animate({ height: height + d.height -30 }, 10);
						//$("#DetalleItem").animate({ height: window.innerHeight - (height + d.height) - 130 }, 100);

						//$("#ab").animate({ height: height + d.height -20 }, 100);
						//$("#Conten1").animate({ height: height + d.height -20 }, 100);
						//alert('');

						setTimeout(() => {
							RefrescarV();
						}, 150);
					}}
					onResize={(e, direction, ref, d) => {
						//console.log('resizando');
						//$("#barra2").marginTop=width;
						if (open1){
							$("#barra1").animate({ height: height + d.height }, 0);
							$("#barra2").animate({ marginTop: height + d.height }, 0);
							$("#ContenedorTotal").animate({ height: height + d.height }, 0);						
							$("#Card1").animate({ height: height + d.height }, 0);
							$("#ContDet").animate({ top: height + d.height + 15 }, 0);
							
							

							$("#ContDet2").animate({ top: height + d.height + 10 }, 0);
							$("#ab").animate({ height: height + d.height -20}, 0);
							$("#forgeViewer").animate({ height: '100%'}, 100);


	
						}

						//$("#Conten1").animate({ height: height + d.height - 20 }, 0);
						
						//$("#ab").animate({ height: height + d.height - 20 }, 0);
						//$("#forgeViewer").animate({ height: '100%'}, 100);
						//$("#ab").animate({ width: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80 }, 0);
						//$("#ab").animate({ left: width + 10 }, 0);
						
						/*setTimeout(() => {
							RefrescarV();
						}, 150);*/

						//$("#barra2").css("draggable:true")
					}}

					/*className="tree-fixed p-0 d-flex justify-content-between"
					size={{ width: width, height: height }}
					maxWidth={open ? 600 : 0}
					maxHeight={window.innerHeight - 200}
					minWidth="20px"
					minHeight="320px"
					onResizeStop={(e, direction, ref, d) => {

						setWidth(width + d.width);
						setHeight(height + d.height);


						$("#ab").animate({ height: height + d.height - 30 }, 100);
						//alert('');

						setTimeout(() => {
							RefrescarV();
						}, 150);
					}}
					onResize={(e, direction, ref, d) => {
					
						/*$("#barra2").animate({ marginTop: height + d.height }, 0);
						$("#ContenedorTotal").animate({ height: height + d.height }, 0);
						$("#Card1").animate({ height: height + d.height }, 0);
						$("#ContDet").animate({ top: height + d.height + 10 }, 0);

						$("#ab").animate({ height: height + d.height - 30 }, 0);
						
					}}*/
				//onResizeStop={()=>{}}

				>
			
			
			
			
			
			{open2 ? <div id="ab" /*style={{width:'100%'}}*/ style={{ left: width + 10, top: '5px', height: height - 30, width: window.innerWidth - width - $("#ContenedorSide").innerWidth() - $("#Conte1").innerWidth() - 80 }}>
				<ViewerSc />
			</div>:''}
			
			
			</Resizable>



			<div id="ContDet2" className="" style={{ position: 'absolute', top: height + 10, height: window.innerHeight - height - 60, width: '98%'/*, zIndex: '9', background: 'red'*/ }}>

				<Collapse in={open1} style={{ height: '100%' }}>
					<div className="p-2 w-100" style={{ height: '100%' }}>
						<Nav
							variant="tabs"
							defaultActiveKey="/home"
							className="eyelashes"

							/*style={{background:'#5ca7d8'}}*/
							style={{ height: '100%' }}
						>
							<Nav.Item
								onClick={() => {
									setLevel(2);
									setLevelPC(1);
								}}
							>
								<Nav.Link href="#" 
								active={level === 2}
								onClick={()=>{
								if (ultimoASOCIADOS!==itemSeleccionado){
									dispatch(selectAPUS(itemSeleccionado.substring(0,7), itemSeleccionado.substring(7,10), itemSeleccionado.substring(10,25), ''));	
									setUltimoAPU(itemSeleccionado);
									}
																	
								}}	
								>
									APU PARTIDA
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
									setLevel(1);
									setLevelPC(2);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-1"
									active={level === 1}
									onClick={()=>{
									if (ultimoASOCIADOS!==itemSeleccionado){
										dispatch(selectMETRADOS(itemSeleccionado.substring(0,7), itemSeleccionado.substring(7,10), itemSeleccionado.substring(10,25), ''));	
										dispatch(cleanDataChart22());	
										setUltimoMETRADO(itemSeleccionado);
										}
									}}										
								>
									METRADO
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
									setLevel(3);
									setLevelPC(3);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-2"
									active={level === 3}
									onClick={()=>{
									if (ultimoASOCIADOS!==itemSeleccionado){
										dispatch(selectAsociados(itemSeleccionado.substring(0,7), itemSeleccionado.substring(7,10), itemSeleccionado.substring(10,25), ''));	
										setUltimoASCOCIADOS(itemSeleccionado);
										}
																		
									}}									
								>
									ELEMENTOS ASOCIADOS
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
									setLevel(4);
									setLevelPC(4);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-3"
									active={level === 4}
									onClick={() => {
										if (ultimoESTRUCTURA !== itemSeleccionado) {
											dispatch(selectEstructura(itemSeleccionado.substring(0, 7), itemSeleccionado.substring(7, 10), itemSeleccionado.substring(10, 25), ''));
											setUltimoESTRUCTURA(itemSeleccionado);
										}
										///////////////////////////////////////////////////////

									}}

								>
									ESTRUCTURA DE METRADO
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
									setLevel(5);
									setLevelPC(5);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-4"
									active={level === 5}
									onClick={()=>{
										if (ultimoCALCULO!==itemSeleccionado){
											//alert(itemSeleccionado.substring(0,7));
											//alert(itemSeleccionado.substring(7,10));
											//alert(itemSeleccionado.substring(10,25));
											dispatch(selectCalculo(itemSeleccionado.substring(0,7), itemSeleccionado.substring(7,10), itemSeleccionado.substring(10,25), ''));	
											dispatch(selectCalculoDet(itemSeleccionado.substring(0,7), itemSeleccionado.substring(7,10), itemSeleccionado.substring(10,25), ''));	
											setUltimoCALCULO(itemSeleccionado);
										}
										///////////////////////////////////////////////////////
									
									}}
								>
									DETALLE DE CALCULO
								</Nav.Link>
							</Nav.Item>

							{proyects.idCard && (
								<Nav.Item
									onClick={() => {
										setLevelPC(1);
										setLevel(null);
									}}
								>
									<Nav.Link
										href="#"
										eventKey="link-1"
										active={levelPC === 4}
									>
										PC
									</Nav.Link>
								</Nav.Item>
							)}
							{/* <button style={{ position: 'absolute', right: '35px', marginTop: '7px' }} /*onClick={reducir}>
								<i id="IcnBt" className="fas fa-chevron-down" ></i>
							</button> */}
						</Nav>


						<div id="DetalleItem" className="mt-0 p-2 overflow-scroll" style={{ position: 'absolute', height: '92%', overflow: 'scroll' }}>
							{levelPC === 1 ? (
								<Apus
									levelStart={1}
									idProject={proyects.idCard}
								/>
							) : (
								levelPC === 3 ? (
									<Asociados
										levelStart={1}
										idProject={proyects.idCard}
									/>
								) : (
									levelPC === 4 ? (
										<Estructura
											levelStart={1}
											idProject={proyects.idCard}
										/>
									) : (
										levelPC === 5 ? (
											<Calculo
												levelStart={1}
												idProject={proyects.idCard}
											/>
										) : (
											levelPC === 2 ? (
												<Metrados
													levelStart={1}
													idProject={proyects.idCard}
												/>
											) : (
												<Tree levelStart={level} nodeSelected={""} />

											))))
							)}


						</div>

						{/* <div className="mt-2 p-2 h-100 overflow-scroll">
	{levelPC ? (
		<TreeCP
			levelStart={1}
			idProject={proyects.idCard}
		/>
	) : (
		<Tree levelStart={level} nodeSelected={codProject} />
	)}
</div> */}
					</div>
				</Collapse>

			</div>





			{/*}	<Table
				striped
				bordered
				hover
				size="sm"
				className="mt-3 bg-white"
			>
				<thead>
					<tr>
						<th>Id</th>
						<th>Descripcion</th>
						<th>Unidad</th>
						<th>Metrado</th>
						<th>Precio</th>
						<th>Parcial</th>
					</tr>
				</thead>
				<tbody>
					<>
						{
							drawerItems1(1)
						}
					</>
					<>
					{
							drawerItems1(2)
					}												
					</>
					<>
					{
							drawerItems1(3)
					}												
					</>
					<>
					{
							drawerItems1(4)
					}												
					</>
					<>
					{
							drawerItems1(5)
					}												
					</>
									
				</tbody>
				</Table>*/}

		</>
	)
}

export default Items
