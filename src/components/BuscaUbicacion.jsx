//import { Modal, Button, ListGroup } from "react-bootstrap";
import { Modal, Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { selectCompany } from '../actions/auth.action';
import { useHistory } from 'react-router-dom';
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

const BuscaUbicacion = ({ show, setShow }) => {
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const auth = useSelector(state => state.auth);
	const history = useHistory()
	const proyects = useSelector((state) => state.proyects);
	//dispatch(selectAPUS(codP, codSub, codItem, ''));



	return (
		<>

			<Modal size="lg" centered show={show} onHide={handleClose} >
				<Modal.Header closeButton style={{ background: '#3c8dbc', color: 'white', height: '50px',
				background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
				background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
				background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
				filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'
				}}>
					<Modal.Title style={{ fontSize: '0.95rem' }}>Selecciona una Ubicación</Modal.Title>
				</Modal.Header>


				<Card style={{ height: '100%', width: '100%', marginTop: '5px'/*, background: '#e8f7fe'*/ }}>
					{/* <Card.Header style={{ height: '38px' }}> <div style={{ marginTop: '-5px' }}>Moneda Principal ({proyects.DatosPresupuesto && proyects.DatosPresupuesto[0] ? proyects.DatosPresupuesto[0].SimboloMoneda : ''}) </div> </Card.Header> */}
					<Card.Body>

						<Form.Group as={Row} className="mb-0" controlId="formHorizontalPassword">
							<Form.Label column sm={6}>
							</Form.Label>


							<Col sm={6}>
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
				</Card>


				<Modal.Body>


					<div className="" style={{ background: '#3c8dbc', width: '100%', height: '4px' }}>
					</div>


					<TreeList
						dataSource={proyects.DataUbicaciones}
						keyExpr="CodLugar"
						//parentIdExpr="PhantomParentId"
						showBorders={true}
						focusedRowEnabled={true}
						defaultExpandedRowKeys={[1, 2, 3, 5]}
						columnAutoWidth={false}
						rootValue={-1}
						//selectedRowKeys={selectedRowKeys}

						//onSelectionChanged={() => {alert('hola')}}
						//onRowClick={() => {alert(this)}}
						onFocusedRowChanged={() => { }/*onSelectionChanged*/}
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
							width={'33%'}
							dataField="Departamento" />
						<Column
							width={'33%'}
							dataField="Descripcion"
							alignment={'right'}
						/>
						<Column
							width={'33%'}
							dataField="Provincia"
							caption="Provincia"
							alignment={'right'}
						/>

						{/*<Column
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


					<div className="" style={{ background: '#3c8dbc', width: '100%', height: '4px' }}>
					</div>

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
					<Button
						variant="primary"
						onClick={handleClose}
						style={{
							background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
							background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
							background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
							filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'

						}}
					>
						Seleccionar
					</Button>

					<Button
						variant="secondary"
						onClick={handleClose}
					>
						Cancelar
			</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default BuscaUbicacion
