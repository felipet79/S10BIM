//import { Modal, Button, ListGroup, Form, Col, Card } from "react-bootstrap";
import { Modal, Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import 'devextreme/dist/css/dx.light.css';
import { selectCompany } from '../actions/auth.action';
import { useHistory } from 'react-router-dom';
import Button1 from 'devextreme-react/button';
import TreeList, {
	Pager,
	Paging,
	Editing,
	HeaderFilter,
	FilterPanel,
	FilterRow,
	Scrolling,
	Column,
	SearchPanel
} from 'devextreme-react/tree-list';
import { useState } from 'react';

const BuscaCliente = ({ tipo='',presupuestoN, show, setShow }) => {
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const auth = useSelector(state => state.auth);
	const history = useHistory()
	const proyects = useSelector((state) => state.proyects);
	//dispatch(selectAPUS(codP, codSub, codItem, ''));
	const [clienteSel, setClienteSel] = useState({
		Codigo: '',
		Descripcion: '',
	});


	const seleccionar = () => {

		if (clienteSel.Descripcion===''){

			//mensaje de error 
			return;
		}
		/*if (tipo===''){
			proyects.DatosPresupuesto[0].CodCliente=clienteSel.Codigo;
			proyects.DatosPresupuesto[0].Cliente=clienteSel.Descripcion;
		}else
		{*/
			presupuestoN.CodCliente=clienteSel.Codigo;
			presupuestoN.Cliente=clienteSel.Descripcion;
		//}
		//proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].CodCliente
		//proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].Cliente
			//console.log('Este va a guardar');
			//console.log(modeloSel);
	
			//console.log("LOS SUBPRESUPUESTOS AHORA SON");
			//console.log(proyects.treeSubControl);
			//console.log("ACTUALMENTE LOS MODELOS");
			//console.log(proyects.DataModelos);
	
			setShow(false);
	}



	

	return (
		<>

			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton style={{ /*background: '#3c8dbc',*/ color: 'white', height: '42px',
				/*background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
				background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
				background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
				filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'			*/
				background:'#398bf7'
			
			}}>
					<Modal.Title closeButton style={{ fontSize: '0.95rem' }}>Selecciona un cliente</Modal.Title>
				</Modal.Header>


				<Modal.Body>



					{/* <Card style={{ height: '100%', width: '100%', marginTop: '5px'/*, background: '#e8f7fe'}}>
						{/* <Card.Header style={{ height: '38px' }}> <div style={{ marginTop: '-5px' }}>Moneda Principal ({proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].SimboloMoneda : ''}) </div> </Card.Header> }
						<Card.Body>

							<Form.Group as={Row} className="mb-0" controlId="formHorizontalPassword">
								<Form.Label column sm={2}>
								</Form.Label>


								<Col sm={10}>
									<div className="form mt-0">
										<div className="input-group" data-widget="">
											<input
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
											</div>
										</div>
									</div>

								</Col>


							</Form.Group>


						</Card.Body>
					</Card> */}




					{/* <div className="" style={{background:'#3c8dbc', width:'100%', height:'2px' }}>
					</div> */}




					<TreeList

						dataSource={proyects.DataClientes}
						keyExpr="CodIdentificador"
						//parentIdExpr="PhantomParentId"
						//background='#e8f7fe'
						//customizeColumns={true}
						//showRowLines={true}
						showBorders={true}
						focusedRowEnabled={true}
						defaultExpandedRowKeys={[1, 2, 3, 5]}
						columnAutoWidth={false}
						rootValue={-1}

						//selectedRowKeys={selectedRowKeys}

						//onSelectionChanged={() => {alert('hola')}}
						//onRowClick={() => {alert(this)}}
						onFocusedRowChanged={(e) => { console.log(e) 
							setClienteSel({
								Codigo: e.row.data.CodIdentificador,
								Descripcion: e.row.data.Descripcion,
							});
						
						}/*onSelectionChanged*/}
						wordWrapEnabled={true}
						
					>
						<SearchPanel visible={true} />
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
							//style={{ background: '#e8f7fe' }}
							
							width={'35%'}
							dataField="Descripcion"
							//cellRender={renderCell}
						//background={#e8f7fe}
						/>

						{/*<Column
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
							dataField="Ancho"
							alignment={'right'}
						/>

						<Column
							width={'10%'}
							dataField="Alto"
							alignment={'right'}
						/>

						<Column
							width={'10%'}
							dataField="Total"
							alignment={'right'}
						/>

						<Column
							width={'20%'}
							dataField="Detalle" 
							alignment={'center'}
						/>*/}

						

						<Pager
							//allowedPageSizes={allowedPageSizes}
							showPageSizeSelector={true}
							showNavigationButtons={true}
						/>
						<Paging
							enabled={true}
							defaultPageSize={15}
						/>
					</TreeList>

					{/* <div className="" style={{background:'#3c8dbc', width:'100%', height:'2px' }}>
						</div> */}
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
				</Modal.Body>

				<Modal.Footer>
				<strong style={{ fontSize: '0.6rem', position: 'absolute', left: '5px', marginLeft: '20px', }}> {clienteSel.Descripcion}</strong>
					
					<Button1
						variant="primary"
						onClick={seleccionar}
						style={{
							/*background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
							background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
							background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
							filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'	*/

						}}
					>
						<ion-icon name="checkmark-done-outline"></ion-icon>
						Seleccionar
					</Button1>

					<Button1
						variant="secondary"
						onClick={handleClose}
					>
						<ion-icon name="close-outline"></ion-icon>
						Cancelar
					</Button1>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default BuscaCliente
