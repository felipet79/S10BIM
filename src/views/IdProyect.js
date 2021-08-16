import {useState, useEffect} from "react";
import {Row, Container, Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import Moment from "react-moment";
import Operativos from "../components/Operativos";
import CardNoData from '../components/NoData/CardNoData';
// import Proyeccion from "../components/Proyeccion";

const IdProyect = () => {
	const proyects = useSelector((state) => state.proyects);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [idCard, setIdCard] = useState({});

	useEffect(() => {
		if (proyects.idCard && proyects.DataCards) {
			setIdCard(proyects.idCard);
			console.log(proyects.DataCards)
			let result = proyects.DataCards.filter(
				(ids) => ids.CodProyecto === proyects.idCard
			);

			setData(result);
			// console.log(result);
			setLoading(false);
		}
	}, [proyects.idCard, proyects.DataCards]);

	if (proyects.idCard !== idCard) return (<Container>Consultando</Container>);

	return (
		<Container>
			{loading ? (
				"Cargando..."
			) : data.length > 0 ? (
				<Row>
					<Card className="w-100 mb-1">
						<Card.Header className="bg-primary text-left p-1 d-flex align-items-center mb-0">
							<h5 className="mb-0 ml-2" style={{color: 'yellow'}}>
							Resultados Operativos
							</h5>
						</Card.Header>
						<Card.Body className="p-1">
						
							<div className="d-flex justify-content-around">
							
								<Card.Text className="mb-1">
									Monto({data[0].Moneda}){" "}
									{Intl.NumberFormat("en").format(data[0].MontoContrato)}
								</Card.Text>

								<Card.Text className="mb-1">
									<Moment format="DD/MM/YYYY">
										{data[0].FechaInicioReal}
									</Moment>{" "}
									-{" "}
									<Moment format="DD/MM/YYYY">
										{data[0].FechaFinReal}
									</Moment>
								</Card.Text>
								<Card.Text className="text-primary mb-2">
									({data[0].ReporteA})
								</Card.Text>

								<p className="m-0 ml-3">Procesado: {data[0].FechaProcesoRO}</p>
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
										Programado ({data[0].Moneda})
									</Card.Text>
									<p className="mb-1">
										{" "}
										{Intl.NumberFormat("en").format(data[0].Programado)}
									</p>
									<p className="mb-1">
										{" "}
										{data[0].PorcentajeProgramado}%
									</p>
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
									<p className="mb-1 text-danger">
										{" "}
										{Intl.NumberFormat("en").format(data[0].Valorizado)}
									</p>
									<p className="mb-1 text-danger">
										{" "}
										{data[0].PorcentajeValorizado}%
									</p>
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
									<p className="mb-1 text-success">
										{" "}
										{Intl.NumberFormat("en").format(data[0].Real)}
									</p>
									<p className="mb-1 text-success">
										{" "}
										{data[0].PorcentajeReal}%
									</p>
								</div>

								<div>
									<h5 className="card-h5">Fa</h5>
									<p className="mb-0 text-danger">
										{" "}
										{data[0].FA}
									</p>
									<p className="mb-0 text-danger">-</p>
								</div>

								<div>
									<h5>Fc</h5>
									<p className="mb-1 text-success">
										{" "}
										{data[0].FC}
									</p>
									<p className="mb-1 text-success">-</p>
								</div>
							</div>

							<div className="w-100">
								<div className="progress-group row">
									<div className="col-md-11">
										<div className="progress progress-sm m-2">
											<div
												className="progress-bar bg-blue"
												style={{
													width: `${data[0].PorcentajeProgramado}%`,
												}}
											></div>
										</div>
									</div>

									<div className="col-md-1 p-0">
										<b  className="porcentaje-barra">{data[0].PorcentajeProgramado}%</b>
									</div>
								</div>

								<div className="progress-group row">
									<div className="col-md-11">
										<div className="progress progress-sm m-2">
											<div
												className="progress-bar bg-yellow"
												style={{
													width: `${data[0].PorcentajeValorizado}%`,
												}}
											></div>
										</div>
									</div>

									<div className="col-md-1 p-0 ">
										<b className="porcentaje-barra"> {data[0].PorcentajeValorizado}%</b>
									</div>
								</div>

								<div className="progress-group row">
									<div className="col-md-11">
										<div className="progress progress-sm m-2">
											<div
												className="progress-bar bg-success"
												style={{
													width: `${data[0].PorcentajeReal}%`,
												}}
											></div>
										</div>
									</div>

									<div className="col-md-1 p-0">
										<b  className="porcentaje-barra"> {data[0].PorcentajeReal}%</b>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
				</Row>
			) : (
				<CardNoData/>
			)}

			<Operativos CodProyect={proyects.idCard}  />
			{/* <Proyeccion /> */}
			{/* <hr />

			<h3 className="text-center mb-3">Liquidez</h3> */}
			
		</Container>
	);
};
export default IdProyect;
