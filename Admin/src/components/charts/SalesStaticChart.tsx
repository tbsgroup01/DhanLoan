// components/charts/SalesStaticChart.tsx
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartProps {
  data: { date: string; applications: number }[];
}

const SalesStaticChart = ({ data }: ChartProps) => {
  const series = [
    {
      name: "Loan Applications",
      data: data.map((item) => item.applications),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line", // Line chart as requested
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'inherit',
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#4F46E5"], // Indigo color for a professional look
    },
    markers: {
      size: 4,
      colors: ["#4F46E5"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.05)",
      xaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: data.map((item) => item.date),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      tickAmount: 4,
    },
    tooltip: {
      theme: "light",
      x: { show: true },
      y: { title: { formatter: () => "Applications:" } },
    },
    colors: ["#4F46E5"],
  };

  return (
    <div className="w-full h-[300px]">
      <ReactApexChart 
        options={options} 
        series={series} 
        type="line" 
        height="100%" 
      />
    </div>
  );
};

export default SalesStaticChart;