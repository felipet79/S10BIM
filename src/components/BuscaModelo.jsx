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
	Column
} from 'devextreme-react/tree-list';
import { useEffect, useState } from "react";

const BuscaModelo = ({ show, setShow, item }) => {
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const auth = useSelector(state => state.auth);
	const history = useHistory()
	const proyects = useSelector((state) => state.proyects);
	//dispatch(selectAPUS(codP, codSub, codItem, ''));

	const [modeloSel, setmodeloSel] = useState({
		codigo: '',
		nombre: '',
	});



	const Selecciona = () => {

		proyects.AuxModelo=modeloSel.nombre;
		setShow(false);
	}


	function onSelectionChanged(e) {
		//console.log(e);

		//alert(e.row.data.Descripcion);
		const Item = e.row.data;
		const codP = Item.CodPlano;
		//alert(Item.CodPlano + ' ' + Item.NombreArchivoRvt);

		setmodeloSel({
			codigo: Item.CodPlano,
			nombre: Item.NombreArchivoRvt,
		});

		//const codSub = Item.CodSubpresupuesto;
		//const codItem = Item.Item;
		//alert(codP + "-" + codSub + "-" + codItem);


		//const selectedData = e.component.getSelectedRowsData(state.selectionMode);
		/*setState({
		  selectedRowKeys: e.selectedRowKeys,

		  //selectedEmployeeNames: this.getEmployeeNames(selectedData)
		});*/
	}

	useEffect(() => {
		setmodeloSel({
			codigo: '',
			nombre: '',
		});
	}, []);

	return (
		<>

			<Modal centered show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Selecciona un Modelo</Modal.Title>
				</Modal.Header>

				
				<Modal.Body>

					<TreeList
						dataSource={proyects.DataModelos}
						keyExpr="CodPlano"

						//parentIdExpr="PhantomParentId"
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
							visible={true}
						/>
						<Scrolling
							mode="standard"
						/>

						<Column
							width={'100%'}
							dataField="NombreArchivoRvt" />
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
				<strong style={{ fontSize:'0.6rem', position:'absolute', left:'5px', marginLeft: '20px',  }}> Sel: {modeloSel.nombre}</strong>
					<Button
						variant="primary"
						onClick={Selecciona}
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

export default BuscaModelo
