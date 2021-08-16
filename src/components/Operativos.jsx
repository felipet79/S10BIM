import {useState, useEffect} from "react";
// import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import Line from "./Charts/Line";
import {useSelector, useDispatch} from "react-redux";
import {
	ProjectDetails,
	listHistory,
	ListarPorPeriodo,
} from "../actions/proyects.actions";
import {Modal, Table} from "react-bootstrap";
import CardsHistory from "./CardsHistory";

const Operativos = ({CodProyect, match}) => {
	const dispatch = useDispatch();
	const proyects = useSelector((state) => state.proyects);
	const [cod, setCod] = useState(true);
	const [loading, setLoading] = useState(true);
	const [lgShow, setLgShow] = useState(false);

	const getListHistoryModal = () => {
		dispatch(listHistory(CodProyect));
		setLgShow(true);
	};

	useEffect(() => {
		setLoading(true)
		// 
		if (CodProyect && cod !== CodProyect) {
			setCod(CodProyect);
			dispatch(ListarPorPeriodo(CodProyect));
			setTimeout(() => {
				console.log('llamando project details')
				dispatch(ProjectDetails(CodProyect));
				setLoading(false);
			}, 1000);
		}
		console.log(CodProyect);
	}, [CodProyect]);

	return (
		<>
			<Modal
				size="lg"
				show={lgShow}
				onHide={() => setLgShow(false)}
				aria-labelledby="example-modal-sizes-title-lg"
			>
				<Modal.Header className="text-center" closeButton>
					<div className="w-100">
						<h4 className="text-center">
							RO Mes y Acumulado (S/.)
						</h4>
					</div>
				</Modal.Header>
				<Modal.Body>
					<CardsHistory />
				</Modal.Body>
			</Modal>

			{ proyects.periodo && proyects.periodo[0] ?
			<>
				<Link to="#" onClick={() => getListHistoryModal()}>
					<Line data={proyects.periodo}  className="responsive-chart" />
				</Link>
			</>
			: <Line data={proyects.periodo}  className="responsive-chart" />
			}
			{proyects.projectDetails[0] ? (
				<>
					<Table
						striped
						bordered
						hover
						size="sm"
						className="mt-3 bg-white"
					>
						<thead>
							<tr>
								<th></th>
								<th>HH</th>
								<th>MT (S/.)</th>
								<th>EQ (S/.)</th>
								<th>SC (S/.)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="d-flex align-items-center">
									<div
										className="bg-primary mr-2"
										style={{
											width: 15,
											height: 15,
											borderRadius: "50%",
										}}
									></div>{" "}
									Programado
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].HH_Programado)
									}
								</td>
								<td className="text-right">
								
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_MT_Programado)
									}
								</td>
								<td className="text-right">
									
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_HM_Programado)
									}
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_SC_Programado)
									}
									
								</td>
							</tr>
							<tr>
								<td className="d-flex align-items-center">
									<div
										className="bg-warning mr-2"
										style={{
											width: 15,
											height: 15,
											borderRadius: "50%",
										}}
									></div>{" "}
									Valorizado
								</td>
								<td className="text-right">
									
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].HH_Valorizado)
									}
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_MT_Valorizado)
									}
									
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_HM_Valorizado)
									}
									
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_SC_Valorizado)
									}
									
								</td>
							</tr>
							<tr>
								<td className="d-flex align-items-center">
									<div
										className="bg-success mr-2"
										style={{
											width: 15,
											height: 15,
											borderRadius: "50%",
										}}
									></div>{" "}
									Real
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].HH_Real)
									}
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_MT_Real)
									}
									
								</td>
								<td className="text-success text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_HM_Real)
									}
								</td>
								<td className="text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Costo_SC_Real)
									}
								</td>
							</tr>
							<tr>
								<td className="d-flex align-items-center">
									Diferencia (V-R)
								</td>
								<td className="text-success text-right">
									
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Diferencia_HH)
									}
								</td>
								<td className="text-danger text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Diferencia_Costo_MT)
									}
								</td>
								<td className="text-success text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Diferencia_Costo_HM)
									}
								</td>
								<td className="text-danger text-right">
									{
										Intl.NumberFormat("en").format(proyects.projectDetails[0].Diferencia_Costo_SC)
									}
								</td>
							</tr>
						</tbody>
					</Table>
				</>
			) : loading ? (
				"Cargando..."
			) : (
				"Sin datos"
			)}
		</>
	);
};

export default Operativos;
