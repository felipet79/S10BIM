import { Modal, Button, ListGroup } from "react-bootstrap";
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
	Column } from 'devextreme-react/tree-list';

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
				<Modal.Header closeButton>
					<Modal.Title>Selecciona una Ubicación</Modal.Title>
				</Modal.Header>


				<Modal.Body>

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
						onFocusedRowChanged={()=>{}/*onSelectionChanged*/}
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
