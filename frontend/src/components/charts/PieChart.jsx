/* eslint-disable react/prop-types */
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

// ChartJS.defaults.color = '#593f8b';
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({chartData,options}) => {
    return <Pie data={chartData} options={options} />;
};

export default PieChart;
