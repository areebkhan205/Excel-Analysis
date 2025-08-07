import { FileSpreadsheet, Upload, X } from 'lucide-react'; // make sure lucide-react is installed
import { useRef, useState } from 'react';

export function File() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload an Excel file.');
      setFile(null);
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  return (
    <div className="flex relative top-[100px] flex-col items-center gap-4 border-2 border-dashed border-purple-600 rounded-2xl p-6 w-full max-w-md mx-auto bg-[#111] text-white shadow-xl transition-all  hover:shadow-purple-700/30 hover:scale-120 duration-300">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full p-6 text-center cursor-pointer rounded-xl border border-purple-900 hover:bg-purple-900/20 transition"
        onClick={() => fileInputRef.current?.click()}
      >
        {file ? (
          <div className="flex items-center justify-between gap-2">
            <FileSpreadsheet className="text-green-400" />
            <span className="text-sm truncate">{file.name}</span>
            <button onClick={removeFile} className="text-red-400 hover:text-red-600 transition">
              <X />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Upload className="w-6 h-6" />
            <p className="text-sm">Click or drag & drop an Excel file</p>
            <p className="text-xs text-gray-500">Only .xlsx or .xls allowed</p>
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
  );
}
