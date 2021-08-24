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
import { useEffect, useState } from "react";

import { ViewerScP } from '../views/ViewerScP';
import axiosmdl from "../config/axiosmdl";
import qs from "querystring";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { SelectUrn, SelectUrnB } from '../actions/proyects.actions';
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



	const [allLevels, setAllLevels] = useState({ Id: null, Descripcion: '', PhantomParentId: '' })
	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);


	const [loading, setLoading] = useState(true);



	let token = '';
	let idhub = '';
	let idproy = '';
	let nombreproy = '';
	let urnfolder = '';

	const ObtenerTokenAdsk = async () => {
		//console.log('Se dispara solicitar Token ');
		//if (auth.User) {
		const { data } = await axiosmdl.post(
			"/authentication/v1/authenticate",
			qs.stringify({
				client_id: "Lrn6oqLnwpCBd8GS0LuimGx5SHONYw4b",
				client_secret: "JLA2LfrdwUg4hMkz",
				grant_type: "client_credentials",
				scope: "data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
			}
		);
		console.log(' Token obtenido de Autodesk');
		console.log(data);
		token = data.access_token;
		return '1';
		// console.log(idProject);
		//}

	}


	useEffect(async () => {
		//ObtenerTokenAdsk();
		const rep = await ObtenerTokenAdsk();
		const rep1 = await DatosHubs();
		const rep2 = await DatosProyectos();
		const rep3 = await DatosFolders();
		const rep4 = await DatosContentFolders();
	}, [])



	const DatosHubs = async () => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/project/v1/hubs?",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		/*console.log(' Hubs respuesta');
		console.log(data);
		console.log(data.data[0].attributes.name);
		console.log(data.data[0].id);*/
		idhub = data.data[0].id;
		return '1';

	}


	const DatosProyectos = async () => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/project/v1/hubs/" + idhub + "/projects",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		console.log(' Proyectos respuesta');
		console.log(data);
		console.log(data.data[1].attributes.name);
		console.log(data.data[1].id);

		idproy = data.data[1].id;
		nombreproy = data.data[1].attributes.name;
		//setAllLevels(1);


		setAllLevels([
			{
				Id: data.data[1].id,
				Descripcion: data.data[1].attributes.name,
				PhantomParentId: null,
			},
		]);
		/*setAllLevels([
				[
				{
					Id:data.data[1].id,
					Descripcion:data.data[1].attributes.name,
					PhantomParentId:'',
				},
				],
				[{
					Id:'2',
					Descripcion:'otro dato',
					PhantomParentId:data.data[1].id,		
				},
				{
					Id:'2',
					Descripcion:'otro dato',
					PhantomParentId:data.data[1].id,
				}
				],
			]);*/
		setLoading(false);
		console.log(allLevels);

		return '1';

	}


	const DatosFolders = async () => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/project/v1/hubs/" + idhub + "/projects/" + idproy + "/topFolders",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		console.log(' Folders respuesta');
		console.log(data);


		for (let i = 0; i < data.data.length; i++) {
			if (data.data[i].attributes.name === 'Project Files') {
				setLastLevel(0);
				urnfolder = data.data[i].id;
				setAllLevels((state) => {

					return [...state,
					{
						Id: data.data[i].id,
						Descripcion: data.data[i].attributes.name,
						PhantomParentId: idproy,
					},

					]

				});

				//alert(data.data[i].id);
			}


		}
		//console.log(data.data[1].attributes.name);
		//console.log(data.data[1].id);

		//let idproy = data.data[1].id;
		//let nombreproy = data.data[1].attributes.name;
		//setAllLevels(1);
		//setLastLevel(0);
		/*setAllLevels([
			[
			{
				Id:data.data[1].id,
				Descripcion:data.data[1].attributes.name,
				PhantomParentId:'',
			},
			],
			[{
				Id:'2',
				Descripcion:'otro dato',
				PhantomParentId:data.data[1].id,		
			},
			{
				Id:'2',
				Descripcion:'otro dato',
				PhantomParentId:data.data[1].id,
			}
			],
		]);*/
		setLoading(false);
		console.log(allLevels);

		return '1';

	}
	//https://developer.api.autodesk.com/project/v1/hubs/b.add1a5d6-6782-4ab4-80b5-ec0ac90a3c44/projects
	//https://developer.api.autodesk.com/project/v1/hubs/b.add1a5d6-6782-4ab4-80b5-ec0ac90a3c44/projects/b.650b7b18-9a52-4032-a01d-9e7b181ca5f9/topFolders
	//https://developer.api.autodesk.com/data/v1/projects/b.650b7b18-9a52-4032-a01d-9e7b181ca5f9/folders/urn:adsk.wipprod:fs.folder:co.MiYHBR6bR7u6JNIMqiygGA/contents

	//let cantidadFolders=0;
	let folders = [];

	const DatosContentFolders = async () => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/data/v1/projects/" + idproy + "/folders/" + urnfolder + "/contents",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		console.log(' Content Folders respuesta');
		console.log(data);

		let arreglo = [];
		let arreglo1 = [];
		for (let i = 0; i < data.data.length; i++) {

			if (data.data[i].type === 'folders') {
				folders.push(data.data[i].id);
			}

			setAllLevels((state) => {
				return [...state,
				{
					Id: data.data[i].id,
					Descripcion: data.data[i].attributes.displayName,
					PhantomParentId: urnfolder,
				}
				]
			});

			/*arreglo.push(
				{
					Id:data.data[i].id,
					Descripcion:data.data[i].attributes.displayName,
					PhantomParentId:urnfolder
				},
				)*/

			for (let j = 0; j < data.included.length; j++) {
				if (data.data[i].attributes.displayName === data.included[j].attributes.name) {

					setAllLevels((state) => {
						return [...state,
						{
							Id: data.included[j].id,
							Descripcion: 'Version ' + data.included[j].attributes.versionNumber + ' ' + data.included[j].attributes.lastModifiedTime.substring(0,10),
							PhantomParentId: data.data[i].id
						}
						]
					});

					/*arreglo1.push(
						{
							Id:data.included[j].id,
							Descripcion:'Version '+ data.included[j].attributes.versionNumber + ' ' + data.included[j].attributes.lastModifiedTime,
							PhantomParentId:data.data[i].id
						},
						)*/
				}
			}
		}

		//console.log(arreglo);

		/*setAllLevels( (state)=>{

			return[state.concat(arreglo).concat(arreglo1)]
		});*/

		/*setAllLevels( (state)=>{
		return[...state,
			arreglo,arreglo1			
		]
		});*/
		//setLastLevel(4);
		setLoading(false);
		console.log(allLevels);

		for (let i = 0; i < folders.length; i++) {
			let resp = await DatosContentFolders1(folders[i]);
		}


		return '1';


	}





	const DatosContentFolders1 = async (idf) => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/data/v1/projects/" + idproy + "/folders/" + idf + "/contents",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		console.log(' Content Folders respuesta');
		console.log(data);

		let arreglo = [];
		let arreglo1 = [];
		for (let i = 0; i < data.data.length; i++) {

			if (data.data[i].type === 'folders') {
				folders.push(data.data[i].id);
			}

			/*arreglo.push(
				{
					Id:data.data[i].id,
					Descripcion:data.data[i].attributes.displayName,
					PhantomParentId:idf
				},
				)*/

			setAllLevels((state) => {
				return [...state,
				{
					Id: data.data[i].id,
					Descripcion: data.data[i].attributes.displayName,
					PhantomParentId: idf
				}
				]
			});

			for (let j = 0; j < data.included.length; j++) {
				if (data.data[i].attributes.displayName === data.included[j].attributes.name) {

					setAllLevels((state) => {
						return [...state,
						{
							Id: data.included[j].id,
							Descripcion: 'Version ' + data.included[j].attributes.versionNumber + ' ' + data.included[j].attributes.lastModifiedTime.substring(0,10),
							PhantomParentId: data.data[i].id
						}
						]
					});

					/*arreglo1.push(
						{
							Id: data.included[j].id,
							Descripcion: 'Version ' + data.included[j].attributes.versionNumber + ' ' + data.included[j].attributes.lastModifiedTime,
							PhantomParentId: data.data[i].id
						},
					)*/
				}
			}
		}

		//console.log(arreglo);
		/*setAllLevels( (state)=>{
			return[...state,
				arreglo,arreglo1			
			]
			});*/

		/*setAllLevels( (state)=>{
			return[state[0],state[1],state[2],state[3].concat(arreglo), arreglo1]
			});*/

		//setLastLevel(5);
		setLoading(false);
		//console.log('all levels final');
		//console.log(allLevels);
		return '1';

	}













	const Selecciona = () => {

		proyects.AuxModelo = modeloSel.nombre;
		setShow(false);
	}


	function onSelectionChanged(e) {
		//console.log(e);



		//alert(e.row.data.Descripcion);
		const Item = e.row.data;
		const Id = Item.Id;
		let Descripcion = Item.Descripcion;
		//alert(Item.CodPlano + ' ' + Item.NombreArchivoRvt);
		if (Descripcion.substring(0,7)==='Version')
			{
				//alert(pc.Id + " " + newTitle);
				let encoded = base64_encode(Id);
				//alert(encoded);
				dispatch(SelectUrnB(encoded));
				console.log('Estoss son los nivelessss');
				console.log(allLevels);
				//proyects.Urn=encoded;
				let arrresp = allLevels.find(item => item.Id === Item.PhantomParentId)
				console.log('este es el filtro');
				console.log(arrresp);
				
				Descripcion= arrresp.Descripcion + ' -> ' + Descripcion;
				/*.map(filtro => {
					alert(filtro.Descripcion)
					

				});*/
				setmodeloSel({
					codigo: Id,
					nombre: Descripcion,
				});
		
			}



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

			<Modal show={show} size="lg" centered onHide={handleClose} >
				<Modal.Header closeButton style={{ background: '#3c8dbc', color: 'white', height: '50px' }}>
					<Modal.Title style={{ fontSize: '0.95rem' }}>Selecciona un Modelo</Modal.Title>
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

				<Modal.Body style={{ width: '100%', height: '650px', overflow: 'hidden' }}>


					<div className="" style={{ background: '#3c8dbc', width: '100%', height: '4px' }}>
					</div>


					<Form.Group as={Row} className="mt-3 mb-3" controlId="formModelos" >

						<Col sm={6} style={{ /*background: '#3c8dbc',*/ width: '100%', height: '550px', overflow: 'scroll' }}>

							<TreeList
								dataSource={allLevels}
								keyExpr="Id"

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
									visible={true}
								/>
								<Scrolling
									mode="standard"
								/>

								<Column
									width={'100%'}
									dataField="Descripcion" />
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


						</Col>
						<Col sm={6}>



							<Form.Group as={Row} className="mt-1 mb-1" controlId="formModel2" style={{ width: '100%', height: '100%' }}>


								<Col sm={12}>
									<ViewerScP />





								</Col>

							</Form.Group>






						</Col>



					</Form.Group>



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


					<Form.Group as={Row} className="mt-3 mb-3" controlId="formModel2" style={{ width: '100%', height: '20px' }}>

						<Col sm={1}></Col>
						<Col sm={10}>


							<strong style={{ fontSize: '0.8rem', position: 'absolute', left: '5px', marginLeft: '20px', }}> No está asignado a presupuestos</strong>


						</Col>
						<Col sm={1}></Col>
					</Form.Group>



					<div className="" style={{ background: '#3c8dbc', width: '100%', height: '4px' }}>
					</div>

				</Modal.Body>

				<Modal.Footer>
					<strong style={{ fontSize: '0.8rem', position: 'absolute', left: '5px', marginLeft: '20px', }}> {modeloSel.nombre}</strong>
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
