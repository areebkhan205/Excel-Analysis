import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  return (
    <div
      className="min-h-screen relative bottom-[99px] flex flex-col items-center justify-center p-6 text-white"
      style={{
        backgroundImage:
          "url('/path-to-your-image/432bcd64-c58f-45c7-b6af-467c6fe159c6.png')", // unchanged
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Heading */}
      <div className="max-w-3xl text-center mb-12 px-4 relative z-10">
        <h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r 
          from-[#38e1ff] via-[#b855ff] to-[#ff9f40] bg-clip-text text-transparent 
          drop-shadow-[0_0_15px_rgba(184,85,255,0.85)]"
          style={{
            letterSpacing: "0.03em",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Turn Your Excel into Insights
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 text-lg drop-shadow-[0_0_8px_rgba(255,159,64,0.5)]"
          style={{
            color: "#f1f5f9",
            fontFamily: "'Inter', sans-serif",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
          Upload your spreadsheet and instantly get stunning charts, graphs, and
          actionable data insights 📊.
        </p>
      </div>

      {/* Upload Box */}
      <div className="w-full max-w-lg relative z-10 px-4">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 rounded-xl cursor-pointer 
          border-cyan-300/90 bg-black/30 backdrop-blur-md hover:bg-black/40 transition-all
          shadow-[0_0_15px_rgba(56,225,255,0.8)] hover:shadow-[0_0_25px_rgba(184,85,255,0.85)]"
          title="Upload Excel file (.xlsx, .xls)"
        >
          <svg
            className="w-14 h-14 mb-3 text-cyan-300 drop-shadow-[0_0_8px_rgba(56,225,255,0.9)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 12V8m0 0l-4 4m4-4l4 4"
            />
          </svg>
          <span className="text-white/80 text-lg">
            Drag & drop your Excel file here or{" "}
            <span className="text-cyan-300 font-semibold">browse</span>
          </span>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {fileName && (
          <p className="mt-3 text-center text-cyan-300 font-medium truncate">
            Selected file: {fileName}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        className="mt-10 px-8 py-3 rounded-lg text-lg font-semibold 
          bg-gradient-to-r from-[#38e1ff] via-[#b855ff] to-[#ff9f40] 
          shadow-[0_0_25px_rgba(184,85,255,0.75)] border border-white/10
          hover:scale-105 transition-transform 
          hover:shadow-[0_0_40px_rgba(56,225,255,0.9)]"
        style={{
          fontFamily: "'Poppins', sans-serif",
          backdropFilter: "blur(6px)",
        }}
        type="button"
        onClick={() => alert("Feature coming soon!")}
      >
        Try it Now →
      </button>
    </div>
  );
}
