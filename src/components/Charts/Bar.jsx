import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: [
    "Nov-19",
    "Dic-19",
    "Ene-20",
    "Feb-20",
    "Mar-20",
    "Abr-20",
    "Ago-20",
  ],
  datasets: [
    {
      label: 'Meta',
      data: [0, 20, 40, 60, -50, 0, 0],
      backgroundColor:'green',
    },
    {
      label: 'Acumulado',
      data: [874739, 1144007, 504404, 486425, 282229, 50939, 300495],
      backgroundColor: 'blue',
    },
    {
      label: 'Saldo',
      data: [3978174, 3533032, 2338238, 1833928, 1666686, 1562017, 0],
      backgroundColor: 'orange',
    },
    {
      label: 'Ganado',
      data: [-521107, -1218012, -526730, -508317, -622,662, -568932, 704618],
      backgroundColor: 'grey',
    },
    {
      label: 'Perdido',
      data: [0, 20, 40, 60, -50, 0, 0],
      backgroundColor: 'red',
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked'
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
};

const VerticalBar = () => (
  <>
    <Bar data={data} options={options} />
  </>
);

export default VerticalBar;