//import { Modal, Button, ListGroup } from "react-bootstrap";
import { Modal, Card, Form, Row, Button, Col, InputGroup, FormControl, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
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
	Column
} from 'devextreme-react/tree-list';
import { useEffect, useState } from "react";

import { ViewerScP } from '../views/ViewerScP';
import axiosmdl from "../config/axiosmdl";
import qs from "querystring";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { selectMODELOS,ModificarSubPresupuesto, SelectUrn, SelectUrnB, guardarModelo } from '../actions/proyects.actions';
import Swal from 'sweetalert2'
import axios from 'axios';
import { Template, TextBox } from 'devextreme-react';
import EmployeeCell from './EmployeeCell';


const BuscaModelo = ({ show, setShow, subseleccionado, setSubSeleccionado ,item, CodPresupuesto }) => {
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const auth = useSelector(state => state.auth);
	const history = useHistory()
	const proyects = useSelector((state) => state.proyects);
	//dispatch(selectAPUS(codP, codSub, codItem, ''));

	const [modeloSel, setmodeloSel] = useState({
		codigo: '',
		nombre: '',
		version: '',
		urnaddin: '',
		urnweb: '',
	});



	const [allLevels, setAllLevels] = useState({ Id: null, Descripcion: '', PhantomParentId: '', Tipo:'' })
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
				Tipo:'Proyecto'
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
						Tipo:'Folder'
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
			if (data.data[i].type === 'folders') {
			setAllLevels((state) => {
				return [...state,
				{
					Id: data.data[i].id,
					Descripcion: data.data[i].attributes.displayName,
					PhantomParentId: urnfolder,
					Tipo:'Folder'
				}
				]
			});
		}else{

			setAllLevels((state) => {
				return [...state,
				{
					Id: data.data[i].id,
					Descripcion: data.data[i].attributes.displayName,
					PhantomParentId: urnfolder,
					Tipo:'Modelo'
				}
				]
			});


		}
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
							PhantomParentId: data.data[i].id,
							Tipo:'Version'
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
					PhantomParentId: idf,
					Tipo:'Modelo'
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
							PhantomParentId: data.data[i].id,
							Tipo:'Version'
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




	

	


	
	 
	function getRandomString(length) {
		var s = '';
		do { s += Math.random().toString(36).substr(2); } while (s.length < length);
		s = s.substr(0, length);
		
		return s;
	  }
	  
	  

	const Selecciona = () => {
		
		if (!proyects.DataModelos) {



		}
		if (modeloSel.nombre && modeloSel.nombre!==''){

		console.log('Este va a guardar');
		console.log(modeloSel);

        //console.log("LOS SUBPRESUPUESTOS AHORA SON");
        //console.log(proyects.treeSubControl);
        console.log("ACTUALMENTE LOS MODELOS");
        console.log(proyects.DataModelos);


		

		let buscado = proyects.DataModelos.find(item => item.UrnWeb === modeloSel.urnweb);

		let uid='';
		let nombre='';
		if (buscado){

			//SI EXISTE EN MI TABLA DEBO COGER LOS DATOS DE ID NOMBRE Y MODIFICAR EL REGISTRO DE SUBPRESUPUESTO	
			uid = buscado.CodPlano;
			nombre = buscado.NombreArchivoRvt;
			
			

		}else{
			
			//NO EXISTE DEBO INGRESAR PRIMERO EN LA TABLA DE MODELOS GENERANDO UN NUEVO ID
			//let guid = createGuid(); 
			//let encoded = base64_encode(guid);
			//let encoded = btoa(guid);
			//let encoded =b64EncodeUnicode(guid); 
			uid = getRandomString(24);
			console.log("llamando a guardar modelos");
			//alert(uid + );

			const resp = dispatch(guardarModelo(uid, modeloSel.nombre, '',  modeloSel.urnaddin,  modeloSel.urnweb, ''));
			nombre = modeloSel.nombre;
			setTimeout(() => {
				dispatch(selectMODELOS(''));
			}, 1000);
			setTimeout(() => {
				console.log("AHORA LOS MODELOS DESPUES DE GUARDAR");
				console.log(proyects.DataModelos);
			}, 3800);


		}

		/*setSubSeleccionado((state)=>{
			return ({...state,
				     //CodModelo:uid,
					 CodModelo:'8888888',
					 NombreModelo:'blablabla',
					 //NombreModelo:nombre
					})
		});*/
		subseleccionado.CodModelo=uid;
		subseleccionado.NombreModelo=nombre;
        console.log("EL SELECCIONADO despues de modificar");
        console.log(subseleccionado);

        console.log("el codigo del presupuesto");
        console.log(CodPresupuesto);

		//CodSubpresupuesto
		//ModificarSubPresupuesto = (CodPresupuesto, CodSubPresupuesto, Descripcion,  CodModelo, userId) =>{
			dispatch(ModificarSubPresupuesto(CodPresupuesto, subseleccionado.CodSubpresupuesto, subseleccionado.Descripcion,  subseleccionado.CodModelo,  ''));
			console.log("DISPATCH");
			console.log(CodPresupuesto, subseleccionado.CodSubpresupuesto, subseleccionado.Descripcion,  subseleccionado.CodModelo,  '');

		}else{
			Swal.fire({
				title: 'Error!',
				text: 'No ha seleccionado un Modelo',
				icon: 'error',
				confirmButtonText: 'Ok'
			})

		}

		//proyects.AuxModelo = modeloSel.nombre;
		setShow(false);
	}


	function onSelectionChanged(e) {
		//console.log(e);

		setmodeloSel({
			codigo: '',
			nombre: '',
			version: '',
			urnaddin: '',
			urnweb: '',
		});

		//alert(e.row.data.Descripcion);
		const Item = e.row.data;
		//console.log('El item es ACTUAL :');
		//console.log(Item);
		const Id = Item.Id;
		let Descripcion = Item.Descripcion;
		//alert(Item.CodPlano + ' ' + Item.NombreArchivoRvt);
		if (Descripcion.substring(0,7)==='Version')
			{
				//alert(pc.Id + " " + newTitle);
				let encoded = base64_encode(Id);
				//alert(encoded);
				dispatch(SelectUrnB(encoded));
				//console.log('Estoss son los nivelessss');
				//console.log(allLevels);
				//proyects.Urn=encoded;
				let arrresp = allLevels.find(item => item.Id === Item.PhantomParentId)
				console.log('este es el filtro');
				console.log(arrresp);
				let Version = arrresp.Descripcion;
				//Descripcion= arrresp.Descripcion + ' -> ' + Descripcion;
				//Descripcion= arrresp.Descripcion;

				/*.map(filtro => {
					alert(filtro.Descripcion)
					

				});*/
				setmodeloSel({
					codigo: Id,
					nombre: Version,
					version: Descripcion,
					urnaddin: Id,
					urnweb: encoded,					
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

	/*useEffect(() => {
		setmodeloSel({
			codigo: '',
			nombre: '',
		});
	}, []);*/

	return (
		<>

			<Modal show={show} size="lg" centered onHide={handleClose} >
				<Modal.Header closeButton style={{ /*background: '#3c8dbc',*/ color: 'white', height: '42px',
				/*background: '-moz-linear-gradient(top, rgba(98,125,77,1) 0%, rgba(98,125,77,0.95) 23%, rgba(98,125,77,0.91) 38%, rgba(98,125,77,0.86) 58%, rgba(98,125,77,0.84) 68%, rgba(48,76,26,0.8) 85%, rgba(31,59,8,0.8) 91%)',
				background: '-webkit-linear-gradient(top, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
				background: 'linear-gradient(to bottom, rgba(98,125,77,1) 0%,rgba(98,125,77,0.95) 23%,rgba(98,125,77,0.91) 38%,rgba(98,125,77,0.86) 58%,rgba(98,125,77,0.84) 68%,rgba(48,76,26,0.8) 85%,rgba(31,59,8,0.8) 91%)',
				filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#627d4d", endColorstr="#cc1f3b08",GradientType=0 )'*/
				background:'#398bf7'
			 }}>
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
										{/* <input
											className="form-control form-control"
											type="search"
											placeholder="Buscar"
											aria-label="Buscar"
											value={''}
											onChange={''}
										/> */}

											<TextBox
											//stylingMode={'Search'}
											defaultValue={''}
											value={''}
											width="100%"
											showClearButton={true}
											//placeholder="Subject"
											
											placeholder="Search.."
											>
											<i className="fas fa-search fa-fw" style={{position:'absolute', top:'10px', right:'30px', width:'12px', height:'12px' }}></i>

											</TextBox>
										
									</div>
								</div>

							</Col>


						</Form.Group>


					</Card.Body>
				</Card>

				<Modal.Body style={{ width: '100%', height: '650px', overflow: 'hidden' }}>


					{/* <div className="" style={{ background: '#3c8dbc', width: '100%', height: '1px' }}></div> */}


					<Form.Group as={Row} className="mt-0 mb-0" controlId="formModelos" >

						<Col sm={5} style={{ /*background: '#3c8dbc',*/ width: '100%', height: '550px', overflow: 'scroll' }}>

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
									visible={false}
								/>
								<Scrolling
									mode="standard"
								/>

								<Column
									width={'100%'}
									dataField="Descripcion" 
									caption="Mi Catálogo (BIM360docs)"
									cellTemplate="employeeTemplate"
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
								<Template name="employeeTemplate" render={EmployeeCell} />
							</TreeList>


						</Col>
						<Col sm={7}>



							<Form.Group as={Row} className="mt-0 mb-0" controlId="formModel2" style={{ width: '100%', height: '100%' }}>


								<Col sm={12}>
									<ViewerScP />





								</Col>

							</Form.Group>






						</Col>



					</Form.Group>



					{/* <div className="" style={{ background: '#3c8dbc', width: '100%', height: '1px' }}></div> */}
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


					<Form.Group as={Row} className="mt-1 mb-1" controlId="formModel2" style={{ width: '100%', height: '20px' }}>


						<Col sm={12}>


							<strong style={{ fontSize: '0.7rem', position: 'absolute', left: '10px', marginLeft: '10px', marginTop:'30px' }}> No está asignado a presupuestos</strong>


						</Col>

					</Form.Group>



					{/* <div className="" style={{ background: '#3c8dbc', width: '100%', height: '1px' }}>
					</div> */}

				</Modal.Body>

				<Modal.Footer>
					<strong style={{ fontSize: '0.8rem', position: 'absolute', left: '5px', marginLeft: '20px', }}> {modeloSel.nombre + '->' + modeloSel.version}</strong>
					<Button1
						variant="primary"
						onClick={Selecciona}
						style={{
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
					>
						<ion-icon name="close-outline"></ion-icon>
						Cancelar
					</Button1>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default BuscaModelo
