import {useState, useEffect} from "react";
import {Row, Container, Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import ControlParty from "../components/ControlParty";
import CardNoData from "../components/NoData/CardNoData";
// import Proyeccion from "../components/Proyeccion";

const IdPc = () => {
	const proyects = useSelector((state) => state.proyects);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});


	useEffect(() => {
		if (proyects.idPc) {
			
			setData(proyects.DataPc[0]);
			// console.log(proyects.DataPc);
			setLoading(false);
		}
	}, [proyects.idPc, proyects.DataPc]);



	return (
		<Container>
			{loading ? (
				"Cargando..."
			) : data ? (
				<Row>
					<Card className="w-100 mb-1">
						<Card.Header className="bg-primary text-left p-1 d-flex align-items-center mb-0">
							<h5 className="mb-0  ml-2" style={{color: 'yellow'}}>
								Resultados Operativos
							</h5>
						</Card.Header>
						<Card.Body className="p-1">
							<div className="d-flex justify-content-around">
								<Card.Text className="mb-1">
									Monto{" "}
									{Intl.NumberFormat("en").format(data.MontoContrato)}
								</Card.Text>

								<Card.Text className="mb-1">
										{data.FechaInicio}/{data.FechaFinal}
								</Card.Text>
								<Card.Text className="text-primary mb-2">
									({data.ReporteA})
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
										Programado ({data.Moneda})
									</Card.Text>
									<p className="mb-1">
										{" "}
										{Intl.NumberFormat("en").format(data.Programado)}
									</p>
									<p className="mb-1">
										{" "}
										{data.PorcentajeProgramado}%
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
										{Intl.NumberFormat("en").format(data.Valorizado)}
									</p>
									<p className="mb-1 text-danger">
										{" "}
										{data.PorcentajeValorizado}%
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
										{
										Intl.NumberFormat("en").format(data.Real)
										}
									</p>
									<p className="mb-1 text-success">
										{" "}
										{data.PorcentajeReal}%
									</p>
								</div>

								<div>
									<h5 className="card-h5">Fa</h5>
									<p className="mb-0 text-danger">
										{" "}
										{Intl.NumberFormat("en").format(data.FA)}
									</p>
									<p className="mb-0 text-danger">{data.PorcentajeFA}</p>
								</div>

								<div>
									<h5>Fc</h5>
									<p className="mb-1 text-success">
										{" "}
										{Intl.NumberFormat("en").format(data.FC)}
									</p>
									<p className="mb-1 text-success">{data.PorcentajeFC}</p>
								</div>
							</div>

							<div className="w-100">
								<div className="progress-group row">
									<div className="col-md-11">
										<div className="progress progress-sm m-2">
											<div
												className="progress-bar bg-blue"
												style={{
													width: `${data.PorcentajeProgramado}%`,
												}}
											></div>
										</div>
									</div>

									<div className="col-md-1 p-0">
										<b  className="porcentaje-barra">{data.PorcentajeProgramado}%</b>
									</div>
								</div>

								<div className="progress-group row">
									<div className="col-md-11">
										<div className="progress progress-sm m-2">
											<div
												className="progress-bar bg-yellow"
												style={{
													width: `${data.PorcentajeValorizado}%`,
												}}
											></div>
										</div>
									</div>

									<div className="col-md-1 p-0 ">
										<b className="porcentaje-barra"> {data.PorcentajeValorizado}%</b>
									</div>
								</div>

								<div className="progress-group row">
									<div className="col-md-11">
										<div className="progress progress-sm m-2">
											<div
												className="progress-bar bg-success"
												style={{
													width: `${data.PorcentajeReal}%`,
												}}
											></div>
										</div>
									</div>

									<div className="col-md-1 p-0">
										<b  className="porcentaje-barra"> {data.PorcentajeReal}%</b>
									</div>
								</div>
							</div>
						</Card.Body>
					</Card>
				</Row>
			) : (
				<CardNoData/>
			)}

			<ControlParty CodProyect={proyects.idCard} CodPc={proyects.idPc} />
			{/* <Proyeccion /> */}
			{/* <hr />

			<h3 className="text-center mb-3">Liquidez</h3> */}
			
		</Container>
	)
}

export default IdPc
