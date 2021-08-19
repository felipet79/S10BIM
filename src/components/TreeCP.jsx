import { useEffect, useState } from "react";
import { cleanDataChart, cleanDataChart1, selectPc, navigationTree, navigationTreePC, selectItems, cambiaSeleccion, SeleccionaSub } from '../actions/proyects.actions';
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";


import subprojectIcon from '../assets/img/icons/subproject.png';
import projectIcon from '../assets/img/icons/project.png';


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

const TreeCP = ({ levelStart, idProject, filtrado, Accion }) => {
	let history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)
	const [itemSelected, setItemSelected] = useState('')
	const [lastLevel, setLastLevel] = useState(0);


	const [allLevels1, setAllLevels1] = useState(null)
	const [itemSelected1, setItemSelected1] = useState('')
	const [lastLevel1, setLastLevel1] = useState(0);


	const [loading, setLoading] = useState(true);

	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);
	//alert(' inicializando treeeee' );
	const subproyects = useSelector((state) => state.subproyects);

	useEffect(() => {
		async function init() {
			let company = JSON.parse(localStorage.getItem("company-s10"));
			let connectId = await localStorage.getItem("connectionId");
			//console.log('connectId desde tree: ' + connectId + company + idProject)  ;
			if (company && auth.User) {
				//alert(data);
				const { data } = await axios.post(
					"",
					{
						HasOutputParam: false,
						ObjectName: `dbo.S10_01_Presupuesto_ListarArbol 'ncortez@s10peru.com'`,
						RequestId: "PARTY_CONTROL",
						SignalRConnectionID: connectId,
						SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
					},
					{
						headers: {
							Token: company.Token,
							ModuleId: 21,
						},
					}
				);
				//console.log(' data del response' + data);			
				//console.log(idProject);
			}
			setLoading(false)
		}
		init()
		// eslint-disable-next-line
	}, []);


	useEffect(() => {
		async function init() {
			let company = JSON.parse(localStorage.getItem("company-s10"));
			let connectId = await localStorage.getItem("connectionId");
			//console.log('connectId desde tree: ' + connectId + company + idProject)  ;
			console.log(' LLAMANDO A LISTAR TODOS');
			//request.AddParameter("Data", jsonString );			
			if (company && auth.User) {
				//alert(data);
				const { data } = await axios.post(
					"",
					{
						HasOutputParam: false,
						ObjectName: `dbo.S10_01_Subpresupuesto_ListarTodos '001'`,
						RequestId: "LISTAR_SUBS",
						SignalRConnectionID: connectId,
						SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
						//Data:"[{'P':'001','O':0}]",
					},
					{
						headers: {
							Token: company.Token,
							ModuleId: 21,
						},
					}
				);

				//console.log(idProject);
			}
			//setLoading(false)
		}
		init()
		// eslint-disable-next-line
	}, []);




	const orderTree = (tree) => {
		let orderedLevels = {};
		if (!tree) return;
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			if (item.Nivel >= levelStart) {
				if (!orderedLevels[item.Nivel])
					orderedLevels[item.Nivel] = []
				if (item.Nivel > lastLevel)
					setLastLevel(item.Nivel)
				orderedLevels[item.Nivel].push({ ...item, open: false })
			}
		}
		setAllLevels(orderedLevels);

	}


	const orderTree1 = (tree) => {
		let orderedLevels1 = {};
		orderedLevels1[0] = [];
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];

			orderedLevels1[0].push({ ...item, open: false })

		}
		setAllLevels1(orderedLevels1);

	}

	useEffect(() => {
		//console.log('datos de subProyectos actualizados')
		if (proyects.treeSubControl == undefined) return;
		//console.log(proyects.treeSubControl)
		orderTree1(proyects.treeSubControl);
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [proyects.treeSubControl])




	useEffect(() => {
		//console.log('datos de proyectos')
		//console.log(proyects.treePartyControl)
		orderTree(proyects.treePartyControl);
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [levelStart, proyects.treePartyControl])





	const changeItem = (pc, newTitle) => {
		if (Accion == "Generales") {
			dispatch(cambiaSeleccion(1));
			dispatch(navigationTreePC(newTitle))
		}		
		//console.log('')
		if (Accion == "Generales") {
			//proyects.seleccion=1;
			//selectSeleccion(1);
			if (itemSelected === pc.CodPresupuesto) return;
			DatosPresupuesto(pc.CodPresupuesto);
			setItemSelected(pc.CodPresupuesto);
			//dispatch(cleanDataChart());
			SubPresupuestos(pc.CodPresupuesto);

		}else{
			DatosPresupuesto(pc.CodPresupuesto);
			SubPresupuestos(pc.CodPresupuesto);
			//alert(proyects.treeSubControl.length);
			//dispatch(selectItems(idpadre, pc.CodSubpresupuesto, ''));
			//dispatch(cleanDataChart());


		}


		//alert(pc.CodPresupuesto + " " + newTitle);



		//dispatch(selectPc(proyects.idCard, pc.CodPresupuesto,  auth.User.UserId))
		//history.push(`/projects/id-pc/${pc.CodPresupuesto}`)

		// console.log('el id de este item es ', filter.CodPartidaDeControl, proyects.idCard)
	}


	const changeItem1 = (pc, newTitle, idpadre) => {
		//alert(itemSelected + " : " + pc.CodSubpresupuesto + " ");

		if (Accion == "Generales") {

			
			dispatch(cambiaSeleccion(2));
			dispatch(SeleccionaSub(pc.CodSubpresupuesto))			
			DatosPresupuesto(idpadre);
			setItemSelected(idpadre);
			SubPresupuestos(idpadre);
			
			//if (itemSelected === pc.CodPresupuesto) return;
			dispatch(navigationTreePC(newTitle))			

		}else
		{
			if (itemSelected1 === pc.CodSubpresupuesto && itemSelected === idpadre) return;
			setItemSelected1(pc.CodSubpresupuesto);
			dispatch(SeleccionaSub(pc.CodSubpresupuesto))			
			//SubPresupuestos(idpadre);
			setItemSelected(idpadre);
			//dispatch(navigationTreePC(pc.CodSubpresupuesto))
			dispatch(selectItems(idpadre, pc.CodSubpresupuesto, ''));
			dispatch(cleanDataChart());
	

		}

		





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
			const { data } = await axios.post(
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
			);
			//console.log(' data del response' + data);
			return '1';
			// console.log(idProject);
		}

	}



	const DatosPresupuesto = async (codigoP) => {
		//alert(codigoP);		
		let company = JSON.parse(localStorage.getItem("company-s10"));
		let connectId = await localStorage.getItem("connectionId");
		//console.log('connectId desde tree: ' + connectId + company + idProject);
		if (company && auth.User) {
			//alert(data);
			const { data } = await axios.post(
				"",
				{
					HasOutputParam: false,
					//ObjectName: `dbo.S10_06_PartidaDeControl_ListarCatalogo '${idProject}'`,
					ObjectName: `dbo.S10_01_Presupuesto_LeerRegistro '${codigoP}'`,
					RequestId: "LEER_PRESUPUESTO",
					SignalRConnectionID: connectId,
					SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
				},
				{
					headers: {
						Token: company.Token,
						ModuleId: 21,
					},
				}
			);
			//console.log(' data del response' + data);
			return '1';
			// console.log(idProject);
		}

	}



	const drawerItems = (level, filtro, parentId = '', parentName = '') => {

		const nextLevel = (level + 1);
		if (level == 4) {
			//SubPresupuestos(parentId);
			//console.log('subpresupuestos: ');
			//console.log(proyects.treeSubControl);
		}
		return allLevels && allLevels[level]
			? allLevels[level]
				//.filter(item => item.Descripcion.indexOf(filtro))
				.filter(item => parentId === '' || item.PhantomParentId === parentId)
				.map(filter => {
					const newTitle = level === 1 ? '' : `${parentName}${filter.Descripcion}`;
					return (

						<StyledTreeItem
							nodeId={filter.CodPresupuesto}
							label={filter.Descripcion}
							key={filter.CodPresupuesto}
							onLabelClick={() => changeItem(filter, newTitle)}
						>
							{(nextLevel === lastLevel
								? allLevels[nextLevel].filter(item => filter.CodPresupuesto === item.PhantomParentId).map(grupo3 => (
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
										nodeId={grupo3.CodPresupuesto}
										label={grupo3.Descripcion}
										onLabelClick={() => changeItem(grupo3, `${newTitle} / ${grupo3.Descripcion}`)}
									/>
									// </Link>
								))
								: drawerItems(nextLevel, filtro, filter.CodPresupuesto, (level === 1 ? '' : `${newTitle} / `))

							)}

						</StyledTreeItem>
					)
				})
			: (<>
				{
					proyects.subPres ? (
						proyects.subPres.filter(item => item.CodPresupuesto === parentId).map(data => {
							return (
								<StyledTreeItem
									//nodeId={parentId}
									nodeId={data.CodSubpresupuesto}
									label={data.Descripcion}
									key={data.CodSubpresupuesto}
									//onLabelClick={( ) => changeItem1('', `${''} / ${''}`)}
									onLabelClick={() => changeItem1(data, `${/*newTitle*/''} ${parentName}  ${data.Descripcion}` ,parentId)}
								/>)
						})) : ''
				}
			</>
			)
	}




	const drawerItems1 = () => {

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

	}












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
			>

				{
					loading ? 'Cargando...' :
						drawerItems(1, filtrado)

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

export default TreeCP
