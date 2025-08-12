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

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

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

  const handleVisualize = () => {
    if (!file) {
      setError("Please upload a file before visualizing.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      if (!jsonData.length) {
        setError("Excel file is empty or unreadable.");
        return;
      }

      // Auto-detect columns
      const columns = Object.keys(jsonData[0]);
      const labelCol =
        columns.find((col) => isNaN(Number(jsonData[0][col]))) || columns[0];
      const valueCol =
        columns.find((col) => !isNaN(Number(String(jsonData[0][col]).replace(/[^0-9.-]/g, "")))) ||
        columns[1];

      if (!labelCol || !valueCol) {
        setError("Could not detect suitable columns for labels and values.");
        return;
      }

      // Prepare data
      const labels = jsonData.map((row) => String(row[labelCol] ?? "").trim());
      const values = jsonData.map((row) => {
        const cleaned = String(row[valueCol] ?? "").replace(/[^0-9.-]/g, "");
        return Number(cleaned) || 0;
      });

      setChartData({
        labels,
        datasets: [
          {
            label: valueCol || "Values",
            data: values,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: "rgba(255,255,255,0.8)",
            borderWidth: 1,
          },
        ],
      });

      setShowPopup(true);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Upload Area */}
        <div
          className="flex flex-col items-center gap-4 border-2 border-dashed border-purple-600 rounded-2xl p-6 w-full max-w-md bg-[#111] text-white shadow-xl hover:shadow-purple-700/30 hover:scale-105 transition-all"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div
            className="w-full p-6 text-center cursor-pointer rounded-xl border border-purple-900 hover:bg-purple-900/20"
            onClick={() => fileInputRef.current?.click()}
          >
            {file ? (
              <div className="flex items-center justify-between gap-2">
                <FileSpreadsheet className="text-green-400" />
                <span className="text-sm truncate">{file.name}</span>
                <button
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-600"
                >
                  <X />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <Upload className="w-6 h-6" />
                <p className="text-sm">Click or drag & drop an Excel file</p>
                <p className="text-xs text-gray-500">
                  Only .xlsx or .xls allowed
                </p>
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
          className="mt-6 px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-[#38e1ff] via-[#b855ff] to-[#ff9f40] shadow-lg hover:scale-105 transition-transform"
          type="button"
        >
          Visualize Data
        </button>
      </div>

      {/* Charts Popup */}
    {showPopup && chartData && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
    <div className="bg-white text-black p-6 rounded-xl shadow-lg w-[1000px] h-[600px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Data Visualization</h2>
        <button
          onClick={() => setShowPopup(false)}
          className="text-gray-400 hover:text-black"
        >
          <X />
        </button>
      </div>
{/* Bar Chart */}
<div className="border rounded-lg p-4 h-[300px]">
  <h3 className="text-center font-semibold mb-2">Bar Chart</h3>
  <Bar
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { size: 14 } } },
        tooltip: { backgroundColor: "#222", titleColor: "#fff", bodyColor: "#fff" }
      },
      scales: {
        x: {
          ticks: { font: { size: 12 } },
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          ticks: { font: { size: 12 } },
        },
      },
      datasets: {
        bar: {
          barThickness: 50,
          maxBarThickness: 60,
          categoryPercentage: 0.7,
          borderRadius: 8,
          backgroundColor: "rgba(75, 192, 192, 0.8)",
          hoverBackgroundColor: "rgba(75, 192, 192, 1)"
        },
      },
    }}
  />
</div>

{/* Pie Chart */}
<div className="border rounded-lg p-4 h-[300px]">
  <h3 className="text-center font-semibold mb-2">Pie Chart</h3>
  <Pie
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "right", labels: { font: { size: 14 } } },
        tooltip: { backgroundColor: "#222", titleColor: "#fff", bodyColor: "#fff" }
      },
    }}
  />
</div>

{/* Line Chart */}
<div className="border rounded-lg p-4 h-[300px]">
  <h3 className="text-center font-semibold mb-2">Line Chart</h3>
  <Line
    data={{
      ...chartData,
      datasets: chartData.datasets.map((ds) => ({
        ...ds,
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)"
      })),
    }}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: { backgroundColor: "#222", titleColor: "#fff", bodyColor: "#fff" }
      },
    }}
  />
</div>

{/* Doughnut Chart */}
<div className="border rounded-lg p-4 h-[300px]">
  <h3 className="text-center font-semibold mb-2">Doughnut Chart</h3>
  <Pie
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%", // Makes it a doughnut instead of a pie
      plugins: {
        legend: { position: "right", labels: { font: { size: 14 } } },
        tooltip: { backgroundColor: "#222", titleColor: "#fff", bodyColor: "#fff" }
      },
    }}
  />
</div>
    
      </div>
    </div>
 
)}
      
    </>
  );
}
