import { useEffect, useState } from "react";
import { cleanDataChart, cleanDataChart1, selectPc, navigationTree, navigationTreePC, selectItems, cambiaSeleccion, SeleccionaSub, SelectUrn } from '../actions/proyects.actions';
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { useHistory } from "react-router-dom";
import axiosmdl from "../config/axiosmdl";
import qs from "querystring";

import {decode as base64_decode, encode as base64_encode} from 'base-64';
import subprojectIcon from '../assets/img/icons/subproject.png';
import projectIcon from '../assets/img/icons/project.png';
import managerIcon from '../assets/img/icons/manager.png';


import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import { useSelector, useDispatch } from "react-redux";
import { red } from "@material-ui/core/colors";

function MinusSquare(props) {
	return (
		<div className="d-flex">
			<ion-icon name="chevron-down-outline"></ion-icon>
			<img src={projectIcon} alt="icons" width="28" style={{ marginRight: 20 }} {...props} />
		</div>
	);
}

function PlusSquare(props) {
	return (
		<div className="d-flex">
			<ion-icon name="chevron-forward-outline"></ion-icon>
			<img src={projectIcon} alt="icons" width="28" style={{ marginRight: 20 }} {...props} />

		</div>
	);
}

function CloseSquare(props) {
	return (
		<img src={subprojectIcon} width="28" alt="icons" style={{ marginRight: 20 }} {...props} />
	);
}

function CloseSquare1(props) {
	return (
		<img src={managerIcon} width="28" alt="icons" style={{ marginRight: 20 }} {...props} />
	);
}




const StyledTreeItem = withStyles((theme) => ({
	iconContainer: {
		"& .close": {
			opacity: 0.25,
		},
	},
	group: {
		font: "22px Arial, sans-serif",
		marginLeft: 30,
		paddingLeft: 25,
		borderLeft: `2px dashed ${alpha(theme.palette.text.primary, 0.3)}`,
	},
}))((props) => <TreeItem {...props} />);

const useStyles = makeStyles({
	root: {
		font: "26px Arial, sans-serif",
		marginTop: 10,
		marginLeft: 35,
		height: 264,
		flexGrow: 1,
		maxWidth: 700,
	},
});

const TreeMD = ({ levelStart, idProject, filtrado, Accion }) => {
	let history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)
	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);


	


	const [loading, setLoading] = useState(true);

	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);
	//alert(' inicializando treeeee' );
	const subproyects = useSelector((state) => state.subproyects);

	

	
	/*useEffect(() => {
		//console.log('datos de subProyectos actualizados')
		if (proyects.treeSubControl == undefined) return;
		//console.log(proyects.treeSubControl)
		orderTree1(proyects.treeSubControl);
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [proyects.treeSubControl])*/




	/*useEffect(() => {
		//console.log('datos de proyectos')
		//console.log(proyects.treePartyControl)
		orderTree(proyects.treePartyControl);
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [levelStart, proyects.treePartyControl])*/





	const changeItem = (pc, newTitle) => {
		

		if (pc.Descripcion.substring(0,7)==='Version')
			{
				//alert(pc.Id + " " + newTitle);
				let encoded = base64_encode(pc.Id);
				//alert(encoded);
				dispatch(SelectUrn(encoded));
				
				//proyects.Urn=encoded;
			}

			

			//let decoded = base64_decode('YOUR_ENCODED_STRING');
		//dispatch(selectPc(proyects.idCard, pc.CodPresupuesto,  auth.User.UserId))
		//history.push(`/projects/id-pc/${pc.CodPresupuesto}`)

		// console.log('el id de este item es ', filter.CodPartidaDeControl, proyects.idCard)
	}


	const changeItem1 = (pc, newTitle, idpadre) => {
		//alert(itemSelected + " : " + pc.CodSubpresupuesto + " ");

		







		//dispatch(selectSeleccion(2));
		//selectSeleccion(2);
		//dispatch(cleanDataChart1());
		//SubPresupuestos(pc.CodPresupuesto);//llamar a items o retornar


		//dispatch(selectPc(proyects.idCard, pc.CodPresupuesto,  auth.User.UserId))
		//history.push(`/projects/id-pc/${pc.CodPresupuesto}`)

		// console.log('el id de este item es ', filter.CodPartidaDeControl, proyects.idCard)
	}

	const SubPresupuestos = async (codigoP) => {
		//alert(codigoP);		
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let connectId = await localStorage.getItem("connectionId");
		//console.log('connectId desde tree: ' + connectId + company + idProject);
		if (company && auth.User) {
			//alert(data);
			/*const { data } = await axiosmdl.post(
				"",
				{
					HasOutputParam: false,
					//ObjectName: `dbo.S10_06_PartidaDeControl_ListarCatalogo '${idProject}'`,
					ObjectName: `dbo.S10_01_Presupuesto_ListarSubpresupuestos '${codigoP}'`,
					RequestId: "PARTY_CONTROL1",
					SignalRConnectionID: connectId,
					SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
				},
				{
					headers: {
						Token: company.Token,
						ModuleId: 21,
					},
				}
			);*/
			//console.log(' data del response' + data);
			return '1';
			// console.log(idProject);
		}

	}



	/*async function postData(url = '', data = {}) {
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: queryString.stringify(data)
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}*/

	/*function getForgeToken(callback) {
		postData('https://developer.api.autodesk.com/authentication/v1/authenticate', {
			'client_id': 'Lrn6oqLnwpCBd8GS0LuimGx5SHONYw4b',
			'client_secret': 'JLA2LfrdwUg4hMkz',
			'grant_type': 'client_credentials',
			'scope': 'data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete'
		})
			.then(data => {
				console.log(data); // JSON data parsed by `data.json()` call
				callback(data.access_token, data.expires_in);
			});
	}*/
	let token = '';
	let idhub = '';
	let idproy = '';
	let nombreproy = '';
	let urnfolder = '';

	const ObtenerTokenAdsk = async () => {
		console.log('Se dispara solicitar Token ');
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
		const rep  = await ObtenerTokenAdsk();
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
		idhub=data.data[0].id;
		return '1';

	}


	const DatosProyectos = async () => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/project/v1/hubs/"+ idhub +"/projects",
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
		setLastLevel(0);


		setAllLevels([
			[
			{
				Id:data.data[1].id,
				Descripcion:data.data[1].attributes.name,
				PhantomParentId:'',
			},
			],
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
			"/project/v1/hubs/"+ idhub +"/projects/" + idproy + "/topFolders",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		console.log(' Folders respuesta');
		console.log(data);


		for (let i=0;i<data.data.length;i++){
			if (data.data[i].attributes.name==='Project Files'){
				setLastLevel(0);
				urnfolder = data.data[i].id;
				setAllLevels( (state)=>{

					return[...state,[
						{
							Id:data.data[i].id,
							Descripcion:data.data[i].attributes.name,
							PhantomParentId:idproy,		
						},
						
					]]

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
	let folders=[];

	const DatosContentFolders = async () => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/data/v1/projects/" + idproy +"/folders/" + urnfolder + "/contents",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		console.log(' Content Folders respuesta');
		console.log(data);

		let arreglo=[];
		let arreglo1=[];
		for (let i=0;i<data.data.length;i++){
				
				if (data.data[i].type==='folders'){
					folders.push(data.data[i].id);
				}

				arreglo.push(
					{
						Id:data.data[i].id,
						Descripcion:data.data[i].attributes.displayName,
						PhantomParentId:urnfolder
					},
					)
					
					for (let j=0;j<data.included.length;j++){
						if (data.data[i].attributes.displayName === data.included[j].attributes.name){

							arreglo1.push(
								{
									Id:data.included[j].id,
									Descripcion:'Version '+ data.included[j].attributes.versionNumber + ' ' + data.included[j].attributes.lastModifiedTime,
									PhantomParentId:data.data[i].id
								},
								)
						}	
					}
		}
		
		console.log(arreglo);
		setAllLevels( (state)=>{
		return[...state,
			arreglo,arreglo1			
		]
		});
		setLastLevel(4);
		setLoading(false);
		console.log(allLevels);
		
		for (let i=0;i<folders.length;i++){
			let resp = await DatosContentFolders1(folders[i]);
		}
		
		
		return '1';


	}





	const DatosContentFolders1 = async (idf) => {
		//console.log('Se llama Hubs ' + "Bearer ");
		const { data } = await axiosmdl.get(
			"/data/v1/projects/" + idproy +"/folders/" + idf + "/contents",
			{
				headers:
				{
					Authorization: "Bearer " + token
				},
			}
		);
		console.log(' Content Folders respuesta');
		console.log(data);

		let arreglo=[];
		let arreglo1=[];
		for (let i=0;i<data.data.length;i++){
				
				if (data.data[i].type==='folders'){
					folders.push(data.data[i].id);
				}

				arreglo.push(
					{
						Id:data.data[i].id,
						Descripcion:data.data[i].attributes.displayName,
						PhantomParentId:idf
					},
					)
					
					for (let j=0;j<data.included.length;j++){
						if (data.data[i].attributes.displayName === data.included[j].attributes.name){

							arreglo1.push(
								{
									Id:data.included[j].id,
									Descripcion:'Version '+ data.included[j].attributes.versionNumber + ' ' + data.included[j].attributes.lastModifiedTime,
									PhantomParentId:data.data[i].id
								},
								)
						}	
					}
		}
		
		console.log(arreglo);
		/*setAllLevels( (state)=>{
			return[...state,
				arreglo,arreglo1			
			]
			});*/

		setAllLevels( (state)=>{
			return[state[0],state[1],state[2],state[3].concat(arreglo), arreglo1]
			});

		setLastLevel(5);
		setLoading(false);
		//console.log('all levels final');
		//console.log(allLevels);
		return '1';

	}




	const drawerItems = (level, filtro, parentId = '', parentName = '') => {

		const nextLevel = (level + 1);
		//console.log('este es el primer elemento');
		//console.log(allLevels[level]);
		console.log('All levels final');
		console.log(allLevels);

		return allLevels && allLevels[level]
			? allLevels[level]
				.filter(item => parentId === '' || item.PhantomParentId === parentId)
				.map(filter => {
					const newTitle = level === 1 ? '' : `${parentName}${filter.Descripcion}`;
					return (
						
						<StyledTreeItem
							nodeId={filter.Id}
							label={filter.Descripcion}
							key={filter.Id}
							onLabelClick={() => changeItem(filter, newTitle)}
							labelIcon={LocalOfferIcon}
						>
							{(nextLevel === lastLevel-1
								? allLevels[nextLevel].filter(item => filter.Id === item.PhantomParentId).map(grupo3 => (
									// <Link 
									// 	to={`/projects/id-pc/${grupo3.CodPartidaDeControl}`}
									// 	onLabelClick={() => {
									// 		dispatch(navigationTree(newTitle, grupo3.Descripcion))
									// 		dispatch(cleanDataChart());
									// 		dispatch(selectPc(proyects.idCard, grupo3.CodPartidaDeControl,  auth.User.UserId))

									// 	}} 
									// 	key={grupo3.CodPartidaDeControl}
									// 	style={{background: '#000'}}
									// >

									<StyledTreeItem
										nodeId={grupo3.Id}
										label={grupo3.Descripcion}
										onLabelClick={() => changeItem(grupo3, `${newTitle} / ${grupo3.Descripcion}`)}
										labelIcon={LocalOfferIcon}
									/>
									// </Link>
								))
								: drawerItems(nextLevel, filtro, filter.Id, (level === 1 ? '' : `${newTitle} / `))

							)}

						</StyledTreeItem> 
					)
				})
			: (<>
				{
					''
				}
			</>
			)
	}




	/*const drawerItems1 = () => {

		if (allLevels1 == null || allLevels1 == undefined) return;
		if (allLevels1[0] == null || allLevels1[0] == undefined) return;
		//console.log('datos de subProyectos actualizados')
		//console.log(allLevels1[0])

		return allLevels1[0].map(filter => {
			//const newTitle = `${parentName}${filter.Descripcion}`;
			return (
				<StyledTreeItem
					nodeId={filter.CodSubpresupuesto}
					label={filter.Descripcion}
					key={filter.CodSubpresupuesto}
					onLabelClick={() => changeItem1(filter)}
				>
				</StyledTreeItem>
			)
		})

	}*/












	return (
		<>
			<h1>{filtrado}</h1>
			{/* <div className="" style={{fontSize: 15, color:'black', overflow:'scroll', height:'40vh', top:'0px', left:'0px', width:'100%'}}> */}
			<TreeView

				className={classes.root}
				defaultExpanded={['1']}
				defaultCollapseIcon={<MinusSquare />}
				defaultExpandIcon={<PlusSquare />}
				defaultEndIcon={<CloseSquare />}
				defaultParentIcon={<CloseSquare1 />}
			>

				{
					loading ? 'Cargando...' :
						drawerItems(0, filtrado)

				}
			</TreeView>
			{/* </div> */}



			{/* <div className="" style={{position: 'relative',fontSize: 15, color:'black', overflow:'scroll', height:'25vh', marginTop:'-50px', top:'-80px', left:'0px', width:'100%' }}>
			<h1>SubPresupuestos </h1>
			<TreeView
				className={classes.root}
				defaultExpanded={['1']}
				defaultCollapseIcon={<MinusSquare />}
				defaultExpandIcon={<PlusSquare />}
				defaultEndIcon={<CloseSquare />}
			>
			
			{
				//'Cargando1...'
				drawerItems1()
				
			}
			</TreeView>
			</div> */}
		</>
	);
}

export default TreeMD
