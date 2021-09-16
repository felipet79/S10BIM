//import { Modal, Button, ListGroup } from "react-bootstrap";
import { Modal, Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { selectCompany } from '../actions/auth.action';
import { useHistory } from 'react-router-dom';
import Button1 from 'devextreme-react/button';
import $ from 'jquery';
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
import { useEffect, useState } from 'react';
import { DataGrid, Template, TextBox } from 'devextreme-react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from 'react-router-dom';
import { agregaItem, limpiaUbicaciones, selectPARTIDAS, selectUBICACIONES } from '../actions/proyects.actions';
import CellRend from './Cellrend';
import { Grouping, GroupPanel, SearchPanel } from 'devextreme-react/data-grid';


const BuscaPartida = ({ tipo = '', presupuestoN, show, setShow, setItemAgregar, itemAgregar }) => {
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const auth = useSelector(state => state.auth);
	const history = useHistory()
	const proyects = useSelector((state) => state.proyects);
	//dispatch(selectAPUS(codP, codSub, codItem, ''));

	const [ubicacionSel, setUbicacionSel] = useState('');

	const [pagina, setPagina] = useState(1);
	const [tpagina, setTPagina] = useState(1);
	const [textoB, setTextoB] = useState('');





	const seleccionar = (e) => {

		if (itemAgregar[0].Descripcion === '') {

			//mensaje de error 
			return;
		}
		console.log(proyects.DataPc);
		console.log(itemAgregar);

		dispatch(agregaItem(itemAgregar));

		setShow(false);
	}

	useEffect(() => {
		var paginas = localStorage.getItem("paginacionP");
		var arrayDeCadenas = [];
		if (paginas)
			arrayDeCadenas = paginas.split('/');

		var totalesp = Math.trunc((arrayDeCadenas[1] / 20));
		if (arrayDeCadenas[1] % 20 !== 0) {
			totalesp = totalesp + 1;
		}
		//alert((arrayDeCadenas[1]/arrayDeCadenas[0]));
		//alert(totalesp);
		setTPagina(totalesp);

	}, [proyects.DataPartidas, textoB])


	const valueChanged = (data) => {
		/*setState({
		  emailValue: `${data.value.replace(/\s/g, '').toLowerCase() }@corp.com`
		});*/
		setTextoB(data.value);
		//dispatch(limpiaUbicaciones()); 
		dispatch(selectPARTIDAS(data.value, '20', 1, ''));
		setPagina(1);
	}

	const handleChange = (event, value) => {
		setPagina(value);
		//dispatch(limpiaUbicaciones()); 
		dispatch(selectPARTIDAS(textoB, '20', value, ''));
	};
	return (
		<>
		<div className="animate__animated animate__fadeIn" style={{ height:'90vh', background:'white' }}>
			{/* <Modal size="lg" centered show={show} onHide={handleClose} >
				<Modal.Header closeButton style={{
					background: '#3c8dbc', color: 'white', height: '42px',
					
					background: '#398bf7'
				}}> */}
					{/* <Modal.Title style={{ fontSize: '0.95rem' }}>Selecciona una Partida</Modal.Title> */}
				{/* </Modal.Header> */}


				<Card.Header style={{fontSize:'1rem', background:'#398bf7', color:'white', fontWeight:'550' }}>Seleccionar una Partida
                            
				</Card.Header>
					<Card.Body>

					<Card style={{ width: '100%', marginTop: '5px'/*, background: '#e8f7fe'*/ }}>
						{/* <Card.Header style={{ height: '38px' }}> <div style={{ marginTop: '-5px' }}>Moneda Principal ({proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].SimboloMoneda : ''}) </div> </Card.Header> */}
						<Card.Body>

							<Form.Group as={Row} className="mb-0" controlId="formHorizontalPassword">
								<Form.Label column sm={6}>



								</Form.Label>


								<Col sm={6}>


									<div className="form mt-0">
										<div className="input-group" data-widget="">

											<TextBox
												//stylingMode={'Search'}
												defaultValue={textoB}
												value={textoB}
												width="100%"
												showClearButton={true}
												valueChangeEvent="keyup"
												onValueChanged={valueChanged}
												//placeholder="Subject"

												placeholder="Search.."
											>
												<i className="fas fa-search fa-fw" style={{ position: 'absolute', top: '10px', right: '30px', width: '12px', height: '12px' }}></i>

											</TextBox>

											{/* <input
											className="form-control form-control"
											type="search"
											placeholder="Buscar"
											aria-label="Buscar"
											value={''}
											onChange={''}
										/>
										<div className="input-group-append">
											<button className="btn btn-sidebar">
												<i className="fas fa-search fa-fw"></i>
											</button>
										</div> */}
										</div>
									</div>

								</Col>


							</Form.Group>


						</Card.Body>
					</Card>

					</Card.Body>
				

{/* 
				<Modal.Body> */}



					<DataGrid
						style={{ width: '98%', height: '67vh', marginTop: '0px', marginLeft:'15px' }}
						dataSource={proyects.DataPartidas}
						selection={{ mode: 'single' }}
						keyExpr="CodPartida"
						allowColumnReordering={true}
						showBorders={true}
						focusedRowEnabled={true}
						allowColumnResizing={true}
						rowAlternationEnabled={true}
						
						onFocusedRowChanged={(e) => {
							console.log(e);
							console.log(e.row.data.UnidadPartida);
							
							if (e.row.rowType==='group'){
								itemAgregar[0].Descripcion='';
								itemAgregar[0].Unidad='';


							}else{

								itemAgregar[0].Descripcion=e.row.data.Descripcion;
								itemAgregar[0].Unidad=e.row.data.UnidadPartida;
	
							}
							
							
							//ubicacionSel.Descripcion=e.row.data.Descripcion;
							//setUbicacionSel(e.row.data.Descripcion);
							/*setItemAgregar((state) => {
								const estado = [...state];
								//estado[0].Descripcion = e.row?.data.Descripcion;
								//estado[0].Unidad = e.row?.data.UnidadPartida;
								//estado[0].Unidad=e.row.data.Unidad;
								return estado;

							});

							/*console.log(e.row?.data.Descripcion)

							setItemAgregar((state) => {
								const estado = [...state];
								estado[0].Descripcion = e.row?.data.Descripcion;
								estado[0].Unidad = e.row?.data.UnidadPartida;
								//estado[0].Unidad=e.row.data.Unidad;
								return estado;

							});
							//setItemAgregar(ItemN)*/
							//console.log(itemAgregar)
							

						}}


						
					>
						<GroupPanel visible={true} />
						<SearchPanel visible={false} />
						<Grouping autoExpandAll={/*this.state.autoExpandAll*/true} 
						/>
						<Paging defaultPageSize={500} />

						<Column dataField="Descripcion" dataType="string" width={'80%'}/>
						<Column dataField="PartidaN1" dataType="string" groupIndex={0} caption="Grupo1"  width={'20%'}/>
						<Column dataField="PartidaN2" dataType="string" groupIndex={1} caption="Grupo2" width={'20%'}/>
						<Column dataField="PartidaN3" dataType="string" groupIndex={2} caption="Grupo3" width={'20%'}/>
						<Column dataField="PartidaN4" dataType="string" groupIndex={3} caption="Grupo4" width={'20%'}/>
						<Column dataField="PartidaN5" dataType="string" groupIndex={4} caption="Grupo5" width={'20%'}/>
						<Column dataField="UnidadPartida" dataType="string" width={'8%'}/>
					</DataGrid>

					{/* <TreeList
						style={{ width: '100%', height: '660px', marginTop: '-25px' }}
						dataSource={proyects.DataPartidas}
						keyExpr="CodPartida"
						//parentIdExpr="PhantomParentId"
						showBorders={true}
						focusedRowEnabled={true}
						//defaultExpandedRowKeys={[1, 2, 3, 5]}
						columnAutoWidth={false}
						rootValue={-1}
						//selectedRowKeys={selectedRowKeys}

						//onSelectionChanged={() => {alert('hola')}}
						//onRowClick={() => {alert(this)}}
						onFocusedRowChanged={(e) => {
							console.log(e)

							setItemAgregar((state) => {
								const estado = [...state];
								estado[0].Descripcion = e.row.data.Descripcion;
								estado[0].Unidad = e.row.data.UnidadPartida;
								//estado[0].Unidad=e.row.data.Unidad;
								return estado;

							});
							//setItemAgregar(ItemN)
							console.log(itemAgregar)
							

						}}
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
							width={'20%'}
							dataField="CodPartida"
							cellTemplate="Template1"
						/>

						<Column
							width={'70%'}
							dataField="Descripcion"
							alignment={'left'}
							cellTemplate="Template1"
						/>
						<Column
							width={'10%'}
							dataField="UnidadPartida"
							caption="Unidad"
							alignment={'center'}
							cellTemplate="Template1"
						/>

						
						<Pager
							//allowedPageSizes={allowedPageSizes}
							showPageSizeSelector={true}
							showNavigationButtons={true}
						/>
						<Paging
							enabled={true}
							defaultPageSize={20}
						/>
						<Template name="Template1" render={CellRend} />
					</TreeList> */}

					<div className="" style={{ position: 'absolute', marginTop:'80vh', width: '100%', height: '30px', background:'red' }}></div>
					<Pagination count={tpagina} page={pagina} onChange={handleChange} style={{ position: 'absolute', right: '25px', top: '79vh' }} />
					<strong style={{ fontSize: '0.7rem', position: 'absolute', left: '5px', marginLeft: '20px', top: '81vh' }}> Pagina</strong>
					<TextBox
						id='TPag'
						style={{ fontSize: '0.7rem', position: 'absolute', left: '25px', marginLeft: '40px', top: '80vh' }}
						//stylingMode={'Search'}
						defaultValue={pagina}
						value={pagina}
						width="40px"

						valueChangeEvent="keyup"
						onValueChanged={(data) => {
							if (data.value === '') {

								//setPagina(1);
								//return;
							}
							let pag = Math.trunc(data.value);
							if (data.value !== '' && (pag > 0 && pag <= tpagina)) {

								setPagina(pag);
								dispatch(selectPARTIDAS(textoB, '20', data.value, ''));

							} else {
								//setPagina(1);
								//$("#TPag").focus(function() { $(this).select(); } );
								//$("#TPag").select();
								//$("#TPag").mouseup(function (e) {e.preventDefault(); });*/

								//$("#TPag").setSelectionRange(0, this.value.length)
								//seleccionaTexto(this)
								//$("#TPag").select();
							}

						}}
						//placeholder="Subject"

						placeholder={pagina}
					>
					</TextBox>

					{/* <ListGroup>
						{
							proyects.DataClientes ? proyects.DataClientes.map(cliente => (
								<ListGroup.Item action key={cliente.CodIdentificador} onClick={() => {}/*dispatch(selectCompany(company, history))}>
									{
										cliente.Descripcion
									}
								</ListGroup.Item>
							)):''
						}
					</ListGroup> */}
				{/* </Modal.Body>

				<Modal.Footer> */}
					<strong style={{ fontSize: '0.6rem', position: 'absolute', marginLeft: '3%', marginTop:'65px' }}> {ubicacionSel}</strong>
					<Button1
						variant="primary"
						onClick={seleccionar}
						style={{
							position: 'absolute', right: '155px',  marginTop:'65px'
							/*background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
							background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
							background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
							filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'*/

						}}
					>
						<ion-icon name="checkmark-done-outline"></ion-icon>
						Seleccionar
					</Button1>

					<Button1
						variant="secondary"
						onClick={handleClose}
						style={{
							position: 'absolute', right: '55px',  marginTop:'65px'}}
					>
						<ion-icon name="close-outline"></ion-icon>
						Cancelar
			</Button1>
				{/* </Modal.Footer>
			</Modal> */}
		</div>			
		</>
	)
}

export default BuscaPartida
