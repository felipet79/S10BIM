import React from 'react'
import {Row, Card} from "react-bootstrap";

const CardNoData = () => {
	return (
		
		<Row>
		<Card className="w-100 mb-1">
			<Card.Header className="bg-primary text-left p-1 d-flex align-items-center mb-0">
				<h5 className="mb-0  ml-2" style={{color: 'yellow'}}>
					No hay datos...
				</h5>
			</Card.Header>
			<Card.Body className="p-1">
			
				<div className="d-flex justify-content-around">
				
					<Card.Text className="mb-1">
						Monto(-){" "}
						-
					</Card.Text>

					<Card.Text className="mb-1">
						-
						-{" "}
						-
					</Card.Text>
					<Card.Text className="text-primary mb-2">
						(-)
					</Card.Text>

					<p className="m-0 ml-3">Procesado: -</p>
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
							Programado (-)
						</Card.Text>
						<p className="mb-1">
							{" "}
							-
						</p>
						<p className="mb-1">
							{" "}
							-%
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
							-
						</p>
						<p className="mb-1 text-danger">
							{" "}
							-%
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
							-
						</p>
						<p className="mb-1 text-success">
							{" "}
							-%
						</p>
					</div>

					<div>
						<h5 className="card-h5">Fa</h5>
						<p className="mb-0 text-danger">
							{" "}
							-
						</p>
						<p className="mb-0 text-danger">-</p>
					</div>

					<div>
						<h5>Fc</h5>
						<p className="mb-1 text-success">
							{" "}
							-
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
										width: `0%`,
									}}
								></div>
							</div>
						</div>

						<div className="col-md-1 p-0">
							<b  className="porcentaje-barra">-%</b>
						</div>
					</div>

					<div className="progress-group row">
						<div className="col-md-11">
							<div className="progress progress-sm m-2">
								<div
									className="progress-bar bg-yellow"
									style={{
										width: `0%`,
									}}
								></div>
							</div>
						</div>

						<div className="col-md-1 p-0 ">
							<b className="porcentaje-barra">-%</b>
						</div>
					</div>

					<div className="progress-group row">
						<div className="col-md-11">
							<div className="progress progress-sm m-2">
								<div
									className="progress-bar bg-success"
									style={{
										width: `-%`,
									}}
								></div>
							</div>
						</div>

						<div className="col-md-1 p-0">
							<b  className="porcentaje-barra">-%</b>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	</Row>

	)
}

export default CardNoData
