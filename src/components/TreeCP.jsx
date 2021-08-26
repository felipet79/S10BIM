import { useEffect, useState } from "react";
import { cleanDataChart, cleanDataChart1, selectPc, navigationTree, navigationTreePC, selectItems, cambiaSeleccion, SeleccionaSub, selectMODELOS } from '../actions/proyects.actions';
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { useHistory } from "react-router-dom";
import axios from "../config/axios";


import subprojectIcon from '../assets/img/icons/subproject.png';
import projectIcon from '../assets/img/icons/project.png';


import { useSelector, useDispatch } from "react-redux";
import { red } from "@material-ui/core/colors";
import { ContextMenu } from "devextreme-react";
import notify from 'devextreme/ui/notify';
import DatosGenerales from "../views/DatosGenerales";
import { Button } from "react-bootstrap";


const opcMenuInicio = [
	{
	  text: 'Nuevo',
	  items: [
		{ text: 'Presupuesto' },
		{ text: 'SubPresupuesto' }]
	},
	{ text: 'Datos Generales' },
	{ text: 'Asinar Modelo' }
  ];	  


function MinusSquare(props) {
	return (
		<div className="d-flex">
			<ion-icon name="chevron-down-outline"></ion-icon>
			<img src={projectIcon} alt="icons" width="10" style={{ marginRight: 20 }} {...props} />
		</div>
	);
}

function PlusSquare(props) {
	return (
		<div className="d-flex">
			<ion-icon name="chevron-forward-outline"></ion-icon>
			<img src={projectIcon} alt="icons" width="20" style={{ marginRight: 20 }} {...props} />

		</div>
	);
}

function CloseSquare(props) {
	return (
		<img src={subprojectIcon} width="20" alt="icons" style={{ marginRight: 20 }} {...props} />
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
		marginLeft: 15,
		paddingLeft: 5,
		borderLeft: `2px dashed ${alpha(theme.palette.text.primary, 0.3)}`,
	},
}))((props) => <TreeItem {...props} />);

const useStyles = makeStyles({
	root: {
		font: "26px Arial, sans-serif",
		marginTop: 10,
		marginLeft: 15,
		height: 264,
		flexGrow: 1,
		maxWidth: 700,
	},
});

const TreeCP = ({ levelStart=1, idProject, filtrado, Accion }) => {
	let history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [allLevels, setAllLevels] = useState(null)
	
	const [opcMenu, setOpcMenu] = useState(opcMenuInicio)
	const [ancho, setAncho] = useState('87vw')
	
	const [itemSelected, setItemSelected] = useState('')
	const [tipoSeleccion, setTipoSeleccion] = useState('')


	const [lastLevel, setLastLevel] = useState(0);


	const [allLevels1, setAllLevels1] = useState(null)
	const [itemSelected1, setItemSelected1] = useState('')
	const [lastLevel1, setLastLevel1] = useState(0);


	const [loading, setLoading] = useState(true);


	const [datosgenerales, setDatosGenerales] = useState(false);
	const [datosgeneralessub, setDatosGeneralesSub] = useState(false);


	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);
	//alert(' inicializando treeeee' );
	const subproyects = useSelector((state) => state.subproyects);



	




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
		//alert('se ejcuta carga1');
		//console.log('datos de proyectos')
		//console.log(proyects.treePartyControl)
		setLoading(false);
		orderTree(proyects.treePartyControl);	
		//alert('se ejcuta carga1');
		dispatch(selectMODELOS(''));
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [proyects.treePartyControl],[])


	useEffect(() => {
		//alert('se ejcuta carga2');
		//console.log('datos de subProyectos actualizados')
		setLoading(false);
		//console.log(proyects.treeSubControl)

		if (proyects.treeSubControl === undefined) return;
		orderTree1(proyects.treeSubControl);
		

		
		//setLoading(false);
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [proyects.treeSubControl],[])









	const changeItem = (pc, newTitle) => {
		
		
		//alert(pc.CodPresupuesto + " " + newTitle + ' ' + pc.Nivel);
		
		if (pc.Nivel===1){
			setOpcMenu([
				{
				  text: 'Nuevo',
				  items: [
					{ text: 'Item de Presupuesto' },
					{ text: 'Item de ' + pc.Descripcion },	
				]
				},
				/*{ text: 'Datos Generales' },
				{ text: 'Asinar Modelo' }*/
			  ])

		}
		
		if (pc.Nivel===2){
			setOpcMenu([
				{
				  text: 'Nuevo',
				  items: [
					{ text: 'Presupuesto' },
					]
				},
				/*{ text: 'Datos Generales' },
				{ text: 'Asinar Modelo' }*/
			  ])

		}


		if (pc.Nivel===3){

			setOpcMenu([
				{
					text: 'Nuevo',
					items: [					  
					  { text: 'SubPresupuesto' }]
				  },
  
				{ text: 'Datos Generales' },
				
			  ])


		}


		dispatch(cambiaSeleccion(1));
		dispatch(navigationTreePC(newTitle))
		
		setItemSelected(pc.CodPresupuesto);
		setTipoSeleccion('Presupuesto');

		DatosPresupuesto(pc.CodPresupuesto);
		SubPresupuestos(pc.CodPresupuesto);

		//console.log('')
		/*if (Accion == "Generales") {
			//proyects.seleccion=1;
			//selectSeleccion(1);
			
			
			//if (itemSelected === pc.CodPresupuesto) return;
			
			//setItemSelected(pc.CodPresupuesto);
			//dispatch(cleanDataChart());
			

		}else{
			DatosPresupuesto(pc.CodPresupuesto);
			SubPresupuestos(pc.CodPresupuesto);
			//alert(proyects.treeSubControl.length);
			//dispatch(selectItems(idpadre, pc.CodSubpresupuesto, ''));
			//dispatch(cleanDataChart());


		}*/


		//alert(pc.CodPresupuesto + " " + newTitle);



		//dispatch(selectPc(proyects.idCard, pc.CodPresupuesto,  auth.User.UserId))
		//history.push(`/projects/id-pc/${pc.CodPresupuesto}`)

		// console.log('el id de este item es ', filter.CodPartidaDeControl, proyects.idCard)
	}


	const changeItem1 = (pc, newTitle, idpadre) => {
		//alert(itemSelected + " : " + pc.CodSubpresupuesto + " ");

			setOpcMenu([
				{ text: 'Datos Generales' },
				{ text: 'Asinar Modelo' }
			  ])




		dispatch(navigationTreePC(newTitle))			

		//setItemSelected(pc.CodPresupuesto);
		setItemSelected(idpadre);
		setTipoSeleccion('SubPresupuesto');
		setItemSelected1(pc.CodSubpresupuesto);


		dispatch(cambiaSeleccion(2));
		dispatch(SeleccionaSub(pc.CodSubpresupuesto))			
		DatosPresupuesto(idpadre);
		//SubPresupuestos(idpadre);

		//dispatch(SeleccionaSub(pc.CodSubpresupuesto))			
		dispatch(selectItems(idpadre, pc.CodSubpresupuesto, ''));
		dispatch(cleanDataChart());

		if (Accion == "Generales") {

			
			
			//if (itemSelected === pc.CodPresupuesto) return;
			

		}else
		{
			//if (itemSelected1 === pc.CodSubpresupuesto && itemSelected === idpadre) return;
			

			//SubPresupuestos(idpadre);
			//setItemSelected(idpadre);
			//dispatch(navigationTreePC(pc.CodSubpresupuesto))
	

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
		//alert('carga de items');
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


	useEffect(() => {
		//drawerItems(1, filtrado)
		//alert('');
		if (proyects.Avisa!==undefined) 
		{
			if (proyects.Avisa===1) 
				setAncho('87vw');
				else
				setAncho('95vw');
		}
		if (proyects.Avisa===undefined) 
		setAncho('89vw');
	}, [proyects.Avisa,] )

	


	function itemClick(e) {
		if (!e.itemData.items) {
		  //notify(`The "${ e.itemData.text }" item was clicked`, 'success', 1500);
			if (e.itemData.text==='Datos Generales')
			{
				//alert('Datos generales : Pres ' + itemSelected + ' Sub ' + itemSelected1 + ' tipo '+ tipoSeleccion);
				if (tipoSeleccion==='Presupuesto')
					setDatosGenerales(true);
					else
					setDatosGeneralesSub(true);
			}

		}
	  }







	return (
		<>
			<h1>{filtrado}</h1>
			{/* <div className="" style={{fontSize: 15, color:'black', overflow:'scroll', height:'40vh', top:'0px', left:'0px', width:'100%'}}> */}
			<TreeView
				id='Tree'
				className={classes.root}
				//defaultExpanded={['1']}
				defaultCollapseIcon={<MinusSquare />}
				defaultExpandIcon={<PlusSquare />}
				defaultEndIcon={<CloseSquare />}
			>

				{
					loading ? 'Cargando...' :
						drawerItems(levelStart, filtrado)

				}
			</TreeView>
			{/* </div> */}

			<ContextMenu
				dataSource={opcMenu}
				width={160}
				target="#Tree"
				onItemClick={itemClick} 
			/>

			{datosgenerales && 
			<>
				<div className="" style={{ position: 'absolute', height:'92vh', width:ancho, marginTop:'-5px', top:'-5px', left:'-20px', zIndex:'9' }}>

				<DatosGenerales/>

				<Button variant="outline-secondary" style={{position:'absolute', right:'18px', top:'20px'}} onClick={() => {
                                        setDatosGenerales(false)
									}
                                    }><i class="fas fa-times"></i></Button>

				{/* <div className="btn btn-outline-dark" style={{position: 'absolute', height:'35px', width:'35px', top:'10px', right:'10px', color:'#CDCDCD' }} onClick={ () => { setDatosGenerales(false) }}>
					<i className="far fa-window-close fa-3x" style={{position:'absolute', top:'-2px', left:'-3px'}}></i>
				</div> */}


				</div>

			</>}


			{datosgeneralessub && 
			<>
				<div className="" style={{ position: 'absolute', height:'25vh', width:ancho,marginTop:'30wh', top:'30vh', left:'6px', zIndex:'9' }}>

				<DatosGenerales/>

				<Button variant="outline-secondary" style={{position:'absolute', right:'18px', top:'20px'}} onClick={() => {
                                        setDatosGeneralesSub(false)
									}
                }><i class="fas fa-times"></i></Button>

				{/* <div className="btn btn-outline-dark" style={{position: 'absolute', height:'35px', width:'35px', top:'10px', right:'10px', color:'#CDCDCD' }} onClick={ () => { setDatosGenerales(false) }}>
					<i className="far fa-window-close fa-3x" style={{position:'absolute', top:'-2px', left:'-3px'}}></i>
				</div> */}


				</div>

			</>}


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
