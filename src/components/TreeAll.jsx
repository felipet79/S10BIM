import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {selectProyect, cleanDataChart, navigationTree, selectTree} from '../actions/proyects.actions';
import {alpha, makeStyles, withStyles} from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import {Link} from "react-router-dom";
import axios from "../config/axios";
import subprojectIcon from '../assets/img/icons/subproject.png';
import projectIcon from '../assets/img/icons/project.png';

// import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import {useSelector, useDispatch} from "react-redux";

function MinusSquare(props) {
	return (
		<div className="d-flex">
			<ion-icon name="chevron-down-outline"></ion-icon>
			<img src={projectIcon} alt="icons" width="15" style={{ marginRight: 8}} {...props}/>
		</div>
	);
}

function PlusSquare(props) {
	return (
		<div className="d-flex">
			<ion-icon name="chevron-forward-outline"></ion-icon>
			<img src={projectIcon} alt="icons" width="15" style={{ marginRight: 8}} {...props}/>
			
		</div>
	);
}

function CloseSquare(props) {
	return (
		<img src={subprojectIcon} width="15" alt="icons" style={{ marginRight: 8}} {...props}/>
	);
}

const StyledTreeItem = withStyles((theme) => ({
	iconContainer: {
		"& .close": {
			opacity: 0.3,
		},
	},
	group: {
		marginLeft: 7,
		paddingLeft: 18,
		borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
	},
}))((props) => <TreeItem {...props} />);

const useStyles = makeStyles({
	root: {
		height: 264,
		flexGrow: 1,
		maxWidth: 400,
	},
});

const Tree = ({ levelStart, nodeSelected }) => {
	// console.log(nodeSelected)
	const classes = useStyles();
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(true);
	const [ allLevels, setAllLevels ] = useState(null)
	const [ lastLevel, setLastLevel ] = useState(0);
	const [loading, setLoading] = useState(true);
	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);

	useEffect(() => {
		async function init() {
			let company = JSON.parse(localStorage.getItem("company-s10"));
			let connectId = await localStorage.getItem("connectionId");
			// console.log('connectId desde tree: ' + connectId)
			if(company && auth.User){
				await axios.post( 
				
					"",
					{
						HasOutputParam: false,
						ObjectName: `dbo.s10_06_Proyecto_ListarArbol '${auth.User.UserName}'`,
						RequestId: "ARBOL",
						SignalRConnectionID: connectId,
						SecurityUserId: auth.User.UserId, // SecurityUserId obtenido al logear
					},
					{
						headers: {
							Token: company.Token, // no lo mandes en duro este vence
							ModuleId: 10,
						},
					}
				);
			}

			setLoading(false)
		}
		init();
		// eslint-disable-next-line
	}, []);

	
	const orderTree = (tree) => {
		let orderedLevels = {};
		
		for (let i = 0; i < tree.length; i++) {
			const item = tree[i];
			if (item.Nivel >= levelStart) {
				if (!orderedLevels[item.Nivel])
					orderedLevels[item.Nivel] = []
				if (item.Nivel > lastLevel)
					setLastLevel(item.Nivel)
				orderedLevels[item.Nivel].push({...item, open: item.CodProyecto === nodeSelected})
			}
		}
		setAllLevels(orderedLevels);

	}

	useEffect(() => {
		// if (proyects.TreeProyects && allLevels === null) {
			// const result = proyects.TreeProyects.filter(
			// 	(nivel) => nivel.Nivel >= 2
			// );
			orderTree(proyects.TreeProyects);
			// console.log(result);
		// }
	}, [levelStart, proyects.TreeProyects])
	

	const drawerItems = (level, parentId = '', parentName = '') => {
		const nextLevel = ( level + 1);
		
		return allLevels && allLevels[level]
		? allLevels[level]
			.filter(item => parentId === '' || item.PhantomParentId === parentId)
			.map(filter => {
				const newTitle = `${parentName}${filter.Descripcion}`;
				 return (
				<StyledTreeItem
					nodeId={filter.CodProyecto}
					label={filter.Descripcion}
					key={filter.CodProyecto}
					expanded={proyects.treeSelecteds}
					onLabelClick={ () => dispatch(selectTree(filter.CodProyecto))}
				>
					{( nextLevel === lastLevel
						? allLevels[nextLevel].filter(item => filter.CodProyecto === item.PhantomParentId).map(grupo3 => (
							<Link 
								to={`/projects/project/${grupo3.CodProyecto}`}
								onClick={() => {
									dispatch(navigationTree(`${newTitle} / ${grupo3.Descripcion}`))
									// setSelect(proyects.idCard);
									// alert(newTitle + ' / ' + grupo3.Descripcion)
									// console.log('reiniciando desd operativos.js')
									dispatch(cleanDataChart());
									dispatch(selectProyect(grupo3.CodProyecto, auth.User.UserName, auth.User.UserId))
								}} 
								key={grupo3.CodProyecto}
								style={{background: '#000'}}
							>
								<StyledTreeItem  nodeId={grupo3.CodProyecto} label={grupo3.Descripcion} />
							</Link>
						))
						: drawerItems(nextLevel, filter.PhantomParentId, (`${newTitle} / `))
					)}
				
				</StyledTreeItem>
			)})
			: null
	}

	return (
		<>
			<TreeView
				className={classes.root}
				defaultExpanded={["1"]}
				defaultCollapseIcon={<MinusSquare />}
				defaultExpandIcon={<PlusSquare />}
				defaultEndIcon={<CloseSquare />}
				expanded={proyects.treeSelecteds}
			>
			
			{
				loading ? 'Cargando...' : 
				drawerItems(levelStart)
				
			}
			</TreeView>
		</>
	);
};

Tree.propTypes = {
    levelStart: PropTypes.number,
}


export default Tree;
