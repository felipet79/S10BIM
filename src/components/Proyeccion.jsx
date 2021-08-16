import React from 'react'
import {Table} from "react-bootstrap";
import Bar from "./Charts/Bar";

const Proyeccion = () => {
	return (
		<>
			<h3 className="text-center mb-3">Proyección</h3>
			<Bar />

			<Table
				striped
				bordered
				hover
				size="sm"
				className="mt-5 bg-white"
			>
				<thead>
					<tr>
						<th>Mes</th>
						<th>Acumulado</th>
						<th>Saldo Proy.</th>
						<th>Ganado</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ago-2020</td>
						<td>300,495</td>
						<td>0</td>
						<td className="text-success">
							704,618
						</td>
					</tr>
					<tr>
						<td>Abr-2020</td>
						<td>50,939</td>
						<td>1,562,017</td>
						<td className="text-danger">
							-568,932
						</td>
					</tr>
					<tr>
						<td>Mar-2020</td>
						<td>282,229</td>
						<td>1,666,686</td>
						<td className="text-danger">
							-622,662
						</td>
					</tr>
					<tr>
						<td>Feb-2020</td>
						<td>486,425</td>
						<td>1,833,928</td>
						<td className="text-danger">
							-508,317
						</td>
					</tr>
					<tr>
						<td>Ene-2020</td>
						<td>504,404</td>
						<td>2,338,238</td>
						<td className="text-danger">
							-526,730
						</td>
					</tr>
					<tr>
						<td>Dic-2019</td>
						<td>1,144,007</td>
						<td>3,533,032</td>
						<td className="text-danger">
							-1,218,012
						</td>
					</tr>
					<tr>
						<td>Nov-2019</td>
						<td>874,739</td>
						<td>3,978,174</td>
						<td className="text-danger">
							-521,107
						</td>
					</tr>
				</tbody>
			</Table>

		</>
	)
}

export default Proyeccion
