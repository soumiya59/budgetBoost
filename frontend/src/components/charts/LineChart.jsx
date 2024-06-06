/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LineChart = ({chartData,options}) => {
    return <Line data={chartData} options={options} />;
};

export default LineChart;
