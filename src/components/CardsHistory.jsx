import {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import Moment from 'react-moment';
// import {
// 	ListarPorPeriodo,
// 	ProjectDetails,
// 	listHistory,
// } from "../actions/proyects.actions";

const CardsHistory = () => {
	// const dispatch = useDispatch();
	const proyects = useSelector((state) => state.proyects);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(proyects.listHistory);
		setLoading(false);
		console.log(data);
		// if (!data) {
		// 	return (<h1>No hay datos para mostrar</h1>)
		// }
	}, [proyects.listHistory]);


	return (
		<>
			{
				loading ? 'Cargando...' : (
					<>
							{
						data.map(data => (
							<Card className="w-100 mb-3">
						
							<Card.Body className="p-1">
								<div className="d-flex justify-content-around align-items-center">
									<Card.Text className="mb-1">
										{data.Periodo}
									</Card.Text>
				
									<Card.Text className="mb-1">
										<Button variant="outline-primary" size="sm" className="my-2">Recursos del mes</Button>
									</Card.Text>
									<Card.Text className="text-primary mb-2">
										<Button variant="outline-primary" size="sm" className="my-2">Recursos acumulado</Button>	
									</Card.Text>
								</div>
				
								<div className="d-flex justify-content-around">
									<div>
										<Card.Text className="d-flex align-items-center mb-1">
											<div
												className="bg-blue card-h5 mr-2 d-flex"
												style={{
													width: 10,
													height: 10,
													borderRadius: "50%",
												}}
											></div>
											Programado
										</Card.Text>
										<p className="mb-1 text-right"> {Intl.NumberFormat("en").format(data.M_ProgramadoValorizado)}</p>
										<p className="mb-1 text-right"> {data.PorcentajeProgramado}%</p>
										<p className="mb-1 text-right">{ Intl.NumberFormat("en").format(data.M_ProgramadoValorizadoAcumulado)}</p>
										<p className="mb-1 text-right">{ data.PorcentajeProgramadoAcumulado}%</p>
									</div>
				
									<div>
										<Card.Text className="d-flex align-items-center mb-1">
											<div
												className="bg-yellow card-h5 mr-2 "
												style={{
													width: 10,
													height: 10,
													borderRadius: "50%",
												}}
											></div>
											Valorizado
										</Card.Text>
										<p className="mb-1 text-right">
											{ Intl.NumberFormat("en").format(data.M_ValorizadoValorizado)}
										</p>
										<p className="mb-1 text-right">
											{data.PorcentajeValorizado}%
										</p>
										<p className="mb-1 text-right text-danger">
											{Intl.NumberFormat("en").format(data.M_ValorizadoValorizadoAcumulado) }
										</p>
										<div className="mb-1 text-right text-danger">
											{data.PorcentajeValorizadoAcumulado}%
										</div>
										
									</div>
				
									<div>
										<Card.Text className="d-flex align-items-center mb-1">
											<div
												className="bg-green card-h5 mr-2"
												style={{
													width: 10,
													height: 10,
													borderRadius: "50%",
												}}
											></div>
											Real
										</Card.Text>
										<p className="mb-1 text-right text-success">{Intl.NumberFormat("en").format(data.M_RealValorizado) }</p>
										<p className="mb-1 text-right text-success">
											{data.PorcentajeReal}%
										</p>
										<p className="mb-1 text-right text-success">
											{Intl.NumberFormat("en").format(data.M_RealValorizadoAcumulado)}
										</p>
										<p className="mb-1 text-right text-success">{data.PorcentajeRealAcumulado}%</p>
									</div>
				
									<div>
										<h5 className="card-h5">Fa</h5>
										<p className="mb-1 text-right text-dark"> {Intl.NumberFormat("en").format(data.FA)}</p>
										<p className="mb-1 text-right text-dark">{data.PorcentajeFA}%</p>
										<p className="mb-1 text-right text-danger">{Intl.NumberFormat("en").format(data.FAAcumulado) }</p>
										<p className="mb-1 text-right text-danger">{data.PorcentajeFAAcumulado}%</p>
									
									</div>
				
									<div>
										<h5>Fc</h5>
										<p className="mb-1 text-right text-danger text-right"> {Intl.NumberFormat("en").format(data.FC)}</p>
										<p className="mb-1 text-right text-danger text-right">{data.PorcentajeFC}%</p>
										<p className="mb-1 text-right text-danger text-right">{Intl.NumberFormat("en").format(data.FCAcumulado)}</p>
										<p className="mb-1 text-right text-danger text-right">{data.PorcentajeFCAcumulado}%</p>
									</div>
								</div>
				
								<div className="w-100">
									<div className="progress-group row">
										<div className="col-md-11">
											<div className="progress progress-sm m-2">
												<div
													className="progress-bar bg-blue"
													style={{
														width: `${data.PorcentajeProgramadoAcumulado}%`,
													}}
												></div>
											</div>
										</div>
				
										<div className="col-md-1 p-0">
											<b className="porcentaje-barra">
												{data.PorcentajeProgramadoAcumulado}%
											</b>
										</div>
									</div>
				
									<div className="progress-group row">
										<div className="col-md-11">
											<div className="progress progress-sm m-2">
												<div
													className="progress-bar bg-yellow"
													style={{
														width: `${data.PorcentajeValorizadoAcumulado}%`,
													}}
												></div>
											</div>
										</div>
				
										<div className="col-md-1 p-0 ">
											<b className="porcentaje-barra">
												{" "}
												{data.PorcentajeValorizadoAcumulado}%
											</b>
										</div>
									</div>
				
									<div className="progress-group row">
										<div className="col-md-11">
											<div className="progress progress-sm m-2">
												<div
													className="progress-bar bg-success"
													style={{
														width: `${data.PorcentajeRealAcumulado}%`,
													}}
												></div>
											</div>
										</div>
				
										<div className="col-md-1 p-0">
											<b className="porcentaje-barra">
												{" "}
												{data.PorcentajeRealAcumulado}%
											</b>
										</div>
									</div>
								</div>
							</Card.Body>
						</Card>
						))
					}
					</>
				)
			}
		</>
	);
};

export default CardsHistory;
