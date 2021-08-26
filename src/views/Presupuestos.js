// import {useState} from "react";
import { Col, Nav, Collapse } from "react-bootstrap";
import { useEffect, useState } from "react";
import Tree from "../components/TreeAll";
import { Route } from "react-router-dom";
import IdProyect from "./IdProyect";
import { Resizable } from "re-resizable";
import "../styles/project.css";
import { useSelector } from "react-redux";
import TreeCP from "../components/TreeCP";
import IdPc from "./IdPc";
import $ from 'jquery';
import { RefrescarV } from "./ViewerSc";
import Items from "../components/Items";
import axios from "../config/axios";


const Presupuestos = ({ match }) => {

	const auth = useSelector((state) => state.auth);
	
	
	const codProject = match.params.codProject;

	// console.log(codProject)
	const proyects = useSelector((state) => state.proyects);
	const [width, setWidth] = useState(400);
	const [height, setHeight] = useState(window.innerHeight);
	const [levelPC, setLevelPC] = useState(1);
	const [level, setLevel] = useState(2);
	const [open, setOpen] = useState(true);

	const [levelPC1, setLevelPC1] = useState(1);
	const [level1, setLevel1] = useState(2);


	const [reducido, setReducido] = useState(false);


	const [textoB, setTextoB] = useState('');


	/*const reducir = () => {

		setReducido(!reducido);
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

		}




	}*/

	
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

			}
			//setLoading(false)
		}
		init()
		// eslint-disable-next-line
	}, []);


	useEffect(() => {
		async function init() {
			//alert('se ejcuta llamado');
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
	//setLevelPC(1);
	
	
	
	const buscarPres = (e) => {

		setTextoB((state) => {
			return (e.target.value)
		});
		//console.log(e.target.value);

	}

	return (
		<>
			<div id="ContenedorTotal" className="d-flex flex-wrap justify-content-between overflow-scroll h-100" style={{ height: '200%' }}>

				<Resizable
					className="tree-fixed p-0 d-flex justify-content-between"
					enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
					size={{ width: width, height: height }}
					marginLeft="-20px"
					//maxHeight="60vh"
					maxWidth={open ? 800 : 0}
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
						}, 100);
					}}
				//onResize={()=>{alert('hola')}}
				//onResizeStop={()=>{}}

				>




					<Collapse in={open}>


						<div id="Conte1" className="p-0 h-100 w-100" style={{ overflow: 'scroll' }}>


							{/* <Nav
							variant="tabs"
							defaultActiveKey="/home"
							className="eyelashes"
						
						>
							<Nav.Item
								onClick={() => {
									setLevel1(2);
									setLevelPC1(1);
								}}
							>
								<Nav.Link href="#" active={level1 === 2}>
									PRESUPUESTOS
								</Nav.Link>
							</Nav.Item>

							<Nav.Item
								onClick={() => {
									setLevel1(1);
									setLevelPC1(2);
								}}
							>
								<Nav.Link
									href="#"
									eventKey="link-1"
									active={level1 === 1}
								>
									DETALLE
								</Nav.Link>
							</Nav.Item>

							

							
						
						</Nav> */}

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
							{/* <div id="DetalleItem" className="mt-0 p-2 h-20 overflow-scroll" style={{ height:'100%', overflow:'scroll' }}> */}
							{levelPC1 === 1 ? (
								<TreeCP
									Accion="Presupuesto"
									filtrado={textoB}
									levelStart={1}
									idProject=""
									marginTop="60"
									marginLeft='0px'
								/>



							) : (''
								// levelPC1 === 2 ? (
								// 	<Items />
								// ) : <Tree levelStart={level} nodeSelected={codProject} />
							)}


							


							{/* </div>  */}



						</div>
					</Collapse>
					<div
						className="bara-cerrar d-flex align-items-center"
						style={{
							width: 12,
							height: "100%",
							background: "#dee2e6",
							marginLeft: 5,
						}}
					>
						<div
							style={{ cursor: "pointer" }}
							className="h-25 w-100 bg-primary d-flex justify-contentcenter align-items-center"
							onClick={() => {
								//alert('se activa');
								

								setOpen(!open);
								

								if (!open){
									document.getElementById("Conte1").style.width = 0;
									setWidth(300);
								}else{
									document.getElementById("Conte1").style.width = '300px';
									setWidth(20);
								}
								//alert('');
								//$("#forgeViewer").animate({ height: height + d.height }, 100);
		
								//$("#DetalleItem").animate({ height: window.innerHeight - (height + d.height) - 130 }, 100);
		
								//alert('');
								


								setTimeout(() => {
									RefrescarV();
								}, 100);								
								



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

				<Col className="w-100">
					{/* <Route
						path="/projects/project/:codProject"
						component={IdProyect}
					/> */}
					{/* <ViewScreen1 /> */}


					{/* <DatosGenerales/> */}
					<Items 
						widthItems={width}
						widthNav={$("#ContenedorSide").innerWidth()}
					/>


					

					


					{/* <Route path="/projects/id-pc/:codPc" component={IdPc} /> */}
				</Col>



			</div>






		</>
	);
};

export default Presupuestos;
