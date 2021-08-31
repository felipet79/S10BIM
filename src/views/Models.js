// import {useState} from "react";
import { Col, Nav, Collapse } from "react-bootstrap";
import { useEffect, useState } from "react";
//import Tree from "../components/TreeAll";
//import { Route } from "react-router-dom";
//import IdProyect from "./IdProyect";
import { Resizable } from "re-resizable";
import "../styles/project.css";
import { useDispatch, useSelector } from "react-redux";
//import TreeCP from "../components/TreeCP";
//import IdPc from "./IdPc";
import $ from 'jquery';
//import { RefrescarV, ViewScreen1 } from "./ViewScreen1";
/*import Items from "../components/Items";
import Apus from "../components/Apus";
import Asociados from "../components/Asociados";
import Estructura from "../components/Estructura";
import Calculo from "../components/Calculo";
import Metrados from "../components/Metrados";
import DatosGenerales from "./DatosGenerales";*/
import axios from "axios";
import { selectMODELOS } from "../actions/proyects.actions";
import TreeMD from "../components/TreeMd";
import VisorModelos from "./VisorModelos";
import { RefrescarV } from "./ViewerScM";


const Models = ({ match }) => {
	const codProject = match.params.codProject;
	// console.log(codProject)
	const auth = useSelector((state) => state.auth);
	const proyects = useSelector((state) => state.proyects);
	const [width, setWidth] = useState(260);
	const [height, setHeight] = useState(window.innerHeight );
	const [levelPC, setLevelPC] = useState(1);
	const [level, setLevel] = useState(2);
	const [open, setOpen] = useState(true);

	const [levelPC1, setLevelPC1] = useState(1);
	const [level1, setLevel1] = useState(2);

	const dispatch = useDispatch();

	const [reducido, setReducido] = useState(false);


	const [textoB, setTextoB] = useState('');

	
	
	useEffect(() => {
		console.log('se dispara select modelos')
		//console.log(proyects.DataPc)

		dispatch(selectMODELOS(''));
		//alert('ejecutó la primera carga');
		// console.log(result);
		// }
		// eslint-disable-next-line
	}, [])


	useEffect(() => {
		//alert('');
		setTimeout(() => {
			RefrescarV();
		}, 550);
	}, [proyects.Avisa,])

	

	const reducir = () => {

		/*setReducido(!reducido);
		if (reducido) {
			//$('#DetalleItem').height='10px';
			$("#DetalleItem").animate({ height: "0px" }, 300);
			//alert('');
			$("#forgeViewer").animate({ height: "85vh" }, 300);
			$("#IcnBt").removeClass("fas fa-chevron-down");
			$("#IcnBt").addClass("fas fa-chevron-up");

			$("#ContC1").hide();
			$("#ContC2").hide();

			$("#ContDet").animate({ height: "20px" }, 300);
			setTimeout(() => {
				RefrescarV();
			}, 500);

		} else {
			//$('#DetalleItem').height='200px';
			$("#DetalleItem").animate({ height: "200px" }, 300);

			$("#ContDet").animate({ height: "200px" }, 300);

			//$("#ContenedorTotal").animate({height:"200px"},300);
			$("#forgeViewer").animate({ height: "70vh" }, 300);
			$("#IcnBt").removeClass("fas fa-chevron-up");
			$("#IcnBt").addClass("fas fa-chevron-down");

			$("#ContC1").show();
			$("#ContC2").show();
			setTimeout(() => {
				RefrescarV();
			}, 500);

		}*/




	}


	const buscarPres = (e)=>{

		setTextoB( (state)=>{
			return (e.target.value)
		});
		//console.log(e.target.value);

	}

	return (
		<>
			<div id="ContenedorTotal" className="d-flex flex-wrap justify-content-between overflow-hidden h-100 animate__animated animate__fadeIn" style={{ /*height: '100%'*/ }}>

				<Resizable
					className="tree-fixed p-0 d-flex justify-content-between"
					enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
					size={{ width: width, height: height }}
					//maxHeight="60vh"
					maxWidth={open ? 600 : 0}
					//minHeight="67.5vh"

					minWidth="20px"
					onResizeStop={(e, direction, ref, d) => {
						setWidth(width + d.width);
						setHeight(height + d.height);
						//alert('');
						//$("#forgeViewer").animate({ height: height + d.height }, 100);

						//$("#DetalleItem").animate({ height: window.innerHeight - (height + d.height) - 130 }, 100);

						//alert('');

						setTimeout(() => {
							RefrescarV();
						}, 50);
					}}
				//onResize={()=>{alert('hola')}}
				//onResizeStop={()=>{}}

				>




					<Collapse in={open}>


						<div className="p-0 h-100 w-100" style={{ overflow: 'scroll',
							background: 'rgb(242,245,246)',
							background: '-moz-linear-gradient(top, rgba(242,245,246,1) 0%, rgba(227,234,237,1) 37%, rgba(200,215,220,1) 100%)',
							background: '-webkit-linear-gradient(top, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%)',
							background: 'linear-gradient(to bottom, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%)',
							filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#f2f5f6", endColorstr="#c8d7dc",GradientType=0 )',					
						}}>


							

							{/* <!-- SidebarSearch Form --> */}
							<div className="form mt-3">
								<div className="input-group" data-widget="">
									<input
										className="form-control form-control"
										type="search"
										placeholder="Search"
										aria-label="Search"
										value={textoB}
										onChange={buscarPres}
									/>
									<div className="input-group-append">
										<button className="btn btn-sidebar">
											<i className="fas fa-search fa-fw"></i>
										</button>
									</div>
								</div>
							</div>
							
							{levelPC1 === 1 ? (
								<TreeMD
									Accion="Generales"
									filtrado={textoB}
									levelStart={1}
									idProject=""
									marginTop="60"
									marginLeft='0'
								/>



							) : ( ''
							)}


						</div>
					</Collapse>
					<div
						className="bara-cerrar d-flex align-items-center barras"
						style={{
							width: 12,
							height: "100%",
							/*background: "#dee2e6",*/
							marginLeft: 5,
						}}
					>
						<div
							style={{ cursor: "pointer",
							background: 'rgb(184,225,252)',
							background: '-moz-linear-gradient(top, rgba(184,225,252,1) 0%, rgba(169,210,243,1) 10%, rgba(144,186,228,1) 25%, rgba(144,188,234,1) 37%, rgba(144,191,240,1) 50%, rgba(107,168,229,1) 51%, rgba(162,218,245,1) 83%, rgba(189,243,253,1) 100%)',
							background: '-webkit-linear-gradient(top, rgba(184,225,252,1) 0%,rgba(169,210,243,1) 10%,rgba(144,186,228,1) 25%,rgba(144,188,234,1) 37%,rgba(144,191,240,1) 50%,rgba(107,168,229,1) 51%,rgba(162,218,245,1) 83%,rgba(189,243,253,1) 100%)',
							background: 'linear-gradient(to bottom, rgba(184,225,252,1) 0%,rgba(169,210,243,1) 10%,rgba(144,186,228,1) 25%,rgba(144,188,234,1) 37%,rgba(144,191,240,1) 50%,rgba(107,168,229,1) 51%,rgba(162,218,245,1) 83%,rgba(189,243,253,1) 100%)',
							filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#b8e1fc", endColorstr="#bdf3fd",GradientType=0'						
						}}
							className="h-25 w-100 bg-primary d-flex justify-contentcenter align-items-center"
							onClick={() => {
								setOpen(!open);
								setTimeout(() => {
									RefrescarV();
								}, 50);
		


							}}
							aria-controls="example-collapse-text"
							aria-expanded={open}
						>
							{open ? (
								<ion-icon name="caret-back-outline"></ion-icon>
							) : (
								<ion-icon name="caret-forward-outline"></ion-icon>
							)}
						</div>
					</div>
				</Resizable>

				<Col className="w-100" style={{height:'100%'}}>
					<VisorModelos/>
				</Col>

			</div>

			

		</>
	);
};

export default Models;
