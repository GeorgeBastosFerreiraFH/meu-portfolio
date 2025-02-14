import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CashFlowChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Fluxo de Caixa dos Últimos 7 Dias",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
      },
    },
  };

  const formattedLabels = data.labels.map((date) => {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  });

  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Total",
        data: data.total,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "PIX",
        data: data.pix,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "Cartão",
        data: data.cartao,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Dinheiro",
        data: data.dinheiro,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default CashFlowChart;
