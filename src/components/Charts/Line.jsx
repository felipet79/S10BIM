import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import { Line } from "react-chartjs-2";


const LineChart = ({data}) => {
	// const proyects = useSelector(state => state.proyects);
	const [filteredData, setFilteredData] = useState();
	

	useEffect(() => {
		if (data && data[0] !== undefined) {
			var Programado = data[1] ? data[1].EjeY.split('|').filter(function(value, index, arr){ return value > 1;}) : [];
			var Real = data[2] ? data[2].EjeY.split('|').filter(function(value, index, arr){ return value > 1;}) : [];
			var Valorizado = data[3] ? data[3].EjeY.split('|').filter(function(value, index, arr){ return value > 1;}) : [];
			const filteredData = {
				labels: data && data[0] !== undefined ? data[0].EjeY.split('|') : [],
				datasets: [
				  {
					label: "Programado",
					data: data ? Programado : [],
					fill: false,
					backgroundColor: "#0000ff25",
					borderColor: "#4CD7D0",
				  },
				  {
					label: "Valorizado" ,
					data: data ? Valorizado : [],
					fill: false,
					backgroundColor: "#E1C340",
					borderColor: "#FFE194",
				  },
			  
				  {
					label: "Real" ,
					data: data ? Real : [],
					fill: true,
					backgroundColor: "#1e6f5c7e",
					borderColor: "#289672",
				  },
				],
			};
			setFilteredData(filteredData);
		}
	}, [data]);
	
	  
	  const options = {
		scales: {
		  yAxes: [
			{
			  ticks: {
				beginAtZero: true,
			  },
			},
		  ],
		},
	  };

	//if (data[1] === undefined) return <label>Sin data</label>;
	  
	return(
		<div className="responsive-chart">
			<Line height="120" data={filteredData} options={options} />
		</div>
	)
 
};

export default LineChart;
