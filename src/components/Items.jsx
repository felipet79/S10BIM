//import React from 'react'
import { Card, Form, Table } from "react-bootstrap";
import { Col, Nav } from "react-bootstrap";
//import Bar from "./Charts/Bar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery';
import { cleanDataChart22, cleanDataChartAPU, selectAPUS, selectAsociados, selectCalculo, selectCalculoDet, selectEstructura, selectMETRADOS } from "../actions/proyects.actions";
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
import { Resizable } from "re-resizable";
import { Collapse } from "@material-ui/core";
import { relative } from "path";

import Apus from "../components/Apus";
import Asociados from "../components/Asociados";
import Estructura from "../components/Estructura";
import Calculo from "../components/Calculo";
import Metrados from "../components/Metrados";
import Tree from "./TreeAll";



const allowedPageSizes = [5, 10, 15, 20, 50, 100, 500];






const Items = ({ levelStart = 1, idProject }) => {



	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)
	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);




	const [width, setWidth] = useState(700);
	const [height, setHeight] = useState(window.innerHeight - 580 - 18);
	const [open, setOpen] = useState(true);

	const [levelPC, setLevelPC] = useState(1);
	const [level, setLevel] = useState(2);



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

		//setAllLevels(orderedLevels);
		//console.log('datos de items')
		//console.log(orderedLevels)
		if (!tree) return;
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
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
		/*
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
		*/


	}

	function ObtenerSuma(Item) {
		var Sumatoria = 0.00;
		
		//if (proyects.DataPc && Item.Orden!=""){
			console.log(proyects.DataPc + ' ' + Item.Orden);
			const filtro = proyects.DataPc.filter((filtro1) => filtro1.PhantomParentId === Item.Orden);
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

		//}
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



	const Seleccion_Item = (Item) => {
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

		//dispatch(cleanDataChartAPU());
		//dispatch(cleanDataChartAPU());



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


	}

	function onSelectionChanged(e) {
		//console.log(e);

		//alert(e.row.data.Descripcion);
		const Item = e.row.data;
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

		//const selectedData = e.component.getSelectedRowsData(state.selectionMode);
		/*setState({
		  selectedRowKeys: e.selectedRowKeys,

		  //selectedEmployeeNames: this.getEmployeeNames(selectedData)
		});*/
	}
	const { selectedRowKeys, recursive, selectionMode, selectedEmployeeNames } = state;
	return (
		<>
			{/*<h3 className="text-center mb-3">Presupuesto</h3>*/}
			{/*<Bar />*/}



			{/* <div style={{ overflow: 'scroll', marginTop: '0px', height: '100%' }}> */}

			<div id="ContenedorTotal" className="d-flex flex-wrap justify-content-between overflow-hidden h-100" style={{ height: height - 20 }}>
				<Resizable
					className="tree-fixed p-0 d-flex justify-content-between"
					size={{ width: width, height: height }}
					//maxHeight="60vh"
					maxWidth={open ? 1200 : 0}
					//minHeight="67.5vh"

					minWidth="20px"
					minHeight="320px"
					onResizeStop={(e, direction, ref, d) => {

						setWidth(width + d.width);
						setHeight(height + d.height);


						//alert('');
						//$("#forgeViewer").animate({ height: height + d.height }, 100);

						//$("#DetalleItem").animate({ height: window.innerHeight - (height + d.height) - 130 }, 100);

						//alert('');

						/*setTimeout(() => {
							RefrescarV();
						}, 500);*/
					}}
					onResize={(e, direction, ref, d) => {
						console.log('resizando');
						//$("#barra2").marginTop=width;
						$("#barra2").animate({ marginTop: height + d.height }, 0);
						$("#ContenedorTotal").animate({ height: height + d.height }, 0);
						$("#Card1").animate({ height: height + d.height }, 0);
						$("#ContDet").animate({ top: height + d.height+10 }, 0);
						//$("#barra2").css("draggable:true")
					}}
				//onResizeStop={()=>{}}

				>
					<Collapse in={open}>




						<Card id="Card1" style={{ height: height - 20, overflow: 'scroll' }}>
							<Card.Header>Hoja del Presupuesto</Card.Header>
							<Card.Body>

								<Form>


									<TreeList


										dataSource={proyects.DataPc}
										keyExpr="Orden"
										parentIdExpr="PhantomParentId"
										showBorders={true}
										focusedRowEnabled={true}
										defaultExpandedRowKeys={[1, 2, 3, 5]}
										columnAutoWidth={false}
										hasItemsExpr="Has_Items"
										selectedRowKeys={selectedRowKeys}

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
											visible={true}
										/>
										<Scrolling
											mode="standard"
										/>
										<Column
											width={'18%'}
											dataField="Orden" />
										<Column
											width={'37%'}
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
											dataField="Metrado" />

										<Column
											alignment={'right'}
											width={'13%'}
											dataField="Precio1" />
										<Column
											alignment={'right'}
											width={'15%'}
											dataField="Total" />
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
					<div
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
								setOpen(!open);
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
							style={{ /*cursor: "pointer",*/ marginLeft: '25%', width: '8%', height: '10px' }}
							className="bg-primary d-flex justify-contentcenter align-items-center"
							onClick={() => {
								//setOpen(!open);
							}}
							//aria-controls="example-collapse-text"
							aria-expanded={open}
						>
							{open ? (
								<>
									<ion-icon name="caret-down-outline" style={{ marginLeft: '40%' }}></ion-icon>
									{/* <ion-icon name="caret-up-outline" style={{marginLeft:'1px'}}></ion-icon> */}
								</>
							) : (
								<ion-icon name="caret-up-outline"></ion-icon>
							)}
						</div>


					</div>


				</Resizable>

			</div>




			<div id="ContDet" className="" style={{ position: 'absolute', top: height+10, height: window.innerHeight-height, width:'98%', zIndex: '999999'/*, background: 'red'*/ }}>

				<Collapse in={open}>
					<div className="p-2 h-100 w-100">
						<Nav
							variant="tabs"
							defaultActiveKey="/home"
							className="eyelashes"
							
							/*style={{background:'#5ca7d8'}}*/

						>
							<Nav.Item
								onClick={() => {
									setLevel(2);
									setLevelPC(1);
								}}
							>
								<Nav.Link href="#" active={level === 2}>
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


						<div id="DetalleItem" className="mt-0 p-2 h-20 overflow-scroll" style={{ height: '200px', overflow: 'scroll' }}>
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
