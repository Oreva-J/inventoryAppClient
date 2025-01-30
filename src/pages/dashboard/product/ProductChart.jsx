import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../../redux/features/product/productSlice';

const barChartData = [
  { data: [35, 44, 24, 34] },
  { data: [51, 6, 49, 30] },
  { data: [15, 25, 30, 50] },
  { data: [60, 50, 15, 25] },
];

const pieChartData = [
  {
    data: [
      { id: 0, value: 10, label: 'series A' },
      { id: 1, value: 15, label: 'series B' },
      { id: 2, value: 20, label: 'series C' },
    ],
  },
];

export default function ProductChart() {
  const isLoading = useSelector(selectIsLoading);

  // Default to empty arrays if loading, else use actual data
  const chartData = !isLoading ? barChartData : null;
  const pieData = !isLoading ? pieChartData : null;

  return (
    <div className='flex flex-col md:flex-row gap-10 mt-24 justify-center items-center'>

      {/* Check if pieData is available before rendering PieChart */}
      {pieData ? (
        <PieChart series={pieData} width={400} height={200} />
      ) : (
        <div>Loading Pie Chart...</div> // Display a loading message or spinner
      )}

      {/* Check if chartData is available before rendering BarChart */}
      {chartData ? (
        <BarChart
          series={chartData}
          height={290}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      ) : (
        <div>Loading Bar Chart...</div> // Display a loading message or spinner
      )}
    </div>
  );
}
