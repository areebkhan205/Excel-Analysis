import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { FileSpreadsheet, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as XLSX from "xlsx";

// Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
  RadialLinearScale
);

export function File() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [chartData, setChartData] = useState(null);
  const fileInputRef = useRef();

  const allowedTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload an Excel file.");
      setFile(null);
      return;
    }
    setError("");
    setFile(selectedFile);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setError("");
    setChartData(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const parseExcel = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          resolve(jsonData);
        } catch {
          reject("Error reading file");
        }
      };
      reader.readAsArrayBuffer(file);
    });

  const detectColumns = (rows) => {
    const columns = Object.keys(rows[0]);
    const labelCol = columns.find((col) => isNaN(Number(rows[0][col]))) || columns[0];
    const valueCol =
      columns.find((col) => !isNaN(Number(String(rows[0][col]).replace(/[^0-9.-]/g, "")))) ||
      columns[1];
    return { labelCol, valueCol };
  };

  const groupSmallValues = (data, labels, thresholdPercent = 2) => {
    const total = data.reduce((a, b) => a + b, 0);
    const newData = [];
    const newLabels = [];
    let othersTotal = 0;

    data.forEach((value, i) => {
      const percent = (value / total) * 100;
      if (percent < thresholdPercent) {
        othersTotal += value;
      } else {
        newData.push(value);
        newLabels.push(labels[i]);
      }
    });

    if (othersTotal > 0) {
      newData.push(othersTotal);
      newLabels.push("Others");
    }
    return { labels: newLabels, data: newData };
  };

  const createChartData = (rows, labelCol, valueCol) => ({
    labels: rows.map((r) => String(r[labelCol] ?? "").trim()),
    datasets: [
      {
        label: valueCol,
        data: rows.map((r) => Number(String(r[valueCol] ?? "").replace(/[^0-9.-]/g, "")) || 0),
        backgroundColor: [
          "#38E1FF",
          "#B855FF",
          "#FF9F40",
          "#4BC0C0",
          "#FF6384",
          "#FFCD56",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  });

  const handleVisualize = async () => {
    if (!file) return setError("Please upload a file before visualizing.");

    try {
      const rows = await parseExcel(file);
      if (!rows.length) return setError("Excel file is empty or unreadable.");

      const { labelCol, valueCol } = detectColumns(rows);
      if (!labelCol || !valueCol) return setError("No suitable columns found.");

      setChartData(createChartData(rows, labelCol, valueCol));
      setShowPopup(true);
    } catch (err) {
      setError(err);
    }
  };

  const renderChart = (type, title, data, options = {}) => {
    const ChartComp = { Bar, Line, Pie }[type] || Bar;
    return (
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
        <h3 className="text-center font-semibold mb-2">{title}</h3>
        <div className="flex-1 min-h-[250px]">
          <ChartComp
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { font: { size: 10 } } },
              },
              ...options,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center p-10">
        {/* Upload Area */}
        <div
          className="flex flex-col items-center gap-4 border-2 border-dashed border-purple-500 rounded-2xl p-8 w-full max-w-[360px] sm:max-w-md bg-white/10 backdrop-blur-lg text-white shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div
            className="w-[300px] p-6 text-center cursor-pointer rounded-xl border border-purple-300 hover:bg-purple-300/20"
            onClick={() => fileInputRef.current?.click()}
          >
            {file ? (
              <div className="flex items-center justify-between gap-2">
                <FileSpreadsheet className="text-green-400" />
                <span className="text-sm truncate">{file.name}</span>
                <button onClick={removeFile} className="text-red-400 hover:text-red-600">
                  <X />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-200">
                <Upload className="w-6 h-6" />
                <p className="text-sm">Click or drag & drop an Excel file</p>
                <p className="text-xs text-gray-400">Only .xlsx or .xls allowed</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Visualize Button */}
        <button
          onClick={handleVisualize}
          className="mt-6 px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-[#38e1ff] via-[#b855ff] to-[#ff9f40] shadow-lg hover:scale-105 transition-transform"
          type="button"
        >
          Visualize Data
        </button>
      </div>

      {/* Charts Popup */}
      {showPopup && chartData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg w-[95%] max-w-[1200px] h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Data Visualization</h2>
              <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-black">
                <X />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Bar Chart */}
              {renderChart("Bar", "Bar Chart", chartData, {
                scales: {
                  x: {
                    ticks: { font: { size: 8 }, maxRotation: 45, minRotation: 45 },
                    grid: { display: false },
                  },
                  y: { beginAtZero: true, ticks: { font: { size: 8 } } },
                },
              })}

              {/* Pie Chart */}
              {(() => {
                const { labels, data } = groupSmallValues(chartData.datasets[0].data, chartData.labels);
                return renderChart("Pie", "Pie Chart", {
                  ...chartData,
                  labels,
                  datasets: [{ ...chartData.datasets[0], data }],
                });
              })()}

              {/* Line Chart */}
              {renderChart("Line", "Line Chart", {
                ...chartData,
                datasets: chartData.datasets.map((ds) => ({
                  ...ds,
                  fill: true,
                  tension: 0.4,
                  borderWidth: 2,
                  backgroundColor: "rgba(75, 192, 192, 0.3)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  pointBackgroundColor: "rgba(75, 192, 192, 1)",
                })),
              })}

              {/* Doughnut Chart */}
              {(() => {
                const { labels, data } = groupSmallValues(chartData.datasets[0].data, chartData.labels);
                return renderChart("Pie", "Doughnut Chart", {
                  ...chartData,
                  labels,
                  datasets: [{ ...chartData.datasets[0], data }],
                }, { cutout: "70%" });
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
